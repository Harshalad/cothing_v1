import { Box, Dialog, DialogContent, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ImageQuestionEnlarge = ({showEnlrQuestModal, closeEnlrQuestModal}: any) => {
  return (
    <>
      <Box>
        <Dialog
          open={showEnlrQuestModal}
          className="img_qst_enlrg_modal"
        >
          <DialogContent>
          <CloseIcon
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                zIndex: "1",
                cursor: "pointer",
              }}
              onClick={() => {
                closeEnlrQuestModal()
              }}
            />
            <Stack className="quest_image_link_flx">
              <Typography className="total_quests">Question</Typography>
              <Typography className="img_download_link">Download Reference File</Typography>
            </Stack>
            <Box className="enlrg_image_contr">
              <img src="../images/image-question.png" alt="image question"></img>
            </Box>
            <Typography className="quests_subtext">Refer below to answer the question</Typography>
            <Typography className="quests_content">
              {/* A recent consumer report brought up a couple of critical insights while
              evaluating performance drivers of e-commerce platforms for the grocery segment - <br /><br />
              i. Consumers will continue to show good interest in shopping for groceries
              and will expect more value from loyalty programs' point of view.<br /><br />
              ii. Wide product range, availability status if not available,
              higher discount margins, order fulfilment in time, returns management
              are the top 5 criteria for creating repeat customers on an e-commerce platform. */}
            </Typography>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
}
export default ImageQuestionEnlarge;