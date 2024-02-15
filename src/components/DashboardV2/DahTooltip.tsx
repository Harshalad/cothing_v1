import { Tooltip } from "@mui/material";
import { useState } from "react";

const DashTooltip = ( { openOn, value }: any ) => {
	const [ open, setOpen ] = useState( "" );
	const handleTooltipOpen = ( value: any ) => {
		setOpen(
			value
		);
	};
	const handleTooltipClose = () => {
		//@ts-ignore
		setOpen( false );
	};
	return (
		<>
			<Tooltip
				open={ open === openOn }
				onClose={ handleTooltipClose }
				title={ value }
				arrow
				disableTouchListener
				placement="bottom-end"
			>
				<img
					src="/images/more-info.png"
					alt="more info"
					width={ 20 }
					height={ 20 }
					style={ { cursor: "pointer" } }
					onClick={ () => handleTooltipOpen( openOn ) }
					onMouseEnter={ () =>
						handleTooltipOpen( openOn )
					}
				/>
			</Tooltip>
		</>
	)
}
export default DashTooltip;