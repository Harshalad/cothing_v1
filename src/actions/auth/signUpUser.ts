import {
  fetchSignInMethodsForEmail,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import sendVerificationEmail from "./sendVerificationEmail";
import { verifyNworxUser } from "./verifyNworxUser";
import { verifyNworxUserCentral } from "./verifyNworxUserCentral";

const signUpUser = async (
  dispatch: any,
  auth: any,
  email: string,
  password: string,
  hostUrl: any
) => {
  try {
    // VERIFY IF THE USER IS REGISTERED TO NWORX
    console.log( hostUrl, "hosturlhosturl" );
    //@ts-ignore
    const isNWORXRegisteredUser = await verifyNworxUserCentral( email, hostUrl )

    //const isNWORXRegisteredUser = await dispatch( verifyNworxUser( email ) );
    console.log( isNWORXRegisteredUser, "isNWORXRegisteredUser" );
    //@ts-ignore
    if ( !isNWORXRegisteredUser?.isVerifiedUser ) {
      return { notRegisteredUser: true };
    }

    const signInMethodsArray = await fetchSignInMethodsForEmail( auth, email );
    console.log( "signInMethodsArray", signInMethodsArray );

    if ( signInMethodsArray?.length ) {
      return { alreadySignedUp: true };
    }
    const signUpResult = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if ( !signUpResult?.user?.emailVerified ) {
      await sendVerificationEmail( signUpResult?.user );
      return { emailVerificationPending: true };
    }
    console.log( "not supposed to reach this part of fn" );
  } catch ( error: any ) {
    console.log( error );
    console.log( "firebase sign up with email and password error", error );
  }
};

export default signUpUser;
