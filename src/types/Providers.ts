import { FunctionComponent, ReactNode } from "react";

export interface ProviderProps {
  Component: FunctionComponent<any>;
  name: string;
  config?: Record<string, any>;
}

export interface ProviderFunction {
  children: ReactNode;
}

export interface ResolvedProvider {
  Providers: (props: ProviderFunction) => ReactNode;
  setProviders: Function;
}
