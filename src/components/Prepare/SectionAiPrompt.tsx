import { Box, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import PopUp from "../PopUp";
const genimage = "/images/F2.svg"

const SectionAiPrompt = ( { handleSecAi, genSecLoader, localSectionId, worksheet, handleCrossClick, section }: any ) => {
	const [ aiSec, setAiSec ] = useState<any>( null );
	const [ open, setOpen ] = useState( "" );
	const [ openPopUp, setOpenPopUp ] = useState<any>( false );
	const [ curPrompt, setCurGap ] = useState<any>( null );
	const [ aiSecFeedback, setAiSecFeedback ] = useState<any>( null );
	useEffect( () => {
		setAiSec( worksheet?.sectionLevelFeedback?.find( ( aiSection: any ) => aiSection.sectionId === localSectionId ) );

	}, [ localSectionId, worksheet ] )
	useEffect( () => {
		setAiSecFeedback( aiSec?.aiFeedback ? aiSec?.aiFeedback[ aiSec?.aiFeedback.length - 1 ] : null )
	}, [ aiSec ] )
	const handleTooltipOpen = ( index: any ) => {
		setOpen(
			index
		);
	};
	const handlePopUpClick = ( gap: any ) => {
		setOpenPopUp( true );
		setCurGap( gap );
	}

	const handleTooltipClose = () => {
		//@ts-ignore
		setOpen( -1 );
	};
	return <>
		<Box>
			{ aiSecFeedback &&
				<>
					<Box>
						<Box style={ { alignSelf: 'stretch', height: "auto", padding: 10, background: 'rgba(89, 173, 196, 0.10)', borderTopLeftRadius: 16, borderTopRightRadius: 16, borderBottomRightRadius: 16, flexDirection: 'column', alignItems: 'flex-start', gap: 14, display: 'flex' } }>
							<Box style={ { alignSelf: 'stretch', paddingRight: 10, justifyContent: 'flex-end', alignItems: 'center', gap: 16, display: 'inline-flex' } }>

								<Box style={ { width: '100%', height: '100%', paddingLeft: 10, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' } }>

									<Box style={ { mixBlendMode: 'multiply', textAlign: 'center' } }><span style={ { color: '#59ADC4', fontSize: 16, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' } }> Feedback for  </span><span style={ { color: 'rgba(0, 0, 0, 0.50)', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' } }>{ section?.name } </span><span style={ { color: '#55B6C3', fontSize: 16, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' } }>Section</span><span style={ { color: 'rgba(0, 0, 0, 0.50)', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' } }> </span></Box>
									<Box style={ { display: 'flex', gap: "10px" } }>
										{ genSecLoader ? <Box style={ { background: 'rgba(255, 255, 255, 0.85)', borderRadius: 48, textAlign: 'center', color: '#59ADC4', fontSize: 14, fontFamily: 'sans-serif', fontWeight: '600', wordWrap: 'break-word', cursor: "pointer", height: "30px" } } ><img
											//@ts-ignore
											height="30px"
											src={ genimage }
											alt="manager guidance"
										/> </Box> : <Box style={ { width: "155px", background: 'rgba(255, 255, 255, 0.85)', borderRadius: 48, textAlign: 'center', color: '#59ADC4', fontSize: 14, fontFamily: 'sans-serif', fontWeight: '600', wordWrap: 'break-word', cursor: "pointer", paddingTop: 5, paddingBottom: 5, } } onClick={ () => handleSecAi( localSectionId ) }>
											RE-GENERATE
										</Box> }


										<Box style={ { textAlign: 'center', color: 'rgba(0, 0, 0, 0.25)', fontSize: 16, fontFamily: 'SF Pro', fontWeight: '400', wordWrap: 'break-word' } }>
											<CloseIcon
												style={ {
													zIndex: "100",
													cursor: "pointer",
												} }
												onClick={ () => {
													handleCrossClick();
												} }

											/></Box>
									</Box>
								</Box>

							</Box>
							<Box style={ { alignSelf: 'stretch', height: "auto", paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12, background: 'rgba(255, 255, 255, 0.85)', borderRadius: 8, overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'flex' } }>
								<Box style={ { justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex' } }>
									<Box style={ { textAlign: 'center', color: '#EFD02E', fontSize: 14, fontFamily: 'SF Pro', fontWeight: '400', wordWrap: 'break-word' } }>􁷙</Box>
									<Box style={ { textAlign: 'center', color: 'rgba(0, 0, 0, 0.85)', fontSize: 14, fontFamily: 'sans-serif', fontWeight: '700', wordWrap: 'break-word' } } onClick={ () => handlePopUpClick( aiSecFeedback?.prompt ) }>Ideas for Improvement</Box>
								</Box>
								<Box className="ai_outer_box">
									<Typography className="ai_summary">{ aiSecFeedback?.summary }</Typography>
								</Box>
								<Box style={ { width: '100%', height: '100%', paddingBottom: 10, justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex', flexWrap: 'wrap' } }>
									{ aiSecFeedback?.gaps?.map( ( gap: any, indexx: number ) => {
										return (
											<Box key={ indexx } style={ { height: 100, paddingLeft: 14, paddingRight: 14, paddingTop: 10, paddingBottom: 10, backgroundColor: '#EEF7F9', borderRadius: 10, justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex', flex: '0 0 49%', boxSizing: 'border-box' } }>
												<Box style={ { width: 16, alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex' } }>
													<Box style={ { alignSelf: 'stretch', height: 21, color: 'black', fontSize: 14, fontFamily: 'sans-serif', fontWeight: '600', wordWrap: 'break-word' } }>{ indexx + 1 }.</Box>
												</Box>
												<Box style={ { flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex' } }>
													<Box style={ { alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex' } }>
														<Box style={ { flex: '1 1 0', alignSelf: 'stretch', color: '#3E4248', fontSize: 14, fontFamily: 'sans-serif', fontWeight: '600', wordWrap: 'break-word' } }>{ gap?.heading }</Box>
														<Box style={ { width: 16, height: 16, position: 'relative', opacity: 0.50 } }>
															<Box>
																<Box className="tooltip_box" sx={ { color: "black" } }>
																	<Tooltip
																		open={ open === "sec" + indexx }
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
																			onClick={ () => handleTooltipOpen( "sec" + indexx ) }
																			onMouseEnter={ () => handleTooltipOpen( "sec" + indexx ) }
																		/>
																	</Tooltip>
																</Box>
															</Box>
														</Box>
													</Box>
													<Box style={ { alignSelf: 'stretch', height: 34, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 5, display: 'flex' } }>
														<Box style={ { alignSelf: 'stretch', height: 34, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 8, display: 'flex' } }>
															<Box style={ { alignSelf: 'stretch', color: '#3E4248', fontSize: 14, fontFamily: 'sans-serif', fontWeight: '400', wordWrap: 'break-word' } }>{ gap?.gap_summary }</Box>
														</Box>
													</Box>
												</Box>
											</Box>
										)
									} ) }
								</Box>
							</Box>
							{/*<Box style={ { alignSelf: 'stretch', height: 33, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-start', gap: 10, display: 'flex' } }>
                    <Box style={ { alignSelf: 'stretch', opacity: 0.85, justifyContent: 'flex-start', alignItems: 'flex-end', gap: 10, display: 'inline-flex' } }>
                      <Box style={ { paddingLeft: 12, paddingRight: 12, paddingTop: 8, paddingBottom: 8, background: 'white', borderRadius: 32, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex' } }>
                        <Box style={ { textAlign: 'center', color: '#5856D6', fontSize: 14, fontFamily: 'SF Pro', fontWeight: '400', wordWrap: 'break-word' } }>􀠎</Box>
                        <Box style={ { textAlign: 'center', color: 'rgba(0, 0, 0, 0.85)', fontSize: 14, fontFamily: 'sans-serif', fontWeight: '400', wordWrap: 'break-word' } }>Identify Gaps in my Response</Box>
                      </Box>
                      <Box style={ { paddingLeft: 12, paddingRight: 12, paddingTop: 8, paddingBottom: 8, background: 'white', borderRadius: 32, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex' } }>
                        <Box style={ { textAlign: 'center', color: '#1BAD70', fontSize: 14, fontFamily: 'SF Pro', fontWeight: '400', wordWrap: 'break-word' } }>􀠎</Box>
                        <Box style={ { textAlign: 'center', color: 'rgba(0, 0, 0, 0.85)', fontSize: 14, fontFamily: 'sans-serif', fontWeight: '400', wordWrap: 'break-word' } }>Check for Clarity</Box>
                      </Box>
                    </Box>
                  </Box>*/}
						</Box>
					</Box>

				</>
			}

			<PopUp open={ openPopUp } data={ curPrompt } setOpenPopUp={ setOpenPopUp } />

		</Box >
	</>
}
export default SectionAiPrompt;