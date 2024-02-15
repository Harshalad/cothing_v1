import { Box, Typography, Button, TextField } from "@mui/material";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";
//@ts-ignore
import { useRouter } from "next/router";
import {
  AUTH_OPTION_TYPES,
  AUTH_STATES,
  AUTH_TAB_TYPES,
} from "../../../../constants/auth";
import { useDispatch } from "react-redux";
import { fetchFirebaseUser } from "../../../../actions/auth/fetchFirebaseUser";
import { fetchNworxUser } from "../../../../actions/auth/fetchNworxUser";
import { toast } from "react-toastify";
import { hulLogin,defultLogin } from "../../../../constants/customLogin";

var finalTime: any;

interface OTPVerifyProps {
  phoneNumber: string;
  authState: string;
  setAuthState: any;
  authTab: string;
  setAuthTab: any;
  authOption: string;
  setAuthOption: any;
  config: any;
}

const OTPVerify = ({
  phoneNumber,
  authState,
  setAuthState,
  authTab,
  setAuthTab,
  authOption,
  setAuthOption,
  config,
}: OTPVerifyProps) => {
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
  const router = useRouter();
  const dispatch = useDispatch();
  const [otpEmpty, setOtpEmpty] = useState(true);
  const [value1, setValue1] = useState();
  const [value2, setValue2] = useState();
  const [value3, setValue3] = useState();
  const [value4, setValue4] = useState();
  const [value5, setValue5] = useState();
  const [value6, setValue6] = useState();

  const timer = document.getElementById("timer");
  const timerText = document.getElementById("timer_text");

  function countdownTimer() {
    clearInterval(finalTime);
    var counter = 0;
    var sec = 5;
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

  const onOTPSignIn = () => {
    setAuthState(AUTH_STATES.SIGNIN);
    setAuthTab(AUTH_TAB_TYPES.PHONE);
    setAuthOption(AUTH_OPTION_TYPES.OTP_SIGN_IN);
  };
  const handleSubmit = async () => {
    //@ts-ignore
    const otp = value1 + value2 + value3 + value4 + value5 + value6;
    try {
      await config.confirm(otp).then((response: any) => {
        console.log(response);
        //@ts-ignore
        dispatch(fetchFirebaseUser());
        if (phoneNumber) {
          //@ts-ignore
          dispatch(fetchNworxUser(phoneNumber));
        }
        router.push("/action-center");
      });
    } catch (err) {
      //@ts-ignore
      if (err?.code === "auth/invalid-verification-code") {
        toast.error("Invalid OTP Entered. Please enter the correct OTP", {
          toastId: "OTPVERIFY_INVALID",
        });
      }
      //@ts-ignore
      if (err?.code === "auth/code-expired") {
        toast.error("OTP Expired. Please try again.", {
          toastId: "OTPVERIFY_EXPIRED",
        });
      }
      console.log(err);
    }
  };
  useEffect(() => {
    clearInterval(finalTime);
    countdownTimer();
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Sign-Up</title>
        </Helmet>
      </HelmetProvider>
      <Box className="right_inner_box">
        <Typography variant="h2" align="center" className="otp_verify">
          OTP Verification
        </Typography>
        <Typography
          className="inner_subtext"
          align="center"
          sx={{ fontSize: "16px", fontWeight: "400", color: "#989EA5" }}
        >
          Enter the OTP sent to{" "}
          <span style={{ fontWeight: "600" }}>+{phoneNumber}</span>
        </Typography>
        <article className="textfield_label">Enter OTP</article>
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
              countdownTimer();
            }}
          >
            Resend OTP
          </span>{" "}
          <span id="timer"></span>
        </Typography>
        <Button
          variant="contained"
          sx={{
            color: "#FFFFFF",
            backgroundColor: loginObj?.buttonColor,
            boxShadow: "none",
            "&:hover": { backgroundColor: loginObj?.buttonColor, boxShadow: "none" },
            textTransform: "capitalize",
          }}
          disabled={otpEmpty ? true : false}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Typography
          align="center"
          color="#989EA5"
          sx={{ fontSize: "12px", fontWeight: "400" }}
          className="form_last_block"
        >
          Entered a wrong number?{" "}
          <span
            style={{ color: loginObj?.buttonColor, fontWeight: "600", cursor: "pointer" }}
            onClick={onOTPSignIn}
          >
            Change mobile number
          </span>
        </Typography>
      </Box>
    </>
  );
};
export default OTPVerify;
