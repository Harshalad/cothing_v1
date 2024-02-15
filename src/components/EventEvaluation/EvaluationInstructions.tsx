import { Box, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";

const EvaluationInstructions = ({testDetails}:any) => {
  return (
    <>
      <Box className="test_instructs_contr">
        <Typography className="test_instructs_title" variant="h1">
          {testDetails?.name}
        </Typography>
        <Stack className="test_instructs_contr_flex">
          <Box className="test_instructs_box">
            <Typography variant="h2" className="test_instructs_subtitle">
              Evaluator Instructions
            </Typography>
            <Typography className="test_instructs_para">
            {testDetails?.instructions?.startsWith("http") ? <iframe
                src={testDetails?.instructions}  
                title="Embedded Website"
                width="100%"
                height="400px"
              /> : testDetails?.instructions}
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
      </Box>
    </>
  );
};
export default EvaluationInstructions;