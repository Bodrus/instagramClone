import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {getCurrentUser, AuthUser} from 'aws-amplify/auth';
import {Hub} from 'aws-amplify/utils';

interface UserContextType {
  user: AuthUser | null | undefined;
}

const AuthContext = createContext<UserContextType>({
  user: undefined,
});

interface UserContextProps {
  children: ReactNode;
}

const AuthContextProvider = ({children}: UserContextProps) => {
  const [user, setUser] = useState<AuthUser | null | undefined>(undefined);

  async function checkUser() {
    try {
      const authUser = await getCurrentUser();
      setUser(authUser);
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
      if (payload.event === 'signedIn' || payload.event === 'signInWithRedirect') {
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
