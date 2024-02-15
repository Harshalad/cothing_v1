import {
  Button,
  Box,
  Link,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  InputAdornment,
  Typography,
  Stack,
  Chip,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BorderLinearProgress } from "../BorderLinearProgress/BorderLinearProgress";
import { theme } from "../../Align/theme";

const CustomQuestion = ( { goal, addGoalEmployeeQuestion, setAddGoalEmployeeQuestion, classNames }: any ) => {
  console.log( addGoalEmployeeQuestion, "addGoalEmployeeQuestionaddGoalEmployeeQuestion" );


  const handleChipSelect = ( tag: any, index: number ) => {
    const updatedQuestions = [ ...addGoalEmployeeQuestion ];

    // Initialize answer and selectedTags if they are not defined
    updatedQuestions[ index ] = {
      ...updatedQuestions[ index ],
      answer: updatedQuestions[ index ]?.answer || '',
      selectedTags: updatedQuestions[ index ]?.selectedTags || [],
    };

    const { selectedTags } = updatedQuestions[ index ];

    // Check if the tag is already selected
    const tagIndex = selectedTags.indexOf( tag.title );

    if ( tagIndex !== -1 ) {
      // If the tag is already selected, remove it
      updatedQuestions[ index ].selectedTags.splice( tagIndex, 1 );
    } else {
      // If the tag is not selected, add it to selectedTags and update the answer
      updatedQuestions[ index ].selectedTags.push( tag.title );
      updatedQuestions[ index ].answer += tag.description + ' ';
    }

    // Update the state with the modified array
    setAddGoalEmployeeQuestion( updatedQuestions );
  };

  const handleTextFeildChange = ( e: any, index: number ) => {
    console.log( e, "handeltextfeild change" );
    const updatedQuestions = [ ...addGoalEmployeeQuestion ];
    updatedQuestions[ index ] = {
      ...updatedQuestions[ index ],
      answer: updatedQuestions[ index ]?.answer || '',
    };
    updatedQuestions[ index ].answer = e.target.value;

    setAddGoalEmployeeQuestion( updatedQuestions );
  }
  return (
    <>
      < div className={ classNames }>
        <div>
          { goal?.status === "ASSIGNED" && <>
            {/*<article className="textfield_label txt-left">
            Alignment Score: {goal?.alignmentScore}%
          </article>
            <ThemeProvider theme={theme}>
              <BorderLinearProgress
                //@ts-ignore
                color="danger"
                variant="determinate"
                value={goal?.alignmentScore||0}
                sx={{
                  color: (theme: any) =>
                    theme.palette.grey[
                    theme.palette.mode==="light"? 200:800
                    ],
                }}
              />
            </ThemeProvider>*/}
            <article className="gdnc-modal-headtxt txt-left mar-t30">
              What&apos;s your take on this Goal?
            </article>
            <div className="gl-modify-txtbox-clr">
              <article className="gdnc-modal-headtxt2 txt-left">
                Understand your Goal First!
              </article>
              <article className="gdnc-modal-subtxt txt-left">
                It is important to read all the goal information before
                you give your take on this goal.
              </article>
            </div>
          </> }
          { addGoalEmployeeQuestion?.map( ( question: any, index: number ) => {
            return (
              question?.regular ?
                <Box sx={ { marginBottom: "24px", textAlign: "left" } }>
                  <article className="statement_right_txtfld_lbl">{ question.question }{ question?.mandatory && "*" }</article>
                  <Typography sx={ {
                    marginBottom: "10px", fontSize: "12px",
                    color: "#5D636B",
                    fontWeight: "BOLD"
                  } }>Suggested Tags</Typography>
                  <Stack
                    className="goalChips"
                    flexDirection="row"
                    gap="5px"
                    sx={ { marginBottom: "10px" } }
                    flexWrap="wrap"
                  >
                    { question?.tags?.map( ( tag: any, innnerIndex: number ) => {
                      const isSelected = question?.selectedTags?.includes( tag.title );

                      return (
                        <Chip
                          key={ innnerIndex }
                          label={ tag.title }
                          id={ innnerIndex + "" }
                          onClick={ () => handleChipSelect( tag, index ) }
                          className={ `goalChip ${ isSelected ? "chip_selected" : null }` }
                        />
                      );
                    } ) }
                  </Stack>
                  <TextField
                    id={ "" }
                    placeholder={ "Describe your thoughts here...." }
                    variant="outlined"
                    size="small"
                    fullWidth
                    multiline
                    rows={ 4 }
                    inputProps={ {
                      sx: {
                        fontSize: "16px",
                        color: "#5D636B",
                        fontWeight: "400",
                      },
                    } }
                    InputProps={ {
                      sx: { padding: "0" },
                      endAdornment: <InputAdornment position="end"></InputAdornment>,
                    } }
                    onChange={ ( e ) => {
                      handleTextFeildChange( e, index )
                    } }
                    value={ question.answer }
                  />
                </Box> :
                <div className="gl-modify-txtbox-clr txtbox-clr2">
                  <article className="gdnc-modal-headtxt2 txt-left">
                    { question?.question }{ question?.mandatory && "*" }
                  </article>
                  <div className="radios-back-bar"></div>
                  <div className="goal-feel-radios">
                    <RadioGroup
                      row
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                    // value={ }
                    >
                      { question?.tags.map( ( tag: any, innerindex: number ) => {
                        return (
                          <FormControlLabel
                            key={ innerindex }
                            onClick={ ( e ) => {
                              handleTextFeildChange( e, index )
                            } }
                            value={ tag?.title }
                            control={ <Radio /> }
                            labelPlacement="bottom"
                            label={ tag.title }
                          />
                        );
                      } ) }
                    </RadioGroup>
                  </div>
                </div>
            );
          } ) }
        </div>
      </div>
    </>
  );
};

export default CustomQuestion;