import { Box, Typography, Button } from "@mui/material";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  AUTH_OPTION_TYPES,
  AUTH_STATES,
  AUTH_TAB_TYPES,
} from "../../../../constants/auth";

const PasswordLink = ({
  email,
  authState,
  setAuthState,
  authTab,
  setAuthTab,
  authOption,
  setAuthOption,
}: any) => {
  const onForgotPassword = () => {
    setAuthState(AUTH_STATES.SIGNIN);
    setAuthTab(AUTH_TAB_TYPES.EMAIL);
    setAuthOption(AUTH_OPTION_TYPES.FORGOT_PASSWORD);
  };

  const onBackToSignIn = () => {
    setAuthState(AUTH_STATES.SIGNIN);
    setAuthTab(AUTH_TAB_TYPES.EMAIL);
    setAuthOption(AUTH_OPTION_TYPES.EMAIL_SIGN_IN);
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Reset Password</title>
        </Helmet>
      </HelmetProvider>
      <Box className="right_inner_box">
        <Typography
          variant="h2"
          align="center"
          className="email_verify_pending"
        >
          Reset your password
        </Typography>
        <Typography
          mb="16px"
          align="center"
          sx={{ fontSize: "16px", fontWeight: "400", color: "#5D636B" }}
        >
          Done! We&apos;ve sent an email with reset password link to{" "}
          <span style={{ fontWeight: "600" }}>{email}</span>.
        </Typography>
        <Typography
          className="inner_subtext"
          align="center"
          sx={{ fontSize: "16px", fontWeight: "400", color: "#5D636B" }}
        >
          Verify by clicking the link before signing in.
        </Typography>
        <Button
          variant="contained"
          sx={{
            color: "#FFFFFF",
            backgroundColor: "#F58A43",
            boxShadow: "none",
            "&:hover": { backgroundColor: "#F58A43", boxShadow: "none" },
            textTransform: "capitalize",
          }}
          onClick={onBackToSignIn}
        >
          Back to Sign In
        </Button>
        <Typography
          align="center"
          color="#989EA5"
          sx={{ fontSize: "12px", fontWeight: "400" }}
          className="form_last_block"
        >
          Incorrect email?{" "}
          <span
            style={{ color: "#F58A43", fontWeight: "600", cursor: "pointer" }}
            onClick={onForgotPassword}
          >
            change email
          </span>
        </Typography>
      </Box>
    </>
  );
};
export default PasswordLink;
