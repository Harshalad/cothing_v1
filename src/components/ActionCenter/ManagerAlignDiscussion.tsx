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
import { useState } from "react";
import AlignExpertQuotient from "./AlignExpertQuotient";

const ManagerAlignDiscussion = () => {
  const [showSendTo, setSendTo] = useState(false);
  const [showCmntTxtFld, setCmntTxtFld] = useState(0);
  const [showRplyTxtFld, setRplyTxtFld] = useState(0);
  const [showRejectTxtFld, setRejectTxtFld] = useState(false);

  const addCmntTxtFld = (value: any) => {
    setCmntTxtFld(value);
  };

  const addRplyTxtFld = (value: any) => {
    setRplyTxtFld(value);
  };

  return (
    <Box className="popup_right_box aligngl_dtls_popup_rght">
      <AlignExpertQuotient />
      <Box className="aligngl_dtls_rght_innr mngralgn_takactn_rght_innr">
        <Box className="aligngl_rght_innr_top">
          <Box className="aligngl_status_box">
            <Stack className="aligngl_status_flex">
              <Typography className="aligngl_status_msg">
                You have accepted Joshua&apos;s goal
              </Typography>
              <Typography className="aligngl_status_time">09:30 am</Typography>
            </Stack>
            <Divider className="aligngl_status_hr" />
          </Box>
          <Box className="aligngl_status_box mb">
            <Stack className="aligngl_status_flex">
              <Typography className="aligngl_status_msg">
                You have rejected Joshua&apos;s goal
              </Typography>
              <Typography className="aligngl_status_time">09:30 am</Typography>
            </Stack>
          </Box>
          <Box className="aligngl_post_cont">
            {/* <Stack className="mngralgn_nomsgs_flex">
                                                    <img src={noMessagesIcon} alt="no messages" width={40} height={40}></img>
                                                    <Typography className="mngralgn_nomsgs_txt">No messages</Typography>
                                                </Stack> */}
            <>
              <Box className="aligngl_quest_cont">
                <Box className="aligngl_quest_box">
                  <Typography className="aligngl_quest_heading mb">
                    Joshua has shared their take on this Goal
                  </Typography>
                  <Typography className="aligngl_quest_heading">
                    How do you feel about this goal?
                  </Typography>
                  <Typography className="aligngl_post_answ">Neutral</Typography>
                  <Typography className="aligngl_quest_heading mt">
                    What could be different so that you are excited
                  </Typography>
                  <Typography className="aligngl_post_answ">
                    This goal is not aligned with next 6 month team goals
                  </Typography>
                  <Typography className="aligngl_quest_heading mt">
                    What are you comitted to?
                  </Typography>
                  <Typography className="aligngl_post_answ">
                    This goal is not aligned with next 6 month team goals
                  </Typography>
                </Box>
                <Stack className="aligngl_cmnt_cta_flex">
                  <img
                    src={"images/icons/comment.svg"}
                    alt="comment"
                    width={12}
                    height={11}
                  ></img>
                  <Typography className="aligngl_cmnt_cta_heading">
                    Comment
                  </Typography>
                </Stack>
              </Box>
              <Divider className="aligngl_status_hr" />
              <Box className="aligngl_quest_cont">
                <Box className="aligngl_quest_box">
                  <Typography className="aligngl_quest_heading mb">
                    Joshua has asked a question on this Goal
                  </Typography>
                  <Typography className="aligngl_quest_heading">
                    Your Question Area
                  </Typography>
                  <Typography className="aligngl_post_answ">
                    This goal is not aligned with next 6 month team goals
                  </Typography>
                  <Typography className="aligngl_quest_heading mt">
                    Your Question
                  </Typography>
                  <Typography className="aligngl_post_answ">
                    This goal is not aligned with next 6 month team goals
                  </Typography>
                </Box>
                <Stack className="aligngl_cmnt_cta_flex">
                  <img
                    src={"images/icons/comment.svg"}
                    alt="comment"
                    width={12}
                    height={11}
                  ></img>
                  <Typography className="aligngl_cmnt_cta_heading">
                    Comment
                  </Typography>
                </Stack>
              </Box>
              <Divider className="aligngl_status_hr" />
              <Box className="aligngl_quest_cont">
                <Box className="aligngl_quest_box">
                  <Typography className="aligngl_quest_heading">
                    Reason for Rejection
                  </Typography>
                  <Typography className="aligngl_post_answ">
                    This goal is not aligned with next 6 month team goals
                  </Typography>
                </Box>
                <Stack className="aligngl_cmnt_cta_flex">
                  <img
                    src={"images/icons/comment.svg"}
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
                              src={"images/icons/ask-question.svg"}
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
              <Box className="aligngl_quest_cont">
                <Box className="aligngl_quest_box">
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
                  <Typography className="aligngl_post_answ">
                    This goal is not aligned with next 6 month team goals
                  </Typography>
                </Box>
                <Stack className="aligngl_cmnt_cta_flex">
                  <img
                    src={"images/icons/comment.svg"}
                    alt="comment"
                    width={12}
                    height={11}
                  ></img>
                  <Typography
                    className="aligngl_cmnt_cta_heading"
                    onClick={() => {
                      addCmntTxtFld(2);
                    }}
                  >
                    Comment
                  </Typography>
                </Stack>
              </Box>
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
                              src={"images/icons/ask-question.svg"}
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
                    src={"images/icons/reply.svg"}
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
                              src={"images/icons/ask-question.svg"}
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
                    src={"images/icons/reply.svg"}
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
                              src={"images/icons/ask-question.svg"}
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
          </Box>
        </Box>
        <Grid className="aligngl_rght_innr_bottom mngralgn_rght_innr_bottom">
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
          <Box className="algn_askqust_txtfld">
            <TextField
              id="ask_quest"
              placeholder="Discuss..."
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{ sx: { fontSize: "16px", color: "#1C2129" } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img
                      src={"images/icons/ask-question.svg"}
                      alt="Ask Question"
                      width={20}
                      height={17}
                    ></img>
                  </InputAdornment>
                ),
                sx: { cursor: "pointer" },
              }}
            />
          </Box>
        </Grid>
      </Box>
      <Box className="mngralgn_takactn_box">
        <Typography className="mngralgn_takactn_title">
          Joshua has added a new goal
        </Typography>
        <Typography className="mngralgn_takactn_subtitle">
          Please take the required action for this goal
        </Typography>
        <Stack className="mngralgn_takactn_cta_flex">
          <Button
            className="outlined_cta"
            onClick={() => setRejectTxtFld(false)}
          >
            Approve this Goal
          </Button>
          <Typography className="mngralgn_takactn_or">OR</Typography>
          <Button
            className="outlined_cta"
            onClick={() => setRejectTxtFld(true)}
          >
            Reject this Goal
          </Button>
        </Stack>
        {showRejectTxtFld === true ? (
          <Box className="mngralgn_rjct_inpt_box" sx={{ marginTop: "24px" }}>
            <Typography className="aligngl_quest_heading">
              Please provide a reason for rejection
            </Typography>
            <Box className="algn_askqust_txtfld">
              <TextField
                id="aligngl_cmnt_txtfld"
                placeholder="Write your reason here..."
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{ sx: { fontSize: "16px", color: "#1C2129" } }}
              />
            </Box>
            <Box className="standard_cta_box">
              <Button
                className="standard_cta"
                onClick={() => setRejectTxtFld(false)}
              >
                Reject
              </Button>
            </Box>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};
export default ManagerAlignDiscussion;
