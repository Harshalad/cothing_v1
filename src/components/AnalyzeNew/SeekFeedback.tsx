import { Box, Stack, Typography } from "@mui/material";
import ActiveAssessments from "./ActiveAssessments";
import AvailableAssessments from "./AvailableAssessments";
import Banner from "./Banner";
import CompletedAssessments from "./CompletedAssessments";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchActiveSeekMRA } from "../../actions/analyze/fetchActiveSeekMRA";
import { fetchAvailableSeekMRA } from "../../actions/analyze/fetchAvailableSeekMRA";
import { fetchCompletedSeekMRA } from "../../actions/analyze/fetchCompletedSeekMRA";
import { fetchAnalyseSeekMRA } from "../../actions/analyze/fetchAnalyseSeekMRA";
import Spinner from "../common/Spinner/Spinner";

const SeekFeedback = ( { activeClass, handleActiveClass }: any ) => {
  // @ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  console.log( user, "userrr" );

  const [ seekActiveAssessment, setSeekActiveAssessment ] = useState<any>( null );
  const [ seekAvailableAssessment, setSeekAvailableAssessment ] =
    useState<any>( null );
  const [ seekCompletedAssessment, setSeekCompletedAssessment ] =
    useState<any>( null );
  const [ showSppiner, setShowSppiner ] = useState<any>( false );
  const handleSmoothScroll = () => {
    var element = document.getElementById( "compltdassmnts" );
    //@ts-ignore
    element.scrollIntoView( { behavior: "smooth" } );
  };

  useEffect( () => {
    setShowSppiner( true );
    const AnalyseSeekMRA = async () => {
      const response = await fetchAnalyseSeekMRA( { userId: user?.id } );
      console.log( response, "seekMRAallinOne" );
      if ( response ) {
        //@ts-ignore
        setSeekActiveAssessment( response?.analyzeSeekMRA?.active );
        //@ts-ignore
        setSeekAvailableAssessment( response?.analyzeSeekMRA?.available );
        //@ts-ignore
        setSeekCompletedAssessment( response?.analyzeSeekMRA?.completed );
        setShowSppiner( false );
      }

    };
    AnalyseSeekMRA();

    // //fetch active assessment
    // const fetchSeekActiveAssessment = async () => {
    //   const response = await fetchActiveSeekMRA({ userId: user?.id });
    //   console.log(response, "seekActive");
    //   if (response) {
    //     //@ts-ignore
    //     setSeekActiveAssessment(response?.activeSeekMRA);
    //   }
    // };
    // const fetchSeekAvailableAssessment = async () => {
    //   const response = await fetchAvailableSeekMRA({ userId: user?.id });
    //   // console.log(response, "seek");
    //   if (response !== null) {
    //     //@ts-ignore
    //     setSeekAvailableAssessment(response?.availableSeekMRA);
    //   }
    // };
    // const fetchSeekCompletedAssessment = async () => {
    //   const response = await fetchCompletedSeekMRA({ userId: user?.id });
    //   console.log(response, "seekCompleted");
    //   if (response) {
    //     //@ts-ignore
    //     setSeekCompletedAssessment(response?.completedSeekMRA);
    //   }
    // };
    // fetchSeekActiveAssessment();
    // fetchSeekAvailableAssessment();
    // fetchSeekCompletedAssessment();
  }, [ activeClass ] );
  // console.log(seekActiveAssessment, "seekassessment");
  return (
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
        { showSppiner ? (
          <Spinner />
        ) : (
          <ActiveAssessments
            activeClass={ activeClass }
            seekActiveAssessment={ seekActiveAssessment }
          />
        ) }
      </Box>
      <Box className="avlbl_assmnts_contr">
        <Typography className="active_assmnts_title">Seek Feedback</Typography>
        <Typography className="avlbl_assmnts_descrpt">
          Ask for feedback from key stakeholders to gauge progress on skills and behaviour at work.
        </Typography>
        <Box className="avlbl_assmnts_take">
          <Typography className="avlbl_assmnts_take_title">
            {/* Assessments you can schedule */ }
          </Typography>
          { showSppiner ? (
            <Spinner />
          ) : (
            <AvailableAssessments
              activeClass={ activeClass }
              seekAvailableAssessment={ seekAvailableAssessment }
            />
          ) }
          {/* <Typography className="active_assmnts_link">
            View More Assessments
          </Typography> */}
        </Box>
      </Box>
      <Banner
        title={ "Take Self Assessments" }
        description={
          "Use these assessments to assess your skills and behaviours."
        }
        ctaText={ "View" }
        nextClass={ "one" }
        handleActiveClass={ handleActiveClass }
      />
      <Box id="compltdassmnts" className="compltd_assmnts_contr">
        <Typography className="active_assmnts_title">
          Completed Assessments
        </Typography>
        { showSppiner ? (
          <Spinner />
        ) : (
          <CompletedAssessments
            activeClass={ activeClass }
            seekCompletedAssessment={ seekCompletedAssessment }
          />
        ) }
      </Box>
    </>
  );
};
export default SeekFeedback;
