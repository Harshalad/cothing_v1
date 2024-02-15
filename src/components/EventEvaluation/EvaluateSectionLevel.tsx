import { Box, Stack, Typography } from "@mui/material";
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import { useEffect, useState } from "react";

const EvaluateSectionLevel = ({
  testDetails,
  handleCurrSecIndex,
  currSecIndex,
}: any) => {
  const [sections, setSections] = useState<any>(null);
  useEffect(()=>{
    setSections(testDetails?.sections);
  },[testDetails])

  const currSection = sections?sections[currSecIndex]:null;
  return (
    <Box className="eval_sect_lvl_contr">
      <Stack className="eval_sect_lvl_flex">
        <Stack className="sect_lvl_left_flex disabled">
          <KeyboardDoubleArrowLeftRoundedIcon className="sect_lvl_left_icon disabled" />
          <Typography className="sect_lvl_left_txt disabled" onClick={()=> handleCurrSecIndex(-1)}>
            Previous section
          </Typography>
        </Stack>

        <Box className="sect_lvl_center_flex">
          <Typography className="sect_lvl_title">
            {currSecIndex + 1}. {currSection?.name}
          </Typography>
        </Box>

        <Stack className="sect_lvl_right_flex disabled">
          <Typography className="sect_lvl_right_txt disabled" onClick={()=> handleCurrSecIndex(1)}>
            Next section
          </Typography>
          <KeyboardDoubleArrowRightRoundedIcon className="sect_lvl_right_icon disabled" />
        </Stack>
      </Stack>
    </Box>
  );
};
export default EvaluateSectionLevel;