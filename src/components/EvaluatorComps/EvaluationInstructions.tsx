import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchAnswersForEvaluation } from "../../actions/evaluator/fetchAnswersForEvaluation";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Spinner from "../common/Spinner/Spinner";

const EvaluationInstructions = () => {
  const router = useRouter();
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
  const testId = router?.query?.id;
  const pathName = router?.pathname;
  const showContinue = pathName.includes("/instruction");
  
  console.log(router, showContinue, "router");
  const [testDetails, setTestDetails] = useState<any>(null);
  useEffect(() => {
    const fetchTestDeatils = async () => {
      const response = await fetchAnswersForEvaluation({
        evaluatorUserId: user?.id,
        userTestMapId: testId,
      });
      if (response) {
        //@ts-ignore
        setTestDetails(response?.response);
      }
    };
    fetchTestDeatils();
  }, [testId]);
  return (
    <>
      {!testDetails? <Spinner/> :<Box className="test_instructs_contr">
        <Typography className="test_instructs_title" variant="h1">
          {testDetails?.name}
        </Typography>
        <Stack className="test_instructs_contr_flex">
          <Box className="test_instructs_box">
            <Typography variant="h2" className="test_instructs_subtitle">
              Evaluator Instructions
            </Typography>
            <Typography className="test_instructs_para">
            {testDetails?.evaluatorInstructions?.startsWith("http") ? <iframe
                src={testDetails?.evaluatorInstructions}  
                title="Embedded Website"
                width="100%"
                height="400px"
              /> : testDetails?.evaluatorInstructions}
              
            </Typography>
            {/* <List dense={true} className="test_instructs_points">
              <ListItem>
                <ListItemText primary="1. Use the text box to enter your response. Be as thorough as possible." />
              </ListItem>
              <ListItem>
                <ListItemText primary="2. There is no right or wrong answer." />
              </ListItem>
              <ListItem>
                <ListItemText primary="3. Your responses will be shared with the HR team, your reporting manager and your assigned leadership expert." />
              </ListItem>
            </List> */}
          </Box>
        </Stack>
        {showContinue &&<Stack>
          <Box className="test_instructs_cta">
            <Button
              className="standard_cta"
              // onClick={() => closeSectInstructsModal(false)}
              onClick={() =>
                router.push({
                  pathname: "/evaluator",
                  query: {
                    id: testId,
                  },
                })
              }
            >
              Continue
            </Button>
          </Box>
        </Stack>}
      </Box>}
    </>
  );
};
export default EvaluationInstructions;
