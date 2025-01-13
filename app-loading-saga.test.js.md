import configure from '@config/configure';
import { handleSetTabId } from '@features/activity-counter/activity-counter-saga.ts';
import { handleFetchAgendaItems } from '@features/agenda/agenda-saga';
import { finishedAppLoading } from '@features/app-loading/app-loading-reducer';
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
import { insertGoogleAnalytics } from '@helpers/analytics.ts';
import { redirectToCustomDomain } from '@helpers/custom-domain-helper';
import logger from '@helpers/logger';
import { handleRedirect, request } from '@helpers/request';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import { MOCK_RECEPTION_SIDE_PANEL_CONFIG } from '@test-utils/mock-side-panel-config';
import Router from 'next/router.js';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { describe } from 'riteway';

import stubWindowLocationHostname from '../../test-utils/stub-window-location-hostname';
import { handleFetchEventRegistration } from '../event-registration/event-registration-saga';
import {
  handleDeslugifyEvent,
  handleLoadApp,
  handleSegmentsAndStages,
  loadApp,
  logAppLoad,
  setUserIdInScope,
  watchLoadApp,
} from './app-loading-saga';

const get = configure();

describe('handleDeslugifyEvent', async assert => {
  const eventSlug = 'the-best-event-from-2020';
  const gen = cloneableGenerator(handleDeslugifyEvent)(eventSlug);

  const api_base = get('HOPIN_API_ROOT');
  const route = `${api_base}/events/slug/${eventSlug}`;

  assert({
    given: 'a slug from an event',
    should: 'trigger an API call to attempt to deslugify',
    actual: gen.next().value,
    expected: call(request, { route }),
  });

  {
    // this may be `yield call(redirect ...)`
    const clone = gen.clone(); 
    const response = function* () {};

    assert({
      given: 'wrong response but without throwing an error',
      should: 'stop execution',
      actual: clone.next(response).done,
      expected: true,
    });
  }

  {
    const clone = gen.clone();
    const eventNotFound = {
      code: 'event_not_found',
    };

    assert({
      given: 'no event exists with that slug',
      should: 'log the error',
      actual: clone.throw(eventNotFound).value,
      expected: call(logger.error, eventNotFound, logger.tags.APP_LOADING),
    });

    assert({
      given: 'nothing',
      should: 'redirect the user to the home page',
      actual: clone.next().value,
      expected: call(handleRedirect, get('HOPIN_ROOT')),
    });

    assert({
      given: 'nothing',
      should: 'do nothing',
      actual: clone.next().done,
      expected: true,
    });
  }

  {
    const clone = gen.clone();

    const notPublished = { code: 'not_published' };

    assert({
      given: 'event is not published, yet',
      should: 'log the error',
      actual: clone.throw(notPublished).value,
      expected: call(logger.error, notPublished, logger.tags.APP_LOADING),
    });

    assert({
      given: 'nothing',
      should: 'redirect the user to the home page',
      actual: clone.next().value,
      expected: call(handleRedirect, get('HOPIN_ROOT')),
    });

    assert({
      given: 'nothing',
      should: 'do nothing',
      actual: clone.next().done,
      expected: true,
    });
  }

  {
    const clone = gen.clone();
    const anyCodeError = {
      code: 'any_code',
    };

    assert({
      given: 'any error code mapping to an event',
      should: 'log the error',
      actual: clone.throw(anyCodeError).value,
      expected: call(logger.error, anyCodeError, logger.tags.APP_LOADING),
    });

    assert({
      given: 'nothing',
      should: 'redirect the user to the registration page',
      actual: clone.next().value,
      expected: call(handleRedirect, get('HOPIN_REGISTRATION_PAGE')(eventSlug)),
    });

    assert({
      given: 'nothing',
      should: 'do nothing',
      actual: clone.next().done,
      expected: true,
    });
  }

  {
    const clone = gen.clone();
    const canInviteToVideoCall = true;
    const scheduleMeetings = true;
    const sendMessages = true;
    const streamChatEnabled = false;
    const guestEvent = true;
    const myAgendaEnabled = true;
    const preEventMeetingsEnabled = false;
    const giphyEnabled = true;
    const sponsorsInHeader = true;

    const receivedEvent = {
      id: 74,
      name: 'The Best event from 2020',
      start_time: '2020-01-17T10:00:00Z',
      end_time: '2020-01-17T20:00:00Z',
      analytics_code: null,
      extra: {
        invite_to_video_call: canInviteToVideoCall,
        send_messages: sendMessages,
        schedule_meetings: scheduleMeetings,
        side_panel_config: MOCK_RECEPTION_SIDE_PANEL_CONFIG,
        my_agenda: myAgendaEnabled,
        schedule_meetings_pre_event: preEventMeetingsEnabled,
        giphy_enabled: giphyEnabled,
        show_sponsors_in_reception_header: sponsorsInHeader,
      },
      stream_chat_enabled: streamChatEnabled,
      guest_event: guestEvent,
    };

    assert({
      given: 'I successfully receive an event without analytics code',
      should: 'stores the newly received ID into the Redux store',
      actual: clone.next(receivedEvent).value,
      expected: put(setEvent(receivedEvent)),
    });

    assert({
      given: 'nothing',
      should: 'set whether you can invite users to video calls',
      actual: clone.next().value,
      expected: put(setCanInviteToCall(canInviteToVideoCall)),
    });

    assert({
      given: 'nothing',
      should: 'set whether schedule meetings is enabled',
      actual: clone.next().value,
      expected: put(setScheduleMeetingsEnabled(scheduleMeetings)),
    });

    assert({
      given: 'nothing',
      should: 'set whether send messages is enabled',
      actual: clone.next().value,
      expected: put(setSendMessagesEnabled(sendMessages)),
    });

    assert({
      given: 'nothing',
      should: 'set whether my agenda is enabled',
      actual: clone.next().value,
      expected: put(setMyAgendaEnabled(myAgendaEnabled)),
    });

    assert({
      given: 'nothing',
      should: 'set whether pre-event meetings are enabled',
      actual: clone.next().value,
      expected: put(setPreEventMeetingsEnabled(preEventMeetingsEnabled)),
    });

    assert({
      given: 'nothing',
      should: 'set side panel config',
      actual: clone.next().value,
      expected: put(setSidePanelConfig(MOCK_RECEPTION_SIDE_PANEL_CONFIG)),
    });

    assert({
      given: 'nothing',
      should: 'set giphy enabled',
      actual: clone.next().value,
      expected: put(setGiphyEnabled(giphyEnabled)),
    });

    assert({
      given: 'nothing',
      should: 'set sponsors in reception header enabled',
      actual: clone.next().value,
      expected: put(setSponsorsInReceptionHeaderEnabled(sponsorsInHeader)),
    });

    assert({
      given: 'nothing',
      should: 'set stream chat enabled',
      actual: clone.next().value,
      expected: put(setStreamChatEnabled(streamChatEnabled)),
    });

    assert({
      given: 'nothing',
      should: 'set guest event',
      actual: clone.next().value,
      expected: put(setGuestEvent(guestEvent)),
    });

    assert({
      given: 'nothing',
      should: 'be done',
      actual: clone.next().done,
      expected: true,
    });
  }

  {
    const clone = gen.clone();

    const canInviteToVideoCall = false;
    const scheduleMeetingsEnabled = false;
    const sendMessages = false;
    const streamChatEnabled = false;
    const guestEvent = true;
    const myAgendaEnabled = true;
    const preEventMeetingsEnabled = false;
    const giphyEnabled = true;
    const sponsorsInHeader = false;

    const receivedEvent = {
      id: 74,
      name: 'The Best event from 2020',
      start_time: '2020-01-17T10:00:00Z',
      end_time: '2020-01-17T20:00:00Z',
      analytics_code: 'AZ234872983',
      extra: {
        invite_to_video_call: canInviteToVideoCall,
        send_messages: sendMessages,
        schedule_meetings: scheduleMeetingsEnabled,
        side_panel_config: MOCK_RECEPTION_SIDE_PANEL_CONFIG,
        my_agenda: myAgendaEnabled,
        schedule_meetings_pre_event: preEventMeetingsEnabled,
        giphy_enabled: giphyEnabled,
        show_sponsors_in_reception_header: sponsorsInHeader,
      },
      stream_chat_enabled: streamChatEnabled,
      guest_event: guestEvent,
    };

    assert({
      given: 'I successfully receive an event with analytics code',
      should: 'stores the newly received ID into the Redux store',
      actual: clone.next(receivedEvent).value,
      expected: put(setEvent(receivedEvent)),
    });

    assert({
      given: 'nothing',
      should: 'set whether you can invite users to video calls',
      actual: clone.next().value,
      expected: put(setCanInviteToCall(canInviteToVideoCall)),
    });

    assert({
      given: 'nothing',
      should: 'set whether schedule meetings is enabled',
      actual: clone.next().value,
      expected: put(setScheduleMeetingsEnabled(scheduleMeetingsEnabled)),
    });

    assert({
      given: 'nothing',
      should: 'set whether send messages is enabled',
      actual: clone.next().value,
      expected: put(setSendMessagesEnabled(sendMessages)),
    });

    assert({
      given: 'nothing',
      should: 'set whether my agenda is enabled',
      actual: clone.next().value,
      expected: put(setMyAgendaEnabled(myAgendaEnabled)),
    });

    assert({
      given: 'nothing',
      should: 'set whether pre-event meetings are enabled',
      actual: clone.next().value,
      expected: put(setPreEventMeetingsEnabled(preEventMeetingsEnabled)),
    });

    assert({
      given: 'nothing',
      should: 'set the side panel config',
      actual: clone.next().value,
      expected: put(setSidePanelConfig(MOCK_RECEPTION_SIDE_PANEL_CONFIG)),
    });

    assert({
      given: 'nothing',
      should: 'set giphy enabled',
      actual: clone.next().value,
      expected: put(setGiphyEnabled(giphyEnabled)),
    });

    assert({
      given: 'nothing',
      should: 'set sponsors in reception header enabled',
      actual: clone.next().value,
      expected: put(setSponsorsInReceptionHeaderEnabled(sponsorsInHeader)),
    });

    assert({
      given: 'nothing',
      should: 'call the google analytics script',
      actual: clone.next().value,
      expected: call(insertGoogleAnalytics, receivedEvent.analytics_code),
    });

    assert({
      given: 'nothing',
      should: 'set stream chat enabled',
      actual: clone.next().value,
      expected: put(setStreamChatEnabled(streamChatEnabled)),
    });

    assert({
      given: 'nothing',
      should: 'set guest event',
      actual: clone.next().value,
      expected: put(setGuestEvent(guestEvent)),
    });

    assert({
      given: 'nothing',
      should: 'be done',
      actual: clone.next().done,
      expected: true,
    });
  }

  {
    const clone = gen.clone();

    const customEventPart = {
      title: 'Custom',
      url: 'https://hopin.to',
      icon: 'https://hopin.to/example.svg',
      newWindow: false,
    };
    const streamChatEnabled = false;
    const guestEvent = true;

    const receivedEvent = {
      id: 74,
      name: 'The Best event from 2020',
      start_time: '2020-01-17T10:00:00Z',
      end_time: '2020-01-17T20:00:00Z',
      custom_segment: {
        title: customEventPart.title,
        url: customEventPart.url,
        icon: customEventPart.icon,
        new_window: customEventPart.newWindow,
      },
      stream_chat_enabled: streamChatEnabled,
      guest_event: guestEvent,
    };

    assert({
      given: 'I successfully receive an event with no extra',
      should: 'stores the newly received ID into the Redux store',
      actual: clone.next(receivedEvent).value,
      expected: put(setEvent(receivedEvent)),
    });

    assert({
      given: 'nothing',
      should: 'set the custom event part',
      actual: clone.next().value,
      expected: put(setCustomSegment(customEventPart)),
    });

    assert({
      given: 'nothing',
      should: 'set stream chat enabled',
      actual: clone.next().value,
      expected: put(setStreamChatEnabled(streamChatEnabled)),
    });

    assert({
      given: 'nothing',
      should: 'set guest event',
      actual: clone.next().value,
      expected: put(setGuestEvent(guestEvent)),
    });

    assert({
      given: 'nothing',
      should: 'be done',
      actual: clone.next().done,
      expected: true,
    });
  }

  {
    const clone = gen.clone();

    const giphyEnabled = false;
    const sponsorsInHeader = false;
    const canInviteToVideoCall = false;
    const scheduleMeetings = false;
    const sendMessages = true;
    const myAgendaEnabled = false;
    const customEventPart = {
      title: 'Custom',
      url: 'https://hopin.to',
      icon: 'https://hopin.to/example.svg',
      newWindow: false,
    };
    const streamChatEnabled = false;
    const guestEvent = true;
    const customDomain = {
      appDomain: 'app.awesome.event',
      domain: 'awesome.event',
    };
    const preEventMeetingsEnabled = false;

    const restoreWindowLocationHostname = stubWindowLocationHostname(
      'app.awesome.event',
    );

    const receivedEvent = {
      id: 74,
      name: 'The Best event from 2020',
      start_time: '2020-01-17T10:00:00Z',
      end_time: '2020-01-17T20:00:00Z',
      extra: {
        invite_to_video_call: canInviteToVideoCall,
        send_messages: sendMessages,
        schedule_meetings: scheduleMeetings,
        side_panel_config: MOCK_RECEPTION_SIDE_PANEL_CONFIG,
        my_agenda: myAgendaEnabled,
        giphy_enabled: giphyEnabled,
        schedule_meetings_pre_event: preEventMeetingsEnabled,
        show_sponsors_in_reception_header: sponsorsInHeader,
      },
      custom_segment: {
        title: customEventPart.title,
        url: customEventPart.url,
        icon: customEventPart.icon,
        new_window: customEventPart.newWindow,
      },
      custom_domain: customDomain,
      stream_chat_enabled: streamChatEnabled,
      guest_event: guestEvent,
    };

    assert({
      given: 'I successfully receive an event with a custom event part',
      should: 'stores the newly received ID into the Redux store',
      actual: clone.next(receivedEvent).value,
      expected: put(setEvent(receivedEvent)),
    });

    assert({
      given: 'nothing',
      should: 'set whether you can invite users to video calls',
      actual: clone.next().value,
      expected: put(setCanInviteToCall(canInviteToVideoCall)),
    });

    assert({
      given: 'nothing',
      should: 'set whether schedule meetings is enabled',
      actual: clone.next().value,
      expected: put(setScheduleMeetingsEnabled(scheduleMeetings)),
    });

    assert({
      given: 'nothing',
      should: 'set whether send messages is enabled',
      actual: clone.next().value,
      expected: put(setSendMessagesEnabled(sendMessages)),
    });

    assert({
      given: 'nothing',
      should: 'set whether my agenda is enabled',
      actual: clone.next().value,
      expected: put(setMyAgendaEnabled(myAgendaEnabled)),
    });

    assert({
      given: 'nothing',
      should: 'set whether pre-event meetings are enabled',
      actual: clone.next().value,
      expected: put(setPreEventMeetingsEnabled(preEventMeetingsEnabled)),
    });

    assert({
      given: 'nothing',
      should: 'set the side panel config',
      actual: clone.next().value,
      expected: put(setSidePanelConfig(MOCK_RECEPTION_SIDE_PANEL_CONFIG)),
    });

    assert({
      given: 'nothing',
      should: 'set giphy enabled',
      actual: clone.next().value,
      expected: put(setGiphyEnabled(giphyEnabled)),
    });

    assert({
      given: 'nothing',
      should: 'set sponsors in reception header enabled',
      actual: clone.next().value,
      expected: put(setSponsorsInReceptionHeaderEnabled(sponsorsInHeader)),
    });

    assert({
      given: 'nothing',
      should: 'set the custom event part',
      actual: clone.next().value,
      expected: put(setCustomSegment(customEventPart)),
    });

    assert({
      given: 'nothing',
      should: 'set the custom domain',
      actual: clone.next().value,
      expected: put(setCustomDomain(customDomain)),
    });

    assert({
      given: 'nothing',
      should: 'set stream chat enabled',
      actual: clone.next().value,
      expected: put(setStreamChatEnabled(streamChatEnabled)),
    });

    assert({
      given: 'nothing',
      should: 'set guest event',
      actual: clone.next().value,
      expected: put(setGuestEvent(guestEvent)),
    });

    assert({
      given: 'nothing',
      should: 'be done',
      actual: clone.next().done,
      expected: true,
    });

    restoreWindowLocationHostname();
  }

  {
    const clone = gen.clone();

    const customDomain = {
      domain: 'awesome.event',
      appDomain: 'app.awesome.event',
    };

    const receivedEvent = {
      id: 74,
      name: 'The Best event from 2020',
      start_time: '2020-01-17T10:00:00Z',
      end_time: '2020-01-17T20:00:00Z',
      custom_domain: customDomain,
    };

    const restoreWindowLocationHostname = stubWindowLocationHostname(
      'app.hopin.root',
    );

    assert({
      given: 'I successfully receive an event with no extra',
      should: 'stores the newly received ID into the Redux store',
      actual: clone.next(receivedEvent).value,
      expected: put(setEvent(receivedEvent)),
    });

    assert({
      given: 'nothing',
      should: 'redirect to the customDomain',
      actual: clone.next().value,
      expected: call(redirectToCustomDomain, customDomain, handleRedirect),
    });

    restoreWindowLocationHostname();
  }

  {
    const clone = gen.clone();

    const customDomain = {
      domain: 'awesome.event',
      appDomain: 'app.awesome.event',
    };

    const receivedEvent = {
      id: 74,
      name: 'The Best event from 2020',
      start_time: '2020-01-17T10:00:00Z',
      end_time: '2020-01-17T20:00:00Z',
      custom_domain: customDomain,
      stream_chat_enabled: false,
    };

    // Sets location host to simulate we ARE in a custom domain
    const restoreWindowLocationHostname = stubWindowLocationHostname(
      customDomain.appDomain,
    );
    assert({
      given: 'I successfully receive an event with no extra',
      should: 'stores the newly received ID into the Redux store',
      actual: clone.next(receivedEvent).value,
      expected: put(setEvent(receivedEvent)),
    });

    assert({
      given: 'nothing',
      should: 'not redirect to the customDomain',
      actual: clone.next().value,
      expected: put(setCustomDomain(customDomain)),
    });

    restoreWindowLocationHostname();
  }
});

