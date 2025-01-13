import configure from '@config/configure';
import { handleSetTabId } from '@features/activity-counter/activity-counter-saga';
import { handleFetchAgendaItems } from '@features/agenda/agenda-saga';
import { fetchBranding } from '@features/branding/branding-saga';
import {
  setGiphyEnabled,
  setStreamChatEnabled,
} from '@features/chat/chat-reducer';
import { handleFetchConversations } from '@features/chat/chat-saga';
import {
  createInitSurveyAction,
  handleFetchNPS,
} from '@features/event-feedback/feedback-saga';
import { handleFetchEventRegistration } from '@features/event-registration/event-registration-saga';
import {
  setMyAgendaEnabled,
  setScheduleMeetingsEnabled,
  setSendMessagesEnabled,
  setSponsorsInReceptionHeaderEnabled,
} from '@features/event-settings/event-settings-reducer';
import {
  eventFinished,
  getCurrentServerTime,
  getPostEventSurveyDisabled,
  setCurrentTime,
  setCustomDomain,
  setCustomSegment,
  setEvent,
  setGuestEvent,
} from '@features/events/events-reducer';
import {
  handleFetchServerTimeOffset,
  handleLoadTags,
  startEventTimer,
} from '@features/events/events-saga';
import { handleFetchManagedVendors } from '@features/expo/expo-saga';
import { handleFetchEventApps } from '@features/external-apps/external-apps-saga';
import { handleFetchAnnouncements } from '@features/general-announcement/announcement-saga';
import { startHeartbeatTimer } from '@features/heartbeat/heartbeat-saga';
import { handleFetchIntegrations } from '@features/integrations/integrations-saga';
import { handleFetchLocale } from '@features/localization/localization-saga';
import { getIsOpen } from '@features/modal/modal-reducer';
import { handleFetchStages } from '@features/multi-stages/multi-stages-saga';
import {
  handleFetchNotifications,
  handleFetchNotificationSettings,
} from '@features/notifications/notifications-saga';
import { setCanInviteToCall } from '@features/people/people-reducer';
import { handleFetchPolls } from '@features/polls/polls-saga';
import {
  handleFetchEventOrganiser,
  handleFetchEventReception,
  handleFetchEventSchedule,
  handleFetchEventSegments,
} from '@features/reception/reception-saga';
import { setPreEventMeetingsEnabled } from '@features/schedule-meeting/schedule-meeting-reducer';
import { handleFetchScheduleMeetings } from '@features/schedule-meeting/schedule-meeting-saga';
import { setSidePanelConfig } from '@features/side-panel/side-panel-reducer';
import { getId } from '@features/user-profile/user-profile-reducer';
import {
  handleFetchEventOrganiserIds,
  handleFetchMutedByUsers,
  handleFetchMutedUsers,
  handleFetchProfileCategories,
  handleFetchUserMutedStatus,
  handleFetchUserProfile,
  handleFetchUserRegistration,
} from '@features/user-profile/user-profile-saga';
import { insertGoogleAnalytics } from '@helpers/analytics';
import {
  isCustomDomainEventInDefaultHost,
  redirectToCustomDomain,
} from '@helpers/custom-domain-helper';
import exceptionTracker from '@helpers/logger';
import {
  handleRedirect,
  isRedirectInProgress,
  request,
} from '@helpers/request';
import { logger as getLogger } from '@hopin-team/browser-logger';
import { tags } from '@hopin-team/sentry-tags';
import * as Sentry from '@sentry/react';
import Router, { SingletonRouter } from 'next/router';
import { camelizeKeys } from 'ramda-extension';
import { Action } from 'redux';
import { all, call, put, select, takeEvery } from 'typed-redux-saga/macro';

import { finishedAppLoading } from './app-loading-reducer';

type AppLoadingActionPayload = {
  eventSlug: string;
  userDataSegregation: boolean;
  showUserRegistrationForm: boolean;
};

const get = configure();

const logger = () => getLogger(tags.APP_LOADING);

