import { Box, Typography, Button, TextField, Tooltip } from "@mui/material";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect, useState ,useRef} from "react";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { PhoneMultiFactorGenerator, PhoneAuthProvider } from "@firebase/auth";
import { useRouter } from "next/router";
import {
  AUTH_OPTION_TYPES,
  AUTH_STATES,
  AUTH_TAB_TYPES,
} from "../../../../constants/auth";
import signInWithMFA from "../../../../actions/auth/signInWithMFA";
import { toast } from "react-toastify";
import Spinner from "../../../common/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import resendOTP from "../../../../actions/auth/resendOTP";
import {
  fetchNworxUser,
  getNworxUser,
} from "../../../../actions/auth/fetchNworxUser";
import { hulLogin,defultLogin } from "../../../../constants/customLogin";

var finalTime: any;

interface MultiFactorAuthProps {
  email: string;
  phoneNumber: string;
  authState: string;
  setAuthState: any;
  authTab: string;
  setAuthTab: any;
  authOption: string;
  setAuthOption: any;
  resolver: any;
  phoneAuthProvider: any;
  setPhoneAuthProvider: any;
  verificationId: any;
  setVerificationId: any;
}

const MultiFactorAuth = ({
  email,
  authState,
  setAuthState,
  authTab,
  setAuthTab,
  authOption,
  setAuthOption,
  resolver,
  phoneAuthProvider,
  setPhoneAuthProvider,
  verificationId,
  setVerificationId,
}: MultiFactorAuthProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [otpEmpty, setOtpEmpty] = useState(true);
  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState();
  const [value2, setValue2] = useState();
  const [value3, setValue3] = useState();
  const [value4, setValue4] = useState();
  const [value5, setValue5] = useState();
  const [value6, setValue6] = useState();
  const [signInLoading, setSignInLoading] = useState(false);
  const buttonRef = useRef(null);

  //@ts-ignore
  const nWorxUser = useSelector((state) => state?.auth?.nWorxUser);

  const onViewEmailVerificationPending = () => {
    setAuthState(AUTH_STATES.SIGNUP);
    setAuthTab(AUTH_TAB_TYPES.EMAIL);
    setAuthOption(AUTH_OPTION_TYPES.EMAIL_VERIFICATION_PENDING);
  };

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

  const onResendOTP = async () => {
    try {
      const response = await resendOTP(setVerificationId, setPhoneAuthProvider);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const timer = document.getElementById("timer");
  const timerText = document.getElementById("timer_text");
  function countdownTimer() {
    clearInterval(finalTime);
    var counter = 0;
    var sec = 60;
    if (timer) {
      timer.innerHTML = `in ${sec}s`;
    }
    if (timerText) {
      timerText.style.color = "#989EA5";
      timerText.style.pointerEvents = "none";
    }
    finalTime = setInterval(function () {
      sec = --sec;

      if (sec === 0) {
        counter = ++counter;
      }

      if (counter === 1) {
        sec = 0;
        clearInterval(finalTime);
        if (timer && timerText) {
          timer.innerHTML = "";
          timerText.style.color = loginObj?.buttonColor;
          timerText.style.pointerEvents = "visible";
        }
      }

      if (sec < 10 && sec > 0) {
        if (timer) {
          timer.innerHTML = `in 0${sec}s`;
        }
      } else if (counter < 1) {
        if (timer) {
          timer.innerHTML = `in ${sec}s`;
        }
      }
    }, 1000);
  }

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

  function isNumberKey(elmnt: any) {
    if (
      isNaN(elmnt.key) &&
      elmnt.key !== "Backspace" &&
      elmnt.key !== "Delete" &&
      elmnt.key !== "Tab" &&
      elmnt.key !== "ArrowLeft" &&
      elmnt.key !== "ArrowRight"
    ) {
      elmnt.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  const focusNextPrevElm = (elmnt: any) => {
    if (elmnt.key === "Backspace" || elmnt.key === "ArrowLeft") {
      const clickedId = elmnt.target.id;
      const prev = parseInt(clickedId) - 1;
      if (prev > 0) {
        //@ts-ignore
        document.getElementById(prev).focus();
      }
    } else {
      if (!isNaN(elmnt.key) || elmnt.key === "ArrowRight") {
        const clickedId = elmnt.target.id;
        const next = parseInt(clickedId) + 1;
        if (next < 7) {
          //@ts-ignore
          document.getElementById(next).focus();
        }
      }
    }

    var elements = document.getElementsByClassName("otp");
    var otp_empty = false;
    for (let i = 0; i < elements.length; i++) {
      //@ts-ignore
      if (elements[i].value.length === 0) {
        otp_empty = true;
      }
    }
    setOtpEmpty(otp_empty);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleSignIn = async () => {
    try {
      //@ts-ignore
      setSignInLoading(true);
      //@ts-ignore
      const otp = value1 + value2 + value3 + value4 + value5 + value6;
      console.log(phoneAuthProvider);
      const response = await signInWithMFA(
        dispatch,
        otp,
        email,
        verificationId,
        resolver
      );
      if (response?.invalidOTP) {
        toast.error("Invalid OTP Entered. Please try again.", {
          toastId: "MFA_INVALID_OTP",
        });
        setSignInLoading(false);
        return;
      }
      if (response?.codeExpired) {
        toast.error("OTP Expired. Please try again.", {
          toastId: "MFA_OTP_EXPIRED",
        });
        setSignInLoading(false);
        return;
      }

      if (response?.emailVerificationPending) {
        onViewEmailVerificationPending();
      }
      //@ts-ignore
      if (response?.signInSuccessful) {
        //@ts-ignore
        const nWorxUserResponse: any = await getNworxUser(email);
        setSignInLoading(false);

        if (nWorxUserResponse?.nWorxUser) {
          if (!nWorxUserResponse?.nWorxUser?.onboarded) {
            router.push("/onboarding");
            return;
          }
          if (
            nWorxUserResponse?.nWorxUser?.onboarded &&
            nWorxUserResponse?.nWorxUser?.showGoalOverview
          ) {
            router.push("/goal/overview");
            return;
          }

          if (!nWorxUserResponse?.nWorxUser?.showGoalOverview) {
            router.push("/action-center");
            return;
          }
        }
      }

      setSignInLoading(false);

      console.log(response);
    } catch (error) {
      console.log(error);
      setSignInLoading(false);
    }
  };
  useEffect(() => {
    clearInterval(finalTime);
    countdownTimer();
  }, []);

  const onEmailSignIn = () => {
    setAuthState(AUTH_STATES.SIGNIN);
    setAuthTab(AUTH_TAB_TYPES.EMAIL);
    setAuthOption(AUTH_OPTION_TYPES.EMAIL_SIGN_IN);
  };
  //@ts-ignore
  const phoneNumber = useSelector((state) => state?.auth?.phoneNumber);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Sign-Up</title>
        </Helmet>
      </HelmetProvider>
      <Box className="right_inner_box" sx={{ position: "relative" }}>
        <Typography variant="h2" align="center" className="otp_verify">
          OTP Verification
        </Typography>
        <Typography
          className="inner_subtext"
          ml="auto"
          mr="auto"
          align="center"
          sx={{
            fontSize: "16px",
            fontWeight: "400",
            color: "#989EA5",
            maxWidth: "325px",
          }}
        >
          Enter the OTP sent to{" "}
          <span style={{ fontWeight: "600" }}>+{phoneNumber}</span> for Multi
          Factor Authorization
        </Typography>
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <Tooltip
            open={open}
            onClose={handleTooltipClose}
            title="If phone number displayed is incorrect please reach out to your point of contact or support@nworx.ai"
            arrow
            disableTouchListener
            placement="bottom-end"
          >
            <img
              src="/images/tooltip.png"
              alt="tooltip"
              width={22}
              height={22}
              style={{ cursor: "pointer" }}
              onClick={handleTooltipOpen}
              onMouseEnter={handleTooltipOpen}
              className="tooltip"
            />
          </Tooltip>
        </ClickAwayListener>
        <article className="textfield_label" style={{ marginBottom: "15px" }}>
          Enter OTP
        </article>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          onKeyDown={(e) => isNumberKey(e)}
          onKeyUp={(e) => focusNextPrevElm(e)}
          inputProps={{ maxLength: 1, className: "otp" }}
          sx={{ margin: "0 5px" }}
          className="otp_textfield"
          id="1"
          value={value1}
          //@ts-ignore
          onChange={(e) => setValue1(e.target.value)}
        ></TextField>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          onKeyDown={(e) => isNumberKey(e)}
          onKeyUp={(e) => focusNextPrevElm(e)}
          inputProps={{ maxLength: 1, className: "otp" }}
          sx={{ margin: "0 5px" }}
          className="otp_textfield"
          id="2"
          value={value2}
          //@ts-ignore
          onChange={(e) => setValue2(e.target.value)}
        ></TextField>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          onKeyDown={(e) => isNumberKey(e)}
          onKeyUp={(e) => focusNextPrevElm(e)}
          inputProps={{ maxLength: 1, className: "otp" }}
          sx={{ margin: "0 5px" }}
          className="otp_textfield"
          id="3"
          value={value3}
          //@ts-ignore
          onChange={(e) => setValue3(e.target.value)}
        ></TextField>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          onKeyDown={(e) => isNumberKey(e)}
          onKeyUp={(e) => focusNextPrevElm(e)}
          inputProps={{ maxLength: 1, className: "otp" }}
          sx={{ margin: "0 5px" }}
          className="otp_textfield"
          id="4"
          value={value4}
          //@ts-ignore
          onChange={(e) => setValue4(e.target.value)}
        ></TextField>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          onKeyDown={(e) => isNumberKey(e)}
          onKeyUp={(e) => focusNextPrevElm(e)}
          inputProps={{ maxLength: 1, className: "otp" }}
          sx={{ margin: "0 5px" }}
          className="otp_textfield"
          id="5"
          value={value5}
          //@ts-ignore
          onChange={(e) => setValue5(e.target.value)}
        ></TextField>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          onKeyDown={(e) => isNumberKey(e)}
          onKeyUp={(e) => focusNextPrevElm(e)}
          inputProps={{ maxLength: 1, className: "otp" }}
          sx={{ margin: "0 5px" }}
          className="otp_textfield"
          id="6"
          value={value6}
          //@ts-ignore
          onChange={(e) => setValue6(e.target.value)}
        ></TextField>
        <Typography
          color="#989EA5"
          align="center"
          sx={{ fontSize: "12px", fontWeight: "600" }}
          className="otp_resend_block"
        >
          <span
            id="timer_text"
            style={{
              cursor: "pointer",
              pointerEvents: "none",
              color: "#989EA5",
            }}
            onClick={() => {
              onResendOTP();
              countdownTimer();
            }}
          >
            Resend OTP
          </span>{" "}
          <span id="timer"></span>
        </Typography>
        {signInLoading ? (
          <Spinner />
        ) : (
          <Button
          ref={buttonRef}
            variant="contained"
            sx={{
              color: "#FFFFFF",
              backgroundColor: loginObj?.buttonColor,
              boxShadow: "none",
              "&:hover": { backgroundColor: loginObj?.buttonColor, boxShadow: "none" },
              textTransform: "capitalize",
            }}
            disabled={otpEmpty === true ? true : false}
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        )}
        <Typography
          align="center"
          color="#989EA5"
          sx={{ fontSize: "12px", fontWeight: "400" }}
          className="form_last_block"
        >
          <span
            style={{ color: loginObj?.buttonColor, fontWeight: "600", cursor: "pointer" }}
            onClick={onEmailSignIn}
          >
            Back to email sign in
          </span>
        </Typography>
      </Box>
    </>
  );
};
export default MultiFactorAuth;
