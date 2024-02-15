import { Stack, Typography, Avatar, Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import DoNotDisturbRoundedIcon from "@mui/icons-material/DoNotDisturbRounded";
import { useSelector } from "react-redux";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import FormatBoldRoundedIcon from "@mui/icons-material/FormatBoldRounded";
import FormatItalicRoundedIcon from "@mui/icons-material/FormatItalicRounded";
import FormatUnderlinedRoundedIcon from "@mui/icons-material/FormatUnderlinedRounded";

const ChatThread = ({ selectedChatThread, localChatThread }: any) => {
  const threadEndRef: any = useRef(null);

  const scrollToBottomOfPosts = () => {
    threadEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottomOfPosts();
  }, [localChatThread]);
  return (
    <div>
      {selectedChatThread
        ? Object.entries(selectedChatThread)
            ?.sort((a: any, b: any) => a[1]?.id - b[1]?.id)
            ?.map((message: any, index: number) => {
              return <ChatMessage message={message[1]} key={index} />;
            })
        : null}
      <div ref={threadEndRef} />
    </div>
  );
};
export default ChatThread;

const ChatMessage = ({ message }: any) => {
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
  return (
    <>
      {message?.messageFromUserId === user?.id ? (
        <>
          <Box className="chat_conv_box_right">
            <Box className="right_aligned bg">
              <Typography className="chat_conv_text">
                {message?.message
                  .trim()
                  .split("\n")
                  .map((line: any, index: any) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
              </Typography>
              <Typography className="chat_conv_tym">
                {new Date(message?.regDateTime).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                })}
                {" | "}
                {new Date(message?.regDateTime).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box className="chat_conv_box_left">
            <Stack className="left_aligned">
              <Avatar
                sx={{
                  width: "40px",
                  height: "40px",
                  bgcolor: "#FDF9E4",
                  color: "#EFD02E",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {message?.messageFromUserName?.substring(0, 1)}
              </Avatar>
              <Box className="left_aligned_inr bg">
                <Box className="chat_conv_txt_drpdwn">
                  <Typography className="chat_conv_text">
                    {message?.message
                      .trim()
                      .split("\n")
                      .map((line: any, index: any) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                  </Typography>
                </Box>
                <Typography className="chat_conv_tym">
                  {" "}
                  {new Date(message?.regDateTime).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                  })}
                  {" | "}
                  {new Date(message?.regDateTime).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </>
      )}
    </>
  );
};

// const ChatThreadUI = ({ selectedChatThread }: any) => {
//   return (
//     <div>
//       {" "}
//       <Stack className="chat_conv_flx right_aligned bg">
//         <Typography className="chat_conv_text">
//           Need a clarification on the given goal
//         </Typography>
//         <Typography className="chat_conv_tym">10:00</Typography>
//       </Stack>
//       <Stack className="chat_conv_flx right_aligned bg">
//         <Stack className="chat_conv_delmsg_flx">
//           <DoNotDisturbRoundedIcon sx={{ color: "#989EA5" }} />
//           <Typography className="chat_conv_text">
//             You deleted this message
//           </Typography>
//         </Stack>
//         <Typography className="chat_conv_tym">10:00</Typography>
//       </Stack>
//       <Stack className="left_aligned">
//         <Avatar
//           sx={{
//             width: "40px",
//             height: "40px",
//             bgcolor: "#FDF9E4",
//             color: "#EFD02E",
//             fontSize: "16px",
//             fontWeight: "600",
//           }}
//         >
//           S
//         </Avatar>
//         <Stack className="chat_conv_flx bg">
//           <Typography className="chat_conv_text">
//             Please let me know your queries...
//           </Typography>
//           <Typography className="chat_conv_tym">10:30</Typography>
//         </Stack>
//       </Stack>
//       <Stack className="chat_conv_flx left_aligned bg">
//         <Stack className="chat_conv_delmsg_flx">
//           <DoNotDisturbRoundedIcon sx={{ color: "#989EA5" }} />
//           <Typography className="chat_conv_text">
//             This message has been deleted
//           </Typography>
//         </Stack>
//         <Typography className="chat_conv_tym">10:00</Typography>
//       </Stack>
//       <Box className="chat_conv_rply_msg right_aligned">
//         <Box className="chat_conv_rply_msgbx">
//           <Typography className="chat_rply_msg_name">Sunil</Typography>
//           <Typography className="chat_rply_msg_text">
//             Please let me know your queries...
//           </Typography>
//         </Box>
//         <Stack className="chat_conv_flx bg">
//           <Typography className="chat_conv_text">Thank you</Typography>
//           <Typography className="chat_conv_tym">11:00</Typography>
//         </Stack>
//       </Box>
//       <Box className="chat_conv_rply_msg right_aligned">
//         <Box className="chat_conv_rply_msgbx">
//           <Stack className="chat_conv_delmsg_flx">
//             <DoNotDisturbRoundedIcon sx={{ color: "#5D636B" }} />
//             <Typography className="chat_conv_text">
//               This message has been deleted
//             </Typography>
//           </Stack>
//         </Box>
//         <Stack className="chat_conv_flx bg">
//           <Typography className="chat_conv_text">Thank you</Typography>
//           <Typography className="chat_conv_tym">11:00</Typography>
//         </Stack>
//       </Box>
//     </div>
//   );
// };
