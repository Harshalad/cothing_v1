import { Box, Button, Dialog, DialogContent } from "@mui/material";
import TestInstructions from "./TestInstructions";
import React from "react";

const TestInstructionsModal = ({
  showTestInstructs,
  closeTestInstructsModal,
}: any) => {
  return (
    <>
      <Dialog
        open={showTestInstructs?.showTestInstructs}
        className="test_instructs_modal"
      >
        <DialogContent>
          <TestInstructions showTestInstructs={showTestInstructs}/>
          <Box className="test_instructs_cta">
            <Button
              className="standard_cta"
              onClick={() => closeTestInstructsModal(false)}
            >
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default TestInstructionsModal;
