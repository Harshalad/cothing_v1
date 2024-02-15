import {
  Box, Button, Checkbox, Dialog, DialogActions,
  DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Stack, TextField,
  Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addNewPersonToMRA } from "../../actions/mra/addNewPersonToMRA";
import { toast } from "react-toastify";

const AddNewPerson = ( {
  closePopup,
  open,
  currentAssessor,
  mraDetails,
  setMraDetailsHandle,
}: any ) => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  const [ addPerson, setAddPerson ] = useState<any>( {
    name: "",
    designation: "",
    email: "",
    role: "",
  } );

  useEffect( () => {
    setAddPerson( {
      name: "",
      designation: "",
      email: "",
      role: "",
    } );
  }, [ closePopup ] );

  const handleAddPersonData = ( e: any ) => {
    console.log( e, "addPerson" );
    setAddPerson( { ...addPerson, [ e.target.name ]: e.target.value } );
  };
  console.log( mraDetails, "addPerson" );

  const handleAddPerson = async () => {
    const response = await addNewPersonToMRA( {
      userId: user?.id,
      mraId: mraDetails?.id,
      name: addPerson?.name,
      designation: addPerson?.designation,
      email: addPerson?.email,
      role: addPerson?.role,
    } );
    console.log( response, "addPersonREA" );
    //@ts-ignore
    if ( response?.statusCode === 7 ) {
      //@ts-ignore
      toast.error( response?.extra );
      return;
    }
    //@ts-ignore
    if ( response?.statusCode === 0 ) {
      //@ts-ignore
      setMraDetailsHandle( response?.response );
    }
    closePopup( false );
  };

  return (
    <>
      <Dialog
        className="manager-time-modal checkin_modal mra_add_person_modal"
        open={ open }
        sx={ { textAlign: "center", padding: "30px" } }
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
            closePopup( false );
          } }
        />
        <DialogTitle
          id="title"
          sx={ {
            color: "#1C2129",
            fontWeight: "700",
            fontSize: { mobile: "18px", tablet: "31px" },
            padding: "0 0 0px 0",
            marginBottom: "36px",
          } }
        >
          Add New Person
        </DialogTitle>
        <DialogContent>
          <Stack className="add_person_txtfld_flx">
            <Typography className="textfield_label txt-left">Name</Typography>
            <TextField
              name="name"
              id=""
              placeholder="Enter Your Name"
              variant="outlined"
              size="small"
              fullWidth
              inputProps={ {
                sx: {
                  fontSize: "16px",
                  color: "#3E4248",
                  fontWeight: "500",
                },
              } }
              InputProps={ { sx: { padding: "0" } } }
              value={ addPerson.name }
              onChange={ ( e ) => {
                handleAddPersonData( e );
              } }
            />
          </Stack>
          <Stack className="add_person_txtfld_flx">
            <Typography className="textfield_label txt-left">
              Designation
            </Typography>
            <TextField
              name="designation"
              id=""
              placeholder="Enter Your Designation"
              variant="outlined"
              size="small"
              fullWidth
              inputProps={ {
                sx: {
                  fontSize: "16px",
                  color: "#3E4248",
                  fontWeight: "500",
                },
              } }
              InputProps={ { sx: { padding: "0" } } }
              value={ addPerson.designation }
              onChange={ ( e ) => {
                handleAddPersonData( e );
              } }
            />
          </Stack>
          <Stack className="add_person_txtfld_flx">
            <Typography className="textfield_label txt-left">
              Email Address
            </Typography>
            <TextField
              name="email"
              id=""
              placeholder="Enter Email Address"
              variant="outlined"
              size="small"
              fullWidth
              inputProps={ {
                sx: {
                  fontSize: "16px",
                  color: "#3E4248",
                  fontWeight: "500",
                },
              } }
              InputProps={ { sx: { padding: "0" } } }
              value={ addPerson.email }
              onChange={ ( e ) => {
                handleAddPersonData( e );
              } }
            />
          </Stack>
          <Stack className="add_person_txtfld_flx">
            <Typography className="textfield_label txt-left">
              Select Option
            </Typography>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="select-option-label">Role</InputLabel>
              <Select
                name="role"
                labelId="select-option-label"
                id="select-option"
                value={ addPerson.role }
                onChange={ ( e: any ) => handleAddPersonData( e ) }
                label="Option"
              >
                {
                  mraDetails?.assessingRoles
                    ?.filter( ( role: any ) => role?.role !== "SELF" && role?.enable && ( role?.assessors === null || role?.assessors?.length < role.maxAllowed ) )
                    .map( ( role: any, index: any ) => {
                      return (
                        <MenuItem key={ index } value={ role?.role }>{ role?.label }</MenuItem>
                      );
                    } )
                }
              </Select>
            </FormControl>
          </Stack>
          {/* <FormControl>
            <FormGroup>
              <FormControlLabel control={<Checkbox name="check" checked={addPerson.check} onChange={(e) => {handleAddPersonData(e)} } />} label="Is this person from inside your organisation" />
            </FormGroup>
          </FormControl> */}
        </DialogContent>
        <DialogActions sx={ { margin: "0 auto" } }>
          <Box className="modify-modal-element">
            <Button
              variant="contained"
              sx={ {
                width: "max-content",
                color: "#FFFFFF",
                backgroundColor: "#F58A43",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#F58A43",
                  boxShadow: "none",
                },
                textTransform: "none",
              } }
              onClick={ () => handleAddPerson() }
            >
              Add Person
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default AddNewPerson;