import { useEffect, useState } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import SectionInstructionsModal from "./SectionInstructionsModal";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { test } from "node:test";
import { fetchTestQuestionsReduxThunk } from "../../actions/assessment/fetchQuestions";
import { open } from "fs/promises";
import { fetchUserTestDetailsApi } from "../../actions/assessment/fetchTestDetails";
import { TimeLeft } from "./TimeLeft";
import Spinner from "../common/Spinner/Spinner";
const TestInstructions = ( { showTestInstructs }: any ) => {
  var comingFrom = "test";
  const [ showSectInstructs, setSectInstructs ] = useState( false );
  const [ testDetails, setTestDetails ] = useState<any>( null );
  const [ spinner, setSpinner ] = useState<any>( false );
  const openSectInstructsModal = () => {
    setSectInstructs( true );
  };
  const router = useRouter();

  const testId = router?.query?.id;

  useEffect( () => {
    const fetchTestDetail = async () => {
      const response = await fetchUserTestDetailsApi( { userTestMapId: testId } );
      if ( response ) {
        //@ts-ignore
        setTestDetails( response?.response );
        // console.log(response, "fetchUserTestDetailsApi");
      }


    }
    fetchTestDetail();
  }, [ testId ] )
  // @ts-ignore
  // const testDetail = useSelector((state) => state?.assessment?.testDetails);
  //@ts-ignore
  const currQuestion = useSelector( ( state ) => state?.assessment?.currQuestion );
  // console.log(questionMap, "QuestionMap");

  const closeSectInstructsModal = ( value: any ) => {
    setSectInstructs( value );
  };
  const dispatch = useDispatch();

  const fetchTestQuestion = async () => {
    setSpinner( true );
    //@ts-ignore
    await dispatch( fetchTestQuestionsReduxThunk( { userTestMapId: testId } )
    );
    if ( testDetails?.sections[ 0 ]?.description === "NA" ) {
      router.push( {
        pathname: "/assessment/question",
        query: {
          id: testId
        }
      } );
      return;
    }
    openSectInstructsModal();
    setSpinner( false );
    // router.push("/assessment/question");
    // }
  };

  console.log( "testDetailsAditya", testDetails );
  return (
    <>
      { !testDetails ? (
        <Spinner />
      ) : (
        <Box className="test_instructs_contr">
          <Typography className="test_instructs_title" variant="h1">
            { testDetails?.name }
          </Typography>
          <Stack className="test_instructs_contr_flex">
            <Typography variant="h2" className="test_instructs_subtitle">
              { testDetails?.assessmentLabelSingular } Instructions
            </Typography>
            { !showTestInstructs?.showTestInstructs &&
              testDetails?.status !== "IN_PROGRESS" && (
                // <TimeLeft/>
                <Stack className="test_instructs_time_flex">
                  <AccessTimeRoundedIcon />
                  <Typography className="test_time_numb">
                    Time : { testDetails?.duration }{ " " }
                    <span className="test_time_text">Min</span> : 00{ " " }
                    <span className="test_time_text">Sec</span>
                  </Typography>
                </Stack>
              ) }
          </Stack>
          <Box className="test_instructs_box">
            <Typography className="test_instructs_para">
              { testDetails?.instructions?.startsWith( "http" ) ? <iframe
                src={ testDetails?.instructions }
                title="Embedded Website"
                width="100%"
                height="400px"
              /> : testDetails?.instructions }

            </Typography>
            {/* <List dense={true} className="test_instructs_points">
              <ListItem>
                <ListItemText primary="1. Use the text box to enter your response. Be as thorough as possible." />
              </ListItem>
              <ListItem>
                <ListItemText primary="2. There is no right or wrong answer." />
              </ListItem>
              <ListItem>
                <ListItemText primary="3. Your responses will be shared with the HR team, your reporting manager and your assigned leadership expert." />
              </ListItem>
            </List> */}
            <TableContainer className="test_instructs_table">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">{ testDetails?.sectionLabelSingular } No.</TableCell>
                    <TableCell>{ testDetails?.sectionLabelSingular } Name</TableCell>
                    <TableCell align="center">No. of Questions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { testDetails?.sections.map( ( section: any, index: any ) => {
                    return (
                      <TableRow key={ index }>
                        <TableCell align="center">{ index + 1 }</TableCell>
                        <TableCell>{ section?.name }</TableCell>
                        <TableCell align="center">
                          { section?.questions.length }
                        </TableCell>
                      </TableRow>
                    );
                  } ) }
                  {/* <TableRow
                  //key={}
                  >
                    <TableCell align="center">1</TableCell>
                    <TableCell>Section 1 Name goes here</TableCell>
                    <TableCell align="center">10</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">2</TableCell>
                    <TableCell>Section 2 Name goes here</TableCell>
                    <TableCell align="center">20</TableCell>
                  </TableRow> */}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          { !showTestInstructs?.showTestInstructs && (
            <>
              { spinner ? <Spinner /> : <Box className="test_instructs_cta">
                <Button
                  className="standard_cta"
                  onClick={ () => fetchTestQuestion() }
                >
                  { testDetails?.status === "IN_PROGRESS"
                    ? `Continue  ${ testDetails?.assessmentLabelSingular ? testDetails?.assessmentLabelSingular : "" }`
                    : `Start ${ testDetails?.assessmentLabelSingular ? testDetails?.assessmentLabelSingular : "" }` }
                </Button>
              </Box> }
              <Typography className="test_instructs_cta_info">
                By clicking on { testDetails?.status === "IN_PROGRESS"
                  ? `Continue`
                  : `Start` } { testDetails?.assessmentLabelSingular } your{ " " }
                { testDetails?.duration } minutes countdown for { testDetails?.assessmentLabelSingular } completion
                will start
              </Typography>
            </>
          ) }
        </Box>
      ) }
      { <SectionInstructionsModal
        comingFrom={ comingFrom }
        showSectInstructs={ showSectInstructs }
        closeSectInstructsModal={ closeSectInstructsModal }
        currSectionIndex={ 0 }
      /> }
    </>
  );
};
export default TestInstructions;
