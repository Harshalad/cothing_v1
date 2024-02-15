import {useState} from "react";
import {Box,Typography,Stack} from "@mui/material";
import {useSelector} from "react-redux";
import {MANAGER_VIEW_STATE} from "../../../constants/auth";

const CustomGoalApproveRejectionPost=({post}: any) => {
	const [showCmntTxtFld,setCmntTxtFld]=useState(0);
	const [empty,setEmpty]=useState(false);

	const addCmntTxtFld=(value: any) => {
		setCmntTxtFld(value);
	};
	console.log(post,"CustomGoalPost");
	const currentUserRole=useSelector(
		//@ts-ignore
		(state) => state?.auth?.managerToggleView
	);
	const renderTypeAttributes=() => {
		if(!post?.typeAttributes) {
			return null;
		}

		const renderItems=[];
		let size=parseInt(post?.typeAttributes?.size);
		for(let i=0;i<size;i++) {
			renderItems.push(
				<div key={i}>
					<Typography className="aligngl_quest_heading">
						{post?.typeAttributes[`${i}_question`]}
					</Typography>
					<Typography className="aligngl_post_answ">
						{post?.typeAttributes[`${i}_answer`]}
					</Typography>
				</div>
			)
		}
		if(renderItems.length===0) {
			setEmpty(true);
		}
		return <div>{renderItems}</div>;
	};


	console.log(post,"CustomGoalPost");
	return (
		<Box className="aligngl_quest_cont">
			<Typography className="aligngl_quest_heading">
				Goal has been Rejected.
			</Typography>


			<Box className="aligngl_quest_box">
				<Typography className="aligngl_quest_heading">
					Reason for Rejection
				</Typography>
				<Typography className="aligngl_post_answ">
					{post?.typeAttributes?.rejectionReason}
				</Typography>
				{empty&&<Typography className="aligngl_quest_heading mb">
					{currentUserRole===MANAGER_VIEW_STATE.LP
						? "Your direct report has shared their take on this goal, by answering the following questions:"
						:"You have shared the take on this Goal"}
					{renderTypeAttributes()}
				</Typography>}




			</Box>
		</Box>
	);
};

export default CustomGoalApproveRejectionPost;
