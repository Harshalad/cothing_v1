import { getAuth, SAMLAuthProvider, signInWithPopup } from "firebase/auth";
import { verifyNworxUser } from "./verifyNworxUser";

const provider = new SAMLAuthProvider( 'saml.icici-lombard-identity-provider' );

const signInWithSSO = async () => {
  let auth: any = null;

  if ( typeof window !== "undefined" ) {
    auth = getAuth();

    // Return the promise directly
    try {
      const result = await signInWithPopup( auth, provider );
      console.log( result, "signInWithSSOResult" );
      return result;
    } catch ( error: any ) {
      if ( error.code === "auth/cancelled-popup-request" ) {
        console.error( "Sign-in cancelled by user." );
        // Display a message to the user
      } else {
        console.error( error );
        // Handle other errors
      }
    }
  }
};

export default signInWithSSO;
