import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { toast } from "react-toastify";

const ShareCertificate = ({open, closeModal,url}: any) => {
  const handleLinkedInShare = () => {
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`
    window.open(linkedInShareUrl, '_blank');
    closeModal(false);
  };
  const handleCopyLink = () => {

    navigator.clipboard.writeText(url)
      .then(() => {
        toast.success('URL copied to clipboard');
      })
      .catch((err) => {
        console.error('Unable to copy URL to clipboard', err);
       
      });
      closeModal(false);
  };
  
  return (
    <>
      <Box>
        <Dialog
          className="share_certificate_modal"
          open={open}
          sx={{ textAlign: "center", padding: "30px" }}
        >
          <CloseIcon
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              zIndex: "1",
              cursor: "pointer",
            }}
            onClick={() => {
              closeModal(false)
            }}
          />
          <DialogTitle
            sx={{
              color: "#1C2129",
              fontWeight: "700",
              fontSize: "31px",
              padding: "0 0 0px 0",
              marginBottom: "8px",
            }}
          >
            Share Certificate
          </DialogTitle>
          <DialogContent>
            <Typography className="title">Share your certificate with your friends</Typography>
            <Stack className="share_copy_flex">
              <Link href={""}>
                <Box className="share_copy_container" onClick={handleLinkedInShare} >
                  <Box>
                    <img src="../images/icons/linkedin.png" alt="linkedin" width="32px" height="32px"></img>
                  </Box>
                  <Typography className="share_copy_text">LinkedIn</Typography>
                </Box>
              </Link>
              <Box className="share_copy_container" onClick={handleCopyLink}>
                <Box>
                  <img src="../images/icons/copy-link.svg" alt="linkedin" width="32px" height="32px"></img>
                </Box>
                <Typography className="share_copy_text">Copy Link</Typography>
              </Box>
            </Stack>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};
export default ShareCertificate;