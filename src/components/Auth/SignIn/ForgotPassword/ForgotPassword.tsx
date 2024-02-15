import { useEffect, useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { sendPasswordResetEmail } from "firebase/auth";
//@ts-ignore
import { auth } from "../../../../utils/firebase";
import { validateEmail } from "../../validations";
import { AUTH_OPTION_TYPES } from "../../../../constants/auth";
import Spinner from "../../../common/Spinner/Spinner";
import { checkIfNworxUser } from "../../../../actions/auth/verifyNworxUser";
import { toast } from "react-toastify";
import { hulLogin,defultLogin } from "../../../../constants/customLogin";

const ForgotPassword = ({
  email,
  setEmail,
  emailError,
  setEmailError,
  setAuthOption,
}: any) => {
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
  const [requestResetLinkLoading, setRequestResetLinkLoading] = useState(false);
  const handleResetLink = async (e: any) => {
    try {
      setRequestResetLinkLoading(true);
      e.preventDefault();

      const nWorxUserResponse = await checkIfNworxUser(email);
      //@ts-ignore
      if (!nWorxUserResponse?.isVerifiedUser) {
        toast.error("Invalid email ID, This email is not registered with us.", {
          toastId: "FORGOT_PASSWORD_NOT_REGISTERED_EMAIL",
        });
        setRequestResetLinkLoading(false);
        return;
      }
      //@ts-ignore
      const res = await sendPasswordResetEmail(auth, email);
      console.log(res, " forgot password res");
      setAuthOption(AUTH_OPTION_TYPES.PASSWORD_LINK);
    } catch (err) {
      setRequestResetLinkLoading(false);
      console.log(err);
    }
  };

  const onBackToSignIn = () => {
    setAuthOption(AUTH_OPTION_TYPES.EMAIL_SIGN_IN);
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Forgot Password</title>
        </Helmet>
      </HelmetProvider>
      <Box className="right_inner_box">
        <Typography variant="h2" align="center" className="forgot_password">
          Forgot your password
        </Typography>
        <Typography
          className="inner_subtext"
          align="center"
          sx={{ fontSize: "16px", fontWeight: "400", color: "#989EA5" }}
        >
          Enter the email address associated with your account and we&apos;ll
          send you a link to reset your password
        </Typography>
        <article className="textfield_label">Email Address</article>
        <TextField
          id="emailid"
          placeholder="Enter your mail id"
          variant="outlined"
          size="small"
          fullWidth
          inputProps={{
            sx: { color: "#3E4248", fontWeight: "500" },
          }}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail({
              email: e.target.value,
              emailError,
              setEmailError,
            });
          }}
          helperText={emailError === true ? "Invalid Email Address" : ""}
          className="input_textfield"
        />
        {requestResetLinkLoading ? (
          <Spinner />
        ) : (
          <Button
            variant="contained"
            sx={{
              color: "#FFFFFF",
              backgroundColor: loginObj?.buttonColor,
              boxShadow: "none",
              "&:hover": { backgroundColor: loginObj?.buttonColor, boxShadow: "none" },
              textTransform: "capitalize",
            }}
            disabled={email && emailError === false ? false : true}
            onClick={handleResetLink}
          >
            Request Reset Link
          </Button>
        )}
        <div onClick={onBackToSignIn}>
          <Typography
            align="center"
            mt="8px"
            color="#989EA5"
            sx={{ fontSize: "12px", fontWeight: "400" }}
            className="form_last_block"
          >
            <span
              style={{ color: loginObj?.buttonColor, fontWeight: "600", cursor: "pointer" }}
            >
              Back to Sign In
            </span>
          </Typography>
        </div>
      </Box>
    </>
  );
};
export default ForgotPassword;
