import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {getCurrentUser, AuthUser} from 'aws-amplify/auth';
import {Hub} from 'aws-amplify/utils';
import {CognitoUser} from 'amazon-cognito-identity-js';

interface UserContextType {
  user: AuthUser | null | undefined;
  userId: string;
}

type UserType = AuthUser | null | undefined;

const AuthContext = createContext<UserContextType>({
  user: undefined,
  userId: '',
});

interface UserContextProps {
  children: ReactNode;
}

const AuthContextProvider = ({children}: UserContextProps) => {
  const [user, setUser] = useState<UserType>(undefined);

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
      if (
        payload.event === 'signedIn' ||
        payload.event === 'signInWithRedirect'
      ) {
        checkUser();
      }
    });
    return () => hubListenerCancel();
  }, []);

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{user, userId: user?.userId}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
