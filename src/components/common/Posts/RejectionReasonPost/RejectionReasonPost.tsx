import { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";

const RejectionReasonPost = ({ post }: any) => {
  const [showCmntTxtFld, setCmntTxtFld] = useState(0);
  const addCmntTxtFld = (value: any) => {
    setCmntTxtFld(value);
  };
  return (
    <Box className="aligngl_quest_cont">
      <Box className="aligngl_quest_box">
        <Typography className="aligngl_quest_heading">
          Reason for Rejection
        </Typography>
        <Typography className="aligngl_post_answ">
          {post?.typeAttributes?.rejectionReason}
        </Typography>
      </Box>
    </Box>
  );
};

export default RejectionReasonPost;
