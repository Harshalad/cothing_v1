import { Box, Stack, TextField, Typography, Button } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const SectionInformation = () => {

  return (
    <>
      <Box>
        <Box className="test_info_input_contr">
          <Stack className="test_info_input_flx">
            <Typography className="test_info_input_label">
              Section Title
            </Typography>
            <TextField
              placeholder="Section Title"
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{
                sx: {
                  fontSize: "16px",
                  color: "#3E4248",
                  fontWeight: "500",
                },
              }}
            />
          </Stack>
          <Stack className="test_info_input_flx">
            <Typography className="test_info_input_label">
              Duration
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker format="HH:mm" ampm={false} />
            </LocalizationProvider>
          </Stack>
          <Stack className="test_info_input_flx">
            <Typography className="test_info_input_label">
              Section Instructions
            </Typography>
            <TextField
              multiline
              rows={4}
              placeholder="Section instructions...."
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{
                sx: {
                  fontSize: "16px",
                  color: "#3E4248",
                  fontWeight: "500",
                },
              }}
            />
          </Stack>
          <Stack className="test_info_input_flx">
            <Typography className="test_info_input_label">
              Section ID
            </Typography>
            <TextField
              placeholder="Section ID"
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{
                sx: {
                  fontSize: "16px",
                  color: "#3E4248",
                  fontWeight: "500",
                },
              }}
            />
          </Stack>
          <Stack className="test_info_input_flx">
            <Typography className="test_info_input_label">
              Competency
            </Typography>
            <TextField
              placeholder="Competency"
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{
                sx: {
                  fontSize: "16px",
                  color: "#3E4248",
                  fontWeight: "500",
                },
              }}
            />
          </Stack>
          <Stack className="test_info_input_flx">
            <Typography className="test_info_input_label">
              Sub-Competency
            </Typography>
            <TextField
              placeholder="Sub-Competency"
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{
                sx: {
                  fontSize: "16px",
                  color: "#3E4248",
                  fontWeight: "500",
                },
              }}
            />
          </Stack>
          <Stack className="test_info_input_flx">
            <Typography className="test_info_input_label">
              Level
            </Typography>
            <TextField
              placeholder="Level"
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{
                sx: {
                  fontSize: "16px",
                  color: "#3E4248",
                  fontWeight: "500",
                },
              }}
            />
          </Stack>
          <Typography className="section_note_txt">Note: Sequence of sections will change based on ui movement.</Typography>
          <Box className="d_studio_cta">
            <Button className="standard_cta">Next</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default SectionInformation;