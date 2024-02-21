import { ExpandMore, OpenInFull, RefreshOutlined } from "@mui/icons-material";
import { Box, Typography, Skeleton } from "@mui/material";
import { useState, FC, useEffect } from "react";
import Button from "@mui/material/Button";
import { fetchQuestionClarity } from "../../actions/coThinkPrep/fetchQuestionClarity";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { motion } from 'framer-motion'
import { updateQuestionClarity } from "../../actions/coThinkPrep/updateQuestionClarity";
interface DraftChipProps {
  data: any;
  index: number;
  onclick: ( index: any ) => void;
  onDraftSelect: ( index: any ) => void;
  childRef?: any;
  from: any;
  worksheet: any;
  section: any;
  questionId: any;
  title: any;
  setWorksheet: any
  setAcceptData: any
  currentAnswer: any
  currentQuestion: any
}

const DraftChip: FC<DraftChipProps> = ( {
  data,
  onclick,
  index,
  onDraftSelect,
  childRef,
  from,
  worksheet,
  section,
  questionId,
  title,
  setWorksheet,
  setAcceptData,
  currentAnswer,
  currentQuestion
} ) => {
  console.log( "draftchips", data, from, title );

  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  const router = useRouter();
  const [ userWorkSheetId, setUserWorksheetId ] = useState<any>( null );
  const [ type, setType ] = useState<any>( null );
  useEffect( () => {
    setUserWorksheetId( router?.query?.id );
    setType( router?.query?.type === "prep" ? "PREPARE" : "QP" );
  }, [ router ] );
  const [ isHovered, setIsHovered ] = useState( false );
  const [ isBtnHovered, setIsBtnHovered ] = useState( false );
  const [ isExpanded, setIsExpanded ] = useState( false );
  const [ isRefreshing, setIsRefreshing ] = useState( false );
  const [ dataResponse, setDataResponse ] = useState<any>( null );
  console.log( dataResponse, "dataResponse" );
  useEffect( () => {
    setDataResponse( data?.questionChildResponse );
  }, [ data, worksheet ] );
  useEffect( () => {
    setIsRefreshing( true );
    const timer = setTimeout( () => {
      setIsRefreshing( false );
    }, 1000 );

    return () => clearTimeout( timer );
  }, [ isExpanded ] );

  const acceptClick = async ( index: any ) => {
    setIsBtnHovered( true );
    const answer = ( dataResponse[ index ] ? dataResponse[ index ].response : "" ) + currentAnswer
    const response = await updateQuestionClarity( {
      userId: user?.id,
      programId: user?.activeProgramId,
      userWorksheetId: worksheet?.id,
      type: type,
      sectionId: section?.id,
      pillName: title,
      pillChildName: data?.pillName,
      question: currentQuestion,
      questionType: from,
      responseIndex: index,
      status: "ACCEPTED",
      answer: answer
    } )
    childRef.current.trigger();
    onDraftSelect( "" );
    setIsBtnHovered( false );
  };
  const dismissClick = async ( index: any ) => {
    setIsBtnHovered( true );
    const response = await updateQuestionClarity( {
      userId: user?.id,
      programId: user?.activeProgramId,
      userWorksheetId: worksheet?.id,
      type: type,
      sectionId: section?.id,
      pillName: title,
      pillChildName: data?.pillName,
      question: currentQuestion,
      questionType: from,
      responseIndex: index,
      status: "REJECTED",
      answer: currentAnswer
    } )
    setOpenCards( -1 );
    onDraftSelect( "" );
    setIsBtnHovered( false );
  };
  const toggleCard = ( index: number ) => {
    if ( !isBtnHovered ) {
      setOpenCards( index );
      onDraftSelect( dataResponse[ index ] ? dataResponse[ index ].response : "" );
      setAcceptData(
        {
          userId: user?.id,
          programId: user?.activeProgramId,
          uwid: worksheet?.id,
          sectionId: section?.id,
          prepType: type,
          pillname: title,
          childPillName: data?.pillName,
          index: index,
          questionType: from,
        }
      )
    }
  };
  const handleRefreshClick = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    handleChildClick();
  };
  const handleChildClick = async () => {
    console.log( "clicked", "fetchQuestionClarity" );
    setIsRefreshing( true );
    if ( from === "PRE" || from === "POST" ) {
      const response = await fetchQuestionClarity( {
        userId: user?.id,
        programId: user?.activeProgramId,
        userWorksheetId: userWorkSheetId,
        type: type,
        sectionId: section?.id,
        pillName: title,
        pillChildName: data.pillName,
        question: questionId,
        questionType: from,
      } );
      console.log( response, "fetchSectionClarityfetchSectionClarity" );
      //@ts-ignore
      setDataResponse( response?.response?.data );
      //@ts-ignore
      setWorksheet( response?.response?.userWorksheetObject );

      //todo aditya
      setIsRefreshing( false );
    }
  };

  const [ openCards, setOpenCards ] = useState( -1 );

  const skeletonArray = new Array( 2 ).fill( {} );
  return (
    <Box
      style={ {
        minWidth: "fit-content",
        width: isExpanded ? "100%" : "fit-content",
      } }
      className="informationPill_container"
      onMouseEnter={ () => setIsHovered( true ) }
      onMouseLeave={ () => setIsHovered( false ) }
      onClick={ ( e ) => e.stopPropagation() }
    >
      <Box sx={ { display: "flex", gap: "8px", alignItems: "center" } }>
        <img src="/images/icons/binocular.svg" alt="Binocular Icon" />
        <Typography
          component="div"
          sx={ { fontSize: "12px", fontWeight: 600 } }
          onClick={ ( e ) => {
            e.stopPropagation()
            onclick( isExpanded ? -1 : index )
            setIsExpanded( !isExpanded )
            if ( dataResponse === null ) {
              handleChildClick()
            }
          } }
        >
          { data.pillName }
        </Typography>
        { isExpanded && (
          <RefreshOutlined
            onClick={ handleRefreshClick }
            sx={ {
              fontSize: "14px",
              color: "rgba(0, 0, 0, 0.5)",
              marginLeft: "auto",
            } }
          />
        ) }
        { ( isHovered || isExpanded ) && (
          <OpenInFull sx={ { fontSize: "14px", color: "rgba(0, 0, 0, 0.5)" } } />
        ) }
      </Box>
      { isExpanded && (
        <motion.div
          style={ { width: "100%" } }
          onClick={ ( e ) => e.stopPropagation() }
          initial={ { height: 0, opacity: 0 } }
          animate={ { height: "auto", opacity: 1 } }
          transition={ { delay: 0.06, duration: 0.5 } }
        >
          { isRefreshing ? (
            <>
              <Typography
                component="div"
                sx={ {
                  marginTop: "10px",
                  display: "flex",
                  columnGap: "20px",
                } }
              >
                { skeletonArray.map( ( item: any, index ) => (
                  <Box key={ index } sx={ { width: "48%", padding: "10px 0" } }>
                    <Box
                      sx={ {
                        display: "flex",
                        justifyContent: "space-between",
                      } }
                    >
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        width="100%"
                        height={ 12 }
                        style={ { borderRadius: "32px" } }
                      />
                    </Box>
                    <Box
                      sx={ {
                        marginTop: "5px",
                      } }
                    >
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        width="100%"
                        height={ 12 }
                        style={ { borderRadius: "32px" } }
                      />
                    </Box>
                    <Box
                      sx={ {
                        marginTop: "5px",
                      } }
                    >
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        width="100%"
                        height={ 12 }
                        style={ { borderRadius: "32px" } }
                      />
                    </Box>
                  </Box>
                ) ) }
              </Typography>
            </>
          ) : (
            <>
              <Box sx={ { padding: "5px 15px" } }>
                <Typography
                  component="div"
                  sx={ {
                    marginTop: "10px",
                    display: "flex",
                    columnGap: "20px",
                  } }
                >
                  { dataResponse?.map( ( item: any, index: any ) => (
                    <Box
                      key={ index }
                      sx={ {
                        width: "48%",
                        display: "inline-block",
                        padding: "10px",
                        borderRadius: "16px",
                        background:
                          openCards == index
                            ? "#FCFCFD"
                            : "rgba(221, 227, 238, 0.25)",
                        height: !openCards == index ? "fit-content" : "initial",
                        border:
                          openCards == index ? "1.6px solid #2e5db0" : "none",
                      } }
                      onClick={ ( e ) => {
                        e.stopPropagation()
                        toggleCard( index )
                      } }
                    >
                      <Box
                        sx={ {
                          fontSize: "13px",
                          fontWeight: 400,
                          display: "flex",
                          justifyContent: "space-between",
                        } }
                      >
                        <Box sx={ { columnGap: "10px", display: "flex" } }>
                          <img
                            className="ml-1"
                            src={ "/images/icons/greyStar.svg" }
                          />{ " " }
                          <Box
                            sx={ {
                              fontSize: "11px",
                              width: "100%",
                              fontWeight: 500,
                            } }
                          >
                            <span>Draft { dataResponse?.length }</span>{ " " }
                          </Box>
                        </Box>
                        <motion.div
                          style={ {
                            background: openCards == index ? "#ebf2f7" : "none",
                            width: "20px",
                            borderRadius: "20px",
                            height: "20px",
                            textAlign: "center",
                          } }
                        >
                          <img
                            onClick={ ( e: any ) => {
                              e.stopPropagation()
                              openCards == index
                                ? toggleCard( -1 )
                                : toggleCard( index )
                              e.stopPropagation()
                            } }
                            style={ {
                              transform:
                                openCards == index
                                  ? "rotate(0deg)"
                                  : "rotate(0deg)",
                            } }
                            src={ "/images/icons/downArrow.svg" }
                          />
                        </motion.div>
                      </Box>

                      <motion.div
                        initial={ { height: 0, opacity: 0 } }
                        animate={ { height: "auto", opacity: 1 } }
                        className={
                          openCards == index
                            ? "mt-13"
                            : "hideDescriptionDraft , ml-22 mt-5"
                        }
                        style={ {
                          fontSize: "11px",
                          fontWeight: 400,
                        } }
                      >
                        <div
                          dangerouslySetInnerHTML={ { __html: item?.response } }
                        />
                      </motion.div>

                      <Box>
                        { openCards == index && (
                          <motion.div
                            initial={ { height: 0, opacity: 0 } }
                            animate={ { height: "auto", opacity: 1 } }
                            transition={ { delay: 0.2, duration: 0.5 } }
                          ><Box
                            style={ {
                              display: "flex",
                              columnGap: "10px",
                              marginTop: "16px",
                            } }
                          >
                              <Button
                                variant="contained"
                                size="small"
                                className="cag-blue-bg commonBtnStyle commonBlueBtnStyle"
                                sx={ { color: "white" } }
                                onMouseEnter={ () => setIsBtnHovered( true ) }
                                onMouseLeave={ () => setIsBtnHovered( false ) }
                                onClick={ ( e ) => {
                                  e.stopPropagation()
                                  acceptClick( index )
                                } }
                              >
                                <Box sx={ { marginTop: "1px" } }>ACCEPT</Box>
                                <img
                                  className="ml-1"
                                  src={ "/images/icons/btnDownArrow.svg" }
                                />
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                className="bg-grey commonBtnStyle commonGreyBtnStyle"
                                sx={ { color: "black" } }
                                onMouseEnter={ () => setIsBtnHovered( true ) }
                                onMouseLeave={ () => setIsBtnHovered( false ) }
                                onClick={ ( e ) => {
                                  e.stopPropagation()
                                  dismissClick( index )
                                } }
                              >
                                <Box sx={ { marginTop: "1px" } }>DISMISS</Box>

                                <img
                                  className="ml-1"
                                  src={ "/images/icons/closeBtn.svg" }
                                />
                              </Button>
                              <img
                                className="ml-2 cPointer"
                                src={ "/images/icons/moreOption.svg" }
                              />
                            </Box>
                          </motion.div>
                        ) }
                      </Box>
                    </Box>
                  ) ) }
                </Typography>
              </Box>
            </>
          ) }
        </motion.div>
      ) }
    </Box>
  )
};
export default DraftChip;
