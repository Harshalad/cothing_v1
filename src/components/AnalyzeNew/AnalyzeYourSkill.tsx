import { Box, Stack, Typography } from "@mui/material";
import ActiveAssessments from "./ActiveAssessments";
import AvailableAssessments from "./AvailableAssessments";
import Banner from "./Banner";
import CompletedAssessments from "./CompletedAssessments";
import { useEffect, useState } from "react";
import { fetchActiveAssessments } from "../../actions/analyze/fetchActiveAssessments";
import { useSelector } from "react-redux";
import { fetchAvailableAssessments } from "../../actions/analyze/fetchAvailableAssessments";
import { fetchCompletedAssessments } from "../../actions/analyze/fetchCompletedAssessments";
import ViewMore from "./ViewMore";
import { fetchAnalyseAssessments } from "../../actions/analyze/fetchAnalyseAssessments";
import Spinner from "../common/Spinner/Spinner";

const AnalyzeYourSkill = ( {
  activeClass,
  handleActiveClass,
}: any ) => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  console.log( user, "userrr" );
  const [ openViewMore, setOpenViewMore ] = useState( false );
  const [ openBattery, setOpenBattery ] = useState( null );
  const [ groupBattery, setGroupBattery ] = useState( null );
  const [ selfActiveAssessment, setSelfActiveAssessment ] = useState<any>( null );
  const [ selfAvailableAssessment, setSelfAvailableAssessment ] =
    useState<any>( null );
  const [ selfCompletedAssessment, setSelfCompletedAssessment ] =
    useState<any>( null );
  const [ showSppiner, setShowSppiner ] = useState<any>( false );
  const handleSmoothScroll = () => {
    var element = document.getElementById( "compltdassmnts" );
    //@ts-ignore
    element.scrollIntoView( { behavior: "smooth" } );
  };
  useEffect( () => {
    setShowSppiner( true );
    const AnalyseAssessment = async () => {
      const response = await fetchAnalyseAssessments( { userId: user?.id } );
      console.log( response, "allinone" );
      if ( response ) {
        //@ts-ignore
        setSelfActiveAssessment( response?.analyzeAssessments?.active );
        //@ts-ignore
        setSelfAvailableAssessment( response?.analyzeAssessments?.available );
        //@ts-ignore
        setSelfCompletedAssessment( response?.analyzeAssessments?.completed );
      }
      setShowSppiner( false );
    }

    AnalyseAssessment();
    // //fetch active assessment
    // const fetchSelfActiveAssessment = async () => {
    //   const response = await fetchActiveAssessments({ userId: user?.id });
    //   console.log(response,"active assessment");
    //   if (response) {
    //     //@ts-ignore
    //     setSelfActiveAssessment(response?.activeAssessments);
    //   }
    // };
    // const fetchSelfAvailableAssessment = async () => {
    //   const response = await fetchAvailableAssessments({ userId: user?.id });
    //   // console.log(response,"available");
    //   if (response) {
    //     //@ts-ignore
    //     setSelfAvailableAssessment(response?.availableAssessments);
    //   }
    // };
    // const fetchSelfCompletedAssessment = async () => {
    //   const response = await fetchCompletedAssessments({ userId: user?.id });
    //   // console.log(response, "complete");
    //   if (response) {
    //     //@ts-ignore
    //     setSelfCompletedAssessment(response?.completedAssessments);
    //   }
    // };
    // fetchSelfActiveAssessment();
    // fetchSelfAvailableAssessment();
    // fetchSelfCompletedAssessment();
  }, [ activeClass ] );
  const handleOpenViewMore = () => {
    setOpenViewMore( !openViewMore );
  };
  const handleViewBatteryClick = ( battery: any, grpBattery: any ) => {
    console.log( battery, "batteryyyInside" );
    setOpenViewMore( true );
    setOpenBattery( battery );
    setGroupBattery( grpBattery );
  };
  // console.log(selfCompletedAssessment,"Assessment");

  return (
    <>
      { openViewMore ? (
        <ViewMore
          openViewMore={ openViewMore }
          handleOpenViewMore={ handleOpenViewMore }
          openBattery={ openBattery }
          groupBattery={ groupBattery }
          assessment={ groupBattery }
        />
      ) : (
        <>
          <Box className="active_assmnts_contr">
            <Stack className="active_assmnts_hdr_flx">
              <Typography className="active_assmnts_title">
                Active Assessments
              </Typography>
              <Typography
                className="active_assmnts_link"
                onClick={ () => {
                  handleSmoothScroll();
                } }
              >
                View Completed Assessments
              </Typography>
            </Stack>
            { showSppiner ? <Spinner /> : <ActiveAssessments
              activeClass={ activeClass }
              selfActiveAssessment={ selfActiveAssessment }
            /> }
          </Box>
          <Box className="avlbl_assmnts_contr">
            <Typography className="active_assmnts_title">
              Available Assessments
            </Typography>
            <Typography className="avlbl_assmnts_descrpt">
              Use these assessments to assess your skills and behaviours.
            </Typography>
            <Box className="avlbl_assmnts_take">
              <Typography className="avlbl_assmnts_take_title">
                {/* Available Assessments you can take */ }
              </Typography>
              { showSppiner ? <Spinner /> : <AvailableAssessments
                activeClass={ activeClass }
                selfAvailableAssessment={ selfAvailableAssessment }
                handleViewBatteryClick={ handleViewBatteryClick }
              /> }
              {/* <Typography className="active_assmnts_link">
            View More Assessments
          </Typography> */}
            </Box>
          </Box>
          <Banner
            title={ "Seek Feedback" }
            description={
              "Ask for feedback from key stakeholders to gauge progress on skills and behaviour at work."
            }
            ctaText={ "View" }
            handleActiveClass={ handleActiveClass }
            nextClass={ "two" }
          />
          <Box id="compltdassmnts" className="compltd_assmnts_contr">
            <Typography className="active_assmnts_title">
              Completed Assessments
            </Typography>
            { showSppiner ? <Spinner /> : <CompletedAssessments
              activeClass={ activeClass }
              selfCompletedAssessment={ selfCompletedAssessment }
            /> }
          </Box>
        </>
      ) }
    </>
  );
};
export default AnalyzeYourSkill;
