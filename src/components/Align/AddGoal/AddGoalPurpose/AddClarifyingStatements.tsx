import { useState, useEffect } from "react";
import { Typography, Box, Stack, Chip } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { fetchPurposeStatements } from "../../../../actions/align/fetchPurposeStatements";
import { fetchBenefitStatements } from "../../../../actions/align/fetchBenefitStatements";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { MANAGER_VIEW_STATE } from "../../../../constants/auth";

const AddClarifyingStatements = ({
  open,
  chipSelect,
  programId,
  selectedPurposes,
  selectedBenefits,
}: any) => {
  const [purposeStatements, setPurposeStatements] = useState<any>(null);
  const [benefitStatements, setBenefitStatements] = useState<any>(null);

  const managerToggleView = useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );
  const isManagerView =
    managerToggleView === MANAGER_VIEW_STATE.LP ? false : true;

  useEffect(() => {
    if (selectedPurposes?.length && purposeStatements?.length) {
      selectedPurposes.map((individualSelectedPurpose: any) => {
        const purpose = purposeStatements.filter((purposeStatement: any) => {
          return purposeStatement.name === individualSelectedPurpose;
        });
        const purposeElement = document.getElementById(purpose.id);
        console.log(purposeElement, "purpose element");
      });
    }

    if (selectedBenefits?.length && benefitStatements?.length) {
      selectedBenefits.map((individualSelectedPurpose: any) => {
        const benefit = benefitStatements.filter((benefitStatement: any) => {
          return benefitStatement.name === individualSelectedPurpose;
        });
      });
    }
  }, [purposeStatements, selectedBenefits, selectedPurposes]);


  useEffect(() => {
    const getPurposeStatements = async () => {
      try {

        const purposeStatementsResponse = await fetchPurposeStatements({
          programId,
        });
        //@ts-ignore
        if (purposeStatementsResponse?.purposeStatements) {
          //@ts-ignore
          setPurposeStatements(purposeStatementsResponse?.purposeStatements);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPurposeStatements();
  }, []);


  useEffect(() => {
    const getBenefitStatements = async () => {
      try {

        const benefitstatementsResponse = await fetchBenefitStatements({
          programId,

        });
        //@ts-ignore
        if (benefitstatementsResponse?.benefitStatements) {
          //@ts-ignore
          setBenefitStatements(benefitstatementsResponse?.benefitStatements);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBenefitStatements();
  }, []);
  console.log(selectedPurposes, "seleted purpose");
  return (
    <>
      <Typography className="add_purpose_statement">
        Add important information
        {/* {isManagerView ? " for the Employee" : ""} */}
      </Typography>
      <Box sx={{ textAlign: "left", marginBottom: "30px" }}>
        <Typography className="goal_purpose">
          {/* What is the Purpose of{" "}
          {open.popUpName === "addEmployeePurpose" ||
          open.popUpName === "editEmployeePurpose"
            ? " selecting "
            : ""}{" "}
          this goal? */}
          What is the larger objective that this goal is associated with?
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: "#5D636B",
            marginBottom: "8px",
          }}
        >
          Suggested Tags
        </Typography>
        <Stack
          className="goalChips"
          flexDirection="row"
          gap="5px"
          flexWrap="wrap"
        >
          {purposeStatements &&
            purposeStatements.map((statement: any, index: number) => {
              return (
                <Chip
                  key={index}
                  label={statement.name}
                  id={statement.id}
                  onClick={(e) =>
                    chipSelect(
                      e,
                      "purpose",
                      statement.name,
                      statement.tagAnswer
                    )
                  }
                  className={classNames(
                    "goalChip",
                    selectedPurposes?.includes(statement?.name)
                      ? "chip_selected"
                      : null
                  )}
                // icon={<AddCircleOutlineIcon />}
                />
              );
            })}
        </Stack>
      </Box>
      <Box sx={{ textAlign: "left" }}>
        <Typography className="goal_purpose">
          {open.popUpName === "addPurpose" ||
            open.popUpName === "editPurpose"
            ? "What do you gain through this goal?"
            : "What does the employee gain through this goal?"}
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: "#5D636B",
            marginBottom: "8px",
          }}
        >
          Suggested Tags
        </Typography>
        <Stack
          className="goalChips"
          flexDirection="row"
          gap="5px"
          flexWrap="wrap"
        >
          {benefitStatements &&
            benefitStatements.map((statement: any, index: number) => {
              return (
                <Chip
                  key={index}
                  label={statement.name}
                  id={statement.id}
                  className={classNames(
                    "goalChip",
                    selectedBenefits?.includes(statement?.name)
                      ? "chip_selected"
                      : null
                  )}
                  //@ts-ignore
                  // sx={
                  //   selectedBenefits.includes(statement?.name)
                  //     ? { bgcolor: "#2e5db0", color: "#ffffff" }
                  //     : { bgcolor: "rgba(0, 0, 0, 0.08)", color: "success" }
                  // }
                  onClick={(e) =>
                    chipSelect(
                      e,
                      "benefit",
                      statement.name,
                      statement.tagAnswer
                    )
                  }
                // icon={<AddCircleOutlineIcon />}
                />
              );
            })}
        </Stack>
      </Box>
    </>
  );
};

export default AddClarifyingStatements;
