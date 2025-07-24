import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { PartialGateways } from "@/di/Gateways";
import { rootReducer } from "./rootReducer";

export type Options = {
  gateways?: PartialGateways;
  preloadedState?: Partial<AppState>;
};

export function initStore(options: Options) {
  const config = {
    gateways: options.gateways || ({} as PartialGateways),
  };
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: config,
        },
      }),
  });
}

export type AppStore = ReturnType<typeof initStore>;

export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  { gateways: PartialGateways },
  Action
>;