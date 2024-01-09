import { useReducer, useMemo } from "react";

import {
  ProviderFunction,
  ProviderProps,
  ResolvedProvider,
} from "@/types/Providers";

function reducer(
  state: Array<ProviderProps>,
  payload: { action: string; provider: ProviderProps }
) {
  const { provider, action } = payload;

  switch (action) {
    case "add":
      const alreadyExistProvider = state.some(
        (currentProvider) => currentProvider.name === provider.name
      );

      return alreadyExistProvider ? state : [...state, provider];
    case "modify":
      const NewState = state.map((currentProvider) => {
        if (currentProvider.name !== provider.name) return currentProvider;

        return {
          config: { ...currentProvider.config, ...provider?.config },
          Component: provider?.Component || currentProvider?.Component,
          name: provider.name,
        };
      });

      return NewState;
    default:
      return state;
  }
}

export function useProviders(
  initialProviders: Array<ProviderProps>
): ResolvedProvider {
  const [providers, setProviders] = useReducer(reducer, initialProviders || []);

  const ProvidersComponent = useMemo(
    () =>
      ({ children }: ProviderFunction) =>
        providers.reduceRight(
          (child, { Component, config = {} }) => (
            <Component {...config}>{child}</Component>
          ),
          children
        ),
    [providers]
  );

  return { Providers: ProvidersComponent, setProviders };
}
