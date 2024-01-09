export interface AuthInterface {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  refreshAuthContext: () => void;
  logout: () => void;
}
