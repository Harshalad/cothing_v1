import { Box, Stack, TextField, Typography, Alert, Snackbar, Button } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useState } from "react";

const TestInformation = () => {

  const [files, setFiles] = useState<any[]>([]);
  const [showSnackbar, setSnackbar] = useState(false);

  const handleDrop = (event: any) => {
    event.preventDefault();
    const { files } = event.dataTransfer;
    if (files.length > 0) {
      setFiles([files]);
    }
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
  }

  const handleDragStart = (event: any) => {
    event.dataTransfer.setData("text/plain", event.target.id)
  }

  const uploadFiles = (e: any) => {
    if (e.target.files.length !== 0) {
      //@ts-ignore
      var imageVal = document.getElementById("browse_files").value;
      var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.svg)$/i;
      if (!allowedExtensions.exec(imageVal)) {
        setSnackbar(true);
      }
      else {
        const files = e.target.files;
        if (files.length > 0) {
          setFiles([files]);
        }
        setSnackbar(false);
      }
    }
    else {
    }
  }

  const closeSnackbar = () => {
    setSnackbar(false);
  }

  return (
    <>
      <Box>
        <Typography className="test_info_title">Test Information</Typography>
        <Box className="test_info_input_contr">
          <Stack className="test_info_input_flx">
            <Typography className="test_info_input_label">
              Test Title
            </Typography>
            <TextField
              placeholder="Test Title"
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
              Test Duration
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker format="HH:mm" ampm={false} />
            </LocalizationProvider>
          </Stack>
          <Stack className="test_info_input_flx">
            <Typography className="test_info_input_label">
              Add Logo Link
            </Typography>
            <Box
              className="file_upload_area logo_upload"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Box draggable="true" onDragStart={handleDragStart}>
                <Box className="browse_file_area">
                  <Typography className="upload_file_top_text">
                    Drag and drop to upload
                  </Typography>
                  <Typography className="upload_file_top_text">or</Typography>
                  <label
                    htmlFor="browse_files"
                    className="upload_file_cta logo_cta"
                  >
                    <Box className="outlined_cta">Browse Files</Box>
                  </label>
                  <input
                    hidden
                    accept=".png, .jpg, .jpeg, .svg"
                    type="file"
                    id="browse_files"
                    onChange={(e) => uploadFiles(e)}
                  />
                  {/* <Typography className="upload_file_bottom_text">Maximum file size : 1GB</Typography>
                    <Typography className="upload_file_bottom_text">Supported file types : JPG/JPEG, PNG, SVG</Typography> */}
                  <Snackbar
                    open={showSnackbar}
                    onClose={closeSnackbar}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <Alert onClose={closeSnackbar} severity="error">
                      Accepted Format: .png, .jpg, .jpeg.
                    </Alert>
                  </Snackbar>
                </Box>
                <Box>
                  <ul>
                    {files.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </Box>
              </Box>
              <TextField
                placeholder="Type link here"
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  sx: {
                    fontWeight: "500",
                    fontSize: "16px",
                    color: "#3E4248",
                  },
                }}
                sx={{marginTop: "24px"}}
              />
            </Box>
          </Stack>
          <Stack className="test_info_input_flx">
            <Typography className="test_info_input_label">
              Add Test Instructions
            </Typography>
            <TextField
              multiline
              rows={4}
              placeholder="Test instructions...."
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
          <Box className="d_studio_cta">
            <Button className="standard_cta">Next</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default TestInformation;