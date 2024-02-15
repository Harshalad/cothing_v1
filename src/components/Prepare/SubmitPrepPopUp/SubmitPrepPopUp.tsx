import {
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const SubmitPrepPopUp = ({
  closePrepPopup,
  openPrepPopup,
  openQuestionnairePopup,
}: any) => {
  const goNextGoal = () => {};

  return (
    <>
      <Dialog
        className="prep_popup_modal"
        open={openPrepPopup.showPrepPopup}
        sx={{ textAlign: "center" }}
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
            closePrepPopup(false);
          }}
        />
        <Box className="prep_popup_cntn">
          <DialogTitle id="title">
            <img
              //@ts-ignore
              src={
                openPrepPopup.prepPopupName === "success"
                  ? "/images/prep-success.png"
                  : "/images/prep-incomplete.png"
              }
              alt="preparation completed"
              width={291}
              height={181}
            />
          </DialogTitle>
          <DialogContent>
            <Typography className="sbmt_prep_popup_title">
              {openPrepPopup.prepPopupName === "success"
                ? "Congratulations!!"
                : "Oops!!"}
            </Typography>
            <article className="gdnc-modal-subtxt" style={{ margin: "auto" }}>
              {openPrepPopup.prepPopupName === "success"
                ? "You have successfully completed your preparation"
                : "Looks like you still have some preparation incomplete"}
              {openPrepPopup.prepPopupName === "incomplete" ? (
                <Typography className="prep_incomp_section_title">
                  2. So now What
                </Typography>
              ) : (
                ""
              )}
            </article>
          </DialogContent>
          <DialogActions sx={{ margin: "0 auto" }}>
            <Box className="modify-modal-element mar-t50">
              <Stack className="sbmt_prep_flex">
                <Button
                  variant="contained"
                  sx={{
                    border: "1px solid #F58A43",
                    width: "max-content",
                    color: "#F58A43",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "transparent",
                      boxShadow: "none",
                    },
                    textTransform: "none",
                  }}
                >
                  {openPrepPopup.prepPopupName === "success"
                    ? "Go to goal page"
                    : "Ask anyway"}
                </Button>
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
                  onClick={() => {
                    openPrepPopup.prepPopupName === "success"
                      ? goNextGoal()
                      : closePrepPopup(false);
                    openQuestionnairePopup(true);
                  }}
                >
                  {openPrepPopup.prepPopupName === "success"
                    ? "Move to next milestone"
                    : "Complete Prepration"}
                </Button>
              </Stack>
            </Box>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};
export default SubmitPrepPopUp;
