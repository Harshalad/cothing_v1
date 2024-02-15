import { Box, Button, Dialog, DialogContent, Stack, Typography } from "@mui/material";
import { useState } from "react";

const FileOverwriteModal = () => { //{showModal, closeConfirmModal}: any

  // const [showConfirmModal, setConfirmModal] = useState(false);

  // const handleTestConfirm = () => {
  //   setConfirmModal(true);
  // };

  // const closeConfirmModal = () => {
  //   setConfirmModal(false);
  // };

  // onClick={handleSubmit}
  // onClick={() => closeConfirmModal(false) }

  return (
    <>
      <Dialog
        open={false} //showModal
        className="confirm_modal file_upload_modal"
      >
        <DialogContent>
          <Typography className="confirm_modal_title">
            It will overwrite your previously uploaded file.
            Please confirm to proceed
          </Typography>
          <Stack className="confirm_modal_cta_flex">
            <Box className="test_instructs_cta">
              <Button className="outlined_cta">Cancel</Button> 
            </Box>
            <Box className="test_instructs_cta">
              <Button className="standard_cta">Confirm</Button>
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default FileOverwriteModal;