import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import SkillHeading from './SkillHeading';

const PersonalStatistics = () => {

  const totalSlides = 2; //Array count

  const [current, setCurrent] = useState(0);
  const refText = useRef(null);
  const refDots = useRef(null);
  
  const nextSlide = () => {
    if (current >= totalSlides) {
      setCurrent(0);
    }
    else {
      setCurrent(current + 1);
    }
  }
  
  const prevSlide = () => {
    if (current === 0) {
      setCurrent(2);
    }
    else {
      setCurrent(current - 1);
    }
  }

  const desired = (e: any) => {
    setCurrent(Number(e.target.id));
  }

  useEffect(() => {
    //@ts-ignore
    refText.current.style.transition = 'all 0.5s ease-in-out';
    //@ts-ignore
    refDots.current.style.transition = 'all 0.5s ease-in-out';
    //@ts-ignore
    refText.current.style.transform = `translateX(-${current}00%)`;
    //@ts-ignore
    refDots.current.style.transform = `translateX(-${current}00%)`;
  }, [current]);

  return (
    <>
      <Stack className="prsnl_stat_top_flx">
        <Box className="prsnl_stat_top_contr left_box">
          <Typography className="slider_title">Major Improvement Areas</Typography>
          <Typography className="avlbl_assmnts_card_descrpt prsnl_stat_left_subtext">
            Skills you need to work on and up your score. text
          </Typography>
          <Stack className="prsnl_stat_flx">
            <Avatar
              sx={{
                width: "40px",
                height: "40px",
                bgcolor: "#989EA5",
                color: "#FFFFFF",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              3.6
            </Avatar>
            <Box>
              <Typography className="avlbl_assmnts_card_title">Employee Involvement</Typography>
              <Typography className="avlbl_assmnts_card_descrpt">Lorem ipsum dolor sit amet consectetur.</Typography>
            </Box>
          </Stack>
          <Stack className="prsnl_stat_flx">
            <Avatar
              sx={{
                width: "40px",
                height: "40px",
                bgcolor: "#989EA5",
                color: "#FFFFFF",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              4.2
            </Avatar>
            <Box>
              <Typography className="avlbl_assmnts_card_title">Managing Stakeholder Relationships</Typography>
              <Typography className="avlbl_assmnts_card_descrpt">Lorem ipsum dolor sit amet consectetur.</Typography>
            </Box>
          </Stack>
        </Box>
        <Box className="prsnl_stat_top_contr">
          <Stack className="slider_heading_flx">
            <Typography className="slider_title">Recommended Goals <span className="slider_counter">({current + 1} of {totalSlides + 1})</span></Typography>
            <Typography className="all_rcmnd_gaols">View All</Typography>
          </Stack>
          <Box className="rcmnd_goals_slider_contr">
            <Box className="slider_contr">
              <Box className="slider_flx" ref={refText}>
                <Box className="slider_contnt">
                  <Typography className="avlbl_assmnts_card_title">
                    Build Emotional Intelligence to regulate oneself and build stakeholder relationships
                  </Typography>
                  <Typography className="avlbl_assmnts_card_descrpt">
                    Collaborate effectively with key stakeholders to drive improved business results.
                    Promote open communication, mutual understanding, and shared goals.
                    Leverage collective expertise and resources for success in achieving org.
                  </Typography>
                  <Typography className="active_assmnts_totl_quests">
                    Skills evaluated :  Skill Utilized | Data Driven | Emotional Intelligence | Category Growth Management
                  </Typography>
                </Box>
                <Box className="slider_contnt">
                  <Typography className="slider_subtext">
                    Based2 on the assurance feedback, 
                    here are the possible goals that might help 
                    you improve on these your low scoring areas.
                  </Typography>
                </Box>
                <Box className="slider_contnt">
                  <Typography className="slider_subtext">
                    Based3 on the assurance feedback, 
                    here are the possible goals that might help 
                    you improve on these your low scoring areas.
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Stack className="slider_cta_flx">
              <Box className="slider_add_goal_contr">
                <Box className="slider_add_goal_flx" ref={refDots}>
                  <Box className="slider_knw_mor_contr">
                    <Button className='standard_cta'>Add Goal1</Button>
                  </Box>
                  <Box className="slider_knw_mor_contr">
                    <Button className='standard_cta'>Add Goal2</Button>
                  </Box>
                  <Box className="slider_knw_mor_contr">
                    <Button className='standard_cta'>Add Goal3</Button>
                  </Box>
                </Box>
              </Box>
              <Stack className="slider_nxt_prv_flx">
                <Avatar
                  sx={{
                    width: "24px",
                    height: "24px",
                    bgcolor: "#3E4248",
                    color: "#FFFFFF",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                  onClick={prevSlide}
                >
                  <NavigateBeforeRoundedIcon />
                </Avatar>
                <Avatar
                  sx={{
                    width: "24px",
                    height: "24px",
                    bgcolor: "#3E4248",
                    color: "#FFFFFF",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                  onClick={nextSlide}
                >
                  <NavigateNextRoundedIcon />
                </Avatar>
              </Stack>
            </Stack>
            {/* <Box className='slider_dots_cta_contr'>
              {[...Array(totalSlides + 1)].map((num, index) => (
                <Typography
                  className={`slider_dots_cta ${index === current && 'active_slide'}`}
                  id={index.toString()}
                  key={index}
                  onClick={desired}
                >
                </Typography>
              ))}
            </Box> */}
          </Box>
        </Box>
      </Stack>
      <Box className="active_assmnts_contr skill_heading_contr">
        <Stack className="active_assmnts_hdr_flx">
          <Typography className="active_assmnts_title">Skill Heading</Typography>
        </Stack>
        <SkillHeading />
      </Box>
    </>
  );
}
export default PersonalStatistics;