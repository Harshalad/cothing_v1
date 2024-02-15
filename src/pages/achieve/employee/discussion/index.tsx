import { Box, Link, Stack, Typography } from "@mui/material";
import { Helmet, HelmetProvider } from "react-helmet-async";
import HeaderNav from "../../../../components/common/HeaderNav/HeaderNav";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import VerifyNworx from "../../../../zustand/HostNameUrl";
import { useEffect } from "react";
import { verifyNworxUserCentral } from "../../../../actions/auth/verifyNworxUserCentral";
import { useSelector } from "react-redux";
import setHostUrl from "../../../../constants/setHostUrl";
import PrivacyPolicy from "../../../../components/PrivacyPolicy/PrivacyPolicy";

const drawerWidth = 250;

const AchieveEmployeeDiscussion = () => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  setHostUrl( user );
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Act & Achieve Discussion</title>
        </Helmet>
      </HelmetProvider>
      <HeaderNav />
      <Box
        component="main"
        sx={ {
          width: { tablet: `calc(100% - ${ drawerWidth }px)` },
          ml: { tablet: "auto" },
          marginLeft: "250px",
        } }
      >
        <Box sx={ { backgroundColor: "#EAECEF", padding: "112px 32px 32px" } }>
          <Box className="mngralgn_askquest_back">
            <Link href="/achieve">
              <Typography sx={ { fontWeight: "500", color: "#2D3648", marginBottom: "24px" } } className="go_back_flex">
                <ChevronLeftIcon /> Go Back
              </Typography>
            </Link>
          </Box>
          <Stack className="achieve_flex" flexDirection="row" gap="2%">
            <Box className="achieve_right_box">

            </Box>
            <Box className="achieve_left_box">

            </Box>
          </Stack>
        </Box>
      </Box>
      <PrivacyPolicy user={ user } />
    </>
  );
}
export default AchieveEmployeeDiscussion;