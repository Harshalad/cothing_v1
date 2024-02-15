import { Box, Typography, Stack, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import PrivacyPolicy from "../PrivacyPolicy/PrivacyPolicy";
import { fetchProgram, fetchProgramAPI } from "../../actions/align/fetchProgram";
import { onboardNworxUser } from "../../actions/user/onboardNworxUser";
// import {EmptyCheckForMap} from "."
const Onboarding = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [ program, setProgram ] = useState<any>( null );
  //@ts-ignore
  const nWorxUser = useSelector( ( state ) => state?.auth?.nWorxUser );
  useEffect( () => {
    const getProgram = async () => {
      try {
        //@ts-ignore
        await dispatch( fetchProgram( { programId: nWorxUser?.activeProgramId } ) );
        const response = await fetchProgramAPI( { programId: nWorxUser?.activeProgramId } );
        console.log( response, "dshjfvjsf" );
        if ( response ) {
          setProgram( response );
        }
      } catch ( error ) {
        console.log( error );
      }
    };
    getProgram();
  }, [ nWorxUser?.activeProgramId ] );
  console.log( program, "fhsvfjhksf" );

  const [ showPrivacyPolicyModal, setPrivacyPolicyModal ] = useState<any>( false );

  const closePrivacyPolicyModal = ( value: any ) => {
    setPrivacyPolicyModal( value );
  }
  useEffect( () => {
    setTimeout( () => {
      setPrivacyPolicyModal( true );
    }, 1000 );
  }, [] );

  const onNextClick = async () => {
    const updateObject = {
      id: nWorxUser?.id,
      nextSixMonthsFocus: null,
      managerPermissions: null,
      expertPermissions: null,
      showGoalOverview: nWorxUser?.showGoalOverview,

    };
    //@ts-ignore
    await dispatch( onboardNworxUser( updateObject ) );
    if ( program !== null && program?.configMap?.hasOwnProperty( "onboardingProfile" ) ) {
      if ( program?.configMap?.onboardingProfile === null || program?.configMap?.onboardingProfile ) {
        if ( nWorxUser?.roles?.includes( "LP" ) ) {
          router.push( "/profile" );
        } else {
          router.push( "/action-center" );
        }
      } else {
        router.push( "/action-center" );
      }
    } else {
      if ( nWorxUser?.roles?.includes( "LP" ) ) {
        router.push( "/profile" );
      } else {
        router.push( "/action-center" );
      }
    }

  };
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Features</title>
        </Helmet>
      </HelmetProvider>
      {/* <Box className="navbar">
                <Box className="nav_container">
                    <Link to="#">
                        <Box className="nav_logo">
                            <img src="../logo.png" alt="logo" width={233} height={64}></img>
                        </Box>
                    </Link>
                </Box>
            </Box> */}
      { program !== null && <Box className="container">
        { program && program?.configMap?.hasOwnProperty( "landingPage" ) ? ( program?.configMap?.landingPage === null || program?.configMap?.landingPage === "default" || program?.configMap?.landingPage.length === 0 ) && <Typography
          variant="h2"
          align="center"
          color="#1C2129"
          sx={ { fontWeight: "700" } }
          className="feature_title"
        >
          NWORX provides effective tools and guidance to excel at work
        </Typography> : <Typography
          variant="h2"
          align="center"
          color="#1C2129"
          sx={ { fontWeight: "700" } }
          className="feature_title"
        >
          NWORX provides effective tools and guidance to excel at work
        </Typography> }
        {/* <iframe
                src={"https://content.nworx.app/HUL/SkillUp/Goal1/Milestone1/index.html"}  // Replace with the URL of the website you want to embed
                title="Embedded Website"
                width="100%"
                height="750px"
              /> */}
        {
          ( program && program?.configMap?.hasOwnProperty( "landingPage" ) ) ?
            ( ( program?.configMap?.landingPage === null || program?.configMap?.landingPage === "default" || program?.configMap?.landingPage.length === 0 ) ?
              ( <Stack
                direction="row"
                sx={ {
                  margin: "50px 0 0",
                  flexWrap: "wrap",
                  justifyContent: "center",
                } }
              >
                <Box className="feature_flex">
                  <img
                    src="/images/feature1.svg"
                    alt="feature1"
                    width={ 64 }
                    height={ 64 }
                    className="features_img"
                  ></img>
                  <Typography
                    variant="h3"
                    sx={ { fontWeight: "700", maxWidth: "306px" } }
                    className="features_title"
                  >
                    Align your aspirations with organization’s expectations
                  </Typography>
                </Box>
                <Box className="feature_flex">
                  <img
                    src="/images/feature2.png"
                    alt="feature2"
                    width={ 64 }
                    height={ 64 }
                    className="features_img"
                  ></img>
                  <Typography
                    variant="h3"
                    sx={ { fontWeight: "700", maxWidth: "306px" } }
                    className="features_title"
                  >
                    Define critical goals and milestones to work on
                  </Typography>
                </Box>
                <Box className="feature_flex">
                  <img
                    src="/images/feature3.png"
                    alt="feature4"
                    width={ 64 }
                    height={ 64 }
                    className="features_img"
                  ></img>
                  <Typography
                    variant="h3"
                    sx={ { fontWeight: "700", maxWidth: "306px" } }
                    className="features_title"
                  >
                    Access expert to achieve your goals
                  </Typography>
                </Box>
                <Box className="feature_flex">
                  <img
                    src="/images/feature53.png"
                    alt="feature4"
                    width={ 64 }
                    height={ 64 }
                    className="features_img"
                  ></img>
                  <Typography
                    variant="h3"
                    sx={ { fontWeight: "700", maxWidth: "306px" } }
                    className="features_title"
                  >
                    Prioritize, Prepare and Reflect on key actions every week{ " " }
                  </Typography>
                </Box>
                <Box className="feature_flex">
                  <img
                    src="/images/feature4.svg"
                    alt="feature5"
                    width={ 64 }
                    height={ 64 }
                    className="features_img"
                  ></img>
                  <Typography
                    variant="h3"
                    sx={ { fontWeight: "700", maxWidth: "306px" } }
                    className="features_title"
                  >
                    Seek and offer feedback to enhance performance
                  </Typography>
                </Box>
                <Box className="feature_flex">
                  <img
                    src="/images/feature6.svg"
                    alt="feature6"
                    width={ 64 }
                    height={ 64 }
                    className="features_img"
                  ></img>
                  <Typography
                    variant="h3"
                    sx={ { fontWeight: "700", maxWidth: "306px" } }
                    className="features_title"
                  >
                    Collect and analyze data on your progress
                  </Typography>
                </Box>
              </Stack> ) :
              ( <iframe
                src={ program?.configMap?.landingPage }
                title="Embedded Website"
                width="100%"
                height="100vh"
                style={ { height: "100vh" } }
              /> ) ) :
            ( <Stack
              direction="row"
              sx={ {
                margin: "50px 0 0",
                flexWrap: "wrap",
                justifyContent: "center",
              } }
            >
              <Box className="feature_flex">
                <img
                  src="/images/feature1.svg"
                  alt="feature1"
                  width={ 64 }
                  height={ 64 }
                  className="features_img"
                ></img>
                <Typography
                  variant="h3"
                  sx={ { fontWeight: "700", maxWidth: "306px" } }
                  className="features_title"
                >
                  Align your aspirations with organization’s expectations
                </Typography>
              </Box>
              <Box className="feature_flex">
                <img
                  src="/images/feature2.png"
                  alt="feature2"
                  width={ 64 }
                  height={ 64 }
                  className="features_img"
                ></img>
                <Typography
                  variant="h3"
                  sx={ { fontWeight: "700", maxWidth: "306px" } }
                  className="features_title"
                >
                  Define critical goals and milestones to work on
                </Typography>
              </Box>
              <Box className="feature_flex">
                <img
                  src="/images/feature3.png"
                  alt="feature4"
                  width={ 64 }
                  height={ 64 }
                  className="features_img"
                ></img>
                <Typography
                  variant="h3"
                  sx={ { fontWeight: "700", maxWidth: "306px" } }
                  className="features_title"
                >
                  Access expert to achieve your goals
                </Typography>
              </Box>
              <Box className="feature_flex">
                <img
                  src="/images/feature53.png"
                  alt="feature4"
                  width={ 64 }
                  height={ 64 }
                  className="features_img"
                ></img>
                <Typography
                  variant="h3"
                  sx={ { fontWeight: "700", maxWidth: "306px" } }
                  className="features_title"
                >
                  Prioritize, Prepare and Reflect on key actions every week{ " " }
                </Typography>
              </Box>
              <Box className="feature_flex">
                <img
                  src="/images/feature4.svg"
                  alt="feature5"
                  width={ 64 }
                  height={ 64 }
                  className="features_img"
                ></img>
                <Typography
                  variant="h3"
                  sx={ { fontWeight: "700", maxWidth: "306px" } }
                  className="features_title"
                >
                  Seek and offer feedback to enhance performance
                </Typography>
              </Box>
              <Box className="feature_flex">
                <img
                  src="/images/feature6.svg"
                  alt="feature6"
                  width={ 64 }
                  height={ 64 }
                  className="features_img"
                ></img>
                <Typography
                  variant="h3"
                  sx={ { fontWeight: "700", maxWidth: "306px" } }
                  className="features_title"
                >
                  Collect and analyze data on your progress
                </Typography>
              </Box>
            </Stack> ) }
        <Box className="feature_btn">
          <Button
            sx={ {
              color: "#FFFFFF",
              backgroundColor: "#F58A43",
              boxShadow: "none",
              "&:hover": { backgroundColor: "#F58A43", boxShadow: "none" },
              textTransform: "capitalize",
              width: "250px !important",
            } }
            onClick={ onNextClick }
          >
            Let&apos;s get started!
          </Button>
        </Box>
      </Box> }
      {/*{ !nWorxUser?.onboarded && program?.configMap?.hasOwnProperty( "privacyPopUpText" ) && program?.configMap?.privacyPopUpText !== null && <PrivacyPolicy showPrivacyPolicyModal={ showPrivacyPolicyModal } closePrivacyPolicyModal={ closePrivacyPolicyModal } />
      }*/}
    </>
  );
};

export default Onboarding;
