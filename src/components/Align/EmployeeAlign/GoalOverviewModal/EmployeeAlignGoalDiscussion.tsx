import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useState } from "react";
import { createPost } from "../../../../actions/align/posts/createPost";
import { useSelector } from "react-redux";

interface EmployeeAlignDiscussionProps {
  showAskQuestion: boolean;
  goal: any;
}

const EmployeeAlignGoalDiscussion = ({
  showAskQuestion,
  goal,
}: EmployeeAlignDiscussionProps) => {
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);

  const [showCmntTxtFld, setCmntTxtFld] = useState(0);
  const [showRplyTxtFld, setRplyTxtFld] = useState(0);

  const [questionArea, setQuestionArea] = useState("");
  const [questionText, setQuestionText] = useState("");

  const addCmntTxtFld = (value: any) => {
    setCmntTxtFld(value);
  };

  const addRplyTxtFld = (value: any) => {
    setRplyTxtFld(value);
  };

  const onAskClick = async () => {
    try {
      if (user?.id && user?.activeProgramId) {
        const response = await createPost({
          // userWorksheetId: "1683130036177",
          userId: user?.id,
          programId: user?.activeProgramId,
          userGoalId: goal?.id,
          type: "ALIGN",
          title: "Test Title",
          text: "This is post text",
          subText: "This is post sub text",
          typeAttributes: {
            questionArea,
            questionText,
            type: "QUESTION_TEXT_AND_AREA",
          },
          postedByUserId: user?.id,
          postedByName: user?.name,
          postedByDesignation: user?.designation,
          postedByRole: "MANAGER",
          postedByEmail: user?.email,
          id: "test",
        });
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box className="popup_right_box aligngl_dtls_popup_rght">
        <Box className="aligngl_dtls_rght_innr">
          <Box className="aligngl_rght_innr_top">
            {/* <Box className="aligngl_status_box">
              <Stack className="aligngl_status_flex">
                <Typography className="aligngl_status_pasttym">
                  You have shared this goal with Mathew 3 days ago
                </Typography>
                <Typography className="aligngl_status_time">
                  09:30 am
                </Typography>
              </Stack>
              <Typography className="aligngl_status_msg">
                Your Goal Approval Request is pending...
              </Typography>
              <Divider className="aligngl_status_hr" />
            </Box>

            <Box className="aligngl_status_box">
              <Stack className="aligngl_status_flex">
                <Typography className="aligngl_status_msg">
                  Mathew has accepted your Goal
                </Typography>
                <Typography className="aligngl_status_time">
                  09:30 am
                </Typography>
              </Stack>
              <Divider className="aligngl_status_hr" />
            </Box>
            <Box className="aligngl_status_box mb">
              <Stack className="aligngl_status_flex">
                <Typography className="aligngl_status_msg">
                  Mathew has rejected your Goal
                </Typography>
                <Typography className="aligngl_status_time">
                  09:30 am
                </Typography>
              </Stack>
            </Box> */}
            <Box className="aligngl_post_cont">
              {showAskQuestion === true ? (
                <Box className="aligngl_quest_cont">
                  <Box className="aligngl_quest_box">
                    <Box className="aligngl_askquest_back">
                      {" "}
                      {/* onClick={() => closeAskQuestion(false)} */}
                      <Typography
                        sx={{
                          fontWeight: "500",
                          color: "#2D3648",
                          marginBottom: "24px",
                        }}
                        className="go_back_flex"
                      >
                        <ChevronLeftIcon /> Go Back
                      </Typography>
                    </Box>
                    <Typography className="aligngl_quest_heading">
                      Provide Area of Question
                    </Typography>
                    <Box className="algn_askqust_txtfld">
                      <TextField
                        id="aligngl_cmnt_txtfld"
                        placeholder="Provide Area of Question"
                        variant="outlined"
                        size="small"
                        fullWidth
                        inputProps={{
                          sx: { fontSize: "16px", color: "#1C2129" },
                        }}
                        value={questionArea}
                        onChange={(e) => setQuestionArea(e.target.value)}
                      />
                    </Box>
                    <Typography className="aligngl_quest_heading mt">
                      Please write your Question
                    </Typography>
                    <Box className="algn_askqust_txtfld">
                      <TextField
                        id="aligngl_cmnt_txtfld"
                        placeholder="Please write your Question"
                        variant="outlined"
                        size="small"
                        fullWidth
                        inputProps={{
                          sx: { fontSize: "16px", color: "#1C2129" },
                        }}
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                      />
                    </Box>
                    <Box className="standard_cta_box">
                      {" "}
                      {/* onClick={() => closeAskQuestion(false)} */}
                      <Button className="standard_cta" onClick={onAskClick}>
                        Ask
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <>
                  <Box className="aligngl_quest_cont">
                    <Box className="aligngl_quest_box">
                      <Typography className="aligngl_quest_heading">
                        Mathew Rejection Reason
                      </Typography>
                      <Typography className="aligngl_post_answ">
                        This goal is not aligned with next 6 month team goals
                      </Typography>
                    </Box>
                    <Stack className="aligngl_cmnt_cta_flex">
                      <img
                        src={"/images/icons/comment.svg"}
                        alt="comment"
                        width={12}
                        height={11}
                      ></img>
                      <Typography
                        className="aligngl_cmnt_cta_heading"
                        onClick={() => {
                          addCmntTxtFld(1);
                        }}
                      >
                        Comment
                      </Typography>
                    </Stack>
                  </Box>
                  {showCmntTxtFld === 1 ? (
                    <Stack
                      className="aligngl_cmnt_txtfld_flex"
                      id="cmnt_txtfld_input"
                    >
                      <Box>
                        <Avatar
                          sx={{
                            width: "32px",
                            height: "32px",
                            bgcolor: "#DFFFF2",
                            color: "#1BAD70",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          S
                        </Avatar>
                      </Box>
                      <Box className="algn_askqust_txtfld aligngl_cmnt_txtfld">
                        <TextField
                          id="aligngl_cmnt_txtfld"
                          placeholder="Write your reply here"
                          variant="outlined"
                          size="small"
                          fullWidth
                          multiline
                          inputProps={{
                            sx: { fontSize: "16px", color: "#1C2129" },
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <img
                                  src={"/images/icons/ask-question.svg"}
                                  alt="Comment"
                                  width={20}
                                  height={17}
                                ></img>
                              </InputAdornment>
                            ),
                            sx: { cursor: "pointer" },
                          }}
                        />
                      </Box>
                    </Stack>
                  ) : (
                    ""
                  )}
                  <Divider className="aligngl_status_hr" />

                  {showCmntTxtFld === 2 ? (
                    <Stack
                      className="aligngl_cmnt_txtfld_flex"
                      id="cmnt_txtfld_input"
                    >
                      <Box>
                        <Avatar
                          sx={{
                            width: "32px",
                            height: "32px",
                            bgcolor: "#DFFFF2",
                            color: "#1BAD70",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          S
                        </Avatar>
                      </Box>
                      <Box className="algn_askqust_txtfld aligngl_cmnt_txtfld">
                        <TextField
                          id="aligngl_cmnt_txtfld"
                          placeholder="Write your reply here"
                          variant="outlined"
                          size="small"
                          fullWidth
                          multiline
                          inputProps={{
                            sx: { fontSize: "16px", color: "#1C2129" },
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <img
                                  src={"/images/icons/ask-question.svg"}
                                  alt="Comment"
                                  width={20}
                                  height={17}
                                ></img>
                              </InputAdornment>
                            ),
                            sx: { cursor: "pointer" },
                          }}
                        />
                      </Box>
                    </Stack>
                  ) : (
                    ""
                  )}
                  <Box className="aligngl_cmnt_box">
                    <Stack className="aligngl_auth_flex">
                      <Box>
                        <Avatar
                          sx={{
                            width: "32px",
                            height: "32px",
                            bgcolor: "#DFFFF2",
                            color: "#1BAD70",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          S
                        </Avatar>
                      </Box>
                      <Box>
                        <Typography className="aligngl_auth_name">
                          Sunil Panchori
                        </Typography>
                        <Typography className="aligngl_auth_desg">
                          Lead Designer
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography className="aligngl_cmnt_answ">
                      This goal is not aligned with next 6 month team goals
                    </Typography>
                    <Stack className="aligngl_cmnt_cta_flex">
                      <img
                        src={"/images/icons/reply.svg"}
                        alt="comment"
                        width={9}
                        height={12}
                      ></img>
                      <Typography
                        className="aligngl_cmnt_cta_heading"
                        onClick={() => {
                          addRplyTxtFld(1);
                        }}
                      >
                        Reply
                      </Typography>
                    </Stack>
                  </Box>
                  {showRplyTxtFld === 1 ? (
                    <Stack
                      className="aligngl_rply_txtfld_flex"
                      id="rply_txtfld_input"
                    >
                      <Box>
                        <Avatar
                          sx={{
                            width: "32px",
                            height: "32px",
                            bgcolor: "#DFFFF2",
                            color: "#1BAD70",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          S
                        </Avatar>
                      </Box>
                      <Box className="algn_askqust_txtfld aligngl_rply_txtfld">
                        <TextField
                          id="aligngl_rply_txtfld"
                          placeholder="Write your reply here"
                          variant="outlined"
                          size="small"
                          fullWidth
                          inputProps={{
                            sx: { fontSize: "16px", color: "#1C2129" },
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <img
                                  src={"/images/icons/ask-question.svg"}
                                  alt="Comment"
                                  width={20}
                                  height={17}
                                ></img>
                              </InputAdornment>
                            ),
                            sx: { cursor: "pointer" },
                          }}
                        />
                      </Box>
                    </Stack>
                  ) : (
                    ""
                  )}
                  <Box className="aligngl_reply_box">
                    <Stack className="aligngl_auth_flex">
                      <Box>
                        <Avatar
                          sx={{
                            width: "32px",
                            height: "32px",
                            bgcolor: "#DFFFF2",
                            color: "#1BAD70",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          S
                        </Avatar>
                      </Box>
                      <Box>
                        <Typography className="aligngl_auth_name">
                          Sunil Panchori
                        </Typography>
                        <Typography className="aligngl_auth_desg">
                          Lead Designer
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography className="aligngl_rply_answ">
                      This goal is not aligned with next 6 month team goals
                    </Typography>
                    <Stack className="aligngl_cmnt_cta_flex">
                      <img
                        src={"/images/icons/reply.svg"}
                        alt="comment"
                        width={9}
                        height={12}
                      ></img>
                      <Typography
                        className="aligngl_cmnt_cta_heading"
                        onClick={() => {
                          addRplyTxtFld(2);
                        }}
                      >
                        Reply
                      </Typography>
                    </Stack>
                  </Box>
                  {showRplyTxtFld === 2 ? (
                    <Stack
                      className="aligngl_rply_txtfld_flex"
                      id="rply_txtfld_input"
                    >
                      <Box>
                        <Avatar
                          sx={{
                            width: "32px",
                            height: "32px",
                            bgcolor: "#DFFFF2",
                            color: "#1BAD70",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          S
                        </Avatar>
                      </Box>
                      <Box className="algn_askqust_txtfld aligngl_rply_txtfld">
                        <TextField
                          id="aligngl_rply_txtfld"
                          placeholder="Write your reply here"
                          variant="outlined"
                          size="small"
                          fullWidth
                          inputProps={{
                            sx: { fontSize: "16px", color: "#1C2129" },
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <img
                                  src={"/images/icons/ask-question.svg"}
                                  alt="Comment"
                                  width={20}
                                  height={17}
                                ></img>
                              </InputAdornment>
                            ),
                            sx: { cursor: "pointer" },
                          }}
                        />
                      </Box>
                    </Stack>
                  ) : (
                    ""
                  )}
                  <Divider className="aligngl_status_hr" />
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default EmployeeAlignGoalDiscussion;
