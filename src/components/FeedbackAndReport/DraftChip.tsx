import { ExpandMore, OpenInFull, RefreshOutlined } from "@mui/icons-material";
import { Box, Typography, Skeleton } from "@mui/material";
import { useState, FC, useEffect } from "react";
import Button from "@mui/material/Button";
import { fetchQuestionClarity } from "../../actions/coThinkPrep/fetchQuestionClarity";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
interface DraftChipProps {
  data: any;
  index: number;
  onclick: ( index: any ) => void;
  onDraftSelect: ( index: any ) => void;
  childRef?: any
  from: any
  worksheet: any
  section: any
  questionId: any,
  title: any
}

const DraftChip: FC<DraftChipProps> = ( { data, onclick, index, onDraftSelect, childRef, from, worksheet, section, questionId, title } ) => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  const router = useRouter();
  const [ userWorkSheetId, setUserWorksheetId ] = useState<any>( null );
  const [ type, setType ] = useState<any>( null );
  useEffect( () => {
    setUserWorksheetId( router?.query?.id );
    setType( router?.query?.type === "prep" ? "PREPARE" : "QP" );
  }, [ router ] )
  const [ isHovered, setIsHovered ] = useState( false );
  const [ isBtnHovered, setIsBtnHovered ] = useState( false );
  const [ isExpanded, setIsExpanded ] = useState( false );
  const [ isRefreshing, setIsRefreshing ] = useState( false );
  const [ dataResponse, setDataResponse ] = useState<any>( null );

  useEffect( () => {
    setDataResponse( data?.questionChildResponse );
  }, [ data ] )
  useEffect( () => {
    setIsRefreshing( true );
    const timer = setTimeout( () => {
      setIsRefreshing( false );
    }, 1000 );

    return () => clearTimeout( timer );
  }, [ isExpanded ] );

  const acceptClick = ( index: any ) => {
    setIsBtnHovered( true )
    childRef.current.trigger()
    onDraftSelect( '' )
    setIsBtnHovered( false )
  }
  const dismissClick = ( index: any ) => {
    setIsBtnHovered( true )
    setOpenCards( -1 );
    onDraftSelect( '' )
    setIsBtnHovered( false )
  }
  const toggleCard = ( index: number ) => {
    if ( !isBtnHovered ) {
      setOpenCards( index );
      onDraftSelect( datas[ index ] ? datas[ index ].html : '' )
    }
  };
  const handleRefreshClick = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsRefreshing( true );
    setTimeout( () => setIsRefreshing( false ), 2000 );
  };
  const handleChildClick = async () => {
    console.log( "clicked", "fetchQuestionClarity" );
    setIsRefreshing( true );
    if ( from === "PRE" || from === "POST" ) {
      const response = await fetchQuestionClarity( { userId: user?.id, programId: user?.activeProgramId, userWorksheetId: userWorkSheetId, type: type, sectionId: section?.id, pillName: title, pillChildName: data.pillName, question: questionId, questionType: from } );
      console.log( response, "fetchSectionClarityfetchSectionClarity" );
      //@ts-ignore
      setDataResponse( response?.response );
      setIsRefreshing( false );
    }
  }
  console.log( "draftchips", data, index, childRef, from, worksheet, section )
  const datas = [
    {
      header: "Draft 1",
      bulletField: false,
      discription1: "START: Solution based discussion in sales conversations. ",
      discription2:
        "STOP: Pushy/Sales marketing based discussions in sales conversations.  ",
      discription3:
        "DO DIFFERENTLY: Balance of Solutioning related discussions and Marketing discussions, pushing the features and value of our product.  ",
      html: `
      <ul>
      <li><b>START:</b> Solution based discussion in sales conversations.</li>
      <li><b>STOP:</b> Pushy/Sales marketing based discussions in sales conversations.</li>
      <li><b>DO DIFFERENTLY:</b> Balance of Solutioning related discussions and Marketing discussions, pushing the features and value of our product.</li>
      </ul>`
    },
    {
      header: "Draft 2",
      bulletField: false,
      discription1:
        "Start Implementing Solution-Based Discussions in Sales Conversations",
      discription2: "Stop Engaging in Overly Aggressive Sales Tactics ",
      discription3: "Do Differently - Find a Balanced Approach",
      html: `
      <ul class="ListStyle">
      <li>Start: Solution based discussion in sales conversations.</li>
      <li>Stop: Pushy/Sales marketing based discussions in sales conversations.</li>
      <li>Do Differently: Balance of Solutioning related discussions and Marketing discussions, pushing the features and value of our product.</li>
      </ul>`
    },
  ];
  const [ openCards, setOpenCards ] = useState( -1 );


  const skeletonArray = new Array( 2 ).fill( {} );
  return (
    <Box
      className="informationPill_container"
      onMouseEnter={ () => setIsHovered( true ) }
      onMouseLeave={ () => setIsHovered( false ) }
    >

      <Box
        sx={ { display: "flex", gap: "8px", alignItems: "center" } }

      >
        <img src="/images/icons/binocular.svg" alt="Binocular Icon" />
        <Typography component="div" sx={ { fontSize: "12px", fontWeight: 600 } } onClick={ () => {
          onclick( isExpanded ? -1 : index );
          setIsExpanded( !isExpanded );
          if ( dataResponse === null ) {
            handleChildClick();
          }
        } }>
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
        <Box sx={ { width: "100%" } }>
          { isRefreshing ? (
            <>
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
                      height={ 15 }
                    />
                  </Box>
                  <Box
                    className={ openCards == index ? "" : "hideDescription" }
                    sx={ {
                      marginTop: "5px",
                    } }
                  >
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      width="100%"
                      height={ 15 }
                    />
                  </Box>
                </Box>
              ) ) }
            </>
          ) : (
            <>
              <Box sx={ { padding: "5px 15px" } }>
                <Typography component="div" sx={ {
                  marginTop: "10px",
                  display: "flex",
                  columnGap: "20px",
                  flexWrap: "wrap",
                } }>
                  { dataResponse?.map( ( item: any, index: any ) => (
                    <Box
                      key={ index }
                      sx={ {
                        width: "48%",
                        padding: "10px",
                        borderRadius: "16px",
                        background: openCards == index ? '#FCFCFD' : 'rgba(221, 227, 238, 0.25)',
                        height: !openCards == index ? "fit-content": "initial",
                        border: openCards == index ? '1px solid #2e5db0' : 'none'
                        
                      } }
                      onClick={ () => toggleCard( index ) }
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
                          <Box  sx={ {
                          fontSize: "11px", width: "100%",
                          fontWeight: 500}}><span>Draft { dataResponse?.length }</span> </Box>
                        </Box>
                        <div style={ {
                              background: openCards == index
                                ? "#ebf2f7"
                                : "none", width: "20px", borderRadius: "20px", height: "20px", textAlign:"center"
                            } }>
                          <img
                            onClick={ ( e: any ) => { openCards == index ? toggleCard( -1 ) : toggleCard( index ); e.stopPropagation() } }
                            style={ {
                              transform: openCards == index
                                ? "rotate(0deg)"
                                : "rotate(0deg)",
                            } }
                            src={ "/images/icons/downArrow.svg" }
                          />
                        </div>
                          
                        
                      </Box>

                      <Box
                        className={
                          openCards == index ? "mt-15" : "hideDescriptionDraft , ml-22 mt-5"
                        }
                        sx={ {
                          fontSize: "11px",
                          fontWeight: 400,
                        } }
                      >
                        <div dangerouslySetInnerHTML={ { __html: item?.response } } />
                      </Box>

                      <Box>
                        { openCards == index && (
                          <Box
                            sx={ {
                              display: "flex",
                              columnGap: "10px",
                              marginTop: "20px",
                            } }
                          >
                            <Button
                              variant="contained"
                              size="small"
                              className="cag-blue-bg commonBtnStyle commonBlueBtnStyle"
                              sx={ { color: "white" } }
                              onMouseEnter={ () => setIsBtnHovered( true ) }
                              onMouseLeave={ () => setIsBtnHovered( false ) }
                              onClick={ () => acceptClick( index ) }
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
                              onClick={ () => dismissClick( index ) }
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
                        ) }
                      </Box>
                    </Box>
                  ) ) }
                </Typography>
              </Box>
            </>
          ) }
        </Box>
      ) }
    </Box>
  );
};
export default DraftChip;
