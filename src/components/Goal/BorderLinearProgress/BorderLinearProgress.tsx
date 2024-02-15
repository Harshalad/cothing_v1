import styled from "@emotion/styled";
import { LinearProgress, linearProgressClasses } from "@mui/material";
import { theme } from "../../Align/theme";

export const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 16,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
  },
}));
