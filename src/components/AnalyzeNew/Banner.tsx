import { Box, Button, Stack, Typography } from "@mui/material";

const Banner = ({
  title,
  description,
  ctaText,
  nextClass,
  handleActiveClass,
}: any) => {
  return (
    <>
      <Box className="seek_fdbck_contr">
        <Stack className="seek_fdbck_flx">
          <Box className="seek_fdbck_info_contr">
            <Typography className="active_assmnts_title">{title}</Typography>
            <Typography className="avlbl_assmnts_descrpt">
              {description}
            </Typography>
          </Box>
          <Box className="schld_survey_cta_contr">
            <Button className="outlined_cta" onClick={()=> handleActiveClass(nextClass)}>{ctaText}</Button>
          </Box>
        </Stack>
      </Box>
    </>
  );
};
export default Banner;