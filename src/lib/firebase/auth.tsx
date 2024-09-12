
import {
    type User,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged as _onAuthStateChanged,
    signInWithEmailAndPassword 
  } from 'firebase/auth';
  
  import { auth } from './config';

  
  export function onAuthStateChanged(callback: (authUser: User | null) => void) {
    return _onAuthStateChanged(auth, callback);
  }
  
  export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
  
    try {
      const result = await signInWithPopup(auth, provider);
  
      if (!result || !result.user) {
        throw new Error('Google sign in failed');
      }
      return result.user.uid;
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  }

  export async function signInWithEmail(email : string, password : string) {
   
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      console.log(result)
      if (!result || !result.user) {
        throw new Error('Email/Password sign in failed');
      }
      return result.user.uid;
    } catch (error) {
      console.error('Email/Password signing in with Google', error);
    }
  }

  export async function signOut() {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out', error);
    }
  }