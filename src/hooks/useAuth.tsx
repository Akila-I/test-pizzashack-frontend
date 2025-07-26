import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Define the user interface
interface User {
  first_name: string;
  last_name: string;
  email?: string;
  id?: string;
  // Add other user properties as needed
}

// Define the auth context interface
interface AuthContextType {
  signedIn: boolean;
  user: User | null;
  setSignedIn: (signedIn: boolean) => void;
  setUser: (user: User | null) => void;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const value = {
    signedIn,
    user,
    setSignedIn,
    setUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
