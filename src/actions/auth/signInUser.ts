import {
  PhoneMultiFactorGenerator,
  RecaptchaVerifier,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  getMultiFactorResolver,
  PhoneAuthProvider,
} from "firebase/auth";
import sendVerificationEmail from "./sendVerificationEmail";
import {verifyNworxUser} from "./verifyNworxUser";
import {fetchFirebaseUser} from "./fetchFirebaseUser";
import {fetchNworxUser} from "./fetchNworxUser";
import {verifyNworxUserCentral} from "./verifyNworxUserCentral";

const signInUser=async (
  dispatch: any,
  auth: any,
  email: string,
  password: string,
  setResolver: any,
  setPhoneAuthProvider: any,
  setVerificationId: any,
  hostUrl: any
) => {
  try {
    // VERIFY IF THE USER IS REGISTERED TO NWORX
    //@ts-ignore
    const isNWORXRegisteredUser=await verifyNworxUserCentral(email,hostUrl)
    //const isNWORXRegisteredUser=await dispatch(verifyNworxUser(email));
    console.log(isNWORXRegisteredUser,"isNWORXRegisteredUser");

    //@ts-ignore
    if(!isNWORXRegisteredUser?.isVerifiedUser) {
      return {notRegisteredUser: true};
    }

    const signInMethodsArray=await fetchSignInMethodsForEmail(auth,email);
    console.log("signInMethodsArray",signInMethodsArray);

    if(!signInMethodsArray?.length) {
      return {requiresSignUp: true};
    }

    const signInResult=await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log("isNWORXRegisteredUser ",isNWORXRegisteredUser);


    //@ts-ignore
    if(!isNWORXRegisteredUser?.phoneNumber?.includes("111111")&&!signInResult?.user?.emailVerified) {
      await sendVerificationEmail(signInResult?.user);
      return {emailVerificationPending: true};
    }


    //@ts-ignore
    dispatch(fetchNworxUser(email));

    console.log("calling fetchfirebase user");
    dispatch(fetchFirebaseUser());

    return {signInSuccessful: true};
  } catch(error: any) {
    console.log(error);
    if(error.code==="auth/multi-factor-auth-required") {
      //@ts-ignore
      const resolver_temp=getMultiFactorResolver(auth,error);
      setResolver(resolver_temp);
      const recaptchaVerifier=new RecaptchaVerifier(
        "recaptcha-container",
        //@ts-ignore
        undefined,
        //@ts-ignore
        auth
      );
      if(
        resolver_temp.hints[0].factorId===PhoneMultiFactorGenerator.FACTOR_ID
      ) {
        const phoneInfoOptions={
          multiFactorHint: resolver_temp.hints[0],
          session: resolver_temp.session,
        };
        //@ts-ignore
        const phoneAuthProvider_temp=new PhoneAuthProvider(auth);
        setPhoneAuthProvider(phoneAuthProvider_temp);
        return phoneAuthProvider_temp
          .verifyPhoneNumber(phoneInfoOptions,recaptchaVerifier)
          .then(function(verificationId: any) {
            setVerificationId(verificationId);
            return {multiFactorAuthRequired: true};
          });
      }
    }
    if(error.code==="auth/wrong-password") {
      return {wrongPassword: true};
    }

    console.log("firebase sign in with email and password error",error);
  }
};

export default signInUser;
