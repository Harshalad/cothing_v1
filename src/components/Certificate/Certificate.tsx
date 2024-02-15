import { useState } from "react";
import {
  Box, Link, Stack, Typography
} from "@mui/material";
import { HelmetProvider, Helmet } from "react-helmet-async";
import HeaderNav from "../common/HeaderNav/HeaderNav";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ShareCertificate from "./ShareCertificate";
import ReportView from "../../zustand/ReportView";
import { useRouter } from "next/router";

const drawerWidth = 250;

const Certificate = () => {
  const { selectedReport, setSelectedReport } = ReportView();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  console.log(selectedReport, "dsjdwsdkbf");
  const closeModal = (value: any) => {
    setOpen(value);
  }
  const getDate = (d: any) => {
    const date = new Date(d);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'pm' : 'am';

    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
  };
  const handleDownload= (link:any)=>{
    window.open(link)
  }

  return (
    <>
      <Box className="certificate_section">
        <HelmetProvider>
          <Helmet>
            <title>NWORX | Certificate</title>
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
          <Box
            sx={{ backgroundColor: "#EAECEF", padding: "112px 32px 32px" }}
            className="certificate_container"
          >
            <Typography
              //@ts-ignore
              variant="span"
              sx={{
                fontWeight: "500",
                color: "#2D3648",
                marginBottom: "24px",
                cursor: "pointer",
              }}
              className="go_back_flex"
              onClick={() => { router.push({ pathname: "/reports" }) }}
            >
              <ChevronLeftIcon /> Go Back
            </Typography>
            <Typography className="certificate_title">
              {selectedReport?.programName}
            </Typography>
            <Stack className="certificate_flex">
              <Box className="certificate_image_container">
                <img src={selectedReport?.filePath} alt="certificate" width="100%" height="auto" />
              </Box>
              <Box className="certificate_content_container">
                <Box className="certificate_details_container">
                  <Typography className="certificate_name">{selectedReport?.reportTitle}</Typography>
                  <Typography className="certificate_program_name">{selectedReport?.programName}</Typography>
                  <Typography className="certificate_issued_date">Issued on {getDate(selectedReport?.regDateTime)}</Typography>
                </Box>
                <Box className="certificate_share_container"onClick={() => setOpen(true)}>
                  <Stack className="certificate_share_flex">
                    <Typography className="certificate_share_text" >Share Certificate</Typography>
                    <ShareOutlinedIcon sx={{ color: "#FFFFFF" }} />
                  </Stack>
                </Box>
                <Box className="certificate_download_container" onClick={()=> handleDownload(selectedReport?.reportURL)}>
                  <Stack className="certificate_download_flex">
                    <Link className="certificate_download_text" href={selectedReport?.reportURL}>Download Certificate</Link>
                    <FileDownloadOutlinedIcon sx={{ color: "#F58A43" }} />
                  </Stack>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
      <ShareCertificate open={open} closeModal={closeModal} url={selectedReport?.filePath} />
    </>
  );
};
export default Certificate;
