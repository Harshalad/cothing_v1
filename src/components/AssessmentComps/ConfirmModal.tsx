import { Box, Button, CircularProgress, Dialog, DialogContent, Stack, Typography } from "@mui/material";
import { submitUserTest, submitUserTestRedux } from "../../actions/assessment/submitTest";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import TestInstructionsModal from "./TestInstructionsModal";
import Spinner from "../common/Spinner/Spinner";
import { useEffect, useState } from "react";
import { AsyncThunkAction, Dispatch, AnyAction } from "@reduxjs/toolkit";

const ConfirmModal = ( { showModal, closeConfirmModal }: any ) => {
  //@ts-ignore
  const router = useRouter();
  const testId = router?.query?.id;
  const userTestMapId = testId;
  const dispatch = useDispatch();
  //@ts-ignore
  const testDetails = useSelector( ( state ) => state?.assessment?.testDetails )
  const [ spinner, setSpinner ] = useState<any>( false );

  //@ts-ignore
  let attemptNo = useSelector( ( state ) => state?.assessment?.attemptNo ) + "";
  // const router = useRouter();
  const handleSubmit = async () => {
    setSpinner( true );
    const response = await submitUserTest( {
      userTestMapId: userTestMapId,
      autoSubmitted: false,
    } );
    console.log( response, 'submitresponse' );
    if ( response ) {
      //@ts-ignore
      router.push( { pathname: "/assessment/thank-you", query: { score: response?.response } } )
      // router.push("/assessment/thank-you");
    }
    setSpinner( false );
  };

  return (
    <>
      <Dialog open={ showModal } className="confirm_modal">
        <DialogContent>
          <Typography className="confirm_modal_title">
            Are you sure you want to submit{ testDetails?.assessmentLabelSingular ? `your ${ testDetails?.assessmentLabelSingular.toLowerCase() }` : "" }?
          </Typography>
          <Stack className="confirm_modal_cta_flex">
            <Box className="test_instructs_cta">
              <Button
                className="secondary_cta"
                onClick={ () => closeConfirmModal( false ) }
              >
                Cancel
              </Button>
            </Box>
            <Box className="test_instructs_cta">
              <Button className="standard_cta" onClick={ handleSubmit }>
                Submit { "  " } { spinner && <CircularProgress style={ { color: "#FFFFFF" } } /> }
              </Button>
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default ConfirmModal;

