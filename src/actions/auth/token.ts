import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

//@ts-ignore
let token = null;
//@ts-ignore
let tokenExpiry = null;

let app = null;
let auth = null;
let user: any = null;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
app = initializeApp( firebaseConfig );
auth = getAuth( app );

// Use an observer to watch for changes in the authentication state
onAuthStateChanged( auth, ( userAuth ) => {
  user = userAuth;
} );


export const resetToken = () => {
  token = null;
  tokenExpiry = null;
};

export const getToken = async () => {
  // Wait for the authentication state to be available
  while ( !user ) {
    await new Promise( resolve => setTimeout( resolve, 100 ) ); // wait for 100 milliseconds
  }

  //@ts-ignore
  if ( !token || ( tokenExpiry && Date.now() > Number( tokenExpiry ) ) ) {
    try {
      // Get the user token
      token = await user?.getIdToken( true );
      tokenExpiry = ( Date.now() + 3000000 ).toString();

      console.log( "Token refreshed:", token );
      console.log( "Token expiry:", tokenExpiry );
    } catch ( error ) {
      console.log( "Error generating token:", error );
      // Handle error, maybe throw an exception or return a default token
      throw error;
    }
  }

  //@ts-ignore
  console.log( token, "token here" );
  let bearerToken = {
    //@ts-ignore
    Authorization: "Bearer " + token,
    "X-Request-Time": new Date().toString(),
    // 'Strict-Transport-Security': "max-age=3571000; includeSubDomains; preload"
  };
  return bearerToken;
};

export const fetchToken = async () => {
  try {
    const retrievedToken = await getToken();
    return retrievedToken;
  } catch ( error ) {
    console.log( "Error fetching token:", error );
    // Handle error, maybe retry or show a user-friendly message
    throw error;
  }
};
