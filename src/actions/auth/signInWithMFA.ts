import {
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  sendEmailVerification,
} from "firebase/auth";
import { fetchNworxUser } from "./fetchNworxUser";
import { fetchFirebaseUser } from "./fetchFirebaseUser";

const signInWithMFA = async (
  dispatch: any,
  otp: string,
  email: string,
  verificationId: any,
  resolver: any
) => {
  try {
    const cred = PhoneAuthProvider.credential(verificationId, otp);
    const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);
    const response = await resolver.resolveSignIn(multiFactorAssertion);

    console.log(response, "resolver response");

    if (!response?.user?.emailVerified) {
      await sendEmailVerification(response?.user);
      console.log("Verification email sent successfully!");
      return { emailVerificationPending: true };
    }

    if (response?.user?.emailVerified) {
      dispatch(fetchNworxUser(email));
      dispatch(fetchFirebaseUser());
      return { signInSuccessful: true };
    }
  } catch (error) {
    console.log(error);
    //@ts-ignore
    if (error.code === "auth/invalid-verification-code") {
      return { invalidOTP: true };
    }
    //@ts-ignore
    if (error.code === "auth/code-expired") {
      return { codeExpired: true };
    }
  }
};

export default signInWithMFA;
