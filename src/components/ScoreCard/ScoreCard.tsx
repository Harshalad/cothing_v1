import { Helmet, HelmetProvider } from "react-helmet-async";
import HeaderNav from "../common/HeaderNav/HeaderNav";
import { Box, Button, Stack, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const drawerWidth = 250;

const ScoreCard = () => {

  return (
    <>
      <Box className="score_card_section">
        <HelmetProvider>
          <Helmet>
            <title>NWORX | Score Card</title>
          </Helmet>
        </HelmetProvider>
        <HeaderNav />
        <Box
          component="main"
          sx={{
            width: { tablet: `calc(100% - ${drawerWidth}px)` },
            ml: { tablet: "auto" },
            marginLeft: "250px",
          }}
        >
          <Box
            sx={{ backgroundColor: "#EAECEF", padding: "112px 32px 32px" }}
          >
            <Typography
              //@ts-ignore
              variant="span"
              sx={{
                fontWeight: "500",
                color: "#2D3648",
                marginBottom: "24px",
                cursor: "pointer",
              }}
              className="go_back_flex"
            >
              <ChevronLeftIcon /> Go Back
            </Typography>
            <Box className="score_card_contr">
              <Stack className="score_card_flx">
                <Box className="score_card_img">
                  <img src="../images/great-job.png" alt="great job" width={481} height={360}></img>
                </Box>
                <Box className="score_card_contnt">
                  <Typography className="score_card_title">Great Job</Typography>
                  <Typography className="score_card_txt">You have scored <span className="kudos">9</span> out of 10 on this assessment name</Typography>
                  <Button className="standard_cta">Back</Button>
                </Box>
              </Stack>
              <Stack className="score_card_flx">
                <Box className="score_card_img">
                  <img src="../images/try-again.png" alt="great job" width={481} height={360}></img>
                </Box>
                <Box className="score_card_contnt">
                  <Typography className="score_card_title">Oops, Try Again</Typography>
                  <Typography className="score_card_txt">You have scored <span className="try_again">5</span> out of 10 on this assessment name</Typography>
                  <Button className="standard_cta">Try Again</Button>
                </Box>
              </Stack>
              <Stack className="score_card_flx">
                <Box className="score_card_img">
                  <img src="../images/no-attempts-left.png" alt="great job" width={481} height={360}></img>
                </Box>
                <Box className="score_card_contnt">
                  <Typography className="score_card_title">Not a good job, no attempts left</Typography>
                  <Typography className="score_card_txt">You have scored <span className="no_attempts_left">3</span> out of 10 on this assessment name</Typography>
                  <Button className="standard_cta">Back</Button>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
export default ScoreCard;