"use client";

import { Provider } from "react-redux";
import { store } from "./index";
import AppInitializer from "./AppInitializer";

interface ReduxProviderProps {
  children: React.ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <AppInitializer>{children}</AppInitializer>
    </Provider>
  );
}
