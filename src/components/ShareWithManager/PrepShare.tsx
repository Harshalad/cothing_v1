
import { Checkbox } from '@mui/material';
import { Box, Stack, Typography } from '@mui/material';
import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux';
import { sharePrepWithManager } from '../../actions/shareWithManager/sharePrepWithManager';
const PrepShare = ({ qp, shareManager, worksheetId,setShareManager }: any) => {

    //@ts-ignore
    const user = useSelector((state) => state?.auth?.nWorxUser);
    const [shareManagerBox, setShareManagerBox] = useState<boolean>((shareManager===undefined || shareManager ===null || shareManager.length ===0)?user?.managerPermissions:shareManager==="true"?true:false);
    console.log(qp, shareManager, worksheetId, user,shareManagerBox, "sharePrepWithManager");
    const handleCheckChange = async () => {
        
        setShareManagerBox(!shareManagerBox);

        const response = await sharePrepWithManager({ userId: user?.id, programId: user?.activeProgramId, qp: qp, shareManager: String(!shareManagerBox), worksheetId: worksheetId });

    }
    return (
        <>
            <Box className="prep_rating_box">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography>Share Prep With Manager</Typography>
                    <Checkbox checked={shareManagerBox} onChange={(e) => handleCheckChange()} />
                </div>
            </Box>
        </>

    )
}

export default PrepShare;
