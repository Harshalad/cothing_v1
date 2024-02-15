import { Dialog, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


const PopUp = ( { open, data, setOpenPopUp }: any ) => {
	const handleClose = ( event: {}, reason: string ) => {
		if ( reason === 'backdropClick' ) {
			setOpenPopUp( false );
		}
	}
	return (
		<Dialog
			open={ open }
			maxWidth="xl"
			style={ { padding: "25px 5px 5px 5px", } }
			sx={ {
				left: "200px",
				right: "200px",
				top: "30px",
				bottom: "40px",
				borderRadius: "16px", // Adjusted to the specified border-radius
			} }
			onClose={ handleClose }
		>
			<CloseIcon
				style={ {
					position: "absolute",
					top: "15px",
					right: "15px",
					zIndex: "1",
					cursor: "pointer",
				} }
				onClick={ () => {
					setOpenPopUp( false );
				} }
			/>
			<Typography variant="h5" sx={ {
				color: "#3E4248",
				fontSize: "16px",
				paddingBottom: "10px"
			} }>
				{ data }
			</Typography>

		</Dialog >
	)
}
export default PopUp;