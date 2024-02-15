import { Box, Stack, Typography } from "@mui/material";
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';

const EvaluateSectionLevel = ({
  testDetails,
  handleSectionIndex,
  currentSectionIndex,
}: any) => {
  return (
    <Box className="eval_sect_lvl_contr">
      <Stack className="eval_sect_lvl_flex">
        <Stack className="sect_lvl_left_flex disabled">
          <KeyboardDoubleArrowLeftRoundedIcon className="sect_lvl_left_icon disabled" />
          <Typography
            className="sect_lvl_left_txt disabled"
            style={{ cursor: "pointer" }}
            onClick={() => handleSectionIndex(-1)}
          >
            Previous section
          </Typography>
        </Stack>

        <Box className="sect_lvl_center_flex">
          <Typography className="sect_lvl_title">
            {currentSectionIndex + 1}.{" "}
            {testDetails?.sections[currentSectionIndex]?.name}
          </Typography>
        </Box>

        <Stack className="sect_lvl_right_flex disabled">
          <Typography
            className="sect_lvl_right_txt disabled"
            style={{ cursor: "pointer" }}
            onClick={() => handleSectionIndex(1)}
          >
            Next section
          </Typography>
          <KeyboardDoubleArrowRightRoundedIcon className="sect_lvl_right_icon disabled" />
        </Stack>
      </Stack>
    </Box>
  );
};
export default EvaluateSectionLevel;