import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

const LoginRedirect = () => {
  return (
    <>
      <Box className="logo_box">
            <img
              src="/images/logo.png"
              alt="logo"
              width={175}
              height={40}
            ></img>
          </Box>
      <Box 
        sx={{
          textAlign: "center",
          height: "100vh",
          display: "flex",
          flexDirection:"column",
          alignItems: "center",

          justifyContent: "center"
        }}>
        <Typography
          sx={{
            fontSize: "24px",
            color: "#1C1C29",
            marginBottom:"16px"
          }}>
          Please login to view this page</Typography>
        <Link href="/">
          <Button className="standard_cta"
            
          >
            Login
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default LoginRedirect;
