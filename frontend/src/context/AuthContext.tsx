import { createContext, useContext, useEffect, useState, type ReactNode, } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

// Raw state tracking the user's auth status
interface AuthState {
  user: User | null;       
  session: Session | null; 
  loading: boolean;       
}

// The full context value, including state and auth methods
interface AuthContextType extends AuthState {
  signUp: (
    email: string,
    password: string,
    meta: { first_name?: string; last_name?: string; username: string }
  ) => Promise<{ needsConfirmation: boolean }>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

// Create the AuthContext with an undefined default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// The AuthProvider component that wraps the app and provides auth state/methods
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
  });

  useEffect(() => {
    
    // Check if there's an active session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState({
        user: session?.user ?? null, // If session exists, set user; otherwise null
        session,                     // Store the session (or null)
        loading: false,              // Done loading
      });
    });

    // Listen for auth state changes (sign in, sign out, token refresh, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState((prev) => ({
        ...prev,                       // Keep existing state (spread operator)
        user: session?.user ?? null,   // Update user from new session
        session,                       // Update session
      }));
    });

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, []); // Empty array = run only once on mount

  // Sign up with email and password, plus optional metadata (e.g. username)
  const signUp = async (
    email: string,
    password: string,
    meta: { first_name?: string; last_name?: string; username: string }
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: meta },
    });

    if (error) throw error;

    // If email confirmation is ON, Supabase won't create a session yet —
    // the user has to click the link in their email first.
    const needsConfirmation = !data.session;
    return { needsConfirmation };
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  // Sign out the current user
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  // Provide the auth state and methods to children components
  return (
    <AuthContext.Provider value={{ ...state, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to easily access the AuthContext in components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within <AuthProvider>");
  return context;
}