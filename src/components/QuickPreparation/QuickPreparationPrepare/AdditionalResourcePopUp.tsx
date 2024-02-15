import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Link,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { fetchConceptPrimerByContentId } from "../../../actions/achieve/fetchConceptPrimerByContentId";



const AdditinalResoucePopUp = ({
  closePopup,
  open,
  additionalResource,
}: any) => {
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);

  const openLink = async (conceptPrimerId:any) => {
    const response: any = await fetchConceptPrimerByContentId({
      contentId: conceptPrimerId,
      userId: user?.id,
      programId: user?.activeProgramId,
      goalId:"ar",
      methodTitle:"NA"
    });
    console.log(response,"conceptPrimer LINK");
    if (response?.openNewTab?.toLowerCase() === "yes") {
      window.open(response?.contentLink, "_blank");
      closePopup(false);
      return;
    }
  };
  return (
    <>
      <Dialog
        className="manager-time-modal checkin_modal"
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
          Learning Resources
        </DialogTitle>
        <DialogContent>
          {additionalResource &&
            additionalResource.map((x: any, index: any) => {
              return (
                <Box
                  className="additionalResource"
                  key={index}
                  onClick={() => openLink(x.conceptPrimerId)}
                >
                  <Box className="review_msg_box new_msg">
                    <Typography className="review_msg">
                      {x.conceptPrimerName}
                    </Typography>
                  </Box>
                  <Divider className="review_msg_divider" />
                </Box>
              );
            })}
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AdditinalResoucePopUp;
