import { Box, Stack, useMediaQuery } from "@mui/material";
import Pagination from "@mui/material/Pagination";

const Paginations = ({
  testDetails,
  currentQuestionIndex,
  handelQuestionIndex,
  currentSectionIndex
}: any) => {
  const matches = useMediaQuery("(max-width:1023px)");
  const handlePaginationChange = (event: any, value: any) => {
    handelQuestionIndex(value - 1);
  };
  return (
    <>
      <Box className="pagintn_contr eval_pagntn_contr">
        <Stack spacing={2}>
          <Pagination
            count={
              testDetails?.sections[currentSectionIndex]?.questions?.length
            }
            showFirstButton
            showLastButton
            siblingCount={matches === true ? 1 : 3}
            boundaryCount={matches === true ? 1 : 2}
            page={currentQuestionIndex+1}
            onChange={handlePaginationChange}
          />
        </Stack>
      </Box>
    </>
  );
};
export default Paginations;
