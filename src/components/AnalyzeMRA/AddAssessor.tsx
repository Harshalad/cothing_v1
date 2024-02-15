import { Dialog, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
export const AddAssessor = ( {
  openAddDialog,
  handleAddDialog,
  mraDetails,
  handleOpenAddDialog,
  labelRole
}: any ) => {

  // const [filterMraDeatils, setFilterMraDetails] = useState<any>(null);
  // useEffect(()=>{
  //   const tempDeatils = mraDetails?.filter
  // },[mraDetails])
  const filteredAssessingRoles = mraDetails?.assessingRoles?.filter( ( role: any ) => {
    if (
      role.assessors &&
      role.assessors.length >= role.maxAllowed &&
      role.assessors.some( ( assessor: any ) => assessor.status === "ADDED" )
      || role?.role === "SELF" || !role?.enable
    ) {
      return false; // Exclude this role from the filtered array
    }
    return true; // Include this role in the filtered array
  } );
  console.log( filteredAssessingRoles, "crr" );
  return (
    <Dialog open={ openAddDialog }>
      <CloseIcon
        style={ {
          position: "absolute",
          top: "15px",
          right: "15px",
          zIndex: "1",
          cursor: "pointer",
        } }
        onClick={ () => {
          handleOpenAddDialog();
        } }
      />
      { filteredAssessingRoles?.length !== 0 ? filteredAssessingRoles
        ?.map( ( role: any, index: any ) => {
          return (
            <Button
              key={ index }
              onClick={ () => handleAddDialog( role?.role, role ) }
            >
              { role?.label }
            </Button>
          );
        } ) : "No Prefernces remaining or limit already reached" }
    </Dialog>
  );
};