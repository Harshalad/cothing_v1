import { Box, Typography, Button } from "@mui/material";
import { Helmet, HelmetProvider } from "react-helmet-async";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { sendEmailVerification } from "@firebase/auth";
//@ts-ignore
import { auth } from "../../../../utils/firebase";
import {
  AUTH_OPTION_TYPES,
  AUTH_STATES,
  AUTH_TAB_TYPES,
} from "../../../../constants/auth";
import sendVerificationEmail from "../../../../actions/auth/sendVerificationEmail";
import { toast } from "react-toastify";

interface EmailVerificationPendingProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  authState: string;
  setAuthState: React.Dispatch<React.SetStateAction<string>>;
  authTab: string;
  setAuthTab: React.Dispatch<React.SetStateAction<string>>;
  authOption: string;
  setAuthOption: React.Dispatch<React.SetStateAction<string>>;
}

const EmailVerificationPending = ({
  email,
  setEmail,
  authState,
  setAuthState,
  authTab,
  setAuthTab,
  authOption,
  setAuthOption,
}: EmailVerificationPendingProps) => {
  const onSignUp = () => {
    setAuthState(AUTH_STATES.SIGNIN);
    setAuthTab(AUTH_TAB_TYPES.EMAIL);
    setAuthOption(AUTH_OPTION_TYPES.EMAIL_SIGN_IN);
  };

  const onBackToSignIn = () => {
    setAuthState(AUTH_STATES.SIGNIN);
    setAuthTab(AUTH_TAB_TYPES.EMAIL);
    setAuthOption(AUTH_OPTION_TYPES.EMAIL_SIGN_IN);
  };

  const resendVerificationEmail = async () => {
    //@ts-ignore
    const user = await auth.currentUser;
    if (user && !user.emailVerified) {
      try {
        await sendVerificationEmail(user);
        toast.success("Email verification email sent successfully!", {
          toastId: "EMAIL_VERIFICATION_SENT_SUCCESS",
        });
        onBackToSignIn();
        console.log("Verification email sent successfully!");
      } catch (err) {
        //@ts-ignore
        if (err?.code === "auth/user-token-expired") {
          toast.error("User Token Expired. Please Sign In Again", {
            toastId: "EMAIL_VERIFICATION_USER_TOKEN_EXPIRED",
          });
        }
        console.log(err);
      }
    }
  };
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Sign-In</title>
        </Helmet>
      </HelmetProvider>
      <Box className="right_inner_box">
        <Box sx={{ textAlign: "center" }}>
          <WarningAmberRoundedIcon
            sx={{ textAlign: "center", fontSize: "50px" }}
            className="warning_icon"
          />
        </Box>
        <Typography
          variant="h2"
          align="center"
          className="email_verify_pending"
          mt="0px"
        >
          Email Verification Pending
        </Typography>
        {authState === AUTH_STATES.SIGNIN && (
          <Typography
            mb="16px"
            align="center"
            sx={{ fontSize: "16px", fontWeight: "400", color: "#5D636B" }}
          >
            Seems like you&apos;re trying to sign in without verifying your
            email first.
          </Typography>
        )}
        <Typography
          className="inner_subtext"
          align="center"
          sx={{ fontSize: "16px", fontWeight: "400", color: "#5D636B" }}
        >
          Verify by clicking the link sent to{" "}
          <span style={{ fontWeight: "600" }}>{email}</span> before signing in.
          <br/>
          <br/>
          <span style={{fontWeight:"600"}}>Please note that it might take a few minutes to receive the verification email.</span>
        </Typography>
        <Button
          variant="contained"
          sx={{
            color: "#FFFFFF",
            backgroundColor: "#F58A43",
            boxShadow: "none",
            "&:hover": { backgroundColor: "#F58A43", boxShadow: "none" },
            textTransform: "capitalize",
            marginBottom: 2,
          }}
          onClick={onBackToSignIn}
        >
          Back to Sign In
        </Button>
        <Button
          variant="contained"
          sx={{
            color: "#FFFFFF",
            backgroundColor: "#F58A43",
            boxShadow: "none",
            "&:hover": { backgroundColor: "#F58A43", boxShadow: "none" },
            textTransform: "capitalize",
          }}
          onClick={resendVerificationEmail}
        >
          Resend Verification Mail
        </Button>
        <Typography
          align="center"
          color="#989EA5"
          sx={{ fontSize: "12px", fontWeight: "400" }}
          className="form_last_block"
          onClick={onSignUp}
        >
          Incorrect email?{" "}
          <span
            style={{ color: "#F58A43", fontWeight: "600", cursor: "pointer" }}
          >
            change email
          </span>
        </Typography>
      </Box>
    </>
  );
};
export default EmailVerificationPending;