describe('watch load app saga', async assert => {
  const gen = watchLoadApp();

  assert({
    given: 'saga started',
    should: 'handle the loading of the app',
    actual: gen.next().value,
    expected: takeEvery(loadApp.type, handleLoadApp),
  });
});

describe('handle load segments and stages saga', async assert => {
  const gen = cloneableGenerator(handleSegmentsAndStages)();

  assert({
    given: 'saga started',
    should: 'fetch event segments',
    actual: gen.next().value,
    expected: call(handleFetchEventSegments),
  });

  {
    const error = 'Error loading app.';
    const clone = gen.clone();
    assert({
      given: 'an error',
      should: 'log the error',
      actual: clone.throw(error).value,
      expected: call(logger.error, error, logger.tags.APP_LOADING),
    });

    assert({
      given: 'nothing',
      should: 'be done',
      actual: clone.next().done,
      expected: true,
    });
  }

  assert({
    given: 'segments fetched',
    should: 'fetch stages',
    actual: gen.next().value,
    expected: call(handleFetchStages),
  });

  assert({
    given: 'nothing',
    should: 'be done',
    actual: gen.next().done,
    expected: true,
  });
});

describe('handle load app saga', async assert => {
  const eventSlug = 'test-abc';
  const userDataSegregation = true;
  const showUserRegistrationForm = true;
  const payload = {
    eventSlug: eventSlug,
    userDataSegregation: userDataSegregation,
    showUserRegistrationForm,
  };

  const action = loadApp(payload);
  const gen = cloneableGenerator(handleLoadApp)(action);

  assert({
    given: 'saga started',
    should: 'deslugify the event',
    actual: gen.next().value,
    expected: call(handleDeslugifyEvent, eventSlug),
  });

  assert({
    given: 'slug set',
    should: "fetch the current user's profile",
    actual: gen.next().value,
    expected: call(handleFetchUserProfile, userDataSegregation),
  });

  {
    const clone = gen.clone();

    const error = 'Error loading app.';

    assert({
      given: 'an error',
      should: 'log the error',
      actual: clone.throw(error).value,
      expected: call(logger.error, error, logger.tags.APP_LOADING),
    });

    assert({
      given: 'nothing',
      should: 'be done',
      actual: clone.next().done,
      expected: true,
    });
  }

  assert({
    given: 'nothing',
    should: 'get the user id',
    actual: gen.next().value,
    expected: select(getId),
  });

  const userId = 42;

  assert({
    given: 'the user id',
    should: 'add the id to sentry',
    actual: gen.next(userId).value,
    expected: call(setUserIdInScope, userId),
  });

  assert({
    given: 'nothing',
    should: 'log the app load',
    actual: gen.next().value,
    expected: call(logAppLoad, Router, userId),
  });

  assert({
    given: 'nothing',
    should:
      'fetch the critical event info (blocking calls that delay rendering the app)',
    actual: gen.next().value,
    expected: all([
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
    ]),
  });

  assert({
    given: 'nothing',
    should: 'dispatch an action to start the event timer',
    actual: gen.next().value,
    expected: put(startEventTimer()),
  });

  assert({
    given: 'nothing',
    should: 'dispatch an action to start the heartbeat timer',
    actual: gen.next().value,
    expected: put(startHeartbeatTimer()),
  });

  assert({
    given: 'nothing',
    should:
      'use the getCurrentServerTime selector to get the current server time',
    actual: gen.next().value,
    expected: select(getCurrentServerTime),
  });

  assert({
    given: 'nothing',
    should: 'dispatch an action setting the current time',
    actual: gen.next().value.type,
    expected: put(setCurrentTime('')).type,
  });

  assert({
    given: 'nothing',
    should: 'dispatch an action to signal the app has loaded',
    actual: gen.next().value,
    expected: put(finishedAppLoading()),
  });

  assert({
    given: 'nothing',
    should:
      'fetch the non-critical event info (non-blocking calls that can run after the app is rendered)',
    actual: gen.next().value,
    expected: all([
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
    ]),
  });

  assert({
    given: 'we should show user registration form',
    should: 'call handleFetchEventRegistration',
    actual: gen.next().value,
    expected: call(handleFetchEventRegistration),
  });

  assert({
    given: 'nothing',
    should: 'check if the event has ended',
    actual: gen.next().value,
    expected: select(eventFinished),
  });

  {
    const clone = gen.clone();

    const eventHasEnded = true;
    const modalIsOpen = false;

    assert({
      given: 'event has ended',
      should: 'check if modal is open',
      actual: clone.next(eventHasEnded).value,
      expected: select(getIsOpen),
    });

    assert({
      given: 'event has ended',
      should: 'check if post event survey is disabled',
      actual: clone.next(modalIsOpen).value,
      expected: select(getPostEventSurveyDisabled),
    });

    {
      const eventEndedClone = clone.clone();

      const postEventSurveyDisabled = true;

      assert({
        given: 'post event survey is disabled',
        should: 'be done',
        actual: eventEndedClone.next(postEventSurveyDisabled).done,
        expected: true,
      });
    }

    const postEventSurveyDisabled = false;

    assert({
      given: 'post event survey is not disabled',
      should: 'dispatch an action to initialize the survey',
      actual: clone.next(postEventSurveyDisabled).value,
      expected: put(createInitSurveyAction()),
    });

    assert({
      given: 'nothing',
      should: 'be done',
      actual: clone.next().done,
      expected: true,
    });
  }

  const eventHasEnded = false;

  assert({
    given: 'event is still going',
    should: 'be done',
    actual: gen.next(eventHasEnded).done,
    expected: true,
  });
});
