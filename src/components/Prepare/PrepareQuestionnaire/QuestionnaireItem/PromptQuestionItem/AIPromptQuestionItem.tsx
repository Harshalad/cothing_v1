import { Box, Typography, TextField, CircularProgress, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import Spinner from "../../../../common/Spinner/Spinner";
import { Height } from "@mui/icons-material";
import PopUp from "../../../../PopUp";
const aiGreyIcon = "/images/aiGrey.svg";
const aiResponseIcom = "/images/aiResponseIcon.svg"
const aiOpenIcon = "/images/aiOpenIcon.svg"
const genimage = "/images/F2.svg"
import CloseIcon from "@mui/icons-material/Close";


const AIPromptQuestionItem = ( {
	questionAnswerObject,
	localSection,
	setLocalSection,
	promptQuestion,
	index,
	storedAnswer,
	currentAnswer,
	setCurrentAnswer,
	canEdit,
	canView,
	worksheet,
	localSectionId,
	ailoader,
	handleRegenClick,
	secLoader,
	handleSecAi,
	genSecLoader,
	quesLoader
}: any ) => {
	console.log( secLoader, "secLoadersecLoader" )

	const [ open, setOpen ] = useState( "" );
	const [ aiSection, setAiSection ] = useState<any>( worksheet?.sectionAIFeedback?.find( ( aiSection: any ) => aiSection.sectionId === localSectionId ) );
	//@ts-ignore
	const [ aiQuestion, setAiQuestion ] = useState<any>( aiSection ? aiSection?.questions ? aiSection?.questions[ index ]?.aiFeedback : null : null );
	const [ aiFeedback, setAiFeedback ] = useState<any>( null );
	const [ openPopUp, setOpenPopUp ] = useState<any>( false );
	const [ curPrompt, setCurGap ] = useState<any>( null );
	const [ aiSec, setAiSec ] = useState<any>( null );
	const [ aiSecFeedback, setAiSecFeedback ] = useState<any>( null );




	const handlePopUpClick = ( gap: any ) => {
		setOpenPopUp( true );
		setCurGap( gap );
	}

	useEffect( () => {
		setAiSection(
			worksheet?.sectionAIFeedback?.find( ( aiSection: any ) => aiSection.sectionId === localSectionId )
		);
		setAiSec( worksheet?.sectionLevelFeedback?.find( ( aiSection: any ) => aiSection.sectionId === localSectionId ) );

	}, [ localSectionId, worksheet ] )
	useEffect( () => {
		setAiQuestion( aiSection?.questions[ index ] )
	}, [ aiSection, index ] )
	useEffect( () => {
		setAiSecFeedback( aiSec?.aiFeedback ? aiSec?.aiFeedback[ aiSec?.aiFeedback.length - 1 ] : null )
	}, [ aiSec ] )
	useEffect( () => {
		setAiFeedback( aiQuestion?.aiFeedback ? aiQuestion?.aiFeedback[ aiQuestion?.aiFeedback.length - 1 ] : null );
	}, [ aiQuestion, index ] )

	const handleTooltipOpen = ( index: any ) => {
		setOpen(
			index
		);
	};

	const handleTooltipClose = () => {
		//@ts-ignore
		setOpen( -1 );
	};

	console.log( "aiFeedback", worksheet, aiSecFeedback );

	return (
		<>
			<Box key={ index }>
				<Box style={ { width: '100%', height: '100%', justifyContent: 'space-between', alignItems: 'flex-start', display: 'inline-flex' } }>
					<Box
						className="prep_quest_box"
						sx={ {
							backgroundColor: "#3E4248",
							width: "80%"
						} }
					// sx={{
					//   backgroundColor: showQuestOneReadOnly ? "#989EA5" : "#3E4248",
					// }}
					>
						<Typography className="prep_quest">{ promptQuestion }</Typography>

					</Box>
					{ worksheet?.aiWorksheet &&
						<Box style={ { width: "20%", height: "32px", borderRadius: 16, justifyContent: 'right', gap: 10, display: 'inline-flex' } }>
							{ quesLoader === index ? <Box style={ { background: 'white', borderRadius: 48, display: 'flex', height: "30px" } }>
								<img
									//@ts-ignore
									height="30px"
									src={ genimage }
									alt="manager guidance"
								/></Box> : <Box
									style={ { color: '#2E5DB0', fontSize: 20, fontFamily: 'SF Pro', fontWeight: '400', wordWrap: 'break-word' } }>
								<img
									//@ts-ignore
									src={ aiOpenIcon }

									height={ 24 }
									alt="manager guidance"
								/>
							</Box> }
						</Box> }
				</Box>
				<Box className="prep_textfld">
					{ currentAnswer && (
						<Box className="loader">
							<span></span>
							<span></span>
							<span></span>
						</Box>
					) }
					<TextField
						id="prep_quest1"
						placeholder="Type...."
						variant="outlined"
						size="small"
						fullWidth
						disabled={ !canEdit }
						inputProps={ {
							sx: {
								fontSize: "16px",
								color: "#3E4248",
							},
							className: "prep_txt_fld",
						} }
						// InputProps={{
						//   readOnly: showQuestOneReadOnly ? true : false,
						// }}
						// className={showQuestOneReadOnly ? "readOnlyInput" : ""}
						// onFocus={() =>
						//   showQuestOneReadOnly ? "" : showLoader("prep_quest1")
						// }
						// onBlur={() => (showQuestOneReadOnly ? "" : showLoader("prep_quest1"))}
						value={
							canView
								? localSection?.promptQuestionsMap?.[ index ]?.answer
								: "*You do not have permission to view this*"
						}
						onChange={ ( e ) => {
							const modifiedQuestionAnswerObject = {
								question: localSection?.promptQuestionsMap?.[ index ]?.question,
								answer: e.target.value,
							};
							const modifiedPromptQuestionsMap = localSection?.promptQuestionsMap;
							modifiedPromptQuestionsMap[ index ] = modifiedQuestionAnswerObject;

							const modifiedLocalSection = {
								...localSection,
								promptQuestionsMap: modifiedPromptQuestionsMap,
							};
							console.log( e.target.value, modifiedLocalSection );
							setLocalSection( modifiedLocalSection );
						} }
						multiline
						maxRows={ 6 }
					// setLocalSection({...localSection, promptQuestionsMap:[...localSection?.prompQuestionsMap,localSection?.promptQuestionsMap?.[index]?.answer: e.target.value]})}}
					/>

					{ worksheet?.aiWorksheet && aiFeedback && <Box
						className="ai_ques_box"
						sx={ {
							backgroundColor: '#EEF7F9',
							color: 'white',
							padding: '8px',
							borderRadius: '16px',
						} }
					>
						<Box className="ai_outer_box">
							<Box className="ai_head_box" sx={ { justifyContent: "space-between" } }>
								<Typography className="ai_head" onClick={ () => handlePopUpClick( aiFeedback?.prompt ) }>SUGGESTIONS • IMPROVE ON { aiFeedback?.gaps?.length } POINTS TO IMPROVE QUALITY</Typography>
								{/*<Typography className="ai_viewless">View Less</Typography>*/ }
							</Box>
							<Typography className="ai_summary">{ aiFeedback?.summary }</Typography>
						</Box>
						<Box style={ { width: '100%', height: '100%', paddingBottom: 10, justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex', flexWrap: 'wrap' } }>
							{ aiFeedback?.gaps?.map( ( gap: any, indexx: number ) => {
								return (
									<Box key={ indexx } style={ { height: 100, paddingLeft: 14, paddingRight: 14, paddingTop: 10, paddingBottom: 10, background: 'rgba(255, 255, 255, 0.85)', borderRadius: 10, justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex', flex: '0 0 49%', boxSizing: 'border-box' } }>
										<Box style={ { width: 16, alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex' } }>
											<Box style={ { alignSelf: 'stretch', height: 21, color: 'black', fontSize: 14, fontFamily: 'sans-serif', fontWeight: '600', wordWrap: 'break-word' } }>{ indexx + 1 }.</Box>
										</Box>
										<Box style={ { flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex' } }>
											<Box style={ { alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex', } }>
												<Box style={ { flex: '1 1 0', alignSelf: 'stretch', color: '#3E4248', fontSize: 14, fontFamily: 'sans-serif', fontWeight: '600', wordWrap: 'break-word' } }>{ gap?.heading }</Box>
												<Box style={ { width: 16, height: "auto", position: 'relative', opacity: 0.50 } }>
													<Box>
														<Box className="tooltip_box" sx={ { color: "black" } }>
															<Tooltip
																open={ open === "que" + indexx }
																onClose={ handleTooltipClose }
																title={ gap?.explanation }
																arrow
																disableTouchListener
																sx={ { color: "black" } }
															>
																<img
																	src="/images/more-info.png"
																	alt="more info"
																	width={ 22 }
																	height={ 22 }
																	style={ { cursor: "pointer" } }
																	onClick={ () => handleTooltipOpen( "que" + indexx ) }
																	onMouseEnter={ () => handleTooltipOpen( "que" + indexx ) }
																/>
															</Tooltip>
														</Box>
													</Box>
												</Box>
											</Box>
											<Box style={ { alignSelf: 'stretch', height: 34, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 5, display: 'flex' } }>
												<Box style={ { alignSelf: 'stretch', height: 34, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 8, display: 'flex' } }>
													<Box style={ { alignSelf: 'stretch', color: '#3E4248', fontSize: 14, fontFamily: 'sans-serif', fontWeight: '400', wordWrap: 'break-word' } }>{ gap?.gap_summary } </Box>
												</Box>
											</Box>
										</Box>
									</Box>
								)
							} ) }
						</Box>
						<Box style={ { width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'center', gap: 16, display: 'inline-flex' } }>
							{/*<Box style={ { justifyContent: 'flex-end', alignItems: 'center', gap: 16, display: 'flex' } }>
              <Box style={ { width: 16, height: 16, position: 'relative' } }>
                <Box style={ { width: 14.67, height: 13.33, left: 0.67, top: 0.67, position: 'absolute', opacity: 0.10, background: 'black' } }></Box>
              </Box>
              <Box style={ { width: 16, height: 16, position: 'relative', opacity: 0.10 } }>
                <Box style={ { width: 14.67, height: 13.33, left: 0.67, top: 2, position: 'absolute', background: 'black' } }></Box>
              </Box>
            </Box>*/}
							<Box style={ { justifyContent: 'flex-end', alignItems: 'center', gap: 10, display: 'flex' } }>
								{ ailoader === index ? <Box style={ { background: 'white', borderRadius: 48, justifyContent: 'flex-start', alignItems: 'center', display: 'flex', height: "30px" } }><img
									//@ts-ignore
									height="30px"
									src={ genimage }
									alt="manager guidance"
								/></Box> : <Box style={ { paddingLeft: 12, paddingRight: 12, paddingTop: 5, paddingBottom: 5, background: 'white', borderRadius: 48, justifyContent: 'flex-start', alignItems: 'center', gap: 12, display: 'flex' } }>
									<Box style={ { justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'flex' } }>
										<Box style={ { mixBlendMode: 'multiply', textAlign: 'center', color: '#59ADC4', fontSize: 14, fontFamily: 'sans-serif', fontWeight: '600', wordWrap: 'break-word', cursor: "pointer" } } onClick={ () => handleRegenClick( index, localSectionId ) }>RE-GENERATE</Box>
										{/*<Box style={ { width: 16, height: 16, mixBlendMode: 'multiply', justifyContent: 'center', alignItems: 'center', display: 'flex' } }>
                    <Box style={ { width: 17.14, height: 19.43, textAlign: 'center', color: '#55B6C3', fontSize: 14, fontFamily: 'SF Pro', fontWeight: '590', wordWrap: 'break-word' } }>􀅈</Box>
                  </Box>*/}
									</Box>
								</Box> }
							</Box>
						</Box>
					</Box>
					}

				</Box>
			</Box >
			<PopUp open={ openPopUp } data={ curPrompt } setOpenPopUp={ setOpenPopUp } />
		</>
	);
};

export default AIPromptQuestionItem;