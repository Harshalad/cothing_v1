import { BorderAll } from "@mui/icons-material";
import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ThankYou = () => {
  const router = useRouter();
  //@ts-ignore
  const testDetails = useSelector((state) => state?.assessment?.testDetails);
  const [statement, setStatement] = useState<any>(null);
  const [openModel, setOpenModel] = useState(false);
  console.log(testDetails,"adityatestDeatils");
  useEffect(()=>{
    setStatement(router?.query?.score);
    
  },[router?.isReady])
  useEffect(()=>{
    if(statement!==null && statement?.length>0){
      setOpenModel(true);
    }
  },[statement])
  console.log(statement,"adityastatement");
  return (
    <>
      <Box className="thankyou_contr">
        {/* <Typography className="thankyou_title">Thank You!</Typography> */}
        <Typography className="thankyou_subtext">
          <iframe
            style={{ width: "100%", height: "100%" }}
            id="frame"
            src={testDetails?.customThankYouLink}
            name="extrnlCntnt"
            title="external content"
          ></iframe>
          {/* You have successfully submitted your{" "}
          {testDetails?.assessmentLabelSingular}. */}
          {/* The score card will be shared to your mail shortly. */}
        </Typography>
        <Box className="test_instructs_cta">
          <Button
            className="standard_cta"
            onClick={() => router.push("/action-center")}
          >
            Back
          </Button>
        </Box>
      </Box>
      {testDetails?.calculateForScorecard &&<Dialog open={openModel} className="confirm_modal">
        <DialogContent>
          <Typography className="confirm_modal_title">
            {statement}
          </Typography>
          
            <Box className="test_instructs_cta">
              <Button className="standard_cta" onClick={()=> setOpenModel(false)}>
               Ok
              </Button>
            </Box>
         
        </DialogContent>
      </Dialog>}
    </>
  );
}
export default ThankYou;