import { Box, Stack, Typography } from "@mui/material";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

const AddViewQuestion = () => {

  return (
    <>
      <Stack className="dstudio_quest_flx">
        <Stack className="new_quest_flx">
          <Typography className="new_quest_txt">New Question</Typography>
          <AddCircleOutlineRoundedIcon sx={{color: "#2E5DB0"}} />
        </Stack>
        <Stack className="view_quest_flx">
          <Typography className="view_quest_txt">View list of questions</Typography>
          <ChevronRightRoundedIcon sx={{color: "#1C2129"}} />
        </Stack>
      </Stack>
    </>
  );
};
export default AddViewQuestion;