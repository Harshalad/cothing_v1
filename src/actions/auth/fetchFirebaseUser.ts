import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, User } from "firebase/auth";
import { fetchToken } from "./token";

export const fetchFirebaseUser = createAsyncThunk(
  "AUTH/FETCH_FIREBASE_USER",
  async () => {
  // const metadata = await fetchToken();

    return new Promise(async (resolve, reject) => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user !== null) {
          //@ts-ignore TODO check
          console.log(user,"my user");
          //@ts-ignore TODO check
          let id = user.accessToken;
          //@ts-ignore TODO check
          resolve({ firebaseUser: user, idToken: id });
          //   // The user object has basic properties such as display name, email, etc.
          //   const displayName = user.displayName;
          //   const email = user.email;
          //   const photoURL = user.photoURL;
          //   const emailVerified = user.emailVerified;

          // The user's ID, unique to the Firebase project. Do NOT use
          // this value to authenticate with your backend server, if
          // you have one. Use User.getToken() instead.
          //   const uid = user.uid;
        }
      } catch (error) {
        console.log(error, "error fetchFirebaseUser");
        reject(error);
      }
    });
  }
);
