import { Box, Typography, Divider, Stack, Avatar, Rating } from "@mui/material";
import { useState } from "react";

const DiscussionWithRating = () => {

    var text = "This goal is not aligned with next 6 month team goals -  goal is not aligned with next 6 month team goals";
    const [isReadMore, setIsReadMore] = useState(true);

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    return (
        <>
        <Box className="prep_msg_box">
          <Typography className="prep_msg_title">You have requested for rating from Nworx Expert/Manager</Typography>
          <Typography className="prep_msg_subtitle">Reason</Typography>
          <Box className="prep_msg_text_box">
            <Typography className="prep_msg_text">
              {isReadMore ? text.length > 200 ? text.slice(0, 200) + "..." : text : text}
            </Typography>
            {text.length > 200
            ?
              <span className="prep_msg_readmore" onClick={toggleReadMore}>
                {isReadMore ? "Read more" : "Read less"}
              </span>
            :
              ""
            }
          </Box>
          <Divider className="prep_msg_hr"/>
        </Box>
        <Box className="prep_ask_msg_box">
          <Typography className="prep_msg_title">You have asked a question to Mathew</Typography>
          <Typography className="prep_msg_subtitle">Your Question</Typography>
          <Box className="prep_msg_text_box">
            <Typography className="prep_msg_text">
              This goal is not aligned with next 6 month team goals
            </Typography>
          </Box>
        </Box>
        <Divider className="prep_msg_hr"/>
        <Box className="prep_fedbck_msg_box">
          <Stack className="aligngl_auth_flex">
            <Box>
              <Avatar
                sx={{
                  width: "32px",
                  height: "32px",
                  bgcolor: "#DFFFF2",
                  color: "#1BAD70",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                NE
              </Avatar>
            </Box>
            <Box>
              <Typography className="aligngl_auth_name">
                Nworx Expert
              </Typography>
            </Box>
          </Stack>
          <Typography className="prep_msg_text">
            Your Expert/Manager has shared their rating/feedback with you  
          </Typography>
          <Typography className="prep_msg_subtitle">Quality Rating</Typography>
          <Rating
            name="quality rating"
            value={2}
            readOnly
            className="prep_rating"
          />
          <Box className="prep_msg_text_box">
            <Typography className="prep_more_text">
              {isReadMore ? text.length > 50 ? text.slice(0, 50) + "..." : text : text}
            </Typography>
            {text.length > 50
            ?
              <span className="prep_msg_readmore" onClick={toggleReadMore}>
                {isReadMore ? "Read more" : "Read less"}
              </span>
            :
              ""
            }
          </Box>
          <Typography className="prep_msg_subtitle">Thoroughness Rating</Typography>
          <Rating
            name="quality rating"
            value={2}
            readOnly
            className="prep_rating"
          />          
          <Box className="prep_msg_text_box">
            <Typography className="prep_more_text">
              {isReadMore ? text.length > 50 ? text.slice(0, 50) + "..." : text : text}
            </Typography>
            {text.length > 50
            ?
              <span className="prep_msg_readmore" onClick={toggleReadMore}>
                {isReadMore ? "Read more" : "Read less"}
              </span>
            :
              ""
            }
          </Box>
        </Box>
        </>
    );
}
export default DiscussionWithRating;