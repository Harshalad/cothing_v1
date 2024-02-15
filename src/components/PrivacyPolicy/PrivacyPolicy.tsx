import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import HtmlDisplay from "../common/HtmlConverter/HtmlConverter";
import { fetchProgramAPI } from "../../actions/align/fetchProgram";
import { useEffect, useState } from "react";
import Spinner from "../common/Spinner/Spinner";
import { updatePrivacyPolicies } from "../../actions/user/updatePrivacyPolicy";
import { fetchNworxUser, getNworxUser } from "../../actions/auth/fetchNworxUser";
import nworxuser from "../../constants/proto/fetchNworxUser/fetch-nworx-user_grpc_web_pb";
import Link from "next/link";

const PrivacyPolicy = ( { user }: any ) => {
  const dispatch = useDispatch();
  const [ program, setProgram ] = useState<any>( null );
  const [ loading, setLoading ] = useState<any>( false );
  const [ checked, setChecked ] = useState<any>( false );
  const [ privacy, setPrivacy ] = useState<any>( null );
  //@ts-ignore
  const nWorxUser = useSelector( ( state ) => state?.auth?.nWorxUser );
  useEffect( () => {
    const getUser = async () => {
      const response = await getNworxUser( user?.email );
      if ( response ) {
        //@ts-ignore
        setPrivacy( response?.nWorxUser?.privacy );
      }
    }
    getUser();
  }, [ user ] )

  const closePrivacyPolicyModal = ( value: any ) => {
    setPrivacy( true );
  }
  console.log( user, privacy, "closePrivacyPolicyModal" );

  useEffect( () => {
    setLoading( true );
    const getProgram = async () => {
      try {

        const response = await fetchProgramAPI( { programId: user?.activeProgramId } );
        console.log( response, "dshjfvjsf" );
        if ( response ) {
          setProgram( response );
          setLoading( false );
        }
      } catch ( error ) {
        console.log( error );
      }
      setLoading( false );

    };
    getProgram();
  }, [ user?.activeProgramId ] );
  // const program = useSelector(
  //   // @ts-ignore
  //   (state) => state?.user?.program
  // );

  const handleSave = async () => {
    const response = await updatePrivacyPolicies( nWorxUser?.id );
    //@ts-ignore
    //const response1 = fetchNworxUser( nWorxUser?.id );
    if ( response ) {
      console.log( response, "updatePrivacyPolicies" );
    }
    closePrivacyPolicyModal( false );
  }

  return (
    <>
      <Dialog
        open={ privacy != null && privacy == false ? true : false }
        className="privacy_policy_modal"
      >
        {/*<CloseIcon
          style={ {
            position: "absolute",
            top: "15px",
            right: "15px",
            zIndex: "1",
            cursor: "pointer",
          } }
          onClick={ () => {
            closePrivacyPolicyModal( false );
          } }
        />*/}
        <DialogTitle
          id="title"
          sx={ {
            color: "#1C2129",
            fontWeight: "700",
            fontSize: { mobile: "18px", tablet: "31px" },
            padding: "0 0 0px 0",
            marginBottom: "36px",
            textAlign: "center"
          } }
        >
          Privacy Policy
        </DialogTitle>
        <DialogContent>
          <Stack
            direction="row"
            spacing={ 1 }
            alignItems="center"
            className="checkbox_block"
          >
            <Checkbox
              size="small"
              id="checkbox"
              sx={ {
                padding: "0",
                color: "#EAECEF",
                "&.Mui-checked": {
                  color: "#2E5DB0",
                },
              } }
              checked={ checked }
              onChange={ ( e ) => setChecked( !checked ) }
            />
            <Typography
              color="#999999"
              sx={ { fontSize: "12px", fontWeight: "400" } }
            >
              <Link
                style={ { textDecoration: "none" } }
                href="https://www.nworx.ai/eula"
                target="_blank"
              >
                <span style={ { color: "#2E5DB0" } }>Please read the End User License Agreement (EULA) at this link</span>
              </Link>
              <br />
              You may accept this by clicking the checkbox{ " " }
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions sx={ { margin: "0 auto" } }>

          <Box className="modify-modal-element" sx={ { alignContent: "center", display: "flex", flexDirection: "column", justifyContent: "center" } }>

            <Button
              variant="contained"
              sx={ {
                justifyContent: "center",
                width: "10px",
                height: "30px",
                color: "#FFFFFF",
                backgroundColor: "#F58A43",
                boxShadow: "none",
                margin: "10px 0", // Adjust the margin as needed
                "&:hover": {
                  backgroundColor: "#F58A43",
                  boxShadow: "none",
                },
                textTransform: "none",
              } }
              onClick={ () => handleSave() }
              disabled={ !checked }
            >
              Save
            </Button>
          </Box>

        </DialogActions>
      </Dialog >
    </>
  );
};
export default PrivacyPolicy;
