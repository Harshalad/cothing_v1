import {
  Box,
  Button,
  Checkbox,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const AlignGoalModify = ({
  open,
  closeAlignGoalModify,
  alignGoalId,
  goalTitle,
  goalSubTitle,
}: any) => {
  const [showMonths, setMonths] = useState(false);
  const [showSelectedMonth, setSelectedMonth] = useState<any>(false);
  const [value, setValue] = useState<any>(dayjs(new Date()));
  const ref = useRef<any>(null);

  const months = ["1 month", "2 month", "3 month", "4 month", "5 month"];

  const getMonths = (e: any) => {
    if (e !== undefined) {
      ref.current.focus();
      var dropdownMonths = document.querySelectorAll(".dropdown_text");
      // for (let month of dropdownMonths) {
      //     month.style.color = "#5D636B";
      // }
      e.target.style.color = "#1C2129";
      setSelectedMonth(e.target.attributes.value.value);
      var dateSelected = (
        document.getElementById("selectedDateField") as HTMLInputElement
      ).innerText
        ? (document.getElementById("selectedDateField") as HTMLInputElement)
            .innerText
        : new Date();
      var formatedDate = new Date(dateSelected);
      var newDate = new Date(
        formatedDate.setMonth(
          formatedDate.getMonth() + parseInt(e.target.attributes.value.value)
        )
      );
      var newFormatedDate = newDate.toLocaleDateString("en-GB");
      (document.getElementById("endDate") as HTMLInputElement).value =
        newFormatedDate.replace(/\//g, "-");
    }
  };

  const getDate = (newValue: any) => {
    setValue(newValue);
    (
      document.getElementById("selectedDateField") as HTMLInputElement
    ).innerHTML = newValue.$d;
    if (showSelectedMonth !== false && showSelectedMonth !== "") {
      var dateSelected = (
        document.getElementById("selectedDateField") as HTMLInputElement
      ).innerText
        ? (document.getElementById("selectedDateField") as HTMLInputElement)
            .innerText
        : new Date();
      var formatedDate = new Date(dateSelected);
      var newDate = new Date(
        formatedDate.setMonth(
          formatedDate.getMonth() + parseInt(showSelectedMonth)
        )
      );
      var newFormatedDate = newDate.toLocaleDateString("en-GB");
      (document.getElementById("endDate") as HTMLInputElement).value =
        newFormatedDate.replace(/\//g, "-");
    }
  };

  const handleOutSideClick = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setMonths(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutSideClick);
    return () => document.removeEventListener("mousedown", handleOutSideClick);
  }, []);

  return (
    <>
      <Box className="popup_right_box">
        <Box
          className="mngralgn_askquest_back"
          onClick={() => closeAlignGoalModify(false)}
        >
          <Typography
            sx={{ fontWeight: "500", color: "#2D3648", marginBottom: "24px" }}
            className="go_back_flex"
          >
            <ChevronLeftIcon /> Go Back
          </Typography>
        </Box>

        <Stack>
          <Box>
            <Box>
              <Box sx={{ marginBottom: "40px" }}>
                <article className="popup_txtfld_lbl">Goal Title</article>
                <TextField
                  placeholder="Goal Title"
                  variant="outlined"
                  size="small"
                  fullWidth
                  inputProps={{
                    sx: {
                      fontSize: "16px",
                      color: "#1C2129",
                      fontWeight: "500",
                    },
                  }}
                />
              </Box>
              <Box sx={{ marginBottom: "40px" }}>
                <article className="popup_txtfld_lbl">
                  Goal Description&#x2A;
                </article>
                <TextField
                  placeholder="Please write your goal description here..."
                  variant="outlined"
                  size="small"
                  fullWidth
                  multiline
                  rows={7}
                  inputProps={{
                    sx: {
                      fontSize: "16px",
                      color: "#1C2129",
                      fontWeight: "500",
                    },
                  }}
                  InputProps={{
                    sx: { padding: "0" },
                  }}
                />
              </Box>
            </Box>
            <Stack flexDirection="row" alignItems="center" gap="30px">
              <Box className="manager_select_box">
                <Typography className="popup_txtfld_lbl">
                  Start Date&#x2A;
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    format="DD-MM-YYYY"
                    disablePast={true}
                    slotProps={{
                      textField: {
                        id: "startDate",
                      },
                    }}
                    value={value}
                    onChange={(newValue) => getDate(newValue)}
                  />
                </LocalizationProvider>
              </Box>
              <input type="hidden" id="selectedDateField" value=""></input>
              <Box sx={{ position: "relative" }} className="manager_select_box">
                <Typography className="popup_txtfld_lbl">Duration</Typography>
                <Box ref={ref}>
                  <TextField
                    id="duration"
                    placeholder="Select"
                    variant="outlined"
                    size="small"
                    fullWidth
                    inputRef={ref}
                    inputProps={{
                      sx: {
                        fontSize: "16px",
                        color: "#1C2129",
                        fontWeight: "500",
                        cursor: "pointer",
                      },
                    }}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{ color: "#C8CDD4" }}
                        >
                          {showMonths ? (
                            <KeyboardArrowUpIcon style={{ color: "#3E4248" }} />
                          ) : (
                            <KeyboardArrowDownIcon
                              style={{ color: "#3E4248" }}
                            />
                          )}
                        </InputAdornment>
                      ),
                      sx: { cursor: "pointer" },
                    }}
                    value={showSelectedMonth ? showSelectedMonth : "Select"}
                    onClick={() => {
                      setMonths(!showMonths);
                    }}
                  />
                  <Box
                    className="dropdown profile_dropdown"
                    sx={{ display: showMonths ? "block" : "none" }}
                  >
                    {months.map((month) => (
                      <Stack
                        key={month}
                        gap="10px"
                        flexDirection="row"
                        alignItems="center"
                        className="dropdown_inner"
                        onClick={getMonths}
                      >
                        <Typography
                          className="dropdown_text"
                          sx={{
                            color: "#5D636B",
                            fontSize: "16px",
                            width: "100%",
                            textAlign: "left",
                            padding: "8px 5px",
                          }}
                          //value={month.replace(/\D/g, '')}
                        >
                          {month}
                        </Typography>
                      </Stack>
                    ))}
                  </Box>
                </Box>
              </Box>
              <Box className="manager_select_box">
                <article className="popup_txtfld_lbl">End Date</article>
                <TextField
                  id="endDate"
                  placeholder="End Date"
                  variant="outlined"
                  size="small"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  inputProps={{
                    sx: {
                      fontSize: "16px",
                      color: "#1C2129",
                      fontWeight: "500",
                    },
                  }}
                  className="readOnlyInput"
                />
              </Box>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              mt="30px"
              mb="30px"
              sx={{ marginLeft: "auto" }}
            >
              <Typography
                className="popup_txtfld_lbl"
                sx={{ marginBottom: "0 !important" }}
              >
                Top Priority
              </Typography>
              <Checkbox
                id="checkbox"
                sx={{
                  padding: "0",
                  color: "#EAECEF",
                  "&.Mui-checked": {
                    color: "#2E5DB0",
                  },
                }}
              />
            </Stack>
          </Box>
          <Box sx={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              sx={{
                color: "#FFFFFF",
                backgroundColor: "#F58A43",
                boxShadow: "none",
                "&:hover": { backgroundColor: "#F58A43", boxShadow: "none" },
                textTransform: "none",
                width: "250px !important",
                margin: "0 auto",
              }}
            >
              Edit Goal
            </Button>
          </Box>
        </Stack>
      </Box>
    </>
  );
};
export default AlignGoalModify;
