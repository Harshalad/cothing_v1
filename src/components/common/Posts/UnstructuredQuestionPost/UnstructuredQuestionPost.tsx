import { Box, Stack, Avatar, Typography } from "@mui/material";
import React from "react";

const UnstructuredQuestionPost = ({ post }: any) => {
  return (
    <Box className="aligngl_quest_cont">
      <Typography className="aligngl_quest_heading mb">
        {post?.postedByName}&apos;s discussion with {post?.postedToName}.
      </Typography>
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
              {post?.postedByName?.substring(0, 1)}
            </Avatar>
          </Box>
          <Box>
            <Typography className="aligngl_auth_name">
              {post?.postedByName}
            </Typography>
            <Typography className="aligngl_auth_desg">
              {post?.postedByDesignation}
            </Typography>
          </Box>
        </Stack>
        <Typography className="aligngl_post_answ">
          {/* {post?.typeAttributes?.questionText} */}
          {post?.typeAttributes?.questionText
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
    </Box>
  );
};

export default UnstructuredQuestionPost;
