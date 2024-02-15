import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import { useSelector } from "react-redux";
import SectionInstructionsModal from "./SectionInstructionsModal";
const SectionLevel = ({
  currSectionIndex,
  currQuestionIndex,
  handleSetCurrSectionIndex,
  showSectInstructs,
  openSectInstructsModal,
  closeSectInstructsModal,
  handleSetCurrQuestionIndex,
}: any) => {
  //@ts-ignore
  const sections = useSelector((state) => state?.assessment?.sections);
  //@ts-ignore
  const testDetail = useSelector((state) => state?.assessment?.testDetails);
  let currSection: any;
  if (sections) {
    currSection = sections[currSectionIndex];
  }

  const handlePreviousClick = () => {
    handleSetCurrSectionIndex(-1);
    handleSetCurrQuestionIndex(0);
  };
  const handleNextClick = () => {
    handleSetCurrSectionIndex(1);
    handleSetCurrQuestionIndex(0);
  };

  console.log(testDetail, "length");
  return (
    <>
      <Box className="sect_lvl_contr">
        <Stack className="sect_lvl_contr_flex">
          <Stack className="sect_lvl_left_flex disabled">
            {currSectionIndex >= 1 && (
              <>
                <KeyboardDoubleArrowLeftRoundedIcon
                  className="sect_lvl_left_icon disabled"
                  onClick={() => handlePreviousClick()}
                />
                <Typography
                  className="sect_lvl_left_txt disabled"
                  onClick={() => handlePreviousClick()}
                >
                  Previous section
                </Typography>
              </>
            )}
          </Stack>

          <Box className="sect_lvl_center_flex">
            <Typography className="sect_lvl_title">
              {currSectionIndex + 1}. {currSection?.name}
            </Typography>
            {currSection?.description !=="NA" && <Typography
              className="view_test_instructs_cta"
              onClick={() => openSectInstructsModal()}
            >
              View {testDetail?.sectionLabelSingular} Instructions
            </Typography>}
          </Box>

          <Stack className="sect_lvl_right_flex disabled">
            {currSectionIndex + 1 < sections?.length && (
              <>
                <Typography
                  className="sect_lvl_right_txt disabled"
                  onClick={() => handleNextClick()}
                >
                  Next section
                </Typography>
                <KeyboardDoubleArrowRightRoundedIcon
                  className="sect_lvl_right_icon disabled"
                  onClick={() => handleNextClick()}
                />
              </>
            )}
          </Stack>
        </Stack>
      </Box>
      <SectionInstructionsModal
        currSectionIndex={currSectionIndex}
        showSectInstructs={showSectInstructs}
        closeSectInstructsModal={closeSectInstructsModal}
      />
    </>
  );
};
export default SectionLevel;
