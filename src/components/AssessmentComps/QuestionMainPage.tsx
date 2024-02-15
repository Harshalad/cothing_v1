import { Helmet, HelmetProvider } from "react-helmet-async";
import { Box, Stack } from "@mui/material";
import TestLevel from "./TestLevel";
import SectionLevel from "./SectionLevel";
import Progressbar from "./Progressbar";
import Paginations from "./Paginations";
import Questions from "./Questions";
import CTA from "./CTA";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { submitTestAnswer } from "../../actions/assessment/submitAnswer";
import { fetchTestQuestionsReduxThunk } from "../../actions/assessment/fetchQuestions";
import Review from "./Review";
import { LegendToggle } from "@mui/icons-material";
import { submitUserTest } from "../../../src/actions/assessment/submitTest";
import SectionInstructionsModal from "./SectionInstructionsModal";
import { toast } from "react-toastify";
import AssessmentNav from "./AssessmentNav";
import { questionsMap } from "../../constants/golbals";
// import {questionsMap} from "../../constants/golbals";

const QuestionMainPage = () => {
  //@ts-ignore
  const router = useRouter();
  const testId = router?.query?.id;
  const dispatch = useDispatch();
  const userTestMapId = testId;

  // all redux import

  //@ts-ignore
  let attemptNo = useSelector( ( state ) => state?.assessment?.attemptNo ) + "";
  //@ts-ignore
  const [ sections, setSections ] = useState<any>( useSelector( ( state ) => state?.assessment?.sections ) );

  console.log( sections, "sections in main pge" );
  //@ts-ignore
  const testDetail = useSelector( ( state ) => state?.assessment?.testDetails );
  console.log( testDetail, "12345678900987654321" );
  // states for question
  const [ currSectionIndex, setCurrSectionIndex ] = useState( 0 );
  const [ currQuestionIndex, setcurrQuestionIndex ] = useState( 0 );
  const [ subjectiveAnswer, setSubjectiveAnswer ] = useState( "" );
  const [ subjectiveAnswerDB, setSubjectiveAnswerDB ] = useState( "" );
  const [ singleMCQ, setSingleMCQ ] = useState( "" );
  const [ singleMCQDB, setSingleMCQDB ] = useState( "" );
  const [ selectedOptions, setSelectedOptions ] = useState<string[]>( [] );
  const [ selectedOptionsDB, setSelectedOptionsDB ] = useState<string[]>( [] );
  const [ rating, setRating ] = useState<any>( null );
  const [ ratingDB, setRatingDB ] = useState<any>( null );
  const [ questionAnswerMap, setQuestionAnswerMap ] = useState<
    Map<any, Map<any, any>>
  >( new Map() );
  const [ download, setDownload ] = useState( null );
  const [ openReview, setOpenReview ] = useState( false );
  const [ binaryDataURl, setBinaryDataURL ] = useState( "" );
  const [ dataUploadExt, setDataUploadExt ] = useState( "" );
  const [ fileInBytes, setFileInBytes ] = useState<any>( null );
  const [ fileName, setFileName ] = useState( "" );
  const [ sjqOptions, setSjqOptions ] = useState<number[]>( [ 0, 0, 0, 0 ] );
  const [ sjqOptionsDB, setSjqOptionsDB ] = useState<number[]>( [ 0, 0, 0, 0 ] );
  console.log( sjqOptions, "sjq" );
  //for setting question map for continue test
  useEffect( () => {
    const setMap = () => {
      const questionAnswerMapTemp = new Map();
      sections?.forEach( ( section: any, sec_index: any ) => {
        const sec_map = new Map();
        section.questions.forEach( ( question: any, index: any ) => {
          sec_map.set( index, question );
        } );
        questionAnswerMapTemp.set( sec_index, sec_map );
      } );
      setQuestionAnswerMap( questionAnswerMapTemp );
    };
    setMap();
  }, [ sections ] );

  //handling refresh
  useEffect( () => {
    const handleRefresh = async () => {
      //@ts-ignore
      await dispatch( fetchTestQuestionsReduxThunk( { userTestMapId: userTestMapId } ) );
    };
    handleRefresh();
  }, [ testId ] );

  // state handling function
  const handleSetSublectiveAnswer = ( e: any ) => {
    setSubjectiveAnswer( e );
  };
  const handleSetCurrSectionIndex = ( e: any ) => {
    setCurrSectionIndex( currSectionIndex + e );
  };
  const handleSec_index = ( e: any ) => {
    setCurrSectionIndex( e );
  };
  const handleSetCurrQuestionIndex = ( e: any ) => {
    let currentQuestion: any;
    console.log();
    if ( sections ) {
      currentQuestion =
        sections[ currSectionIndex ]?.questions[ currQuestionIndex ];
    }
    // console.log(currentQuestion,subjectiveAnswer,subjectiveAnswerDB,"aditya1234");
    if (
      currentQuestion?.question?.type === "subjective" &&
      currentQuestion?.question?.answerType !== "fileUpload"
    ) {
      if ( subjectiveAnswer !== subjectiveAnswerDB ) {
        console.log( subjectiveAnswer, subjectiveAnswerDB, "subjectTiveAnswe" );
        toast.error( "Save your answer before moving forward." );
        return;
      }
    }
    if (
      currentQuestion?.question?.type === "mcq" &&
      !currentQuestion?.question.multiSelect
    ) {
      if ( singleMCQ !== singleMCQDB && singleMCQ.length !== 0 ) {
        toast.error( "Save your answer before moving forward." );
        return;
      }
    }
    if (
      currentQuestion?.question?.type === "mcq" &&
      currentQuestion?.question.multiSelect
    ) {
      console.log( selectedOptions, selectedOptionsDB, "multiselect" );
      if (
        JSON.stringify( selectedOptions ) !== JSON.stringify( selectedOptionsDB ) && selectedOptions?.length > 0
      ) {
        console.log( selectedOptions, "1", selectedOptionsDB, "multiselect" );
        toast.error( "Save your answer before moving forward." );
        return;
      }
    }
    if ( currentQuestion?.question?.type === "rating" ) {
      if ( rating !== ratingDB && rating !== null ) {
        toast.error( "Save your answer before moving forward." );
        return;
      }
    }
    if ( currentQuestion?.question?.type === "sjq" ) {
      if (
        JSON.stringify( sjqOptions ) !== JSON.stringify( sjqOptionsDB ) &&
        sjqOptions?.length > 0
      ) {
        toast.error( "Save your answer before moving forward." );
        return;
      }
    }
    setcurrQuestionIndex( e );
  };
  const handleSingleMCQchange = ( e: any ) => {
    setSingleMCQ( e );
  };
  const handleOptionsChange = ( event: any ) => {
    const selectedOption = event.target.value;
    const index = selectedOptions?.indexOf( selectedOption );
    if ( index === -1 ) {
      setSelectedOptions( [ ...selectedOptions, selectedOption ] );
    } else {
      const updatedOptions = selectedOptions?.filter(
        ( option ) => option !== selectedOption
      );
      setSelectedOptions( updatedOptions );
    }
  };
  const handleRating = ( e: any ) => {
    console.log( e.target.value, "rating called" );
    setRating( e.target.value );
  };
  const handleshowReview = () => {
    setOpenReview( !openReview );
  };
  const handleBinaryDataURl = (
    e: any,
    type: any,
    bytes: any,
    fileName: any
  ) => {
    setBinaryDataURL( e );
    setDataUploadExt( type );
    setFileInBytes( bytes );
    setFileName( fileName );
  };

  // for setting the already answered Question
  let curr_section: any;
  if ( sections ) {
    curr_section = sections[ currSectionIndex ];
  }
  useEffect( () => {
    console.log( questionAnswerMap, "questionAnswerMap" );
    let currentQuestion: any;
    if ( sections ) {
      currentQuestion =
        sections[ currSectionIndex ]?.questions[ currQuestionIndex ];
    }
    let sec_map = questionAnswerMap.get( currSectionIndex );
    let currAnswer = sec_map?.get( currQuestionIndex )?.answerObject?.answer;
    let currOption = sec_map?.get( currQuestionIndex )?.answerObject?.answerOption
      ? sec_map?.get( currQuestionIndex )?.answerObject?.answerOption[ 0 ]
      : null;
    let currOptions =
      sec_map?.get( currQuestionIndex )?.answerObject?.answerOption;
    console.log( currOption, "mcqoption" );
    if ( currAnswer != null ) {
      setSubjectiveAnswer( currAnswer );
      setSubjectiveAnswerDB( currAnswer );
    } else {
      setSubjectiveAnswer( "" );
      setSubjectiveAnswerDB( "" );
    }
    if (
      currentQuestion?.question?.type === "mcq" &&
      !currentQuestion?.question.multiSelect
    ) {
      if ( currOption != null ) {
        setSingleMCQ( currOption );
        setSingleMCQDB( currOption );
      } else {
        setSingleMCQ( "" );
      }
    }
    if (
      currentQuestion?.question?.type === "mcq" &&
      currentQuestion?.question.multiSelect
    ) {
      if ( currOptions !== null ) {
        let currOptionsString: string[] = [];
        currOptions?.forEach( ( option: any ) => {
          currOptionsString.push( String( option ) );
        } );
        setSelectedOptions( currOptionsString );
        setSelectedOptionsDB( currOptionsString );
      } else {
        setSelectedOptions( [] );
      }
    }
    if ( currentQuestion?.question?.type === "rating" ) {
      console.log( currOption, "rating" );
      if ( currOption !== null ) {
        setRating( currOption );
        setRatingDB( currOption );
      } else {
        setRating( null );
      }
    }
    if ( currentQuestion?.question?.type === "sjq" ) {
      if ( currOptions !== null ) {
        setSjqOptions( currOptions );
        setSjqOptionsDB( currOptions );
      } else {
        setSjqOptions( [ 0, 0, 0, 0 ] );
        setSjqOptionsDB( [ 0, 0, 0, 0 ] );
      }
      console.log( sjqOptions, sjqOptionsDB, "sjqOptions" );
    }
    if ( currentQuestion?.question?.type === "fileUpload" ) {
      if ( currAnswer !== null ) {
        setDownload( currAnswer );
      } else {
        setDownload( null );
      }
    }
  }, [ sections, currQuestionIndex, currSectionIndex, questionAnswerMap ] );
  // let currentQuestion =
  //   sections[currSectionIndex]?.questions[currQuestionIndex];
  // console.log(currentQuestion, "currentQuestionIndex");
  // let arr = new Array(sjqOptions);
  // console.log(arr, "currentQuestionIndex");
  const handleSJQOptions = ( index: any, type: number ) => {
    let currentQuestion =
      sections[ currSectionIndex ]?.questions[ currQuestionIndex ];
    console.log( currentQuestion, "currentQuestionIndex" );
    let arr = [ ...sjqOptions ];
    let maxValue = currentQuestion?.question?.option?.length;
    // console.log(arr, "beforesjq");
    if (
      ( arr[ index ] === maxValue && type < 0 ) ||
      ( arr[ index ] === 1 && type > 0 ) ||
      ( arr[ index ] !== maxValue && arr[ index ] !== 1 ) ||
      ( arr[ index ] === 0 && type > 1 )
    ) {
      if ( arr[ index ] === 0 && type < 0 ) {
        toast.error( "Value cannot be negative" );
        return;
      }
      arr[ index ] += type;
    }
    // console.log(arr, "aftersjq");
    setSjqOptions( arr );
  };
  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.visibilityState === 'visible') {
  //       // User is back to the page
  //       // window.alert('User is back');
  //     } else {
  //       // User has switched tabs or minimized the window
  //       router.push({
  //         pathname: "/assessment",
  //         query: {
  //           id: testId,
  //         },
  //       });
  //     }
  //   };

  //   document.addEventListener('visibilitychange', handleVisibilityChange);

  //   // Clean up the event listener when the component unmounts
  //   return () => {
  //     document.removeEventListener('visibilitychange', handleVisibilityChange);
  //   };
  // }, [])
  // for save and next and sving the data in backend for each question
  const handleSaveAndNextClick = async () => {
    let currentQuestion =
      sections[ currSectionIndex ]?.questions[ currQuestionIndex ];
    let answerd;
    if ( currentQuestion?.question?.type === "subjective" ) {
      if ( subjectiveAnswer?.length === 0 ) {
        toast.error( "No text entered" );
        return;
      }
      answerd = {
        ...currentQuestion,
        answerObject: {
          ...currentQuestion.answerObject,
          answer: subjectiveAnswer,
        },
      };
    } else if (
      currentQuestion?.question?.type === "mcq" &&
      !currentQuestion?.question.multiSelect
    ) {
      if ( singleMCQ?.length === 0 ) {
        toast.error( " Alert: No answer saved." );
        return;
      }
      setSingleMCQDB( singleMCQ );
      answerd = {
        ...currentQuestion,
        answerObject: {
          ...currentQuestion.answerObject,
          answerOption: [ singleMCQ ],
        },
      };
    } else if (
      currentQuestion?.question?.type === "mcq" &&
      currentQuestion?.question.multiSelect
    ) {
      if ( selectedOptions?.length === 0 ) {
        toast.error( " Alert: No answer saved." );
        return;
      }
      setSelectedOptionsDB( selectedOptions );
      answerd = {
        ...currentQuestion,
        answerObject: {
          ...currentQuestion.answerObject,
          answerOption: selectedOptions,
        },
      };
    } else if ( currentQuestion?.question?.type === "rating" ) {
      console.log( "rating", rating );
      if ( !rating || rating?.length === 0 ) {
        toast.error( " Alert: No answer saved." );
        return;
      }
      setRatingDB( rating );
      answerd = {
        ...currentQuestion,
        answerObject: {
          ...currentQuestion.answerObject,
          answerOption: rating,
        },
      };
    } else if ( currentQuestion?.question?.type === "sjq" ) {
      const sjqOptionsSet = new Set( sjqOptions );
      if ( sjqOptionsSet.size !== sjqOptions.length ) {
        toast.error( "Provide a unique rank." );
        return;
      }
      // setSjqOptionsDB(sjqOptions);
      setSjqOptionsDB( sjqOptions );
      answerd = {
        ...currentQuestion,
        answerObject: {
          ...currentQuestion.answerObject,
          answerOption: sjqOptions,
        },
      };
    }
    else if ( currentQuestion?.question?.type === "fileUpload" ) {
      if ( fileName?.length === 0 ) {
        toast.error( "No file has been uploaded. Click on Browse Files to select a file to upload." );
        return;
      }
    }
    if ( currentQuestion?.question?.type === "subjective" ) {
      const response = await submitTestAnswer( {
        userTestMapId: userTestMapId,
        sectionId: sections[ currSectionIndex ].sectionId,
        caseId: currentQuestion.caseStudyId,
        questionId: currentQuestion.questionId,
        answerOption: [],
        questionType: currentQuestion.question.type,
        answer: subjectiveAnswer,
      } );
    } else if ( currentQuestion?.question?.type === "mcq" ) {
      const response = await submitTestAnswer( {
        userTestMapId: userTestMapId,
        sectionId: sections[ currSectionIndex ].sectionId,
        caseId: currentQuestion.caseStudyId,
        questionId: currentQuestion.questionId,
        answerOption: currentQuestion?.question.multiSelect
          ? selectedOptions
          : [ singleMCQ ],
        questionType: currentQuestion.question.type,
        answer: "",
      } );
    } else if ( currentQuestion?.question?.type === "rating" ) {
      const response = await submitTestAnswer( {
        userTestMapId: userTestMapId,
        sectionId: sections[ currSectionIndex ].sectionId,
        caseId: currentQuestion.caseStudyId,
        questionId: currentQuestion.questionId,
        answerOption: rating,
        questionType: currentQuestion.question.type,
        answer: "",
      } );
    } else if ( currentQuestion?.question?.type === "fileUpload" ) {
      console.log( currentQuestion, "curr" );
      const response = await submitTestAnswer( {
        userTestMapId: userTestMapId,
        sectionId: sections[ currSectionIndex ].sectionId,
        caseId: currentQuestion.caseStudyId,
        questionId: currentQuestion.questionId,
        answerOption: [],
        questionType: currentQuestion.question.type,
        answer: "",
        fileExtension: dataUploadExt,
        fileInBytes: fileInBytes,
        fileName: fileName,
      } );
      console.log( response, "fileUpload response" );
      //@ts-ignore
      if ( response?.statusCode === 0 ) {
        answerd = {
          ...currentQuestion,
          answerObject: {
            ...currentQuestion.answerObject,
            //@ts-ignore
            answer: response?.response?.answer,
          },
        };
        // setDownload();
      }
    } else if ( currentQuestion?.question?.type === "sjq" ) {
      const response = await submitTestAnswer( {
        userTestMapId: userTestMapId,
        sectionId: sections[ currSectionIndex ].sectionId,
        caseId: currentQuestion.caseStudyId,
        questionId: currentQuestion.questionId,
        answerOption: sjqOptions,
        questionType: currentQuestion.question.type,
        answer: "",
      } );
      console.log( response, "sjq submmited" );
    }
    toast.success( "Answer Saved Successfully" )
    let answerMap = new Map( questionAnswerMap );
    let secMap = answerMap.get( currSectionIndex );
    secMap?.set( currQuestionIndex, answerd );
    setQuestionAnswerMap( answerMap );
    if ( currQuestionIndex + 1 < sections[ currSectionIndex ].questions.length ) {
      setcurrQuestionIndex( currQuestionIndex + 1 );
    } else {
      if ( currSectionIndex + 1 < sections.length ) {
        if ( sections[ currSectionIndex + 1 ]?.description !== "NA" ) {
          openSectInstructsModal();
        }
        setCurrSectionIndex( currSectionIndex + 1 );
        setcurrQuestionIndex( 0 );
      } else {
        setOpenReview( true );
      }
    }
  };
  useEffect( () => {
    const handleOnlineStatus = () => {
      if ( !navigator.onLine ) {
        alert( "Offline" );
      }
    };

    window.addEventListener( "online", handleOnlineStatus );
    window.addEventListener( "offline", handleOnlineStatus );

    return () => {
      window.removeEventListener( "online", handleOnlineStatus );
      window.removeEventListener( "offline", handleOnlineStatus );
    };
  }, [] );
  //FOR HANDLING REfresh
  useEffect( () => {
    const handleRouteChange = ( url: string ) => {
      // Perform your operations here
      console.log( "Page refreshed!" );
      alert( "page refreshed!" );
    };
  }, [] );

  const [ showSectInstructs, setSectInstructs ] = useState( false );

  const openSectInstructsModal = () => {
    setSectInstructs( true );
  };
  const closeSectInstructsModal = ( value: any ) => {
    setSectInstructs( value );
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Assessment</title>
        </Helmet>
      </HelmetProvider>

      <Stack className="test_instructs_section">
        <AssessmentNav testDetail={ testDetail } mainPage={ false } />
        {/* <Box className="test_instructs_body"> */ }
        <TestLevel handleshowReview={ handleshowReview } />
        <Progressbar
          questionAnswerMap={ questionAnswerMap }
          currSectionIndex={ currSectionIndex }
        />
        <SectionLevel
          currSectionIndex={ currSectionIndex }
          currQuestionIndex={ currQuestionIndex }
          handleSetCurrSectionIndex={ handleSetCurrSectionIndex }
          openSectInstructsModal={ openSectInstructsModal }
          closeSectInstructsModal={ closeSectInstructsModal }
          showSectInstructs={ showSectInstructs }
          handleSetCurrQuestionIndex={ handleSetCurrQuestionIndex }
        />
        <Paginations
          curr_section={ curr_section }
          handleSetCurrQuestionIndex={ handleSetCurrQuestionIndex }
          currQuestionIndex={ currQuestionIndex }
          questionAnswerMap={ questionAnswerMap }
          currSectionIndex={ currSectionIndex }
        />
        <Questions
          currSectionIndex={ currSectionIndex }
          currQuestionIndex={ currQuestionIndex }
          subjectiveAnswer={ subjectiveAnswer }
          handleSetSublectiveAnswer={ handleSetSublectiveAnswer }
          singleMCQ={ singleMCQ }
          handleSingleMCQchange={ handleSingleMCQchange }
          selectedOptions={ selectedOptions }
          handleOptionsChange={ handleOptionsChange }
          rating={ rating }
          handleRating={ handleRating }
          handleBinaryDataURl={ handleBinaryDataURl }
          binaryDataURl={ binaryDataURl }
          handleSJQOptions={ handleSJQOptions }
          sjqOptions={ sjqOptions }
          download={ download }
        />
        <CTA handleSaveAndNextClick={ handleSaveAndNextClick } />
        <Review
          questionAnswerMap={ questionAnswerMap }
          openReview={ openReview }
          handleSetCurrSectionIndex={ handleSec_index }
          handleSetCurrQuestionIndex={ handleSetCurrQuestionIndex }
          handleshowReview={ handleshowReview }
        />
        <SectionInstructionsModal
          currSectionIndex={ currSectionIndex }
          showSectInstructs={ showSectInstructs }
          closeSectInstructsModal={ closeSectInstructsModal }
        />
        {/* </Box> */ }
      </Stack>
    </>
  );
};
export default QuestionMainPage;
