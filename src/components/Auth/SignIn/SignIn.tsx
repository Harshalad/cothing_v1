// LIBRARY IMPORTS
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";

import SignInForm from "./SignInForm/SignInForm";
import {
  AUTH_OPTION_TYPES,
  AUTH_STATES,
  AUTH_TAB_TYPES,
} from "../../../constants/auth";
import OTPSignIn from "./OTPSignIn/OTPSignIn";
import MultiFactorAuth from "./MultiFactorAuth/MultiFactorAuth";
import OTPVerify from "./OTPVerify/OTPVerify";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import { Box, Tabs, Tab } from "@mui/material";
import PasswordLink from "./PasswordLink/PasswordLink";

interface SignInProps {
  email: string;
  setEmail: any;
  password: string;
  setPassword: any;
  emailError: string;
  setEmailError: any;
  passwordError: string;
  setPasswordError: any;
  phoneNumber: string;
  setPhoneNumber: any;
  authState: string;
  setAuthState: any;
  authTab: string;
  setAuthTab: any;
  authOption: string;
  setAuthOption: any;
}

const SignIn = ({
  email,
  setEmail,
  password,
  setPassword,
  emailError,
  setEmailError,
  passwordError,
  setPasswordError,
  phoneNumber,
  setPhoneNumber,
  authState,
  setAuthState,
  authTab,
  setAuthTab,
  authOption,
  setAuthOption
}: SignInProps) => {
  // const authSelector = useSelector((state: RootState) => state.auth);

  const [confirmObj, setConfirmObj] = useState(null);
  const [resolver, setResolver] = useState(null);
  const [phoneAuthProvider, setPhoneAuthProvider] = useState(null);
  const [verificationId, setVerificationId] = useState(null);
  const [phoneNumberValidation, setPhoneNumberValidation] = useState(false);
  const [keepMeLoggedInChecked, setKeepMeLoggedInChecked] = useState(false);

  return (
    <>
      {/* {authState === AUTH_STATES.SIGNIN &&
        authTab === AUTH_TAB_TYPES.EMAIL && */}
      {authOption !== AUTH_OPTION_TYPES.MULTI_FACTOR_AUTH &&
        authOption !== AUTH_OPTION_TYPES.FORGOT_PASSWORD && (
          <Box>
            <Box className="tab_box">
              <Tabs value={authTab} centered className="onboarding_tabs">
                <Tab
                  value={AUTH_TAB_TYPES.EMAIL}
                  onClick={() => {
                    setAuthTab(AUTH_TAB_TYPES.EMAIL);
                    if (authState === AUTH_STATES.SIGNIN) {
                      setAuthOption(AUTH_OPTION_TYPES.EMAIL_SIGN_IN);
                    }
                    if (authState === AUTH_STATES.SIGNUP) {
                      setAuthOption(AUTH_OPTION_TYPES.EMAIL_SIGNUP);
                    }
                  }}
                  label="Email"
                />
                <Tab
                  value={AUTH_TAB_TYPES.PHONE}
                  onClick={() => {
                    setAuthTab(AUTH_TAB_TYPES.PHONE);
                    if (authState === AUTH_STATES.SIGNIN) {
                      setAuthOption(AUTH_OPTION_TYPES.OTP_SIGN_IN);
                    }
                    if (authState === AUTH_STATES.SIGNUP) {
                      setAuthOption(AUTH_OPTION_TYPES.OTP_SIGNUP);
                    }
                  }}
                  label="Phone"
                />
              </Tabs>
            </Box>
          </Box>
        )}
      {authState === AUTH_STATES.SIGNIN &&
        authTab === AUTH_TAB_TYPES.EMAIL &&
        authOption === AUTH_OPTION_TYPES.EMAIL_SIGN_IN && (
          <SignInForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
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
            resolver={resolver}
            setResolver={setResolver}
            verficationId={verificationId}
            setVerificationId={setVerificationId}
            setPhoneAuthProvider={setPhoneAuthProvider}
          />
        )}
      {authState === AUTH_STATES.SIGNIN &&
        authTab === AUTH_TAB_TYPES.EMAIL &&
        authOption === AUTH_OPTION_TYPES.FORGOT_PASSWORD && (
          <ForgotPassword
            email={email}
            setEmail={setEmail}
            emailError={emailError}
            setEmailError={setEmailError}
            setAuthOption={setAuthOption}
          />
        )}
      {authState === AUTH_STATES.SIGNIN &&
        authTab === AUTH_TAB_TYPES.EMAIL &&
        authOption === AUTH_OPTION_TYPES.PASSWORD_LINK && (
          <PasswordLink
            email={email}
            authState={authState}
            setAuthState={setAuthState}
            authTab={authTab}
            setAuthTab={setAuthTab}
            authOption={authOption}
            setAuthOption={setAuthOption}
          />
        )}
      {authState === AUTH_STATES.SIGNIN &&
        authTab === AUTH_TAB_TYPES.PHONE &&
        authOption === AUTH_OPTION_TYPES.OTP_SIGN_IN && (
          <OTPSignIn
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            authState={authState}
            setAuthState={setAuthState}
            authTab={authTab}
            setAuthTab={setAuthTab}
            authOption={authOption}
            setAuthOption={setAuthOption}
            phoneNumberValidation={phoneNumberValidation}
            setPhoneNumberValidation={setPhoneNumberValidation}
            setConfirmObj={setConfirmObj}
          />
        )}
      {authState === AUTH_STATES.SIGNIN &&
        authTab === AUTH_TAB_TYPES.PHONE &&
        authOption === AUTH_OPTION_TYPES.OTP_VERIFICATION && (
          <OTPVerify
            phoneNumber={phoneNumber}
            authState={authState}
            setAuthState={setAuthState}
            authTab={authTab}
            setAuthTab={setAuthTab}
            authOption={authOption}
            setAuthOption={setAuthOption}
            config={confirmObj}
          />
        )}
      {authState === AUTH_STATES.SIGNIN &&
        authOption === AUTH_OPTION_TYPES.MULTI_FACTOR_AUTH && (
          <MultiFactorAuth
            email={email}
            phoneNumber={phoneNumber}
            authState={authState}
            setAuthState={setAuthState}
            authTab={authTab}
            setAuthTab={setAuthTab}
            authOption={authOption}
            setAuthOption={setAuthOption}
            resolver={resolver}
            phoneAuthProvider={phoneAuthProvider}
            setPhoneAuthProvider={setPhoneAuthProvider}
            verificationId={verificationId}
            setVerificationId={setVerificationId}
          />
        )}
    </>
  );
};
export default SignIn;
