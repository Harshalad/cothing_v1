import { useState ,useRef} from "react";
import { Box, Stack, Button, Typography } from "@mui/material";
import { Helmet, HelmetProvider } from "react-helmet-async";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier } from "firebase/auth";
//@ts-ignore
import { auth } from "../../../../utils/firebase";
import { signInWithPhoneNumber } from "firebase/auth";
import { useEffect } from "react";
import { VerifyNworxUserServiceClient } from "../../../../constants/proto/verifyUser/verify-nworx-user_grpc_web_pb";
//@ts-ignore
import { VerifyNworxUserRequest } from "../../../../constants/proto/verifyUser/verify-nworx-user_pb";
import { Container } from "@mui/system";
import {
  AUTH_OPTION_TYPES,
  AUTH_STATES,
  AUTH_TAB_TYPES,
} from "../../../../constants/auth";
import { hulLogin,defultLogin } from "../../../../constants/customLogin";

interface OTPSignInProps {
  phoneNumber: string;
  setPhoneNumber: any;
  authState: string;
  setAuthState: any;
  authTab: string;
  setAuthTab: any;
  authOption: string;
  setAuthOption: any;
  phoneNumberValidation: any;
  setPhoneNumberValidation: any;
  setConfirmObj: any;
}


const OTPSignIn = ({
  phoneNumber,
  setPhoneNumber,
  authState,
  setAuthState,
  authTab,
  setAuthTab,
  authOption,
  setAuthOption,
  phoneNumberValidation,
  setPhoneNumberValidation,
  setConfirmObj,
}: OTPSignInProps) => {
  const[loginObj, setLoginObj]=useState<any>(null);
  const hostUrl = window.location.host;

  const [hul, setHul] = useState(hostUrl.includes("stag"));
  useEffect(() => {
    if (hul) {
      setLoginObj(hulLogin);
    } else {
      setLoginObj(defultLogin);
    }
  }, [hul])
  const [check, setCheck] = useState(false);
  const [validatePhoneNumber, setValidatePhoneNumber] = useState(false);

  const [showSendOTP, setShowSendOTP] = useState(true);

  const buttonRef = useRef(null);

  //@ts-ignore
  useEffect(() => {
    //@ts-ignore
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        //@ts-ignore
        buttonRef.current.click();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const onSignUp = () => {
    setAuthState(AUTH_STATES.SIGNUP);
    setAuthTab(AUTH_TAB_TYPES.EMAIL);
    setAuthOption(AUTH_OPTION_TYPES.EMAIL_SIGNUP);
  };

  const validateNumber = (value: any, data: any) => {
    var onlyPhoneNumber = value.slice(data.dialCode.length);
    if (onlyPhoneNumber !== "") {
      setPhoneNumberValidation(true);
    } else {
      setPhoneNumberValidation(false);
    }
    if (data.countryCode === "in") {
      if (onlyPhoneNumber.length === 10) {
        setPhoneNumberValidation(true);
      } else {
        setPhoneNumberValidation(false);
      }
    } else {
    }
    var elem = document.getElementById("phone_number");
    if (elem) {
      elem.focus();
    }
    setPhoneNumber(value);
  };
  const setUpRecaptha = () => {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      //@ts-ignore
      auth
    );
    recaptchaVerifier.render();
    //@ts-ignore
    return signInWithPhoneNumber(auth, "+" + phoneNumber, recaptchaVerifier);
  };
  const verifyNumber = async () => {
    const request = new VerifyNworxUserRequest();
    request.setAppname("nworx_user_app");
    request.setEmailmobile(phoneNumber);
    const client = new VerifyNworxUserServiceClient(
      "https://envoy-proxy-ji7zjwsata-uc.a.run.app",
      null,
      null
    ).verifyNworxUser(request, {}, (err, response) => {
      try {
        const isVerifiedUser = response.array[0];
        const isMFAEnabled = response.array[1];
        const mobileNumber = response.array[2];
        console.log(response);
        if (isVerifiedUser && isVerifiedUser === true) {
          setValidatePhoneNumber(true);
          setCheck(true);
          if (isMFAEnabled === true) {
            //enable mfa
          }
        } else {
          alert("Phone number not verified from nworx api");
        }
      } catch (e) {
        console.log(err);
      }
    });
  };

  const showCaptcha = async () => {
    try {
      const response = await setUpRecaptha();
      console.log(response);
      setConfirmObj(response);
    } catch (error) {
      console.log(phoneNumber);
      console.log(error);
    }

    onOTPVerify();
  };

  const onOTPVerify = () => {
    setAuthState(AUTH_STATES.SIGNIN);
    setAuthTab(AUTH_TAB_TYPES.PHONE);
    setAuthOption(AUTH_OPTION_TYPES.OTP_VERIFICATION);
  };

  const handleSendOtp = async (e: any) => {
    e.preventDefault();
    setShowSendOTP(false);
    await verifyNumber();
  };

  useEffect(() => {
    if (check === true) {
      setCheck(false);
      if (validatePhoneNumber === true) {
        setCheck(false);
        showCaptcha();
      } else {
        alert("Your Number is not verified from nworx");
      }
    }
  }, [check]);
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Sign-In</title>
        </Helmet>
      </HelmetProvider>
      <Box className="right_inner_box">
        <article className="textfield_label">Phone Number</article>
        <Stack direction="row" spacing={1} className="otp_input_textfield">
          <PhoneInput
            country={"in"}
            value={phoneNumber}
            onChange={validateNumber}
            enableSearch={true}
            countryCodeEditable={false}
            placeholder={"Enter Phone Number"}
            inputProps={{
              id: "phone_number",
            }}
          />
        </Stack>
        <Container id="recaptcha-container" />
        {showSendOTP ? (
          <Button
          ref={buttonRef} 
            variant="contained"
            sx={{
              color: "#FFFFFF",
              backgroundColor: loginObj?.buttonColor,
              boxShadow: "none",
              "&:hover": { backgroundColor: loginObj?.buttonColor, boxShadow: "none" },
              textTransform: "capitalize",
              marginTop: "16px",
            }}
            disabled={phoneNumberValidation ? false : true}
            onClick={handleSendOtp}
          >
            Send OTP
          </Button>
        ) : null}
        <Typography
          align="center"
          color="#989EA5"
          sx={{ fontSize: "12px", fontWeight: "400" }}
          className="form_last_block"
        >
          First time here?{" "}
          <span
            style={{ color: loginObj?.buttonColor, fontWeight: "600", cursor: "pointer" }}
            onClick={onSignUp}
          >
            Sign Up
          </span>
        </Typography>
      </Box>
    </>
  );
};
export default OTPSignIn;
