import {
  Box,
  Typography,
  Rating,
  Stack,
  Divider,
  Collapse,
  TextField,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

const AskComp = ({ viewAskRating, showPrepAsk, closePrepAsk }: any) => {
  const [value, setValue] = useState("manager");

  const radioTab = (event: any) => {
    setValue(event.target.value);
  };

  const askRating = () => {};
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
  return (
    <>
      {/* Ask Rating */}
      <Box className="prep_ask_rating_box">
        <Stack className="prep_askrtng_hdr_flx">
          <Typography className="prep_ask_rating_title">
            {showPrepAsk === true ? "What would you like to ask?" : "Rating"}
          </Typography>
          <Typography
            className="prep_ask_rating_cancl"
            onClick={() => {
              showPrepAsk === true ? closePrepAsk(false) : viewAskRating(false);
            }}
          >
            Cancel
          </Typography>
        </Stack>
        <Box className="algn_askqust_txtfld">
          <TextField
            id="aligngl_cmnt_txtfld"
            placeholder="Write your reason here..."
            variant="outlined"
            size="small"
            fullWidth
            inputProps={{ sx: { fontSize: "14px", color: "#1C2129" } }}
          />
        </Box>
        <Box className="prep_ask_rtng_compltn">
          <Typography className="prep_askrtng_submt_title">
            The completed preparation will be sent to the {user?.noAlignRequired?"": "manager and"} expert
          </Typography>
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="start"
            gap="15px"
            mb="24px"
          >
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="manager-achieve"
                name="prep-mngr-exprt-feedback"
                value={value}
                onChange={radioTab}
              >
                <FormControlLabel
                  value="manager"
                  control={
                    <Radio
                      size="small"
                      sx={{
                        color: "#989EA5",
                        "&.Mui-checked": { color: "#F58A43" },
                      }}
                    />
                  }
                  label="Mathew (Manager)"
                  className="prep_mngr_exprt_radiolbl"
                />
                <FormControlLabel
                  value="expert"
                  control={
                    <Radio
                      size="small"
                      sx={{
                        color: "#989EA5",
                        "&.Mui-checked": { color: "#F58A43" },
                      }}
                    />
                  }
                  label="NWORX Expert"
                  className="prep_mngr_exprt_radiolbl"
                />
              </RadioGroup>
            </FormControl>
          </Stack>
        </Box>
        <Box className="standard_cta_box">
          <Button className="standard_cta" onClick={() => askRating()}>
            Done
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default AskComp;
