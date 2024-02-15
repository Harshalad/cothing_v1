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

const CheckIn = ({
  closePopup,
  open,
  employeeData,
  goal,
  onCheckJourneyClick,
}: any) => {
  const CHECK_IN_CATEGORIES = ["Progress", "Insights", "Next Steps"];

  const CHECK_IN_QUESTIONS: any = {
    Progress: [
      "What specific progress have you made on this goal in the last few weeks?​",
      "What specific outcomes have you achieved on this goal?",
      "What roadblocks are getting in the way and how can I help?",
      "What resources and inputs do you need to achieve this goal?",
    ],
    Insights: [
      "What are 2 key learnings you have had when executing this goal?",
      "What are 2 things you did well, and 2 things you could have done differently on this goal?​",
      "What 2-3 deliberate actions have you taken to enhance your effectiveness on this goal?",
    ],
    "Next Steps": [
      "What 2-3 actions will you take in the next two weeks to make progress on this goal?",
      "On this goal, in the next 2 weeks, which key stakeholders will you work with and how?​",
      "Going forward, what will you consciously do differently than before to be more effective?",
    ],
  };
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
  const currentUserRole = useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );
  const [checkInLoading, setCheckInLoading] = useState(false);
  const [category, setCategory] = useState<any>("");
  const [question, setQuestion] = useState<any>("");

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
          type: "CHECK_IN_POST",
          category,
          question,
        },
        postedByUserId: user?.id,
        postedByName: user?.name,
        postedByDesignation: user?.designation,
        postedByRole: currentUserRole,
        postedByEmail: user?.email,
        id: new Date().valueOf().toString(),
        postedToName: employeeData?.name,
        postedToUserId: employeeData?.id,
        postedToRole: "LP"
      });

      console.log(response);
      toast.success("Check-In message posted successfully", {
        toastId: "CHECK_IN_SUCCESSFUL",
      });
      closePopup();
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
            setCategory("");
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
          Check - In
        </DialogTitle>
        <DialogContent>
          <article
            className="gdnc-modal-subtxt"
            style={{ width: "85%", margin: "auto" }}
          >
            Send the direct report a check-in question on their progress on this
            goal.
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
            What would you like to check-in about?
          </article>
          {/* <select
            style={{}}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CHECK_IN_CATEGORIES.map((category: any, index: number) => {
              return (
                <option value={category} key={index}>
                  {category}
                </option>
              );
            })}
          </select> */}
          <Box className="check_in_catg">
            <FormControl fullWidth>
              <Select
                id=""
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                displayEmpty
              >
                <MenuItem value={""} disabled>
                  {"Select"}
                </MenuItem>
                {CHECK_IN_CATEGORIES.map((category: any, index: number) => {
                  return (
                    <MenuItem value={category} key={index}>
                      {category}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          {category ? (
            <Box>
              {" "}
              <article
                className="textfield_label"
                style={{ marginTop: "16px" }}
              >
                What would you like to ask {employeeData?.name}?
              </article>
              {/* <select
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              >
                {CHECK_IN_QUESTIONS?.[category]?.map(
                  (question: any, index: number) => {
                    return (
                      <option value={question} key={index}>
                        {question}
                      </option>
                    );
                  }
                )}
              </select> */}
              <Box className="check_in_catg">
                <FormControl fullWidth>
                  <Select
                    id=""
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value={""} disabled>
                      {"Select"}
                    </MenuItem>
                    {CHECK_IN_QUESTIONS?.[category]?.map(
                      (question: any, index: number) => {
                        return (
                          <MenuItem value={question} key={index}>
                            {question}
                          </MenuItem>
                        );
                      }
                    )}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          ) : null}
          {/* <TextField
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
          /> */}
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
                disabled={!category || !question}
                onClick={onCheckInClick}
              >
                Send Question
              </Button>
            )}
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default CheckIn;
