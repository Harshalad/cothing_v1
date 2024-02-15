import { Box, Stack, Chip } from "@mui/material";
import { NEXT_6_MONTHS_FOCUS_OPTIONS } from "../../../constants/profile";
import classNames from "classnames";

const SelectNextFocus = ({
  nextSixMonthsFocus,
  setNextSixMonthsFocus,
}: any) => {
  const chipSelect = (event: any) => {
    var chipLists = document.querySelectorAll(".profileChip");
    //@ts-ignore
    for (let chip of chipLists) {
      chip.classList.remove("chip_selected");
    }
    event.currentTarget.classList.add("chip_selected");
  };

  const setSelectedChip = (option: string) => {
    console.log(nextSixMonthsFocus);
    setNextSixMonthsFocus(option);
  };

  return (
    <Box
      sx={{ display: "grid", marginBottom: "20px" }}
      className="profile_form_flex lastType"
    >
      <article className="profile_textfield_label">
        What is the one thing you want to focus on in the next 6
        months?
      </article>
      <Stack
        className="profileChips"
        flexDirection="row"
        gap="5px"
        flexWrap="wrap"
      >
        {Object.keys(NEXT_6_MONTHS_FOCUS_OPTIONS).map(
          (option: any, index: number) => {
            return (
              <Chip
                key={index}
                className={classNames(
                  nextSixMonthsFocus === option ? "chip_selected" : null,
                  "profileChip"
                )}
                //@ts-ignore
                label={NEXT_6_MONTHS_FOCUS_OPTIONS[option]}
                onClick={() => setSelectedChip(option)}
              />
            );
          }
        )}
      </Stack>
    </Box>
  );
};

export default SelectNextFocus;
