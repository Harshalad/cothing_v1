import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const ConceptPrimer = () => {
  const contentId = "33799b9c-f0d2-4476-9828-8a75fece9b12";

  const [IFrame, setIFrame] = useState("https://www.google.com");
  const [showIFrameTitle, setShowIFrameTitle] = useState(false);
  return (
    <>
      <Stack
        flexDirection="row"
        alignItems="center"
        gap="15px"
        justifyContent="space-between"
        mb="24px"
      >
        <Stack flexDirection="row" alignItems="center" gap="20px">
          <Typography
            //@ts-ignore
            variant="span"
            sx={{
              fontWeight: "500",
              color: "#2D3648",
              cursor: "pointer",
            }}
            className="go_back_flex"
            onClick={() => setIFrame(false)}
          >
            <ChevronLeftIcon />
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "500",
              color: "#2D3648",
            }}
          >
            Additional Resource on {showIFrameTitle ? showIFrameTitle : ""}
          </Typography>
        </Stack>
        <Stack
          flexDirection="row"
          alignItems="center"
          gap="8px"
          sx={{ cursor: "pointer" }}
          onClick={() => {}}
        >
          <img
            src="/images/icons/guidance.png"
            alt="guidance"
            width={16}
            height={20}
          ></img>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: "500",
              color: "#2E5DB0",
            }}
          >
            Guidance
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <iframe
          style={{ width: "100%", height: "100vh" }}
          id="frame"
          src={"https://www.google.com"}
          name="extrnlCntnt"
          title="external content"
        ></iframe>
      </Box>
    </>
  );
};

export default ConceptPrimer;
