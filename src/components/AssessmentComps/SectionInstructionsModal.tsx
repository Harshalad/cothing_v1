import { Box, Button, Dialog, DialogContent } from "@mui/material";
import SectionInstructions from "./SectionInstructions";
import React from "react";
import router, { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
const SectionInstructionsModal = ({
  comingFrom,
  showSectInstructs,
  closeSectInstructsModal,
  currSectionIndex,
}: any) => {
  const router = useRouter();
  const testId = router?.query?.id;
  const handleContinueClick = () => {
    closeSectInstructsModal(false);
    if (comingFrom === "test") {
      router.push({
        pathname:"/assessment/question",
        query:{
          id:testId
        }
      });
    }
  };

  return (
    <>
      <Dialog open={showSectInstructs} className="test_instructs_modal sect_instructs_modal">
        <DialogContent>
          <SectionInstructions
            // showSectInstructs={showSectInstructs}
            currentSectionIndex={currSectionIndex}
          />
          <Box className="test_instructs_cta">
            <Button
              className="standard_cta"
              onClick={() => handleContinueClick()}
            >
              {comingFrom == "test" ? "Continue" : "Close"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default SectionInstructionsModal;
