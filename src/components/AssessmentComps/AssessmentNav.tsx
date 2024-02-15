import { Box, Stack, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import React from "react";
import { useRouter } from "next/router";
const AssessmentNav = ({ testDetail, mainPage }: any) => {
  console.log(testDetail,"testtt")
  const router = useRouter();
  const comingFrom = router?.query?.comingFrom;

  console.log(router,"backmanage")
  const handleBack = ()=>{
    if(comingFrom!==null && comingFrom ==="action-center"){
      router.push("/action-center");
    }else{
      router.back();
    }
  }
  return (
    <>
      <Box className="assess_nav">
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack flexDirection="row" alignItems="center" gap="55px">
            {((mainPage)||(!mainPage && testDetail?.duration === null)) &&  (
              <Stack
                flexDirection="row"
                alignItems="center"
                sx={{ cursor: "pointer" }}
              >
                <Typography
                  //@ts-ignore
                  variant="span"
                  sx={{
                    fontWeight: "500",
                    color: "#2D3648",
                    cursor: "pointer",
                  }}
                  className="go_back_flex"
                >
                  <ChevronLeftIcon />
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#2D3648",
                  }}
                  onClick={() => handleBack()}
                >
                  Back
                </Typography>
              </Stack>
            )}
            <Box>
              {testDetail?.logoLink && <Typography>
                <img
                  src={testDetail?.logoLink}
                  alt="Logo"
                  style={{ width: "auto", height: "30px" }}
                />
              </Typography>}
            </Box>
          </Stack>
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            gap="20px"
          >
            <Box>
              <Typography>Powered by {"   "} </Typography>
            </Box>
            <Box>
              <Typography>
                <img
                  src={"https://content.nworx.app/images/nworx-logo.png"}
                  alt="Logo"
                  style={{ width: "auto", height: "30px" }}
                />
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};
export default AssessmentNav;
