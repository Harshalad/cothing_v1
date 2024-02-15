import { Box, Button } from "@mui/material";
const CTA = ({ handleSaveAndNext }:any) => {
  return (
    <>
      <Box className="btn_contr">
        <Box className="eval_cta">
          {/* PreEvaluator in Test */}
          {/* <Button className="standard_cta">Next</Button> */}
          {/* Questions in Test */}
          <Button className="standard_cta" onClick={() => handleSaveAndNext()}>
            Save and Next
          </Button>
          {/* Last Question in Test */}
          {/* <Button className="standard_cta">Save and Finish</Button> */}
        </Box>
      </Box>
    </>
  );
};
export default CTA;