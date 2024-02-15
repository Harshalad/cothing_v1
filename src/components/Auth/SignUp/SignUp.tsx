import Link from "next/link";
import { useState } from "react";
import {
  AUTH_OPTION_TYPES,
  AUTH_STATES,
  AUTH_TAB_TYPES,
} from "../../../constants/auth";
import SignupForm from "./SignUpForm/SignUpForm";
import EmailVerificationPending from "./EmailVerificationPending/EmailVerificationPending";

const Signup = ({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  emailError,
  setEmailError,
  passwordError,
  setPasswordError,
  authState,
  setAuthState,
  authTab,
  setAuthTab,
  authOption,
  setAuthOption,
}: any) => {
  return (
    <>
      {authState === AUTH_STATES.SIGNUP &&
        authTab === AUTH_TAB_TYPES.EMAIL &&
        authOption === AUTH_OPTION_TYPES.EMAIL_SIGNUP && (
          <SignupForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            emailError={emailError}
            setEmailError={setEmailError}
            passwordError={passwordError}
            setPasswordError={setPasswordError}
            authState={authState}
            setAuthState={setAuthState}
            authTab={authTab}
            setAuthTab={setAuthTab}
            authOption={authOption}
            setAuthOption={setAuthOption}
          />
        )}
      {authState === AUTH_STATES.SIGNUP &&
        authTab === AUTH_TAB_TYPES.EMAIL &&
        authOption === AUTH_OPTION_TYPES.EMAIL_VERIFICATION_PENDING && (
          <EmailVerificationPending
            email={email}
            setEmail={setEmail}
            authState={authState}
            setAuthState={setAuthState}
            authTab={authTab}
            setAuthTab={setAuthTab}
            authOption={authOption}
            setAuthOption={setAuthOption}
          />
        )}
    </>
  );
};
export default Signup;
