import React, { useEffect, useState } from 'react';
import FeedbackActionSidebar from './FeedbackActionsSidebar';
import FeedbackContent from './FeedbackContent';
import HeaderNav from '../common/HeaderNav/HeaderNav';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { fetchUserSheet } from '../../actions/coThinkPrep/fetchUserSheet';

const FeedbackReportPage: React.FC = () => {
  const drawerWidth = 250;
  const [ worksheet, setWorksheet ] = useState<any>( null );
  const router = useRouter();
  const [ userWorkSheetId, setUserWorksheetId ] = useState<any>( null );
  const [ type, setType ] = useState<any>( null );
  useEffect( () => {
    setUserWorksheetId( router?.query?.id );
    setType( router?.query?.type === "prep" ? "PREPARE" : "QP" );
  }, [ router ] )
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  useEffect( () => {
    const getUserWorksheet = async () => {
      const response = await fetchUserSheet( { userId: user?.id, programId: user?.activeProgramId, userWorksheetId: userWorkSheetId, type: type } );
      setWorksheet( response );
    }
    getUserWorksheet();
  }, [ userWorkSheetId, type ] )
  console.log( worksheet, "worksheetatcothink" )
  return (
    <>
      <HeaderNav />

      <Box
        component="main"
        sx={ {
          width: { tablet: `calc(100% - ${ drawerWidth }px)` },
          ml: { tablet: "auto" },
          marginLeft: "250px",
        } }
      >
        <Box sx={ { backgroundColor: "#EAECEF", padding: "112px 32px 32px", minHeight: "100vh" } }>
          <FeedbackContent worksheet={ worksheet } user={ user } type={ type } setWorksheet={ setWorksheet } />
        </Box>
      </Box>
      <Box>

      </Box>
    </>
  );
};

export default FeedbackReportPage;