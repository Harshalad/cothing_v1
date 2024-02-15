import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  LinearProgress,
  Radio,
  RadioGroup,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
// import {} from ""
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CachedRoundedIcon from "@mui/icons-material/CachedRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import ImageQuestionEnlarge from "./ImageQuestionEnlarge";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { useEffect, useRef, useState } from "react";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { useSelector } from "react-redux";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import { Download, Margin, Padding } from "@mui/icons-material";
import Link from "next/link";
import HtmlDisplay from "../common/HtmlConverter/HtmlConverter";
import { ExpandLink } from "../common/ExpandLink";
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';
import { toast } from "react-toastify";
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
const Questions = ( {
  currSectionIndex,
  currQuestionIndex,
  subjectiveAnswer,
  handleSetSublectiveAnswer,
  singleMCQ,
  handleSingleMCQchange,
  selectedOptions,
  handleOptionsChange,
  rating,
  handleRating,
  handleBinaryDataURl,
  binaryDataURl,
  handleSJQOptions,
  sjqOptions,
  download
}: any ) => {
  // console.log(rating,"rating");
  //@ts-ignore
  const sections = useSelector( ( state ) => state?.assessment?.sections );
  console.log( sections, "sections,aditya" );
  let sectionQuestion;
  if ( sections ) {
    sectionQuestion = sections[ currSectionIndex ];
  }
  let currentQuestion = sectionQuestion?.questions[ currQuestionIndex ];
  const handleChange = ( e: any ) => {
    handleSetSublectiveAnswer( e );
  };

  const [ openExpand, setOpenExpand ] = useState<any>( false );
  const [ expandLink, setExpandLink ] = useState<any>( null );
  const [ supportedExt, setSupportedExt ] = useState<any>( null );

  useEffect( () => {
    if ( currentQuestion?.question?.type === "fileUpload" ) {
      const supportedExtensionsString = currentQuestion?.question?.supportedExtensions.join( ", " );
      setSupportedExt( supportedExtensionsString );

    }
  }, [ currentQuestion ] )

  const handleOpen = () => {
    setOpenExpand( !openExpand );
  }
  //  const fileInputRef = useRef<HTMLInputElement | null>(null);

  //  const uploadFiles = (e:any) => {
  //     console.log(e,"Binary event");
  //    const files = e.target.value;
  //    if (files && files.length > 0) {
  //      const file = files[0];
  //      const fileSize = file.size / 1024 / 1024; // File size in MB
  //      const acceptedFormats = [".png", ".jpg", ".jpeg", ".mp4"];
  //      const fileExtension = file.name
  //        .substring(file.name.lastIndexOf("."))
  //        .toLowerCase();

  //      if (fileSize <= 100 && acceptedFormats.includes(fileExtension)) {
  //        const reader = new FileReader();

  //        reader.onload = (e:any) => {
  //          const binaryString = e?.target.result as string;
  //          // Send the binary string to the database
  //          // You can make an API request or use any appropriate method to send the data to your database
  //          console.log("Binary String:", binaryString);
  //        };

  //        reader.readAsBinaryString(file);
  //      } else {
  //        console.log("Invalid file format or size exceeded.");
  //      }
  //    }
  //  };

  const [ fileDataURL, setFileDataURL ] = useState( null );
  const [ uploadFile, setUploadFile ] = useState<any>( null );
  const [ showSnackbar, setSnackbar ] = useState( false );
  const [ showEnlrQuestModal, setEnlrQuestModal ] = useState( false );
  const [ progress, setProgress ] = useState( 0 );
  // const [binaryDataURl, setBinaryDataURL] = useState("");

  // const incrementCounter = (count_field_id: any) => {
  //   //@ts-ignore
  //   var inputValue = document.getElementById(count_field_id).innerHTML;
  //   if (inputValue === "4") {
  //     var initialCount = 0;
  //     var incrmntCount = initialCount;
  //     var count = ++incrmntCount;
  //   } else if (
  //     inputValue !== "" &&
  //     inputValue !== undefined &&
  //     inputValue !== "NaN"
  //   ) {
  //     var incrmntCount = parseInt(inputValue);
  //     var count = ++incrmntCount;
  //   } else {
  //     var initialCount = 0;
  //     var incrmntCount = initialCount;
  //     var count = ++incrmntCount;
  //   }
  //   //@ts-ignore
  //   document.getElementById(count_field_id).innerHTML = count;
  // };

  // const decrementCounter = (count_field_id: any) => {
  //   //@ts-ignore
  //   var inputValue = document.getElementById(count_field_id).innerHTML;
  //   if (inputValue === "1") {
  //     var initialCount = 5;
  //     var decrmntCount = initialCount;
  //     var count = --decrmntCount;
  //   } else if (
  //     inputValue !== "" &&
  //     inputValue !== undefined &&
  //     inputValue !== "NaN"
  //   ) {
  //     var decrmntCount = parseInt(inputValue);
  //     var count = --decrmntCount;
  //   } else {
  //     var initialCount = 5;
  //     var decrmntCount = initialCount;
  //     var count = --decrmntCount;
  //   }
  //   //@ts-ignore
  //   document.getElementById(count_field_id).innerHTML = count;
  // };

  const handleExpandClick = ( link: any ) => {
    handleOpen();
    setExpandLink( link )
  }

  const handleEnlrQuest = () => {
    setEnlrQuestModal( true );
  };

  const closeEnlrQuestModal = () => {
    setEnlrQuestModal( false );
  };

  const handleDrop = ( event: any ) => {
    event.preventDefault();
    const { files } = event.dataTransfer;
    if ( files.length > 0 ) {
      setUploadFile( files[ 0 ] );
    }
  };
  const [ counterValues, setCounterValues ] = useState<{ [ key: string ]: number }>(
    {}
  );
  const incrementCounter = ( index: any ) => {
    handleSJQOptions( index, 1 );
    // setCounterValues((prevValues: { [key: string]: number }) => {
    //   const currentValue = prevValues[counterId] || 0;
    //   const totalOptions = currentQuestion?.question?.option?.length || 0;
    //   const newValue =
    //     currentValue + 1 > totalOptions ? currentValue : currentValue + 1;
    //   return {
    //     ...prevValues,
    //     [counterId]: newValue,
    //   };
    // });
  };

  const decrementCounter = ( index: any ) => {
    handleSJQOptions( index, -1 );
    // setCounterValues((prevValues: { [key: string]: number }) => {
    //   const currentValue = prevValues[counterId] || 0;
    //   const newValue = currentValue - 1 < 1 ? currentValue : currentValue - 1;
    //   return {
    //     ...prevValues,
    //     [counterId]: newValue,
    //   };
    // });
  };

  const handleDragOver = ( event: any ) => {
    event.preventDefault();
  };

  const handleDragStart = ( event: any ) => {
    event.dataTransfer.setData( "text/plain", event.target.id );
  };

  const uploadFiles = ( e: any ) => {
    // if(download!==null){
    //   toast
    // }
    console.log( e, "uploadFiles" );
    // if()
    if ( e.target.files.length !== 0 ) {
      //@ts-ignore
      var imageVal = document.getElementById( "browse_files" ).value;
      const allowedExtensions = new RegExp(
        `\\.(${ currentQuestion?.question?.supportedExtensions.join( "|" ) })$`,
        "i"
      );
      // console.log("adityaprtaap", imageVal)
      if ( !allowedExtensions.exec( imageVal ) ) {
        toast.error( "This file format is not supported." );
        return;
      } else {
        const file = e.target.files;
        console.log( file[ 0 ], "uploadedfilessize" );
        if ( file.length > 0 && file[ 0 ].size <= 10000000 ) {
          setUploadFile( file[ 0 ] );
        } else {
          alert( "Size Greater then 10 MB" );
        }
        setSnackbar( false );
      }
    }
  };
  useEffect( () => {
    let fileReader: any;
    let isCancel = false;
    if ( uploadFile ) {
      fileReader = new FileReader();
      fileReader.onload = ( e: any ) => {
        const { result } = e.target;
        console.log( uploadFile, "fileUpload" );
        if ( result && !isCancel ) {
          setFileDataURL( result );
        }
      };
      fileReader.onloadstart = () => {
        setProgress( 0 );
      };
      const totalSize = uploadFile.size;

      fileReader.readAsDataURL( uploadFile );
      fileReader.onprogress = ( event: any ) => {
        if ( event.lengthComputable ) {
          const loadedPercentage = ( event.loaded / totalSize ) * 100;
          setProgress( loadedPercentage );
        }
      };
      fileReader.onloadend = async ( e: any ) => {
        console.log( uploadFile, "type ", e?.target, "target result" );
        const binaryString = e?.target.result as string;
        const buffer = await uploadFile.arrayBuffer();
        let array = new Uint8Array( buffer );
        console.log( array, "array" );
        handleBinaryDataURl(
          binaryString,
          uploadFile?.type,
          array,
          uploadFile?.name
        );
        setProgress( 100 );
      };
    }
    return () => {
      isCancel = true;
      if ( fileReader && fileReader.readyState === 1 ) {
        fileReader.abort();
      }
    };
  }, [ uploadFile ] );

  console.log( uploadFile, "files" );

  const closeSnackbar = () => {
    setSnackbar( false );
  };

  // var finalTime: any;
  // function countdownTimer() {
  //   var counter = 0;
  //   var min = 29;
  //   var sec = 60;

  //   //@ts-ignore
  //   document.getElementById("timer").innerHTML = "00" + " : " + "00";

  //   finalTime = setInterval(function() {
  //     sec = --sec;

  //     if(sec === 0) {
  //       min -= 1;
  //       sec = 59;
  //       counter +=1 ;
  //     }

  //     if(counter === 30) {
  //       sec = 0;
  //       min = 0;
  //       clearInterval(finalTime);
  //       //@ts-ignore
  //       document.getElementById("timer").innerHTML = "0" + min + " : " + "0" + sec;
  //     }

  //     if(sec < 10 && sec > 0) {
  //       //@ts-ignore
  //       document.getElementById("timer").innerHTML = "0" + min + " : " + "0" + sec;
  //     }
  //     else if(counter < 30) {
  //       //@ts-ignore
  //       document.getElementById("timer").innerHTML = min + " : " + sec;
  //     }
  //   }, 1000);
  // }

  // const handleMCQ = (event: any) => {
  //   var msgId;
  //   var inputs = document.getElementsByTagName("input");
  //   for (var i = 0; i < inputs.length; i++) {
  //     if (inputs[i].type == "checkbox" || inputs[i].type == "radio") {
  //       if (inputs[i].checked) {
  //         //@ts-ignore
  //         inputs[i].parentElement.parentElement.classList.add("selected");
  //         if (event.target.value === "Option 2") {
  //           //@ts-ignore
  //           inputs[i].parentElement.parentElement.classList.add("correct");
  //           //@ts-ignore
  //           msgId = inputs[i].parentElement.parentElement.nextElementSibling.id;
  //           //@ts-ignore
  //           inputs[i].parentElement.parentElement.nextElementSibling.innerHTML =
  //             'The selected answer is <span class="correct_msg">Correct Answer.</span><br />Reason goes here';
  //         } else {
  //           //@ts-ignore
  //           inputs[i].parentElement.parentElement.classList.add("wrong");
  //           //@ts-ignore
  //           msgId = inputs[i].parentElement.parentElement.nextElementSibling.id;
  //           //@ts-ignore
  //           inputs[i].parentElement.parentElement.nextElementSibling.innerHTML =
  //             'The selected answer is <span class="wrong_msg">Wrong Answer.</span> Please try another option.<br />Reason goes here';
  //         }
  //       } else {
  //         //@ts-ignore
  //         inputs[i].parentElement.parentElement.classList.remove("selected");
  //         //@ts-ignore
  //         inputs[i].parentElement.parentElement.classList.remove("correct");
  //         //@ts-ignore
  //         inputs[i].parentElement.parentElement.classList.remove("wrong");
  //         //@ts-ignore
  //         inputs[i].parentElement.parentElement.nextElementSibling.innerHTML =
  //           "";
  //       }
  //     }
  //   }
  // };
  // const question= "<p sx={back}>This is <strong>HTML</strong> content.</p>";
  const question =
    '<p style="color: red;">This is <strong>HTML</strong> content.</p>';


  console.log( currentQuestion, "currentQuestion" );
  return (
    <>
      <Box className="quests_contr">
        <Stack className="quests_contr_flex">
          <Box className="quests_contr_left">
            <Stack className="total_quests_flex">
              <Typography className="total_quests">
                Question { currQuestionIndex + 1 } of{ " " }
                { sectionQuestion?.questions.length }
              </Typography>
              {/* <Stack className="test_instructs_time_flex">
                <AccessTimeRoundedIcon />
                <Typography className="test_time_numb" id="timer">30 : 00</Typography>
              </Stack> */}
            </Stack>
            {/* <Box className="quest_image_contr">
              <img src="../images/image-question.png" alt="image question"></img>
              <Stack className="quest_image_link_flx">
                <Typography className="img_enlarge_link" onClick={() => handleEnlrQuest()}>Quick View Table</Typography>
                <Typography className="img_download_link">Download Table</Typography>
              </Stack>
            </Box>  */}
            <Stack
              className="quests_subcntnt_contr"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              sx={ { marginBottom: "10px" } }
            >
              <Typography className="quests_subtext">
                Refer below to answer the question
              </Typography>
              { currentQuestion?.question?.question.startsWith( "http" ) &&
                <Stack className="quests_enlarge_flx" flexDirection="row" alignItems="center" gap="4px" sx={ { cursor: "pointer" } }>
                  <FullscreenRoundedIcon sx={ { color: "#2E5DB0" } } />
                  <Typography
                    sx={ { textDecoration: "underline", textAlign: "right", fontWeight: "500", fontSize: "14px", color: "#2E5DB0" } }
                    onClick={ () => handleExpandClick( currentQuestion?.question?.question ) }
                  >
                    Enlarge Question
                  </Typography>
                </Stack> }
            </Stack>
            <Typography className="quests_content">
              { currentQuestion?.question?.question.startsWith( "http" ) ? <iframe
                src={ currentQuestion?.question?.question }
                title="Embedded Website"
                width="100%"
                height="400px"
              /> : currentQuestion?.question?.question }

              {/* <HtmlDisplay
                key={currSectionIndex + "_" + currQuestionIndex}
                htmlContent={
                  currentQuestion?.question?.question
                    ? currentQuestion?.question?.question
                    : "wait"
                }
              /> */}
              {/* <HtmlDisplay
                htmlContent={question}
              /> */}
              {/*  */ }
            </Typography>
          </Box>
          <Box className="quests_contr_right">
            { currentQuestion?.question?.type === "subjective" &&
              currentQuestion?.question?.answerType !== "fileUpload" && (
                <Box className="quest_subj">
                  <TextField
                    id=""
                    placeholder="Type answer here..."
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
                    value={ subjectiveAnswer }
                    onChange={ ( e ) => {
                      handleChange( e.target.value );
                    } }
                    className="quests_txtfld"
                    multiline={ true }
                    rows={
                      currentQuestion?.question?.answerType === "shortText"
                        ? 2
                        : 18
                    }
                  />
                </Box>
              ) }
            { currentQuestion?.question?.type === "mcq" &&
              !currentQuestion?.question?.multiSelect && (
                <Box className="quest_single_mcq">
                  <Typography className="mcq_title">Select the Best Option</Typography>
                  <Typography className="mcq_subtext">
                    Out of the presented options, choose one.
                  </Typography>
                  <FormControl className="mcq">
                    <RadioGroup
                      aria-label="mcq-options"
                      name="mcq-options"
                      value={ singleMCQ }
                      onChange={ ( e: any ) =>
                        handleSingleMCQchange( e.target.value )
                      }
                    >
                      { currentQuestion?.question?.option?.map(
                        ( e: any, index: number ) => {
                          return (
                            <FormControlLabel
                              key={ index }
                              value={ e.order }
                              control={ <Radio /> }
                              label={ e.value }
                            />
                          );
                        }
                      ) }
                    </RadioGroup>
                  </FormControl>
                </Box>
              ) }
            { currentQuestion?.question?.type === "mcq" &&
              currentQuestion?.question?.multiSelect && (
                <Box className="quest_multiple_mcq">
                  <Typography className="mcq_title">Select All That Apply</Typography>
                  <Typography className="mcq_subtext">
                    Out of the presented options, choose one, several, or even all options.
                  </Typography>
                  <FormControl className="mcq">
                    <FormGroup>
                      { currentQuestion?.question?.option?.map(
                        ( option: any, index: any ) => {
                          console.log( selectedOptions, "options" );
                          return (
                            <FormControlLabel
                              key={ index }
                              control={
                                <Checkbox
                                  checked={ selectedOptions?.includes(
                                    option.order
                                  ) }
                                  value={ option?.order }
                                  onChange={ handleOptionsChange }
                                />
                              }
                              label={ option?.value }
                            />
                          );
                        }
                      ) }
                    </FormGroup>
                  </FormControl>
                </Box>
              ) }
            {/* <Box className="quest_multiple_mcq">
              <Typography className="mcq_title">Choose Multiple</Typography>
              <Typography className="mcq_subtext">Out of the presented options, choose multiple answer you deem is the correct one.</Typography>
              <FormControl className="mcq">
                <FormGroup
                  //value={value}
                  onChange={handleMCQ}
                >
                  <FormControlLabel control={<Checkbox />} label="You will create better-defined individual goals and track people on these closely to identify who is slipping and the reasons associated with it. You will create better-defined individual goals and track people on these closely to identify" />
                  <FormControlLabel control={<Checkbox />} label="Option 2" />
                  <FormControlLabel control={<Checkbox />} label="Option 3" />
                  <FormControlLabel control={<Checkbox />} label="Option 4" />
                </FormGroup>
              </FormControl>
            </Box> */}
            { currentQuestion?.question?.type === "rating" && (
              <Box className="quest_scale">
                <FormControl className="scale">
                  <RadioGroup
                    value={ rating + "" }
                    onChange={ ( e ) => handleRating( e ) }
                  >
                    { console.log( rating, "ratingg" ) }
                    { currentQuestion?.question?.options?.map(
                      ( e: any, index: any ) => {
                        return (
                          <FormControlLabel
                            key={ index }
                            value={ e.order }
                            control={ <Radio /> }
                            label={ e.value }
                          />
                        );
                      }
                    ) }
                  </RadioGroup>
                </FormControl>
              </Box>
            ) }
            { currentQuestion?.question?.type === "fileUpload" && (
              <Box className="file_upload_section">
                <Box
                  className="file_upload_area"
                  onDragOver={ handleDragOver }
                  onDrop={ handleDrop }
                >
                  <Box draggable="true" onDragStart={ handleDragStart }>
                    <Box className="browse_file_area">
                      <Typography className="upload_file_top_text">
                        Drag and Drop files here
                      </Typography>
                      <Typography className="upload_file_top_text">
                        or
                      </Typography>
                      <label htmlFor="browse_files" className="upload_file_cta">
                        <Box className="outlined_cta">Browse Files</Box>
                      </label>
                      <input
                        hidden
                        // accept=".png, .jpg, .jpeg, .svg "
                        multiple
                        type="file"
                        id="browse_files"
                        onChange={ ( e ) => uploadFiles( e ) }
                      />
                      <Typography className="upload_file_bottom_text">
                        Maximum file size : 10MB
                      </Typography>
                      <Typography className="upload_file_bottom_text">
                        Supported file types : { supportedExt }
                      </Typography>
                      <Snackbar
                        open={ showSnackbar }
                        onClose={ closeSnackbar }
                        anchorOrigin={ {
                          vertical: "top",
                          horizontal: "right",
                        } }
                      >
                        <Alert onClose={ closeSnackbar } severity="error">
                          Accepted Format: .png, .jpg, .jpeg., .svg, .mp4, .mp3,
                          .pdf, .txt
                        </Alert>
                      </Snackbar>
                    </Box>
                    { uploadFile && (
                      <Box>
                        <li>{ uploadFile?.name }</li>
                      </Box>
                    ) }
                  </Box>
                </Box>
                { uploadFile && (
                  <Box className="upload_status_contr">
                    <Stack className="upload_status_flex">
                      <img
                        src="/images/icons/upload.svg"
                        width={ 24 }
                        height={ 32 }
                        alt="upload"
                      ></img>
                      <Stack className="upload_filedtls_sect">
                        <Box className="upload_filedtls_contr">
                          {/* <Stack className="upload_filedtls_flex">
                        <Typography className="upload_file_name">
                          Filename.filetype (1.25MB)
                        </Typography>
                        Upload Error Text
                        <Typography className="upload_file_name upload_error">
                          Upload Failed due to poor connectivity.
                        </Typography>
                        <Typography className="upload_file_perctg">
                          50%
                        </Typography>
                      </Stack> */}
                          <Box className="upload_prog_contr">
                            <LinearProgress
                              variant="determinate"
                              value={ progress }
                              sx={ {
                                height: "9px",
                                borderRadius: "32px",
                                "& .MuiLinearProgress-bar": {
                                  borderRadius: "32px",
                                  backgroundColor: "#2E5DB0",
                                  // backgroundColor: "#E74649",
                                },
                                margin: "0",
                                width: "100%",
                              } }
                            />
                          </Box>
                        </Box>
                        {/* for cancel
                    <CloseRoundedIcon className="prog_close_icon" />
                    for retry
                    <CachedRoundedIcon className="prog_close_icon" />
                     for completion
                    <DoneRoundedIcon className="prog_close_icon" /> */}
                      </Stack>
                      {/* for download after upload is completed
                    <DownloadRoundedIcon className="prog_close_icon" /> */}
                    </Stack>
                  </Box>
                ) }
                { download && download !== null && download?.length !== 0 ? (
                  <Button>
                    <Link href={ download }>Download</Link>
                  </Button>
                ) : null }
                {/* {fileDataURL ? (
                  <p className="img-preview-wrapper">
                    {<img src={fileDataURL} alt="preview" />}
                  </p>
                ) : null} */}
              </Box>
            ) }
            { currentQuestion?.question?.type === "sjq" && (
              <Box className="counter_options_section">
                { currentQuestion?.question?.option?.map(
                  ( e: any, index: any ) => {
                    return (
                      <Box className="counter_options_contr" key={ index }>
                        <Stack className="counter_options_flex">
                          <Box className="counter_contr">
                            <Stack className="counter_contr_flex">
                              <Typography
                                className="counter_text"
                                id="count_field1"
                              >
                                { sjqOptions[ index ] === 0
                                  ? ""
                                  : sjqOptions[ index ] }
                              </Typography>
                              <Stack className="counter_cta_flex">
                                <ExpandLessRoundedIcon
                                  className="counter_icon"
                                  onClick={ () => incrementCounter( index ) }
                                />
                                <ExpandMoreRoundedIcon
                                  className="counter_icon"
                                  onClick={ () => decrementCounter( index ) }
                                />
                              </Stack>
                            </Stack>
                          </Box>
                          <Box>
                            <Typography className="counter_option_text">
                              { e?.value }
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                    );
                  }
                ) }
                {/* <Box className="counter_options_contr">
                <Stack className="counter_options_flex">
                  <Box className="counter_contr">
                    <Stack className="counter_contr_flex">
                      <Typography
                        className="counter_text"
                        id="count_field2"
                      ></Typography>
                      <Stack className="counter_cta_flex">
                        <ExpandLessRoundedIcon
                          className="counter_icon"
                          onClick={() => incrementCounter("count_field2")}
                        />
                        <ExpandMoreRoundedIcon
                          className="counter_icon"
                          onClick={() => decrementCounter("count_field2")}
                        />
                      </Stack>
                    </Stack>
                  </Box>
                  <Box>
                    <Typography className="counter_option_text">
                      You will create better-defined individual goals and track
                      people on these closely to identify who is slipping and
                      the reasons associated with it.
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              <Box className="counter_options_contr">
                <Stack className="counter_options_flex">
                  <Box className="counter_contr">
                    <Stack className="counter_contr_flex">
                      <Typography
                        className="counter_text"
                        id="count_field3"
                      ></Typography>
                      <Stack className="counter_cta_flex">
                        <ExpandLessRoundedIcon
                          className="counter_icon"
                          onClick={() => incrementCounter("count_field3")}
                        />
                        <ExpandMoreRoundedIcon
                          className="counter_icon"
                          onClick={() => decrementCounter("count_field3")}
                        />
                      </Stack>
                    </Stack>
                  </Box>
                  <Box>
                    <Typography className="counter_option_text">
                      You will create better-defined individual goals and track
                      people on these closely to identify who is slipping and
                      the reasons associated with it.
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              <Box className="counter_options_contr">
                <Stack className="counter_options_flex">
                  <Box className="counter_contr">
                    <Stack className="counter_contr_flex">
                      <Typography
                        className="counter_text"
                        id="count_field4"
                      ></Typography>
                      <Stack className="counter_cta_flex">
                        <ExpandLessRoundedIcon
                          className="counter_icon"
                          onClick={() => {
                            incrementCounter("count_field4");
                          }}
                        />
                        <ExpandMoreRoundedIcon
                          className="counter_icon"
                          onClick={() => {
                            decrementCounter("count_field4");
                          }}
                        />
                      </Stack>
                    </Stack>
                  </Box>
                  <Box>
                    <Typography className="counter_option_text">
                      You will create better-defined individual goals and track
                      people on these closely to identify who is slipping and
                      the reasons associated with it.
                    </Typography>
                  </Box>
                </Stack>
              </Box> */}
              </Box>
            ) }
          </Box>
        </Stack>
        <ExpandLink open={ openExpand } link={ expandLink } handleOpen={ handleOpen } />
      </Box>
      {/* <ImageQuestionEnlarge showEnlrQuestModal={showEnlrQuestModal} closeEnlrQuestModal={closeEnlrQuestModal} /> */ }
    </>
  );
};
export default Questions;
