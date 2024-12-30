# Reducer & Saga - Pattern Summary

Descriptions/ explanations of the different elements that are part of the "Redux
Pattern" used in the symbol-trainer-redux feature.

_Note: A full Redux setup would be overkill for this app, so I replicated the
pattern with `createReducer` (see `useSagaReducer` in `reducer.js`) and
`createContext` (see `SymbolTrainerContext` in `symbol-trainer-redux-page`)_

---

## reducer.js

### Action Creators

Action creators create action objects that can be dispatched from anywhere in
the app. On dispatch an action can trigger switch cases in the reducer (which
acts as a store) or effects in sagas. For pure operations they target the
reducer and for operations with side-effects they target sagas, which are
middleware of the reducer.

The naming of action creators is descriptive of the user interaction that
triggers them to be dispatched. This is helpful for debugging. If an action
creator is not clearly named like a user interaction it might be an action that
only gets dispatched from a saga.

### Case Handler Helper Functions

Helper functions that are mounted in the reducer to either handle multiple
actions that require the same handler behaviour, or to keep the switch cases
clean from complex logic.

### Initial State + Reducer + Saga Mount

`initialState` sets the default values of your store and defines its data shape.

**Reducer:** The action handlers in the switch cases return new store objects
created from the previous store state and new values, usually coming from the
payload. 

`type` and `payload` get destructured so we can avoid repeatedly
writing out `action.payload`. To enable destructuring even if only one of the
keys is available, we set an empty object as the default for the action object.
This way JS won't throw an error when a key or the whole action object is
missing.

**Saga Mount**
```js
/**
 * Custom setup function to mount the reducer with an initial state and (saga)
 * middleware.
 *
 * @remarks
 * - `createReducer` uses `useReducer` under the hood.
 * - Mounted in `symbol-trainer-redux-page`. 
 *
 * @param saga - The root saga containing the sagas you want to chain with the
 * reducer.
 * @param reducer - The reducer you want to use.
 * @param initialState - The initial state for the reducer.
 * @returns An object with access to the state returned by the reducer and the
 * dispatch function that dispatches actions to the middleware and the reducer.
 */
export const useSagaReducer = (saga, reducer, initialState) => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];

  const middlewareReducer = createReducer(...middleware);
  const [state, dispatch] = middlewareReducer(reducer, initialState);
  sagaMiddleware.run(saga);

  return { state, dispatch };
};
```


### Selectors

Selectors are pure functions that access values from the store and localStorage
(in this case provided via `useContext`). They always only handle one step of
property access at a time, building on top of each others access logic by
composing them together. 

This way, if the data shape changes, you only have to modify the selector
corresponding to the changed step and not the whole access chain. 

Selectors can also **calculate** "secondary values" from the values returned by
other selectors. This way we can directly access the final values we want to
inject in the components.


```js
// direct accessing values from the reducer state
export const selectStartTime = state => state.startTime;

const selectEndTime = state => state.endTime;

// composing "direct accessing" selectors and calculating new values 
// from them, which don't neccessarily have to be stored in state
export const selectCurrentWpm = state => {
  const endTime = selectEndTime(state);
  const startTime = selectStartTime(state);

  if (!endTime || endTime <= startTime) {
    return '00';
  }

  const winTime = endTime - startTime;
  const wordsPerString = selectLevelString(state).length / 5;
  const winTimesPerMinuteRatio = 60_000 / winTime;

  return Math.round(wordsPerString * winTimesPerMinuteRatio);
};
```

---

## sagas.js

The main purpose of Sagas here is to isolate side effects, to make them more
testable and to keep the core logic in the reducer and selectors pure. Here the
main side effects are:

- calling `getTime`, because given the same input, it creates different outputs
- writing TO localStorage, because this is manipulation of an external variable
- reading FROM localStorage, because with `localStorage.getItem()` we are
  calling a method on an external object, which is different than plain property
  access on the store object
- `yield delay()` and the dispatches dependent on it, because time-dependency
  can lead to unexpected behaviour
- importing a file, because file reading is asynchronous and thereby
  time-dependent, importing also includes writing TO an external variable
- triggering a download, because this is directly influencing system behaviour
  external of the function


