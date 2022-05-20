import {
  createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, updateEmail, updateProfile, User
} from "firebase/auth";

type UserProfile = {
  displayName?: string | null | undefined;
  photoURL?: string | null | undefined;
}

type PromiseCallbacks = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

type AuthStateChangedCallback = {
  hasSession?: (user: User) => void;
  noSession?: () => void;
}

export type AccountLoginCredentials = {
  email: string;
  password: string;
}

export interface AccountRegisterCredentials extends AccountLoginCredentials {
  confirmPassword: string;
}

interface LoginWithEmailAndPasswordCredentials extends PromiseCallbacks {
  email: string;
  password: string;
}

interface ForgotPasswordProps extends PromiseCallbacks {
  email: string;
}

export default class AccountManager {
  public static async getUserProfile() {
    return getAuth().currentUser;
  }
  public static async isUserLoggedIn() {
    return AccountManager.getUserProfile() !== null;
  }
  public static async hasSession(callback: (user: User) => void) {
    if(await AccountManager.isUserLoggedIn()) {
      callback(await AccountManager.getUserProfile() as User);
    }
  }
  public static async hasNoSession(callback: () => void) {
    if(!await AccountManager.isUserLoggedIn()) {
      callback();
    }
  }
  public static loginWithEmailAndPassword(props: LoginWithEmailAndPasswordCredentials) {
    signInWithEmailAndPassword(
      getAuth(), 
      props.email, 
      props.password
    )
    .then(props.onSuccess)
    .catch(props.onError);
  }
  public static forgotPassword({
    email,
    onSuccess,
    onError
  }: ForgotPasswordProps) {
    sendPasswordResetEmail(
      getAuth(), 
      email
    )
    .then(() => {
      onSuccess && onSuccess();
    })
    .catch((error) => {
      onError && onError(error);
    });
  }
  public static userSignOut() {
    getAuth().signOut();
  }
  public static handleAuthStateChanged({
    hasSession = (user) => {},
    noSession = () => {}
  }: AuthStateChangedCallback) {
    getAuth().onAuthStateChanged(user => user ? hasSession(user) : noSession());
  }
  public static async updateUserProfileWithCredentials({
    displayName,
    photoURL,
    onSuccess,
    onError
  }: UserProfile & PromiseCallbacks) {
    
    const currentUser = await AccountManager.getUserProfile();

    if(currentUser) {

      const updatedDisplayName = displayName || currentUser.displayName;
      const updatedPhotoURL = photoURL || currentUser.photoURL;

      updateProfile(currentUser, {
        displayName: updatedDisplayName,
        photoURL: updatedPhotoURL
      })
      .then(onSuccess)
      .catch(onError);
    }
  }
  
  public static async updateUserEmail({
    email,
    onSuccess,
    onError
  } : { email: string } & PromiseCallbacks) {
    
    const currentUser = await AccountManager.getUserProfile();
    
    if(currentUser) {
      return updateEmail(currentUser, email)
      .then(onSuccess)
      .catch(onError);
    }

  }
  public static createUserWithEmailAndPassword({
    email,
    password,
    onSuccess,
    onError
  } : { email: string, password: string } & PromiseCallbacks) {
    
    return createUserWithEmailAndPassword(getAuth(), email, password)
    .then(onSuccess)
    .catch(onError);
  }
}