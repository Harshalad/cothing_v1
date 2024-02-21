import { Box, Typography } from '@mui/material';
import type { FC } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import LaunchSharpIcon from '@mui/icons-material/LaunchSharp';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LensBlurRoundedIcon from '@mui/icons-material/LensBlurRounded';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import { fetchConceptPrimerByContentId } from '../../actions/achieve/fetchConceptPrimerByContentId';
import { FetchadditionalResource } from '../../actions/quickPrep/wp-cpMapping';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
// import video from '../../../src/pages/html-video-player/images/blank.mp4';
interface FeedbackActionSidebarProps {
    worksheet: any
}

const FeedbackActionSidebar: FC<FeedbackActionSidebarProps> = ( {
    worksheet,

} ) => {
    const [ value, setValue ] = React.useState( '1' );
    //@ts-ignore
    const user = useSelector( ( state ) => state?.auth?.nWorxUser );
    const router = useRouter();
    const [ userWorkSheetId, setUserWorksheetId ] = useState<any>( null );
    const [ type, setType ] = useState<any>( null );
    useEffect( () => {
        setUserWorksheetId( router?.query?.id );
        setType( router?.query?.type === "prep" ? "PREPARE" : "QP" );
    }, [ router ] )
    const [ additionalResource, setAdditionalResource ] = useState<any>( null );
    const handleChange = ( event: React.SyntheticEvent, newValue: string ) => {
        setValue( newValue );
    };
    useEffect( () => {
        const getAdditionalResource = async () => {
            try {
                const result = await FetchadditionalResource( {
                    id: worksheet?.worksheetId,
                    organisationId: user?.organisationId,
                } );
                //@ts-ignore
                if ( result !== null ) {
                    console.log( result, "FetchadditionalResource" );
                    //@ts-ignore
                    setAdditionalResource( result );
                }
            } catch ( error ) {
                console.log( error );
            }
        };
        // if()
        getAdditionalResource();
    }, [ user, worksheet ] );
    const handleCPClick = async ( id: any ) => {
        const response: any = await fetchConceptPrimerByContentId( {
            contentId: id,
            userId: user?.id,
            programId: user?.activeProgramId,
            goalId: "ar",
            methodTitle: "NA"
        } );
        console.log( response, "conceptPrimer LINK" );
        if ( response ) {
            window.open( response?.contentLink, "_blank" );
        }
    }


    return (
        <>
            <Box className="sidebar">
                <Box sx={ { width: '100%', typography: 'body1' } }>
                    <TabContext value={ value }>
                        <Box className="tabWrapper" sx={ { borderBottom: 1, borderColor: 'divider' } }>
                            <TabList onChange={ handleChange } aria-label="lab API tabs example">
                                <Tab label="Actions" value="1" />
                                <Tab label="Comments" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <div className='learnMore'>
                                <Typography sx={ { fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', margin: '0px !important' } }>LEARN MORE</Typography>
                                <Typography className='about'>About the Giving feedback framework</Typography>
                                <div>
                                    <div>
                                        { additionalResource?.map( ( item: any, index: number ) => {
                                            return (
                                                <Accordion
                                                    onClick={ ( event ) => {
                                                        event.stopPropagation();
                                                        handleCPClick( item?.conceptPrimerId );
                                                    } }
                                                    key={ index }
                                                //onClick={ () => handleCPClick( item?.conceptPrimerId ) } 
                                                >
                                                    <AccordionSummary
                                                        expandIcon={ <LaunchSharpIcon /> }
                                                        aria-controls="panel1-content"
                                                        id="panel1-header">
                                                        <div className='accordianWrapper'>
                                                            <div className='innerWrapper'>
                                                                <DescriptionRoundedIcon />{ item?.conceptPrimerName }
                                                            </div>
                                                            {/*<div className='details ml-30'>HBR</div>*/ }
                                                        </div>
                                                    </AccordionSummary>
                                                    {/*<AccordionDetails>
                                                        <Box className='videoplayer'>

                                                        </Box>
                                                    </AccordionDetails>*/}
                                                </Accordion>
                                            )
                                        } ) }
                                        {/*<Accordion>
                                            <AccordionSummary
                                                expandIcon={ <ExpandMoreIcon /> }
                                                aria-controls="panel2-content"
                                                id="panel2-header">
                                                <div className='accordianWrapper'>
                                                    <div className='innerWrapper'>
                                                        <YouTubeIcon />Impact on Behavior
                                                    </div>
                                                    <div className='accordDetails ml-30'>NWORX</div>
                                                </div>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Box className='videoplayer'>
                                                    <div role="link" onClick={ () => openInNewTab( 'https://www.google.com' ) }>
                                                        <PlayCircleOutlineRoundedIcon />
                                                    </div>
                                                </Box>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={ <ExpandMoreIcon /> }
                                                aria-controls="panel2-content"
                                                id="panel2-header">
                                                <div className='accordianWrapper'>
                                                    <div className='innerWrapper'>
                                                        <img style={ { marginRight: '10px' } }
                                                            src="/images/icons/check.svg"
                                                            alt="Important"
                                                            width={ 20 }
                                                            height={ 20 }
                                                        ></img>Demontrate empathy
                                                    </div>
                                                    <div className='accordDetails ml-30'>Forbes</div>
                                                </div>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Box className='videoplayer'>
                                                    <div role="link" onClick={ () => openInNewTab( 'https://www.google.com' ) }>
                                                        <PlayCircleOutlineRoundedIcon />
                                                    </div>
                                                </Box>
                                            </AccordionDetails>
                                        </Accordion>*/}
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel value="2">
                            <div className='learnMore'></div>
                        </TabPanel>
                    </TabContext>
                </Box>
            </Box>
        </>
    );
}

export default FeedbackActionSidebar;
