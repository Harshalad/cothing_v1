import { Box, Button, Typography } from "@mui/material";

const ThankYou = () => {
  return (
    <>
      <Box className="thankyou_contr">
        <Typography className="thankyou_title">Thank You!</Typography>
        <Typography className="thankyou_subtext">
          You have successfully submitted your evaluation. 
          The score card will be shared to the employee shortly
        </Typography>
        <Box className="test_instructs_cta">
          <Button className="standard_cta">Back</Button>
        </Box>
      </Box>
    </>
  );
}
export default ThankYou;