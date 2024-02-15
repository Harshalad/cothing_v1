import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

const ThankYou = () => {
  const router = useRouter();
  return (
    <>
      <Box className="thankyou_contr">
        <Typography className="thankyou_title">Thank You!</Typography>
        <Typography className="thankyou_subtext">
          You have successfully submitted your evaluation. 
        </Typography>
        <Box className="test_instructs_cta">
          <Button className="standard_cta" onClick={()=> router.push("/event-listing")}>Back</Button>
        </Box>
      </Box>
    </>
  );
}
export default ThankYou;