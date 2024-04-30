import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {getCurrentUser, AuthUser} from 'aws-amplify/auth';
import {Hub} from 'aws-amplify/utils';

const AuthContext = createContext<UserContextState>({
  user: null,
});

interface UserContextProps {
  children: ReactNode;
}

interface UserContextState {
  user: AuthUser | null | undefined;
}

const AuthContextProvider = ({children}: UserContextProps) => {
  const [user, setUser] = useState<AuthUser | null | undefined>(undefined);

  async function checkUser() {
    try {
      const data = await getCurrentUser();
      setUser(data);
    } catch (err) {
      console.log(err);
      setUser(null);
      return null;
    }
  }
  useEffect(() => {
    const hubListenerCancel = Hub.listen('auth', data => {
      const {payload} = data;

      if (payload.event === 'signedOut') {
        setUser(null);
      }
      if (payload.event === 'signedIn') {
        checkUser();
      }
    });
    return () => hubListenerCancel();
  }, []);

  useEffect(() => {
    checkUser();
  }, []);

  return <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