function* handleDeslugifyEvent(
  eventSlug: AppLoadingActionPayload['eventSlug'],
) {
  try {
    const route = get('HOPIN_DESLUGIFY_URL')(eventSlug);
    const eventResponse = yield* call(request, { route });
    if (!eventResponse.id) {
      logger().error('Unexpected response from deslugify endpoint', {
        eventSlug,
        eventResponse,
      });
      return false;
    }

    yield* put(setEvent(eventResponse));
    const {
      analyticsCode,
      extra,
      customSegment,
      streamChatEnabled,
      customDomain,
      guestEvent,
    } = camelizeKeys(eventResponse);

    // If there is a custom domain for the event but it isn't the current host
    // then we want to redirect the user to the same URL but replacing the host
    // with the custom domain appDomain (e.g app.awesome.event).
    if (
      isCustomDomainEventInDefaultHost(customDomain, window.location.hostname)
    ) {
      return yield* call(redirectToCustomDomain, customDomain, handleRedirect);
    }

    if (extra) {
      yield* put(setCanInviteToCall(extra.inviteToVideoCall));
      yield* put(setScheduleMeetingsEnabled(extra.scheduleMeetings));
      yield* put(setSendMessagesEnabled(extra.sendMessages));
      yield* put(setMyAgendaEnabled(extra.myAgenda));
      yield* put(setPreEventMeetingsEnabled(extra.scheduleMeetingsPreEvent));
      // TODO(benslater): Next iteration of the new tabs system, set the active tabs based on the defaults from the config
      // yield* put(changeActiveSubTab(activeSubTabs));
      yield* put(setSidePanelConfig(extra.sidePanelConfig));
      yield* put(setGiphyEnabled(extra.giphyEnabled));
      yield* put(
        setSponsorsInReceptionHeaderEnabled(
          extra.showSponsorsInReceptionHeader,
        ),
      );
    }
    if (analyticsCode) {
      yield* call(insertGoogleAnalytics, analyticsCode);
    }
    if (customSegment) {
      yield* put(setCustomSegment(customSegment));
    }
    if (customDomain) {
      yield* put(setCustomDomain(customDomain));
    }
    yield* put(setStreamChatEnabled(!!streamChatEnabled));
    yield* put(setGuestEvent(guestEvent));
  } catch (error) {
    yield* call(exceptionTracker.error, error, tags.APP_LOADING);
    switch (error.code) {
      case 'event_not_found':
        return yield* call(handleRedirect, get('HOPIN_ROOT'));
      case 'not_published':
        return yield* call(handleRedirect, get('HOPIN_ROOT'));
      default:
        return yield* call(
          handleRedirect,
          get('HOPIN_REGISTRATION_PAGE')(eventSlug),
        );
    }
  }
}

const loadApp = (payload: AppLoadingActionPayload) => ({
  type: loadApp.type,
  payload,
});
loadApp.type = 'APP_LOADING/loadApp';

const setUserIdInScope = (id: string) => {
  Sentry.configureScope(function (scope) {
    scope.setUser({ id });
  });
};

export function* handleSegmentsAndStages() {
  try {
    yield* call(handleFetchEventSegments);
    yield* call(handleFetchStages);
  } catch (error) {
    yield* call(exceptionTracker.error, error, tags.APP_LOADING);
  }
}

const logAppLoad = (router: SingletonRouter, userId: string): void => {
  logger().info(`Load app: user ${userId} in ${router.asPath}`);
};

interface HandleLoadAppAction extends Action {
  payload: AppLoadingActionPayload;
}

function* handleLoadApp({ payload }: HandleLoadAppAction) {
  try {
    yield* call(handleDeslugifyEvent, payload.eventSlug);
    yield* call(handleFetchUserProfile, payload.userDataSegregation);

    if (isRedirectInProgress()) {
      return false;
    }

    const userId = yield* select(getId);
    yield* call(setUserIdInScope, userId);

    yield* call(logAppLoad, Router, userId);

    // blocking requests
    yield* all([
      call(handleSegmentsAndStages),
      call(fetchBranding),
      call(handleFetchEventReception),
      call(handleFetchEventSchedule),
      call(handleFetchLocale),
      call(handleFetchServerTimeOffset),
      call(handleFetchUserRegistration),
      call(handleFetchEventOrganiser),
      call(handleSetTabId),
      call(handleFetchEventOrganiserIds),
      call(handleFetchManagedVendors),
      call(handleFetchScheduleMeetings),
    ]);

    yield* put(startEventTimer());
    yield* put(startHeartbeatTimer());

    const currentServerTime = yield* select(getCurrentServerTime);
    yield* put(setCurrentTime(currentServerTime));
    yield* put(finishedAppLoading());

    // non-blocking requests
    yield* all([
      call(handleFetchNPS),
      call(handleFetchConversations),
      call(handleLoadTags),
      call(handleFetchUserMutedStatus, { payload: userId }),
      call(handleFetchMutedUsers),
      call(handleFetchMutedByUsers),
      call(handleFetchEventApps),
      call(handleFetchIntegrations),
      call(handleFetchPolls),
      call(handleFetchNotificationSettings),
      call(handleFetchNotifications),
      call(handleFetchAgendaItems),
      call(handleFetchAnnouncements),
      call(handleFetchProfileCategories),
    ]);

    if (payload.showUserRegistrationForm) {
      yield* call(handleFetchEventRegistration);
    }

    const eventEnded = yield* select(eventFinished);
    if (eventEnded) {
      const isModalOpen = yield* select(getIsOpen);
      const postEventSurveyDisabled = yield* select(getPostEventSurveyDisabled);
      if (!postEventSurveyDisabled && !isModalOpen) {
        yield* put(createInitSurveyAction());
      }
    }
  } catch (error) {
    yield* call(exceptionTracker.error, error, tags.APP_LOADING);
  }
}

function* watchLoadApp() {
  yield* takeEvery(loadApp.type, handleLoadApp);
}

export {
  handleDeslugifyEvent,
  handleLoadApp,
  loadApp,
  logAppLoad,
  setUserIdInScope,
  watchLoadApp,
};
