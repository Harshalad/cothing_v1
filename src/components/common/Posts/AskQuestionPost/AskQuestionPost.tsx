import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useSelector } from "react-redux";
import { createPost } from "../../../../actions/align/posts/createPost";
import Spinner from "../../Spinner/Spinner";
import { fetchMyCollaboratorsAsLP } from "../../../../actions/align/posts/fetchMyCollaboratorsAsLP";
import { MANAGER_VIEW_STATE } from "../../../../constants/auth";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { logUserEngagement } from "../../../../actions/actionCenter/logUserEngagement";

const AskQuestionPost = ( {
  goal,
  showAskQuestion,
  setShowAskQuestion,
}: any ) => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );

  const currentUserRole = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
  );

  const [ questionArea, setQuestionArea ] = useState( "" );
  const [ questionText, setQuestionText ] = useState( "" );
  const [ askQuestionLoading, setAskQuestionLoading ] = useState( false );
  const [ collaborators, setCollaborators ] = useState<any>( null );
  const [ showSendTo, setSendTo ] = useState( false );
  const [ sendToPerson, setSendToPerson ] = useState( "" );
  const [ selectedCollaborator, setSelectedCollaborator ] = useState<any>( null );
  console.log( selectedCollaborator );
  useEffect( () => {
    const getMyCollaborators = async () => {
      try {
        const response = await fetchMyCollaboratorsAsLP( { userId: user?.id } );
        if ( response ) {
          setCollaborators( response );
        }
      } catch ( error ) {
        console.log( error );
      }
    };
    getMyCollaborators();
  }, [] );

  const onAskClick = async () => {
    try {
      setAskQuestionLoading( true );
      if ( user?.id && user?.activeProgramId ) {
        const response = await createPost( {
          // userWorksheetId: "1683130036177",
          userId: user?.id,
          programId: user?.activeProgramId,
          userGoalId: goal?.id,
          type: "ALIGN",
          title: "Test Title",
          text: "This is post text",
          subText: "This is post sub text",
          typeAttributes: {
            questionArea,
            questionText,
            type: "QUESTION_TEXT_AND_AREA",
          },
          postedByUserId: user?.id,
          postedByName: user?.name,
          postedByDesignation: user?.designation,
          postedByRole: currentUserRole,
          postedByEmail: user?.email,
          id: new Date().valueOf().toString(),
          postedToName:
            currentUserRole === MANAGER_VIEW_STATE.LP
              ? selectedCollaborator?.userName
              : selectedCollaborator.collaboratorName,
          postedToUserId: selectedCollaborator?.userId,
          postedToRole: selectedCollaborator?.collaboratorRole,
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

        setShowAskQuestion( false );
        console.log( response );
        setAskQuestionLoading( false );
      }
    } catch ( error ) {
      setAskQuestionLoading( false );
      console.log( error );
    }
  };

  return (
    <Box className="aligngl_quest_cont">
      <Box className="aligngl_quest_box">
        <Box
          className="aligngl_askquest_back"
          onClick={ () => setShowAskQuestion( false ) }
        >
          { " " }
          {/* onClick={() => closeAskQuestion(false)} */ }
          <Typography
            sx={ {
              fontWeight: "500",
              color: "#2D3648",
              marginBottom: "24px",
            } }
            className="go_back_flex"
          >
            <ChevronLeftIcon /> Go Back
          </Typography>
        </Box>
        <Typography className="aligngl_quest_heading">
          Provide Area of Question
        </Typography>
        <Box className="algn_askqust_txtfld">
          <TextField
            id="aligngl_cmnt_txtfld"
            placeholder="Provide Area of Question"
            variant="outlined"
            size="small"
            fullWidth
            inputProps={ {
              sx: { fontSize: "16px", color: "#1C2129" },
            } }
            value={ questionArea }
            onChange={ ( e ) => setQuestionArea( e.target.value ) }
          />
        </Box>
        <Typography className="aligngl_quest_heading mt">
          Please write your Question
        </Typography>
        <Box className="algn_askqust_txtfld">
          <TextField
            id="aligngl_cmnt_txtfld"
            placeholder="Please write your Question"
            variant="outlined"
            size="small"
            fullWidth
            inputProps={ {
              sx: { fontSize: "16px", color: "#1C2129" },
            } }
            value={ questionText }
            onChange={ ( e ) => setQuestionText( e.target.value ) }
          />
        </Box>

        <Box
          sx={ {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          } }
        >
          { currentUserRole === MANAGER_VIEW_STATE.LP ? (
            <Box sx={ { position: "relative" } } className="algn_sendto_drpdwn">
              <TextField
                id="sendto"
                placeholder="Send To"
                variant="outlined"
                size="small"
                fullWidth
                //inputRef={refSendTo}
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
          <Box className="standard_cta_box">
            { askQuestionLoading ? (
              <Spinner />
            ) : (
              <Button className="standard_cta" onClick={ onAskClick }>
                Ask
              </Button>
            ) }
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AskQuestionPost;
