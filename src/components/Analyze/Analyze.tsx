import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { HelmetProvider, Helmet } from "react-helmet-async";
import HeaderNav from "../common/HeaderNav/HeaderNav";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { MRA_BASE_URL } from "../../constants/constants";

const Analyze = () => {
  const drawerWidth = 250;
  const router = useRouter();
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
  //@ts-ignore
  const firebaseUser = useSelector((state) => state?.auth?.firebaseUser);

  const [showIFrame, setIFrame] = useState(false);
  const [showIFrameTitle, setShowIFrameTitle] = useState(false);
  const iFrameLink = `${MRA_BASE_URL}/initiate?programId=${user?.activeProgramId}&userId=${user?.id}&userName=${user?.name}&firebaseId=${firebaseUser?.uid}&email=${user?.email}&token=NA`;
  console.log(iFrameLink, "iframe link"); // TODO Check and add token
  const managerToggleView = useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );
  return (
    <>
      <Box className="align-panel-page">
        <HelmetProvider>
          <Helmet>
            <title>NWORX | Analyze</title>
          </Helmet>
        </HelmetProvider>
        <HeaderNav />
        <Box
          component="main"
          sx={{
            width: { tablet: `calc(100% - ${drawerWidth}px)` },
            ml: { tablet: "auto" },
            marginLeft: "250px",
          }}
        >
          <Box sx={{ backgroundColor: "#EAECEF", padding: "112px 32px 32px" }}>
            <Typography
              variant="h1"
              sx={{ fontWeight: "700", color: "#1C2129", marginBottom: "24px" }}
              className="dash_title"
            >
              Analyze
            </Typography>

            <>
              <Box>
                <iframe
                  style={{ width: "100%", height: "100vh" }}
                  id="frame"
                  src={iFrameLink}
                  name="extrnlCntnt"
                  title="external content"
                ></iframe>
              </Box>
            </>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Analyze;
