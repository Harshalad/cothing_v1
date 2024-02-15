import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { startEvaluation } from "../../actions/evaluator/startEvaluation";
import { fetchInProgressTestEvaluation } from "../../actions/evaluator/fetchInProgressTestEvaluation";
import Spinner from "../common/Spinner/Spinner";
import { useRouter } from "next/router";

const Active = ({activeClass}:any) => {
  const router = useRouter();
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
  const [activeTest, setActiveTest] = useState<any>(null);
  useEffect(() => {
    const fetchActiveTest = async () => {
      const response = await fetchInProgressTestEvaluation({
        evaluatorUserId: user?.id,
      });
      if (response) {
        //@ts-ignore
        setActiveTest(response?.response);
      }
    };
    fetchActiveTest();
  }, [activeClass]);
  const handleContinueClick = async (test: any) => {
    const response = await startEvaluation({
      evaluatorUserId: user?.id,
      userTestMapId: test?.id,
    });
    //@ts-ignore
    if (response.statusCode === 0) {
      router.push({ pathname: "/instruction",query:{id:test?.id} });
      return;
    }
    //@ts-ignore
    toast.error(response?.extra);
  };
  return (
    <>
      {!activeTest ? (
        <Spinner />
      ) : (
        <Stack className="active_assmnts_card_flx slct_evnt_slot_contr">
          {activeTest && activeTest?.length === 0
            ? "No Test Available"
            : activeTest?.map((test: any, index: any) => {
                return (
                  <Box className="active_assmnts_card" key={index}>
                    <Stack className="active_assmnts_status_flx">
                      <CircleIcon sx={{ color: "#e7dc46", fontSize: "12px" }} />
                      <Typography className="active_assmnts_status_text inprog">
                        In Progress
                      </Typography>
                    </Stack>
                    <Typography className="active_assmnts_name">
                      {test?.name}
                    </Typography>
                    <Stack className="active_assmnts_profile_flx">
                      <Avatar
                        sx={{
                          width: "24px",
                          height: "24px",
                          bgcolor: "#DFFFF2",
                          color: "#1BAD70",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        {test?.userName[0]}
                      </Avatar>
                      <Typography className="active_assmnts_profile_title">
                        Evaluate for {test?.userName}
                      </Typography>
                    </Stack>
                    <Box className="analyze_cta">
                      <Button
                        className="standard_cta"
                        onClick={() => handleContinueClick(test)}
                      >
                        Continue
                      </Button>
                    </Box>
                  </Box>
                );
              })}
          {/* <Box className="active_assmnts_card">
          <Stack className="active_assmnts_status_flx">
            <CircleIcon sx={{ color: "#E74649", fontSize: "12px" }} />
            <Typography className="active_assmnts_status_text ntstrtd">
              Not Started
            </Typography>
          </Stack>
          <Typography className="active_assmnts_name">
            Survey name Evaluate Your Work on the Project and 2nd lines of text
          </Typography>
          <Stack className="active_assmnts_profile_flx">
            <Avatar
              sx={{
                width: "24px",
                height: "24px",
                bgcolor: "#DFFFF2",
                color: "#1BAD70",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              V
            </Avatar>
            <Typography className="active_assmnts_profile_title">
              Evaluate for Vidhi
            </Typography>
          </Stack>
          <Box className="analyze_cta">
            <Button className="standard_cta">Start</Button>
          </Box>
        </Box> */}
        </Stack>
      )}
    </>
  );
};
export default Active;