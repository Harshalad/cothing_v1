import { useCallback, useEffect, useState } from "react";
import {
	Box,
	TextField,
	Typography,
	Button,
	Stack,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Dialog,
	DialogContent,
	LinearProgress,
	Divider,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const aiOpenIcon = "/images/F2.svg"
const aiOpenIcons = "/images/aigenicon.svg"

import SubmitPrepPopUp from "../../SubmitPrepPopUp/SubmitPrepPopUp";
import QuestionnaireItem from "../QuestionnaireItem/QuestionnaireItem";
import { completeUserWorksheet } from "../../../../actions/prepare/completeUserWorksheet";
import { useSelector } from "react-redux";
import PostsSection from "../../../common/Posts/PostsSection";
import RatingComp from "../../RatingComp/RatingComp";
import AskComp from "../../AskComp/AskComp";
import { requestRating } from "../../../../actions/prepare/rating/requestRating";
import { toast } from "react-toastify";
import Spinner from "../../../common/Spinner/Spinner";
import { MANAGER_VIEW_STATE } from "../../../../constants/auth";
import { updateRatingRequestToDone } from "../../../../actions/prepare/rating/updateRatingRequestToDone";
import { createPost } from "../../../../actions/align/posts/createPost";
import ExpertRating from "../../ExpertRating/ExpertRating";
import ManagerRating from "../../ManagerRating/ManagerRating";
import { fetchRatingRequests } from "../../../../actions/prepare/rating/fetchRatingRequests";
import { fetchRatingRequestQp } from "../../../../actions/quickPrep/rating/fetchRatingRequest";
import { requestRatingQp } from "../../../../actions/quickPrep/rating/requestRating";
import { useRouter } from "next/router";
import { completeUserWorksheetQuickPrep } from "../../../../actions/quickPrep/completeUserWorksheetQuickPrep";
import PrepShare from "../../../ShareWithManager/PrepShare";
import AiPrep from "../../AiPrep";
import { aiFeedbackForPrep } from "../../../../actions/aiRating/aiFeedbackForPrep";
import CurrentPrepare from "../../../../zustand/CurrentPrepare";
import AIQuestionnaireItem from "../QuestionnaireItem/AIQuestionnaireItem";
var prepPopupName = "";
const AIPrepQuestionnaireInPage = ( {
	preparePage,
	closePopup,
	open,
	openQuestionnairePopup,
	worksheet,
	goalId,
	milestoneId,
	methodId,
	methodType,
	worksheetId,
	pickWorksheetFrom,
	userWorkSheetId,
	currentPanel,
	setCurrentPanel,
	setPickWorksheetFrom,
	displayMode,
	setDisplayMode,
	DISPLAY_MODES,
	collaborators,
	employeeData,
	pageType,
	canEdit,
	unsavedChanges,
	onSetUnsavedChanges,
	shareManager,
	setShareManager
}: any ) => {
	console.log( collaborators, "collaborators" );
	const { sheet } = CurrentPrepare();
	const [ event, setEvent ] = useState( pageType === "EVENT" ? true : false );
	pageType === "EVENT" ? pageType = "QUICK_PREPARATION" : null;
	const [ expanded, setExpanded ] = useState( false );
	const [ showPrepOnePreview, setPrepOnePreview ] = useState( false );
	const [ showPrepPopup, setPrepPopup ] = useState( false );
	const [ showFinish, setShowFinish ] = useState( false );
	const [ selectedCollaborator, setSelectedCollaborator ] = useState<any>( null );
	const [ secView, setSecView ] = useState<any>( "" );
	const [ secAiView, setSecAiView ] = useState<any>( false );
	const [ secLoader, setSecLoader ] = useState<any>( false );
	const [ dataAi, setDataAi ] = useState<any>( null );

	const handleCrossClick = () => {
		setSecView( "genButton" );
	}
	const getAiprepSheet = async () => {
		if ( worksheet?.aiFeedback === null ) {
			setSecLoader( true );

			const response = await aiFeedbackForPrep( {
				userId: user?.id,
				programId: user?.activeProgramId,
				worksheetId: userWorkSheetId,
				goalName: sheet?.goalName,
				milestoneName: sheet?.milestoneName,
			} )
			if ( response ) {
				setSecView( "secData" );
			}
			setSecLoader( false );
		} else {
			setSecView( "secData" );
		}
	}
	const getAiprepSheets = async () => {

		setSecLoader( true );

		const response = await aiFeedbackForPrep( {
			userId: user?.id,
			programId: user?.activeProgramId,
			worksheetId: userWorkSheetId,
			goalName: sheet?.goalName,
			milestoneName: sheet?.milestoneName,
		} )
		if ( response ) {
			setSecView( "secData" );
		}
		setSecLoader( false );
	}
	useEffect( () => {
		setDataAi( worksheet?.aiFeedback ? worksheet?.aiFeedback[ worksheet?.aiFeedback?.length - 1 ] : null );
	}, [ worksheet ] )

	useEffect( () => {

		if ( worksheet?.status === "COMPLETED" ) {
			if ( worksheet?.aiFeedback == null ) {
				setSecView( "genButton" );
			} else {
				setSecView( "secData" );
			}
		}
	}, [ worksheet ] )

	//@ts-ignore
	const user = useSelector( ( state ) => state?.auth?.nWorxUser );
	const [ requestFeedbackLoading, setRequestFeedbackLoading ] = useState( false );
	const closePrepPopup = ( value: any ) => {
		setPrepPopup( value );
	};
	const [ managerRater, setManagerRater ] = useState( null );
	const [ ratingRequests, setRatingRequests ] = useState<any>( null );

	console.log( "canEdit 123456", canEdit );

	const currentUserRole = useSelector(
		//@ts-ignore
		( state ) => state?.auth?.managerToggleView
	);
	const getRatingRequests = useCallback( async () => {
		try {
			// if (currentUserRole !== MANAGER_VIEW_STATE.LP) return;
			if ( userWorkSheetId ) {
				const response = preparePage
					? await fetchRatingRequests( userWorkSheetId )
					: await fetchRatingRequestQp( {
						userWorksheetId: userWorkSheetId,
						userId: user?.id,
						programId: user?.activeProgramId,
					} );
				if ( response !== null ) {
					setRatingRequests( response );
				}
			}
		} catch ( error ) {
			console.log( error );
		}
	}, [ userWorkSheetId ] );

	useEffect( () => {
		getRatingRequests();
	}, [ getRatingRequests ] );

	useEffect( () => {
		if ( ratingRequests?.length ) {
			const founRatingsObj = ratingRequests.find(
				( ratingRequestObj: any ) =>
					ratingRequestObj?.raterId === user?.id &&
					ratingRequestObj?.status === "rating_requested"
			);
			console.log( founRatingsObj, "foundRatingsObj" );
			setManagerRater( founRatingsObj );
		}
	}, [ ratingRequests ] );

	useEffect( () => {

		const completeWorksheet = async () => {
			console.log( showFinish, "eventShoeFinsh" );
			try {
				if ( showFinish ) {
					const response = preparePage
						? await completeUserWorksheet( {
							uwid: userWorkSheetId,
						} )
						: await completeUserWorksheetQuickPrep( {
							uwid: userWorkSheetId,
							userId: user?.id,
							programId: user?.activeProgramId,
						} );
				}
			} catch ( error ) {
				console.log( error );
			}
		};
		completeWorksheet();
	}, [ showFinish ] );

	// useEffect(() => {
	//   if (
	//     worksheet?.progressPercentage === 100 ||
	//     worksheet?.status?.toUpperCase() === "COMPLETED"
	//   ) {
	//     setShowFinish(true);
	//   }
	// }, [worksheet?.progressPercentage, worksheet?.status]);

	const askManagerForFeedbackPrepare = async () => {
		try {
			setRequestFeedbackLoading( true );
			const response = await requestRating(
				userWorkSheetId,
				selectedCollaborator?.userId,
				selectedCollaborator?.userName,
				selectedCollaborator?.collaboratorRole
			);

			if ( response ) {
				toast.success( "Request for feedback sent successfully!", {
					toastId: "FEEDBACK_REQ_SENT",
				} );
			}
		} catch ( error ) {
			console.log( error );
		} finally {
			setRequestFeedbackLoading( false );
		}
	};
	const askManagerForFeedbackQp = async () => {
		try {
			setRequestFeedbackLoading( true );
			const response = await requestRatingQp( {
				userWorksheetId: userWorkSheetId,
				raterId: selectedCollaborator?.userId,
				raterName: selectedCollaborator?.userName,
				raterRole: selectedCollaborator?.collaboratorRole,
				userId: user?.id,
				programId: user?.activeProgramId,
			} );

			if ( response ) {
				toast.success( "Request for feedback sent successfully!", {
					toastId: "FEEDBACK_REQ_SENT",
				} );
			}
		} catch ( error ) {
			console.log( error );
		} finally {
			setRequestFeedbackLoading( false );
		}
	};

	return (
		<>
			{/* <Dialog
        className="prep_modal  addFlex"
        open={open.showPrepQuestionnaire}
        sx={{ textAlign: "center", padding: "30px" }}
      > */}
			{/*<CloseIcon
        style={ {
          position: "absolute",
          top: "15px",
          right: "15px",
          zIndex: "1",
          cursor: "pointer",
        } }
        onClick={ () => {
          closePopup( false );
          setExpanded( false );
          setDisplayMode( DISPLAY_MODES.MILE_MARKERS );
        } }
      />*/}
			{ worksheet && <DialogContent className="prep_modal_content" sx={ { marginTop: "30px" } }>
				<Stack
					flexDirection="row"
					alignItems="center"
					className="goal_dtls_flex gap"
				>
					<Box  >
						{ worksheet && worksheet?.sections?.map( ( section: any, index: number ) => {
							return (
								<AIQuestionnaireItem
									key={ index }
									sectionIndex={ index }
									showPrepOnePreview={ showPrepOnePreview }
									setPrepOnePreview={ setPrepOnePreview }
									section={ section }
									closePopup={ closePopup }
									expanded={ expanded }
									setExpanded={ setExpanded }
									setPrepPopup={ setPrepPopup }
									open={ open }
									goalId={ goalId }
									milestoneId={ milestoneId }
									methodId={ methodId }
									methodType={ methodType }
									worksheetId={ worksheetId }
									sectionId={ section?.id }
									userWorkSheetId={ userWorkSheetId }
									currentPanel={ currentPanel }
									setCurrentPanel={ setCurrentPanel }
									worksheet={ worksheet }
									setShowFinish={ setShowFinish }
									setPickWorksheetFrom={ setPickWorksheetFrom }
									pageType={ pageType }
									canEdit={ canEdit }
									empData={ employeeData }
									managerRater={ managerRater }
									unsavedChanges={ unsavedChanges }
									onSetUnsavedChanges={ onSetUnsavedChanges }
									event={ event }
									pickWorksheetFrom={ pickWorksheetFrom }
								/>
							);
						} ) }
						{ worksheet && secView && secView === "genButton" ? secLoader ?
							<Box sx={ { display: "flex", marginTop: "20px", alignItems: "center", justifyContent: "center", cursor: "pointer" } }>
								<img
									//@ts-ignore
									src={ aiOpenIcon }
									alt="manager guidance"
								/>
							</Box>
							:
							<Box onClick={ () => getAiprepSheet() } sx={ { display: "flex", marginTop: "20px", alignItems: "center", justifyContent: "center", cursor: "pointer" } }>
								<div style={ { width: "500px", paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10, background: 'rgba(89, 173, 196, 0.10)', borderRadius: 48, alignItems: "center", justifyContent: "center", gap: 10, display: 'flex', textAlign: "center" } }>
									<div style={ { mixBlendMode: 'multiply', textAlign: 'center', color: '#2E5DB0', fontSize: 16, fontFamily: 'SF Pro', fontWeight: '400', wordWrap: 'break-word', display: "flex" } }><img
										//@ts-ignore
										src={ aiOpenIcons }
										width={ 24 }
										height={ 24 }
										alt="manager guidance"
									/>
									</div>
									<div style={ { mixBlendMode: 'multiply', textAlign: 'center', color: '#2E5DB0', fontSize: 16, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' } }>{ worksheet?.aiFeedback ? "View AI Feedback" : "Generate AI Feedback" }
									</div>
								</div>
							</Box> : secView === "secData" ? <AiPrep data={ dataAi } handleCrossClick={ handleCrossClick } getAiprepSheet={ getAiprepSheets } secLoader={ secLoader } /> : <Box></Box> }

						{/*{ worksheet && worksheet?.aiFeedback && <AiPrep data={ worksheet?.aiFeedback[ worksheet?.aiFeedback?.length - 1 ] } /> }*/ }
						{ showFinish && currentUserRole === MANAGER_VIEW_STATE.LP ? (
							<>
								<Box>
									<Typography className="sbmt_prep_title" sx={ { textAlign: "center" } }>
										The completed preparation will be sent to the{ " " }
										{ user?.noAlignRequired ? "" : "manager and" } expert
									</Typography>
									{ collaborators?.length ? (
										<Stack
											flexDirection="row"
											alignItems="center"
											justifyContent="center"
											gap="15px"
											mb="24px"
										>
											<RadioGroup
												row
												aria-labelledby="manager-achieve"
												name="prep-mngr-exprt-feedback"
												value={ selectedCollaborator }
											>
												{ collaborators?.map(
													( collaborator: any, index: number ) => {
														const alreadyRequested = ratingRequests?.find(
															( alreadyRequestedCollaborator: any ) =>
																alreadyRequestedCollaborator?.raterId ===
																collaborator?.userId &&
																alreadyRequestedCollaborator?.status ===
																"rating_requested"
														);
														return (
															<FormControlLabel
																key={ index }
																onClick={ ( e ) => {
																	//@ts-ignore
																	setSelectedCollaborator( collaborator );
																} }
																value={ collaborator }
																control={
																	<Radio
																		size="small"
																		sx={ {
																			color: "#989EA5",
																			"&.Mui-checked": { color: "#F58A43" },
																		} }
																		className="prep_mngr_exprt_radiolbl"
																	/>
																}
																labelPlacement="bottom"
																label={ `${ collaborator?.userName }
                                  ${ collaborator?.collaboratorLabel } ${ alreadyRequested ? "(Already requested)" : ""
																	}
                                `}
																checked={ selectedCollaborator === collaborator }
															/>
														);
													}
												) }
											</RadioGroup>
										</Stack>
									) : (
										""
									) }
									{ requestFeedbackLoading ? (
										<Spinner />
									) : (
										<Box
											className="sbmt_prep_btn"
											sx={ { display: "flex", justifyContent: "center" } }
										>
											<Button
												sx={ {
													color: "#FFFFFF",
													backgroundColor: "#F58A43",
													boxShadow: "none",
													"&:hover": {
														backgroundColor: "#F58A43",
														boxShadow: "none",
													},
													textTransform: "none",
													padding: "12px 32px !important",
													width: "max-content !important",
												} }
												onClick={ () => {
													preparePage
														? askManagerForFeedbackPrepare()
														: askManagerForFeedbackQp();
												} }
												disabled={ !selectedCollaborator }
											>
												Ask for feedback
											</Button>
										</Box>
									) }
								</Box>
							</>
						) : null }
					</Box>

					{/*{ worksheet && !worksheet?.aiWorksheet && <Box className="">
            <RatingComp
              preparePage
              expertRatings={ worksheet?.expertRatings }
              employeeData={ employeeData }
              userWorkSheetId={ userWorkSheetId }
              worksheet={ worksheet }
              pageType={ pageType }
            />
            { currentUserRole === MANAGER_VIEW_STATE.LP && pickWorksheetFrom === "user_work_sheet" && <PrepShare shareManager={ shareManager } setShareManager={ setShareManager } qp={ preparePage ? false : true } worksheetId={ userWorkSheetId } /> }
            <PostsSection
              preparePage
              type={ preparePage ? "PREPARE" : "QUICK_PREPARE" }
              userWorkSheetId={ userWorkSheetId }
              // reportee={reportee}
              reportee={ employeeData }
            />
            { currentUserRole === MANAGER_VIEW_STATE.EXPERT && managerRater ? (
              <ExpertRating
                preparePage
                employeeData={ employeeData }
                userWorkSheetId={ userWorkSheetId }
                getRatingRequests={ getRatingRequests }
              />
            ) : null }
            { currentUserRole === MANAGER_VIEW_STATE.MANAGER && managerRater ? (
              <ManagerRating
                preparePage
                employeeData={ employeeData }
                userWorkSheetId={ userWorkSheetId }
                getRatingRequests={ getRatingRequests }
              />
            ) : null }
          </Box> }*/}
					{/* </Box> */ }
				</Stack>
			</DialogContent > }
			{/* </Dialog> */ }
			<SubmitPrepPopUp
				closePrepPopup={ closePrepPopup }
				openPrepPopup={ { showPrepPopup, prepPopupName } }
				openQuestionnairePopup={ openQuestionnairePopup }
				closePopup={ closePopup }
				setExpanded={ setExpanded }
				setPrepPopup={ setPrepPopup }
			/>
		</>
	);
};
export default AIPrepQuestionnaireInPage;