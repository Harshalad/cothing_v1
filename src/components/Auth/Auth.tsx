import { useEffect, useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import {
  AUTH_STATES,
  AUTH_TAB_TYPES,
  AUTH_OPTION_TYPES,
} from "../../constants/auth";

import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import { useRouter } from "next/router";
import { defultLogin, hulLogin } from "../../constants/customLogin";

const Auth = () => {

  const hostUrl = window.location.host.toLowerCase();
  // TAB STATE
  const [authState, setAuthState] = useState(AUTH_STATES.SIGNIN);
  const [authTab, setAuthTab] = useState(AUTH_TAB_TYPES.EMAIL);
  const [authOption, setAuthOption] = useState(AUTH_OPTION_TYPES.EMAIL_SIGN_IN);
  const [loginObj, setLoginObj] = useState<any>(null);
  const [hul,setHul] = useState(hostUrl.includes("hul"));
    // VARIABLES STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  useEffect(()=>{
    if(hul){
      setLoginObj(hulLogin);
    }else{
      setLoginObj(defultLogin);
    }
  },[hul])
  console.log(loginObj,"adityaloginobj");
  return (
    <>
      <Stack direction="row" spacing={0} className="flex_card">
        <Box className={loginObj?.cardClass}>
          <Box className="logo_box">
            <img
              src="/images/logo.png"
              alt="logo"
              width={175}
              height={40}
            ></img>
          </Box>

          <Box className="hero_box">
            <img src= {loginObj?.imgUrl} alt="hero"/>
          </Box>
        </Box>
        <Box className="right_card">
          <Box className="typo_box">
            <Typography variant="h1" align="center" className="h1_typo">
            {loginObj?.title}
            </Typography>
            <Typography variant="h3" align="center" className="h3_typo">
            {loginObj?.description}
            </Typography>
          </Box>

          <Box>
            {authState === AUTH_STATES.SIGNIN && (
              <SignIn
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                emailError={emailError}
                setEmailError={setEmailError}
                passwordError={passwordError}
                setPasswordError={setPasswordError}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                authState={authState}
                setAuthState={setAuthState}
                authTab={authTab}
                setAuthTab={setAuthTab}
                authOption={authOption}
                setAuthOption={setAuthOption}
              />
            )}
            {authState === AUTH_STATES.SIGNUP && (
              <SignUp
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
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                authState={authState}
                setAuthState={setAuthState}
                authTab={authTab}
                setAuthTab={setAuthTab}
                authOption={authOption}
                setAuthOption={setAuthOption}
              />
            )}
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default Auth;
