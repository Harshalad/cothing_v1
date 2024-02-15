import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchCompletedTestEvaluation } from "../../actions/evaluator/fetchCompletedTestEvaluation";
import Spinner from "../common/Spinner/Spinner";

const Completed = ({ activeClass }:any) => {
  //@ts-ignore
   const user = useSelector((state) => state?.auth?.nWorxUser);
   const [completedTest, setCompletedTest] = useState<any>(null);
   useEffect(() => {
     const fetchCompletedTest = async () => {
       const response = await fetchCompletedTestEvaluation({
         evaluatorUserId: user?.id,
       });
       if (response) {
         //@ts-ignore
         setCompletedTest(response?.response);
       }
     };
     fetchCompletedTest();
   }, [activeClass]);
  return (
    <>
      {!completedTest ? (
        <Spinner />
      ) : (
        <Stack className="active_assmnts_card_flx slct_evnt_slot_contr">
          {completedTest && completedTest?.length === 0
            ? "No Test Available"
            : completedTest?.map((test: any, index: any) => {
                return (
                  <Box className="active_assmnts_card" key={index}>
                    <Stack className="active_assmnts_status_flx">
                      <CircleIcon sx={{ color: "#1BAD70", fontSize: "12px" }} />
                      <Typography className="active_assmnts_status_text schld">
                        Completed
                      </Typography>
                    </Stack>
                    <Typography className="active_assmnts_name">
                      {test?.name}
                    </Typography>
                    <Stack className="active_assmnts_info_flx">
                      <Typography className="active_assmnts_end_date">
                        Completed On :{" "}
                        {new Date(test?.submitDateTime).toLocaleDateString()}
                      </Typography>
                    </Stack>
                    <Stack className="active_assmnts_info_flx">
                      <Typography className="active_assmnts_end_date">
                        Evaluated : {test?.evaluatedAttempts?.length}
                      </Typography>
                    </Stack>
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
                      {/* <Button className="standard_cta">View</Button> */}
                    </Box>
                  </Box>
                );
              })}
          {/* <Box className="active_assmnts_card">
          <Stack className="active_assmnts_status_flx">
            <CircleIcon sx={{ color: "#1BAD70", fontSize: "12px" }} />
            <Typography className="active_assmnts_status_text schld">
              Completed
            </Typography>
          </Stack>
          <Typography className="active_assmnts_name">
            Survey name Evaluate Your Work on the Project and 2nd lines of text
          </Typography>
          <Stack className="active_assmnts_info_flx">
            <Typography className="active_assmnts_end_date">
              Completed On : 02/09/2023
            </Typography>
          </Stack>
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
            <Button className="standard_cta">View</Button>
          </Box>
        </Box> */}
        </Stack>
      )}
    </>
  );
};
export default Completed;