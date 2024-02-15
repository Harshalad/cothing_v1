import React, { useState } from 'react';
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useSelector } from 'react-redux';
import { MANAGER_VIEW_STATE } from '../../../constants/auth';

const CustomGoalApprovedPost = ( { post }: any ) => {
	console.log( post, "CustomGoalPost" );
	const currentUserRole = useSelector(
		//@ts-ignore
		( state ) => state?.auth?.managerToggleView
	);
	const [ empty, setEmpty ] = useState( true );
	const renderTypeAttributes = () => {
		if ( !post?.typeAttributes ) {
			return null;
		}

		const renderItems = [];
		let size = parseInt( post?.typeAttributes?.size );
		for ( let i = 0; i < size; i++ ) {
			renderItems.push(
				<div key={ i }>
					<Typography className="aligngl_quest_heading">
						{ post?.typeAttributes[ `${ i }_question` ] }
					</Typography>
					<Typography className="aligngl_post_answ">
						{ post?.typeAttributes[ `${ i }_answer` ] }
					</Typography>
				</div>
			)
		}
		if ( renderItems.length === 0 ) {
			setEmpty( false );
		}
		return <div>{ renderItems }</div>;
	};

	return (
		<Box className="aligngl_quest_cont">
			<Typography className="aligngl_quest_heading">
				Goal has been approved.
			</Typography>
			{ empty && <Box className="aligngl_quest_box">

				<Typography className="aligngl_quest_heading mb">
					{ currentUserRole === MANAGER_VIEW_STATE.LP
						? "Your manager has shared their take on this goal, by answering the following questions:"
						: "You have shared the take on this Goal" }
				</Typography>
				{ renderTypeAttributes() }

			</Box> }
		</Box>
	);
};

export default CustomGoalApprovedPost;


