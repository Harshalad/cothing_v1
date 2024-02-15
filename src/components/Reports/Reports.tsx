import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import HeaderNav from "../../components/common/HeaderNav/HeaderNav";
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import Link from "next/link";
import Image from "next/image";
import NoReportsFoundIcon from "../../../public/images/icons/no-reports-found.svg";
import { getOfflineReports } from "../../actions/user/getOfflineReports";
import { useSelector } from "react-redux";
import Spinner from "../common/Spinner/Spinner";
import { options } from "../../constants/constants";
import ReportView from "../../zustand/ReportView";
import { useRouter } from "next/router";

const drawerWidth = 250;

const Reports = () => {
  const router = useRouter();
  const { selectedReport, setSelectedReport } = ReportView();

  const [ offlineReports, setOfflineReports ] = useState<any>( null );
  const [ offlineReportsLoading, setOfflineReportsLoading ] = useState( false );
  const [ userId, setUserId ] = useState<any>( null );
  const [ id, setId ] = useState<any>( null );
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );

  useEffect( () => {
    setUserId( router?.query?.userId ? router?.query?.userId : user?.id );
    setId( router?.query?.id ? router?.query?.id : user?.activeProgramId );
  }, [ router?.isReady ] )




  useEffect( () => {
    const fetchOfflineReports = async () => {
      if ( userId && id ) {
        setOfflineReportsLoading( true );
        try {
          const response = await getOfflineReports( {
            userId: userId,
            programId: id,
          } );
          //@ts-ignore
          if ( response?.offlineReports ) {
            //@ts-ignore
            setOfflineReports( response?.offlineReports );
          }

          console.log( response );
        } catch ( error ) {
          console.log( error );
        } finally {
          setOfflineReportsLoading( false );
        }
      }
    };
    fetchOfflineReports();
  }, [ userId, id ] );
  console.log( offlineReports, "adityaofflineReports" );
  const getDate = ( d: any ) => {
    const date = new Date( d );
    const day = date.getDate().toString().padStart( 2, '0' );
    const month = date.toLocaleString( 'en-US', { month: 'short' } );
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart( 2, '0' );
    const minutes = date.getMinutes().toString().padStart( 2, '0' );
    const ampm = date.getHours() >= 12 ? 'pm' : 'am';

    const formattedDate = `${ year }`;
    return formattedDate;
  };
  const handleViewClick = ( report: any ) => {
    if ( report?.certificate ) {
      setSelectedReport( report );
      router.push( { pathname: "/certificate" } );
    } else {
      if ( report?.htmlForWeb ) {
        console.log( report, "reportSelected" );
        setSelectedReport( report );
        router.push( { pathname: "/report-view" } );
      } else {
        window.open( report?.filePath, "_blank" );
      }
    }
  }
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Reports</title>
        </Helmet>
      </HelmetProvider>
      <HeaderNav />
      <Box
        component="main"
        sx={ {
          width: { tablet: `calc(100% - ${ drawerWidth }px)` },
          ml: { tablet: "auto" },
          marginLeft: "250px",
        } }
      >
        <Box
          sx={ { backgroundColor: "#EAECEF", padding: "112px 32px 32px" } }
          className="reports"
        >
          <Stack className="rprts_header_flex">
            <Typography
              variant="h1"
              sx={ { fontWeight: "700", color: "#1C2129" } }
              className="dash_title"
            >
              Reports
            </Typography>
            {/* <TextField
              id="search"
              placeholder="Search by"
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{
                sx: { fontSize: "16px", color: "#3E4248", fontWeight: "500" },
                className: "serach",
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton aria-label="search" edge="start" size="small">
                      <SearchIcon sx={{ color: "#989EA5" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                maxWidth: "350px",
                "& ::placeholder": { color: "#999CA0", opacity: "1" },
              }}
              className="search_field"
            /> */}
          </Stack>
          { offlineReportsLoading ? (
            <Spinner />
          ) : !offlineReports?.length ? (
            <Stack className="no_rprts_fnd_flx">
              <Image
                src={ NoReportsFoundIcon }
                alt="no reports"
                width={ 34 }
                height={ 40 }
              />
              <Typography className="no_rprts_fnd">No reports found</Typography>
            </Stack>
          ) : (
            offlineReports?.map( ( report: any, index: number ) => {
              return (
                <Stack className="rprts_box_flex" key={ index } direction="row" alignItems="center">
                  <Box className="rprts_cntnt_box">
                    <Typography className="rprts_name">
                      { report?.reportTitle }
                    </Typography>
                    <Typography className="rprts_date">
                      { getDate( report?.createdDateTime ) }
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={ 2 } alignItems="center">
                    <Stack>

                      <Typography className="report_dwld_txt" onClick={ () => handleViewClick( report ) }>View</Typography>
                    </Stack>
                    { report?.downloadable && ( report?.filePath || selectedReport?.reportURL ) && (
                      <Stack>
                        <Link className="report_dwld_txt" href={ report.reportType === "OfflineReport" ? report.filePath ? report.filePath : "#" : selectedReport?.reportURL ? selectedReport?.reportURL : "#" || "#" }>
                          Download
                        </Link>
                      </Stack>
                    ) }

                  </Stack>
                </Stack>
              );

            } )
          ) }
        </Box>
      </Box>
    </>
  );
};
export default Reports;
