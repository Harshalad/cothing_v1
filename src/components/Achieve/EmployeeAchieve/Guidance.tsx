import {
  Button,
  Box,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
const managerIcon = "/images/manager-icon.svg";
const expertIcon = "/images/expert-icon.svg";
const askexpertIcon = "/images/expert.png";
const askmanagerIcon = "/images/manager.png";

const Guidance = ({ closePopup, open }: any) => {
  const [showManagerTime, setShowManagerTime] = useState(false);
  const [showExpertGuidance, setExpertGuidance] = useState(false);
  const [showGudExptPopUp, setGudExptPopUp] = useState(false);

  const addManagerGuidance = () => {
    closePopup(false);
    setGudExptPopUp(true);
    setExpertGuidance(false);
    setShowManagerTime(true);
  };

  const addExpertGuidance = () => {
    closePopup(false);
    setGudExptPopUp(true);
    setShowManagerTime(false);
    setExpertGuidance(true);
  };

  return (
    <>
      <Box>
        <Dialog open={open} sx={{ textAlign: "center", padding: "30px" }}>
          <CloseIcon
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              zIndex: "1",
              cursor: "pointer",
            }}
            onClick={() => {
              closePopup(false);
            }}
          />
          <DialogTitle
            id="title"
            sx={{
              color: "#252525",
              fontWeight: "700",
              fontSize: { mobile: "18px", tablet: "31px" },
              padding: "0 0 0px 0",
            }}
          >
            Guidance
          </DialogTitle>
          <DialogContent>
            <Box className="modal-guidance-holder">
              <Box
                className="guidance-modal-box"
                onClick={() => {
                  addManagerGuidance();
                }}
              >
                <Box className="gdnce-modal-img">
                  <img src={managerIcon} alt="manager" width="100%" />
                </Box>
                <article className="gdnc-modal-headtxt">Manager</article>
                <article className="gdnc-modal-subtxt">
                  Do you need guidance from your manager?
                </article>
              </Box>
              <Box
                className="guidance-modal-box"
                onClick={() => {
                  addExpertGuidance();
                }}
              >
                <Box className="gdnce-modal-img">
                  <img src={expertIcon} alt="manager" width="100%" />
                </Box>
                <article className="gdnc-modal-headtxt">NWORX Expert</article>
                <article className="gdnc-modal-subtxt">
                  Do you need guidance from our NWORX Expert?
                </article>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
        <Dialog
          className="manager-time-modal"
          open={showGudExptPopUp}
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
              setGudExptPopUp(false);
            }}
          />
          <DialogTitle
            id="title"
            sx={{
              color: "#252525",
              fontWeight: "700",
              fontSize: { mobile: "18px", tablet: "31px" },
              padding: "0 0 0px 0",
            }}
          >
            Save your {showManagerTime ? "Manager's" : "Expert's"} Time
          </DialogTitle>
          <DialogContent>
            <article
              className="gdnc-modal-subtxt"
              style={{ width: "85%", margin: "auto" }}
            >
              Try to save their time by being more specific about your goal
              clarity area
            </article>
            <article className="textfield_label txt-left mar-t50">
              Write the area for Clarity
            </article>
            <TextField
              id=""
              placeholder="Enter Goal Title"
              variant="outlined"
              size="small"
              fullWidth
              defaultValue="Vision Understanding"
              inputProps={{
                sx: {
                  fontSize: "16px",
                  color: "#3E4248",
                  fontWeight: "500",
                },
              }}
              sx={{ marginBottom: "24px" }}
            />
            <article className="textfield_label txt-left">
              Write your question for your Area Clarity
            </article>
            <TextField
              multiline
              rows={4}
              id=""
              defaultValue="I don't not understand how this is impacting the company Mission & Vision..."
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{
                sx: {
                  fontSize: "16px",
                  color: "#3E4248",
                  fontWeight: "500",
                },
              }}
              InputProps={{ sx: { padding: "0" } }}
            />
          </DialogContent>
          <DialogActions sx={{ margin: "0 auto" }}>
            <Box className="modify-modal-element mar-t50">
              <Button
                variant="contained"
                sx={{
                  width: "max-content",
                  color: "#FFFFFF",
                  backgroundColor: "#F58A43",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#F58A43",
                    boxShadow: "none",
                  },
                  textTransform: "none",
                }}
              >
                Notify this to {showManagerTime ? "Manager" : "Expert"}
              </Button>
              {showManagerTime ? (
                <Box
                  className="ask-expert-btn"
                  onClick={() => {
                    addExpertGuidance();
                  }}
                >
                  <img
                    //@ts-ignore
                    src={askexpertIcon}
                    width={24}
                    height={24}
                    alt="expert guidance"
                  />
                  <Typography>Ask Expert</Typography>
                </Box>
              ) : (
                <Box
                  className="ask-expert-btn"
                  onClick={() => {
                    addManagerGuidance();
                  }}
                >
                  <img
                    //@ts-ignore
                    src={askmanagerIcon}
                    width={24}
                    height={24}
                    alt="manager guidance"
                  />
                  <Typography>Ask Manager</Typography>
                </Box>
              )}
            </Box>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};
export default Guidance;
