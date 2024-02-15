import {
  Stack,
  Typography,
  Menu,
  Box,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import EditIcon from "@mui/icons-material/Edit";

const EnterAdditionalData = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [dateValue, setDateValue] = useState("");
  const [showEditDate, setEditDate] = useState(true);
  const [timeValue, setTimeValue] = useState("");
  const [showEditTime, setEditTime] = useState(true);

  const [preparingReason, setPreparingReason] = useState("");

  const [showTooltip, setTooltip] = useState("default");
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setEditDate(false);
    setEditTime(false);
  };

  const editField = (id: any) => {
    var elm = document.getElementById(id);
    //@ts-ignore
    if (elm.parentElement.parentElement.classList.contains("readOnlyInput")) {
      //@ts-ignore
      elm.parentElement.parentElement.classList.remove("readOnlyInput");
    }
    //@ts-ignore
    document.getElementById(id).readOnly = false;
  };

  const editDate = () => {
    setEditTime(false);
    setEditDate(true);
  };

  const editTime = () => {
    setEditDate(false);
    setEditTime(true);
  };

  const getTime = (newValue: any) => {
    setTimeValue(newValue);
  };

  const getDate = (newValue: any) => {
    setDateValue(newValue);
  };

  const onSaveClick = async () => {
    try {
      console.log("do something");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(preparingReason, "preparing reason");

  return (
    <>
      <Stack
        id="additional_data"
        aria-controls={open ? "addotional_menu  " : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="setting_flex"
      >
        <Typography className="setting_title">Enter additional data</Typography>
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Stack>
      <Menu
        id="addotional_menu"
        className="addtnl_menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "additional_data",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box className="addtnl_popup">
          <Box className="input_field_mb">
            <Typography className="statement_right_txtfld_lbl">
              What are you preparing for?
            </Typography>
            <TextField
              id="prepare"
              placeholder="What are you preparing for?"
              variant="outlined"
              size="small"
              fullWidth
              multiline
              rows={4}
              value={preparingReason}
              onChange={(e) => setPreparingReason(e.target.value)}
              inputProps={{
                sx: {
                  fontSize: "16px",
                  color: "#5D636B",
                  fontWeight: "400",
                },
              }}
              InputProps={{
                sx: { padding: "0" },
                readOnly: false,
                endAdornment: (
                  <InputAdornment position="end">
                    {/* <EditIcon
                      onClick={() => editField("prepare")}
                      sx={{
                        color: "#989EA5",
                        fontSize: "18px",
                        position: "absolute",
                        right: "15px",
                        bottom: "15px",
                        cursor: "pointer",
                      }}
                    /> */}
                  </InputAdornment>
                ),
              }}
              className="readOnlyInput"
            />
          </Box>
          <Box id="prepCalend" className="input_field_mb">
            <Typography className="statement_right_txtfld_lbl">
              When is the event?
            </Typography>
            {showEditDate ? (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disablePast={true}
                  sx={{ width: "100%" }}
                  format="DD-MM-YYYY"
                  value={dateValue ? dateValue : null}
                  onChange={(newValue) => getDate(newValue)}
                />
              </LocalizationProvider>
            ) : (
              <TextField
                id="date"
                placeholder="DD-MM-YYYY"
                //@ts-ignore
                value={
                  dateValue
                    ? //@ts-ignore
                      dateValue.$D +
                      "-" +
                      //@ts-ignore
                      (dateValue.$M + 1 > 9
                        ? //@ts-ignore

                          dateValue.$M + 1
                        : //@ts-ignore

                          "0" + (dateValue.$M + 1)) +
                      "-" +
                      //@ts-ignore

                      dateValue.$y
                    : ""
                }
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  sx: {
                    fontSize: "16px",
                    color: "#5D636B",
                    fontWeight: "400",
                  },
                }}
                InputProps={{
                  sx: { padding: "0" },
                  readOnly: false,
                  endAdornment: (
                    <InputAdornment position="end">
                      {/* <EditIcon
                        //@ts-ignore
                        onClick={() => editDate("prepare")}
                        sx={{
                          color: "#989EA5",
                          fontSize: "18px",
                          position: "absolute",
                          right: "15px",
                          bottom: "15px",
                          cursor: "pointer",
                        }}
                      /> */}
                    </InputAdornment>
                  ),
                }}
                className="readOnlyInput"
              />
            )}
          </Box>
          <Box id="prepTime" className="input_field_mb">
            <Typography className="statement_right_txtfld_lbl">
              What time is the event?
            </Typography>
            {showEditTime ? (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  sx={{ width: "100%" }}
                  format="HH:mm"
                  ampm={false}
                  value={timeValue ? timeValue : null}
                  onChange={(newValue) => getTime(newValue)}
                />
              </LocalizationProvider>
            ) : (
              <TextField
                id="date"
                placeholder="HH-MM"
                //@ts-ignore
                value={
                  //@ts-ignore
                  timeValue ? timeValue.$H + ":" + timeValue.$m : ""
                }
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  sx: {
                    fontSize: "16px",
                    color: "#5D636B",
                    fontWeight: "400",
                  },
                }}
                InputProps={{
                  sx: { padding: "0" },
                  readOnly: false,
                  endAdornment: (
                    <InputAdornment position="end">
                      {/* <EditIcon
                        //@ts-ignore
                        onClick={() => editTime("prepare")}
                        sx={{
                          color: "#989EA5",
                          fontSize: "18px",
                          position: "absolute",
                          right: "15px",
                          bottom: "15px",
                          cursor: "pointer",
                        }}
                      /> */}
                    </InputAdornment>
                  ),
                }}
                className="readOnlyInput"
              />
            )}
          </Box>
          <Box className="adtnl_data_cta">
            <Button
              className="standard_cta"
              onClick={onSaveClick}
              disabled={!preparingReason || !dateValue || !timeValue}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Menu>
    </>
  );
};

export default EnterAdditionalData;
