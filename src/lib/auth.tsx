import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

const TOKEN_KEY = "savecat_admin_token";

type AuthContextValue = {
  token: string | null;
  setToken: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextValue>({
  token: null,
  setToken: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    setTokenState(localStorage.getItem(TOKEN_KEY));
  }, []);

  const setToken = (value: string | null) => {
    if (value) {
      localStorage.setItem(TOKEN_KEY, value);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
    setTokenState(value);
  };

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAdminToken() {
  return useContext(AuthContext);
}
