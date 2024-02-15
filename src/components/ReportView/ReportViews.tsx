import { Box, Link, Stack, Typography } from "@mui/material";
import { Helmet, HelmetProvider } from "react-helmet-async";
import HeaderNav from "../common/HeaderNav/HeaderNav";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import ReportView from "../../zustand/ReportView";
import { useRouter } from "next/router";

const drawerWidth = 250;

const ReportViews = () => {
  const router = useRouter();
  const { selectedReport, setSelectedReport } = ReportView();
  console.log( selectedReport, "adityaSelecteded" );
  return (
    <>
      <Box>
        <HelmetProvider>
          <Helmet>
            <title>NWORX | Report View</title>
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
          <Box
            sx={ { backgroundColor: "#FFFFFF", padding: "112px 32px 32px" } }
            className="analyze_mra"
          >
            <Typography
              //@ts-ignore
              variant="span"
              sx={ {
                fontWeight: "500",
                color: "#2D3648",
                marginBottom: "24px",
                cursor: "pointer",
              } }
              className="go_back_flex"
              onClick={ () => { router.push( { pathname: "/reports" } ) } }
            >
              <ChevronLeftIcon /> Go Back
            </Typography>
            <Stack className="report_view_hdr_flx">
              <Typography className="report_view_name">
                { selectedReport?.reportTitle }
              </Typography>
              { selectedReport?.downloadable && selectedReport?.filePath && <Stack className="report_dwld_flx">
                <DownloadRoundedIcon sx={ { color: "#2E5DB0" } } />
                <Link className="report_dwld_txt" href={ selectedReport?.filePath ? selectedReport?.filePath : "#" }>Download</Link>
              </Stack> }
            </Stack>
            <Box sx={ { marginBottom: "32px" } }>

              {/* <iframe
                  style={{ width: "100%", height: "68vh" }}
                  id="frame"
                  src={selectedReport?.htmlForWeb}
                  name="extrnlCntnt"
                  title="external content"
                ></iframe> */}
              <div dangerouslySetInnerHTML={ { __html: selectedReport?.htmlForWeb ? selectedReport?.htmlForWeb : "" } } />

            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default ReportViews;
