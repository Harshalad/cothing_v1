import { Box, Button, Collapse, Dialog, Stack, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createUserTestMap } from "../../actions/assessment/createUserTestMap";
import { fetchUserTestDetailsApi } from "../../actions/assessment/fetchTestDetails";
import { toast } from "react-toastify";

const ViewMore = ({ openViewMore, handleOpenViewMore, openBattery,groupBattery,assessment }: any) => {
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
   const currentUserRole = useSelector(
     //@ts-ignore
     (state) => state?.auth?.managerToggleView
   );
  const router = useRouter();
  const expanded = true;
  const handleStartClick = async (test: any) => {
    console.log(openBattery,groupBattery, "test123")
    
    const response = await createUserTestMap({
      userId: user?.id,
      testId: test?.testId,
      startDate: test?.startDate,
      endDate: test?.endDate,
      attemptNo: test?.noOfAttempts,
      batteryGroupId:groupBattery?.batteryGroupDetails?.batteryGroupId,
      batteryId: openBattery?.batteryId,
      role: currentUserRole,
      type:assessment?.type,
    });
    console.log(response, "utmresponse");
    if (response) {
      const utmId = response;
      const testResponse = await fetchUserTestDetailsApi({
        userTestMapId: utmId,
      });
      // console.log(testResponse,"testResponse");
      //@ts-ignore
      if (testResponse?.response === null) {
        //@ts-ignore
        toast.error(testResponse?.extra);
      } else {
        router.push({
          pathname: "/assessment",
          query: {
            //@ts-ignore
            id: utmId,
          },
        });
      }
    }
  };
  return (
    <>
      <Box className="view_more">
        <Typography
          //@ts-ignore
          variant="span"
          sx={{
            fontWeight: "500",
            color: "#2D3648",
            marginTop: "24px",
            cursor: "pointer",
          }}
          className="go_back_flex"
          onClick={() => handleOpenViewMore()}
        >
          <ChevronLeftIcon /> Go Back
        </Typography>
        <Box className="avlbl_assmnts_card">
          <Box className={`${expanded ? "avlbl_assmnts_top_card" : "no_bg"}`}>
            <Box className="avlbl_assmnts_top_inner">
              <Typography className="avlbl_assmnts_card_title">
                {openBattery?.name}
              </Typography>
              <Typography className="avlbl_assmnts_card_descrpt">
                {openBattery?.description}
              </Typography>
              {/* <Typography className="avlbl_assmnts_skills">
                Skills evaluated : Skill Tag 1 | Skill Tag 2
              </Typography> */}
              <Stack className="avlbl_assmnts_infocta_flx">
                <Stack className="avlbl_assmnts_info_flx">
                  {/* <Stack className="avlbl_assmnts_durtn_flx">
                    <AccessTimeOutlinedIcon
                      sx={{ color: "#1C2129", fontSize: "12px" }}
                    />
                    <Typography className="avlbl_assmnts_durtn">
                      30- 35 mins
                    </Typography>
                  </Stack> */}
                  <Stack className="avlbl_assmnts_totlquests_flx">
                    <AssignmentOutlinedIcon
                      sx={{ color: "#1C2129", fontSize: "12px" }}
                    />
                    <Typography className="avlbl_assmnts_totl_quests">
                      {openBattery?.tests?.length} Tests
                    </Typography>
                  </Stack>
                </Stack>
                {/* <Box className="analyze_cta">
                  <Stack className="analyze_cta_flx">
                    <Button className="standard_cta">Start</Button>
                  </Stack>
                </Box> */}
              </Stack>
            </Box>
          </Box>
          <Collapse in={expanded}>
            {openBattery?.tests?.map((test: any, index: any) => {
              return (
                <Stack className="assmnts_view_more_flex" key ={index}>
                  <Box className="assmnts_view_more_contr">
                    <Typography className="avlbl_assmnts_card_title">
                      {test?.name}
                    </Typography>
                    <Typography className="avlbl_assmnts_card_descrpt">
                      {test?.description}
                    </Typography>
                    <Stack className="avlbl_assmnts_info_flx">
                      <Stack className="avlbl_assmnts_durtn_flx">
                        <AccessTimeOutlinedIcon
                          sx={{ color: "#1C2129", fontSize: "12px" }}
                        />
                        <Typography className="avlbl_assmnts_durtn">
                          {test?.testDuration}
                        </Typography>
                      </Stack>
                      {/* <Stack className="avlbl_assmnts_totlquests_flx">
                        <HelpOutlineOutlinedIcon
                          sx={{ color: "#1C2129", fontSize: "12px" }}
                        />
                        <Typography className="avlbl_assmnts_totl_quests">
                          15 Questions
                        </Typography>
                      </Stack> */}
                    </Stack>
                  </Box>
                  <Box className="analyze_cta">
                    <Button
                      className="standard_cta"
                      onClick={() => handleStartClick(test)}
                    >
                      Start
                    </Button>
                  </Box>
                </Stack>
              );
            })}
          </Collapse>
        </Box>
      </Box>
    </>
  );
};
export default ViewMore;