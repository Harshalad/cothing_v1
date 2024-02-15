import { Box, Rating, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PopUp from "../PopUp";
import { Margin } from "@mui/icons-material";
const aiOpenIcon = "/images/F2.svg"


const AiPrep = ( { data, handleCrossClick, getAiprepSheet, secLoader }: any ) => {
	const [ openPopUp, setOpenPopUp ] = useState<any>( false );
	const [ curPrompt, setCurGap ] = useState<any>( null );
	const [ qRating, setQRating ] = useState<any>( null );
	const [ cRating, setCRating ] = useState<any>( null );
	useEffect( () => {
		setQRating( data?.quality_rating );
		setCRating( data?.completeness_rating );
	}, [ data ] )
	const [ open, setOpen ] = useState( "" );
	console.log( data, "ddsdsdsds" );
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
	return (
		<>
			<Box sx={ { marginTop: "15px" } }>
				<Box style={ { width: '100%', height: 'auto', paddingLeft: 24, paddingRight: 24, background: "#E6F3F6", borderRadius: 8, flexDirection: 'column', justifyContent: 'center', gap: 6, display: 'inline-flex' } }>
					<Box style={ { alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'flex-start', display: 'inline-flex', marginTop: "10px" } }>
						<Box style={ { mixBlendMode: 'multiply', textAlign: 'center', color: '#59ADC4', fontSize: 16, fontFamily: 'sans-serif', fontWeight: '700', wordWrap: 'break-word' } } onClick={ () => handlePopUpClick( data?.prompt ) }>Generative AI Feedback</Box>
						<Box style={ { textAlign: 'right', color: '#3861C9', fontSize: 12, fontFamily: 'sans-serif', fontWeight: '500', wordWrap: 'break-word', cursor: "pointer" } } onClick={ () => handleCrossClick() }>View Less</Box>
					</Box>
					<Box style={ { alignSelf: 'stretch', height: 0, border: '1.60px rgba(255, 255, 255, 0.85) solid' } }></Box>
					<Box style={ { alignSelf: 'stretch', justifyContent: "space-between", alignItems: 'center', gap: 16, display: 'inline-flex', paddingLeft: "20px", paddingRight: "20px" } }>

						<Box style={ { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 } }>
							<Box style={ { color: '#3E4248', fontSize: 14, fontFamily: 'sans-serif', fontWeight: '600', wordWrap: 'break-word' } }>Quality Rating</Box>
							<Box style={ { flex: '1 1 0', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10 } }>
								<Rating name="manager rating" value={ qRating } readOnly className="prep_rating" />
							</Box>
						</Box>

						<Box style={ { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 } }>
							<Box style={ { color: '#3E4248', fontSize: 14, fontFamily: 'sans-serif', fontWeight: '600', wordWrap: 'break-word' } }>Completeness Rating</Box>
							<Box style={ { flex: '1 1 0', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10 } }>
								<Rating name="manager rating" value={ cRating } readOnly className="prep_rating" />
							</Box>
						</Box>

					</Box>
					<Box style={ { alignSelf: 'stretch', height: "auto", paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12, background: 'rgba(255, 255, 255, 0.85)', borderRadius: 8, overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'flex', marginBottom: "20px" } }>
						<Box style={ { justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex' } }>
							<Box style={ { textAlign: 'center', color: '#EFD02E', fontSize: 14, fontFamily: 'SF Pro', fontWeight: '400', wordWrap: 'break-word' } }>􁷙</Box>
							<Box style={ { textAlign: 'center', color: 'rgba(0, 0, 0, 0.85)', fontSize: 14, fontFamily: 'sans-serif', fontWeight: '700', wordWrap: 'break-word' } } onClick={ () => handlePopUpClick( data?.prompt ) }>Ideas for Improvement</Box>
						</Box>
						<Box className="ai_outer_box">
							<Typography className="ai_summary">{ data?.summary }</Typography>
						</Box>
						<Box style={ { width: '100%', height: 'auto', paddingBottom: 10, justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex', flexWrap: 'wrap' } }>
							{ data?.gaps?.map( ( gap: any, indexx: number ) => {
								return (
									<Box key={ 1 } style={ { height: "150px", paddingLeft: 14, paddingRight: 14, paddingTop: 10, paddingBottom: 10, backgroundColor: '#EEF7F9', borderRadius: 10, justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex', flex: '0 0 49%', boxSizing: 'border-box', marginBottom: "10px" } }>
										<Box style={ { width: 16, alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex' } }>
											<Box style={ { alignSelf: 'stretch', height: 21, color: 'black', fontSize: 14, fontFamily: 'sans-serif', fontWeight: '600', wordWrap: 'break-word' } }>{ indexx + 1 }.</Box>
										</Box>
										<Box style={ { flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex' } }>
											<Box style={ { alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex' } }>
												<Box style={ { flex: '1 1 0', alignSelf: 'stretch', color: '#3E4248', fontSize: 14, fontFamily: 'sans-serif', fontWeight: '600', wordWrap: 'break-word' } }>{ gap?.heading }</Box>
												<Box style={ { width: 16, height: "auto", position: 'relative', opacity: 0.50 } }>
													<Box >
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
											<Box style={ { alignSelf: 'stretch', height: 34, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 5, display: 'flex', marginTop: "10px" } }>
												<Box style={ { alignSelf: 'stretch', height: 34, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 8, display: 'flex' } }>
													<Box style={ { alignSelf: 'stretch', color: '#3E4248', fontSize: 14, fontFamily: 'sans-serif', fontWeight: '400', wordWrap: 'break-word' } }>{ gap?.gap_summary }</Box>
												</Box>
											</Box>
										</Box>
									</Box>
								)

							} )


							}
						</Box>

					</Box>
					<Box style={ { justifyContent: 'flex-start', alignItems: 'center', display: 'flex', marginBottom: "10px ", height: "30px" } }>
						{ secLoader ? <Box style={ { background: 'white', borderRadius: 48, justifyContent: 'flex-start', alignItems: 'center', display: 'flex', marginBottom: "10px" } }> <img
							//@ts-ignore
							src={ aiOpenIcon }
							alt="manager guidance"
						/></Box> :
							<Box style={ { paddingLeft: 12, paddingRight: 12, paddingTop: 5, paddingBottom: 5, background: 'white', borderRadius: 48, justifyContent: 'flex-start', alignItems: 'center', gap: 12, display: 'flex' } }>
								<Box style={ { justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'flex' } }>
									<Box style={ { mixBlendMode: 'multiply', textAlign: 'center', color: '#59ADC4', fontSize: 14, fontFamily: 'sans-serif', fontWeight: '600', wordWrap: 'break-word', cursor: "pointer" } } onClick={ () => getAiprepSheet() }>RE-GENERATE</Box>
									{/*<Box style={ { width: 16, height: 16, mixBlendMode: 'multiply', justifyContent: 'center', alignItems: 'center', display: 'flex' } }>
                    <Box style={ { width: 17.14, height: 19.43, textAlign: 'center', color: '#55B6C3', fontSize: 14, fontFamily: 'SF Pro', fontWeight: '590', wordWrap: 'break-word' } }>􀅈</Box>
                  </Box>*/}
								</Box>
							</Box>
						}
					</Box>
				</Box >
			</Box>
			<PopUp open={ openPopUp } data={ curPrompt } setOpenPopUp={ setOpenPopUp } />
		</>
	);
}
export default AiPrep; 