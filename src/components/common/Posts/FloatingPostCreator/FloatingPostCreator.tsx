import {
  Grid,
  Box,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useRef, useState } from "react";
import Spinner from "../../Spinner/Spinner";
import { createPost } from "../../../../actions/align/posts/createPost";
import { useSelector } from "react-redux";
import { fetchMyCollaboratorsAsLP } from "../../../../actions/align/posts/fetchMyCollaboratorsAsLP";
import { MANAGER_VIEW_STATE } from "../../../../constants/auth";
import { logUserEngagement } from "../../../../actions/actionCenter/logUserEngagement";

const FloatingPostCreator = ( {
  showAskQuestion,
  goal,
  type,
  currentUserRole,
  reportee,
  userWorkSheetId,
  scrollToBottomOfPosts,
}: any ) => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  const [ showSendTo, setSendTo ] = useState( false );
  const [ sendToPerson, setSendToPerson ] = useState( "" );
  const [ questionText, setQuestionText ] = useState( "" );
  const [ sendQuestionLoading, setSendQuestionLoading ] = useState( false );
  const [ collaborators, setCollaborators ] = useState<any>( null );
  const [ selectedCollaborator, setSelectedCollaborator ] = useState<any>( null );
  const refSendTo = useRef( null );
  useEffect( () => {
    document.addEventListener( "mousedown", handleOutSideClick );
    return () => document.removeEventListener( "mousedown", handleOutSideClick );
  }, [] );
  console.log( user, "userhererehrehrehre" );

  useEffect( () => {
    const getMyCollaborators = async () => {
      try {
        const response = await fetchMyCollaboratorsAsLP( { userId: user?.id } );
        console.log( response, "fetchCollaboratorsOfLP1234" );
        if ( response ) {
          //@ts-ignore
          const filteredCollaborators = response?.filter(
            ( collaborator: any ) =>
              !user?.noAlignRequired
                ? collaborator?.collaboratorRole === "MANAGER" ||
                collaborator?.collaboratorRole === "EXPERT"
                : collaborator?.collaboratorRole === "EXPERT"
          );
          console.log( response, "fetchMyCollaboratorsAsLP" );
          if ( filteredCollaborators?.length === 1 ) {
            setSendToPerson( filteredCollaborators[ 0 ]?.collaboratorLabel );
          }
          setCollaborators( filteredCollaborators );
          if ( goal?.status === "ADDED" ) {
            //@ts-ignore
            const filterColab = response?.filter(
              ( collaborator: any ) =>
                collaborator?.collaboratorRole === "EXPERT"
            );
            console.log( filterColab, "filterColab" );
            if ( filterColab?.length === 1 ) {
              setSendToPerson( filterColab[ 0 ]?.collaboratorLabel );
            }
            setCollaborators( filterColab );
          }
        }

      } catch ( error ) {
        console.log( error );
      }
    };
    getMyCollaborators();

  }, [ user, goal ] );
  console.log( collaborators, "collaborators" );

  const onSendQuestionClick = async () => {
    if ( questionText.trim().length === 0 ) {
      return;
    }
    if (
      ( currentUserRole === MANAGER_VIEW_STATE.LP && sendToPerson ) ||
      currentUserRole !== MANAGER_VIEW_STATE.LP
    ) {
      try {
        setSendQuestionLoading( true );
        await createPost( {
          userId:
            currentUserRole === MANAGER_VIEW_STATE.LP
              ? user?.id
              : reportee?.userId
                ? reportee?.userId
                : reportee?.id,
          programId:
            currentUserRole === MANAGER_VIEW_STATE.LP
              ? user?.activeProgramId
              : reportee?.programId
                ? reportee?.programId
                : reportee?.activeProgramId,
          userGoalId: goal?.id,
          type,
          title: "Test Title",
          text: "This is post text",
          subText: "This is post sub text",
          typeAttributes: {
            // questionArea,

            questionText,
            type: "UNSTRUCTURED_QUESTION",
          },
          postedByUserId: user?.id,
          postedByName: user?.name,
          postedByDesignation: user?.designation,
          postedByRole: currentUserRole,
          postedByEmail: user?.email,
          id: new Date().valueOf().toString(),
          userWorksheetId: userWorkSheetId,
          postedToName:
            currentUserRole === MANAGER_VIEW_STATE.LP
              ? selectedCollaborator?.userName
              : reportee?.userName
                ? reportee?.userName
                : reportee?.name,
          postedToUserId:
            currentUserRole === MANAGER_VIEW_STATE.LP
              ? selectedCollaborator?.userId
              : reportee?.userId
                ? reportee?.userId
                : reportee?.id,
          postedToRole: selectedCollaborator?.collaboratorRole
            ? selectedCollaborator?.collaboratorRole
            : MANAGER_VIEW_STATE.LP,
        } );

        if ( currentUserRole === MANAGER_VIEW_STATE.LP ) {
          logUserEngagement( {
            userId: user?.id,
            goalId: goal?.id,
            programId: user?.activeProgramId,
            type: "engagement",
            action: "employee_ask_align",
            contentName: goal?.name,
            contentId: "NA",
            milestoneId: "NA",
            marks: 2,
          } );
        }

        setSendQuestionLoading( false );
        setQuestionText( "" );
        scrollToBottomOfPosts();
      } catch ( error ) {
        console.log( error );
        setSendQuestionLoading( false );
      }
    }
  };
  if ( !showAskQuestion ) return <></>;

  const handleOutSideClick = ( event: any ) => {
    //@ts-ignore
    if ( refSendTo.current && !refSendTo.current.contains( event.target ) ) {
      setSendTo( false );
    }
  };



  return (
    <>
      <Grid
        className={
          currentUserRole === MANAGER_VIEW_STATE.LP
            ? "aligngl_rght_innr_bottom"
            : ""
        }
      >
        { currentUserRole === MANAGER_VIEW_STATE.LP ? (
          <Box sx={ { position: "relative" } } className="algn_sendto_drpdwn" ref={ refSendTo }>
            <TextField
              id="sendto"
              placeholder="Send To"
              variant="outlined"
              size="small"
              fullWidth
              inputRef={ refSendTo }
              inputProps={ {
                sx: {
                  fontSize: "16px",
                  color: "#3E4248",
                  cursor: "pointer",
                },
              } }
              InputProps={ {
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end" sx={ { color: "#3E4248" } }>
                    { showSendTo ? (
                      <KeyboardArrowUpIcon style={ { color: "#3E4248" } } />
                    ) : (
                      <KeyboardArrowDownIcon style={ { color: "#3E4248" } } />
                    ) }
                  </InputAdornment>
                ),
                sx: { cursor: "pointer" },
              } }
              value={ sendToPerson }
              onClick={ () => {
                setSendTo( !showSendTo );
              } }
            />
            <Box
              className="dropdown"
              sx={ { display: showSendTo ? "block" : "none" } }
            >
              { collaborators &&
                collaborators?.length &&
                collaborators?.map( ( collaborator: any, index: number ) => {
                  return (
                    <Typography
                      key={ index }
                      className="drpdwn_option"
                      onClick={ () => {
                        setSendToPerson( collaborator?.collaboratorLabel );
                        setSendTo( false );
                        setSelectedCollaborator( collaborator );
                      } }
                    >
                      { collaborator?.collaboratorLabel } (
                      { collaborator?.userName })
                    </Typography>
                  );
                } ) }

              {/* <Typography
            className="drpdwn_option"
            onClick={() => {
              setSendToPerson("Manager");
              setSendTo(false);
            }}
          >
            Manager
          </Typography>
          <Typography
            className="drpdwn_option"
            onClick={() => {
              setSendToPerson("Expert");
              setSendTo(false);
            }}
          >
            Expert
          </Typography> */}
            </Box>
          </Box>
        ) : null }
        <Box className="algn_askqust_txtfld">
          <TextField
            id="ask_quest"
            placeholder="Discuss..."
            variant="outlined"
            size="small"
            fullWidth
            value={ questionText }
            multiline
            onChange={ ( e ) => setQuestionText( e.target.value ) }
            onKeyDown={ ( e ) => {
              if (
                ( ( e.key === "Enter" && e.shiftKey ) ||
                  ( e.key === "Enter" && e.ctrlKey ) ) &&
                questionText?.length > 0
              ) {
                e.preventDefault();
                setQuestionText( ( prevChatText: any ) => prevChatText + "\n" );
              } else if ( e.key === "Enter" && questionText.trim() !== "" ) {
                e.preventDefault();
                onSendQuestionClick();
              }
            } }
            inputProps={ { sx: { fontSize: "16px", color: "#1C2129" } } }
            InputProps={ {
              endAdornment: (
                <InputAdornment position="end">
                  { sendQuestionLoading ? (
                    <Spinner />
                  ) : (
                    <img
                      src={ "/images/icons/ask-question.svg" }
                      alt="Ask Question"
                      width={ 20 }
                      height={ 17 }
                      onClick={ onSendQuestionClick }
                    ></img>
                  ) }
                </InputAdornment>
              ),
              sx: { cursor: "pointer" },
            } }
          />
        </Box>
      </Grid>
    </>
  );
};
export default FloatingPostCreator;
