import { useEffect, useState } from 'react';
import {
    Box,
    Dialog, Typography,
    DialogTitle, DialogContent, Stack, Grid,
}
    from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AlignGoalModify from '../../../components/ActionCenter/AlignGoalModify';
import ManagerAlignDiscussion from '../../../components/ActionCenter/ManagerAlignDiscussion';
import VerifyNworx from '../../../zustand/HostNameUrl';
import { verifyNworxUserCentral } from '../../../actions/auth/verifyNworxUserCentral';
import { useSelector } from 'react-redux';
import setHostUrl from '../../../constants/setHostUrl';

const AlignGoalDetails = ( { open, goalTitle, goalSubTitle, closePopup, alignGoalId }: any ) => {

    const [ showModifyGoal, setModifyGoal ] = useState<any>( false );

    const closeAlignGoalModify = ( value: any ) => {
        setModifyGoal( value );
    }
    //@ts-ignore
    const user = useSelector( ( state ) => state?.auth?.nWorxUser );
    setHostUrl( user );

    return (
        <>
            <Box className="mngralgn_dscn_box">
                <Box
                    // open={open === alignGoalId}
                    // aria-labelledby="title"
                    // aria-describedby="description"
                    sx={ { textAlign: "center", padding: "30px" } }
                    className="view_purpose_dialog addFlex"
                >
                    <Box sx={ { padding: "0 0 0px 0", marginBottom: "0px" } }>
                        {/* <CloseIcon
                            style={{
                                position: "absolute",
                                top: "15px",
                                right: "15px",
                                zIndex: "1",
                                cursor: "pointer"
                            }}
                            onClick={() => {
                                closePopup(false);
                                // setTimeout(() => {
                                //     setModifyGoal(false);
                                //     setValue(dayjs(new Date()));
                                //     setSelectedMonth(""); 
                                //     setMonths(false);
                                //     setCmntTxtFld(0);
                                //     setRplyTxtFld(0);
                                // }, 200)
                            }} 
                        /> */}
                        <Stack flexDirection="row" alignItems="center" className="goal_dtls_flex">
                            <Box className="popup_left_box addFlex">
                                <Stack flexDirection="row" alignItems="center" gap="15px" mb="30px" justifyContent="space-between">
                                    <Stack flexDirection="row" alignItems="center" gap="16px">
                                        <Box
                                            id="title"
                                            sx={ {
                                                color: "#1C2129",
                                                fontWeight: "700",
                                                fontSize: { mobile: "18px", tablet: "25px" },
                                                margin: "0 0 0px",
                                                padding: "0 0 0px 0",
                                                textAlign: "left"
                                            } }
                                        >
                                            Goal Request
                                            {/* Goal Details */ }
                                        </Box>
                                        <Typography className='mngralgn_actn_empname'>Joshua Micheal</Typography>
                                    </Stack>
                                    <Stack flexDirection="row" alignItems="center" gap="8px" sx={ { cursor: "pointer" } } onClick={ () => setModifyGoal( true ) }>
                                        <img src="../edit.png" alt="modify goal" width={ 20 } height={ 20 }></img>
                                        <Typography sx={ { fontSize: "12px", fontWeight: "500", color: "#2E5DB0" } }>Modfify Goal</Typography>
                                    </Stack>
                                </Stack>
                                <Box sx={ { textAlign: "left", marginBottom: "24px", background: "#FFFFFF", borderRadius: "8px", padding: "32px" } }>
                                    <Typography className="view_purpose_title">
                                        { goalTitle
                                            ?
                                            goalTitle
                                            :
                                            ( "Create a strategic network of the relationships to enhance business results." )
                                        }
                                    </Typography>
                                    <Typography className="view_purpose_tag">
                                        Top Priority
                                    </Typography>
                                    <Typography className="view_purpose_subtext">
                                        { goalSubTitle
                                            ?
                                            goalSubTitle
                                            :
                                            ( "Lorem ipsum dolor sit amet consectetur. Diam pulvinar ut est praesent aenean." +
                                                "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.." )
                                        }
                                    </Typography>
                                    <Stack flexDirection="row" alignItems="center" gap="15px" justifyContent="space-between">
                                        <Stack flexDirection="row" alignItems="center" gap="15px">
                                            <AccessTimeIcon />
                                            <Typography className="view_purpose_days">20 Days</Typography>
                                        </Stack>
                                        <Stack flexDirection="row" alignItems="center" gap="15px">
                                            <Box className="view_purpose_fromdate">From : 26/07/23</Box>
                                            <Box className="view_purpose_tilldate">Till : 12/08/23</Box>
                                        </Stack>
                                    </Stack>
                                </Box>
                                <Grid sx={ { textAlign: "left", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" } }>
                                    <Box className="view_purpose_boxes">
                                        <Typography className="view_purpose_box_title">Why It is Important?</Typography>
                                        <Typography className="view_purpose_box_subtext">Lorem ipsum dolor sit amet consectetur. Diam pulvinar ut est praesent aenean.Lorem ipsum dolor </Typography>
                                    </Box>
                                    <Box className="view_purpose_boxes">
                                        <Typography className="view_purpose_box_title">How can you achieve?</Typography>
                                        <Typography className="view_purpose_box_subtext">Lorem ipsum dolor sit amet consectetur. Diam pulvinar ut est praesent aenean.Lorem ipsum dolor </Typography>
                                    </Box>
                                    <Box className="view_purpose_boxes">
                                        <Typography className="view_purpose_box_title">What are the Benefits?</Typography>
                                        <Typography className="view_purpose_box_subtext">Lorem ipsum dolor sit amet consectetur. Diam pulvinar ut est praesent aenean.Lorem ipsum dolor </Typography>
                                    </Box>
                                    <Box className="view_purpose_boxes">
                                        <Typography className="view_purpose_box_title">Department Assistance</Typography>
                                        <Typography className="view_purpose_box_subtext">Lorem ipsum dolor sit amet consectetur. Diam pulvinar ut est praesent aenean.Lorem ipsum dolor </Typography>
                                    </Box>
                                </Grid>
                            </Box>
                            { showModifyGoal
                                ?
                                //""
                                <AlignGoalModify
                                    open={ showModifyGoal }
                                    alignGoalId={ alignGoalId }
                                    //lignGoalStatus={alignGoalStatus} 
                                    goalTitle={ goalTitle }
                                    goalSubTitle={ goalSubTitle }
                                    closeAlignGoalModify={ closeAlignGoalModify }
                                //openAlignGoal={openAlignGoal}
                                />
                                :
                                //""
                                <ManagerAlignDiscussion />
                            }
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
export default AlignGoalDetails;