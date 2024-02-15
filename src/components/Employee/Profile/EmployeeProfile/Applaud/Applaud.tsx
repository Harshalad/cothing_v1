import {
  Button,
  Box,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Avatar,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import { createPost } from "../../../../../actions/align/posts/createPost";
import { useSelector } from "react-redux";
import { MANAGER_VIEW_STATE } from "../../../../../constants/auth";
import { toast } from "react-toastify";
import Spinner from "../../../../common/Spinner/Spinner";

const Applaud = ({
  closePopup,
  open,
  employeeData,
  goal,
  onCheckJourneyClick,
}: any) => {
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
  const currentUserRole = useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );
  const [checkInLoading, setCheckInLoading] = useState(false);
  const [category, setCategory] = useState<any>("");
  const [question, setQuestion] = useState<any>("");
  const [messageText, setMessageText] = useState<any>("");
  const onCheckInClick = async () => {
    try {
      setCheckInLoading(true);
      const response = createPost({
        userId: employeeData?.id,
        programId: employeeData?.activeProgramId,
        type: "ACHIEVE",
        userGoalId: goal?.id,
        title: "Test Title",
        text: "This is post text",
        subText: "This is post sub text",
        typeAttributes: {
          type: "APPLAUD_POST",
          messageText,
        },
        postedByUserId: user?.id,
        postedByName: user?.name,
        postedByDesignation: user?.designation,
        postedByRole: currentUserRole,
        postedByEmail: user?.email,
        id: new Date().valueOf().toString(),
        postedToName: employeeData?.name,
        postedToUserId: employeeData?.id,
        postedToRole: 'LP'
      });

      console.log(response);
      toast.success("Applause shared successfully", {
        toastId: "APPLAUSE_SUCCESSFUL",
      });
      closePopup();
      setMessageText("");
    } catch (error) {
      console.log(error);
    } finally {
      setCheckInLoading(false);
    }
  };

  console.log(employeeData);

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
            setMessageText("");
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
          Applaud
        </DialogTitle>
        <DialogContent>
          <article
            className="gdnc-modal-subtxt"
            style={{ width: "85%", margin: "auto" }}
          >
            Share your appreciation with {employeeData?.name}
          </article>
          <Stack className="chckin_emp_dtls">
            <Stack flexDirection="row" gap="24px" alignItems="center">
              <Avatar
                sx={{
                  bgcolor: "#DFFFF2",
                  color: "#1BAD70",
                  fontWeight: "700",
                  border: "1px solid #1BAD70",
                }}
                className="manager_avatar"
              >
                {employeeData?.name?.substring(0, 1)}
              </Avatar>
              <Box textAlign="left">
                <Typography
                  variant="h1"
                  sx={{ fontWeight: "600" }}
                  className="manager_name"
                >
                  {employeeData?.name}
                </Typography>
                <Typography sx={{ fontSize: "12px", margin: "4px 0 0" }}>
                  {employeeData?.designation}
                </Typography>
              </Box>
            </Stack>
            {/* <Box>
                <Link href="/employee-profile-details">
                  <Button
                    sx={{
                      color: "#FFFFFF",
                      backgroundColor: "#F58A43",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "#F58A43",
                        boxShadow: "none",
                      },
                      textTransform: "capitalize",
                      width: "120px !important",
                      padding: "6px 24px !important",
                      fontSize: "12px !important",
                    }}
                  >
                    View Profile
                  </Button>
                </Link>
              </Box> */}
          </Stack>
          <Box mt="24px" mb="32px">
            <article className="subtitle">Goal</article>
            <Typography className="subtxt">
              {goal?.nameAlias ? goal?.nameAlias : goal?.name}
            </Typography>
          </Box>
          <article className="textfield_label">
            Enter your appreciation note here.
          </article>

          <TextField
            multiline
            rows={4}
            id=""
            placeholder="Type a message......"
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
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ margin: "0 auto" }}>
          <Box className="modify-modal-element mar-t50">
            {checkInLoading ? (
              <Spinner />
            ) : (
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
                disabled={!messageText}
                onClick={onCheckInClick}
              >
                Applaud
              </Button>
            )}
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Applaud;
