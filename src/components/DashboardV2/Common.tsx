
import {
	Box,
	LinearProgress,
	Stack,
	Tab,
	Tabs,
	Tooltip,
	Typography,
	Fade,
} from "@mui/material";
import { useState } from "react";
const Common = ( { mapData, from }: any ) => {
	const [ showPopup, setPopup ] = useState<any>( false );

	const handlePopupOpen = ( clickedId: any ) => {
		setPopup( clickedId ? clickedId : false );
	};

	const handlePopupClose = () => {
		setPopup( false );
	};

	console.log( showPopup, "common map" );
	return (
		<>
			{ mapData?.map( ( data: any, index: any ) => {
				return (
					<Tooltip
						key={ index }
						open={ showPopup === 'dev' + index }
						onClose={ handlePopupClose }
						TransitionComponent={ Fade }
						TransitionProps={ { timeout: 300 } }
						title={
							<Box className="table_data_pop_up">
								<Stack className="pop_up_flex">
									<Box className="pop_up_color red"></Box>
									<Typography className="pop_up_text">Yet to start({ data?.yetToStart })</Typography>
								</Stack>
								<Stack className="pop_up_flex">
									<Box className="pop_up_color orange"></Box>
									<Typography className="pop_up_text">Overdue to Start ({ data?.overdueToStart })</Typography>
								</Stack>
								<Stack className="pop_up_flex">
									<Box className="pop_up_color yellow"></Box>
									<Typography className="pop_up_text">In Progress({ data?.inProgress })</Typography>
								</Stack>
								<Stack className="pop_up_flex">
									<Box className="pop_up_color blue"></Box>
									<Typography className="pop_up_text">Overdue to Complete ({ data?.overdueToComplete })</Typography>
								</Stack>
								<Stack className="pop_up_flex">
									<Box className="pop_up_color green"></Box>
									<Typography className="pop_up_text">Completed ({ data?.completed })</Typography>
								</Stack>
							</Box>
						}
						slotProps={ {
							popper: {
								className: "dashboard_popup",
							},
						} }
						disableTouchListener
						placement="bottom"
					>
						<Box className="table_data_block"
							onMouseEnter={ () => handlePopupOpen( 'dev' + index ) }
							onMouseLeave={ handlePopupClose }

						>
							<Stack className="table_data_container">
								<Typography className="table_data flex_2">{ data?.name }</Typography>
								{ from == "Manager" && <Typography className="table_data flex_1">{ data?.noOfUsers }</Typography> }
								<Typography className="table_data flex_1">{ data?.totalGoals }</Typography>
							</Stack>
						</Box>
					</Tooltip >
				);
			} ) }

		</>
	)
}
export default Common;