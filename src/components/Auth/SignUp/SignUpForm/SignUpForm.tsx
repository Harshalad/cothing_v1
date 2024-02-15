import Link from "next/link";
import { useState, useRef } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Stack,
  Typography,
  Checkbox,
  Button,
  IconButton,
} from "@mui/material";
import { Helmet, HelmetProvider } from "react-helmet-async";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
// import RightBlockContext from "../RightBlockContext";
import { useContext } from "react";
import { useEffect } from "react";
// import { VerifyNworxUserServiceClient } from "/proto/verifyUser/verify-nworx-user_grpc_web_pb";
// import { VerifyNworxUserServiceClient } from "../../../../constants/proto/verifyUser/verify-nworx-user_grpc_web_pb";
//@ts-ignore
import { VerifyNworxUserRequest } from "../../../../constants/proto/verifyUser/verify-nworx-user_pb";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  fetchSignInMethodsForEmail,
  sendEmailVerification,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  multiFactor,
  RecaptchaVerifier,
} from "firebase/auth";
//@ts-ignore
import { auth } from "../../../../utils/firebase";
import { validateEmail, validatePasswordLength } from "../../validations";
import {
  AUTH_OPTION_TYPES,
  AUTH_STATES,
  AUTH_TAB_TYPES,
} from "../../../../constants/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import signUpUser from "../../../../actions/auth/signUpUser";
import { toast } from "react-toastify";
import Spinner from "../../../common/Spinner/Spinner";
import { hulLogin, defultLogin } from "../../../../constants/customLogin";
import VerifyNworx from "../../../../zustand/HostNameUrl";

const SignupForm = ( {
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  emailError,
  setEmailError,
  passwordError,
  setPasswordError,
  authState,
  setAuthState,
  authTab,
  setAuthTab,
  authOption,
  setAuthOption,
}: any ) => {
  const dispatch = useDispatch<AppDispatch>();
  //@ts-ignore
  const authSelector = useSelector( ( state ) => state.auth );
  console.log( authSelector );
  const [ passwordMismatch, setPasswordMismatch ] = useState( false );
  const [ passwordValidation, setPasswordValidation ] = useState( false );

  const [ showPasswordChecklist, setShowPasswordChecklist ] = useState( false );
  const [ showPassword, setShowPassword ] = useState( false );
  const [ showConfirmPassword, setShowConfirmPassword ] = useState( false );
  const [ showPwdChecklist, setShowPwdChecklist ] = useState( false );
  const [ lowerCase, setLowerCase ] = useState( false );
  const [ oneNumber, setOneNumber ] = useState( false );
  const [ specialChar, setSpecialChar ] = useState( false );
  const [ upperCase, setUpperCase ] = useState( false );
  const [ minChar, setMinChar ] = useState( false );
  const { hostUrl } = VerifyNworx();
  //   const { rightInnerBlock } = useContext(RightBlockContext);
  const [ click, setClick ] = useState( false );
  const [ validationResult, setValidationResult ] = useState( false );
  const [ userExists, setuserExists ] = useState( 0 );
  const [ signUpLoading, setSignUpLoading ] = useState( false );
  const [ termsChecked, setTermsChecked ] = useState( false );
  const buttonRef = useRef( null );
  const [ loginObj, setLoginObj ] = useState<any>( null );
  const hostingUrl = window.location.host;

  const [ hul, setHul ] = useState( hostingUrl.includes( "stag" ) );
  useEffect( () => {
    if ( hul ) {
      setLoginObj( hulLogin );
    } else {
      setLoginObj( defultLogin );
    }
  }, [ hul ] )

  //@ts-ignore
  useEffect( () => {
    //@ts-ignore
    const handleKeyDown = ( event ) => {
      if ( event.key === "Enter" ) {
        //@ts-ignore
        buttonRef.current.click();
      }
    };

    document.addEventListener( "keydown", handleKeyDown );

    return () => {
      document.removeEventListener( "keydown", handleKeyDown );
    };
  }, [] );


  const validatePasswordChecklist = ( e: any ) => {
    setShowPasswordChecklist( true );
    const field = password;
    if ( field !== "" ) {
      setShowPwdChecklist( true );
    } else {
      setShowPwdChecklist( false );
    }
    if ( /[a-z]/.test( field ) ) {
      setLowerCase( true );
    } else {
      setLowerCase( false );
      setShowPasswordChecklist( false );
    }
    if ( /[0-9]/.test( field ) ) {
      setOneNumber( true );
    } else {
      setOneNumber( false );
      setShowPasswordChecklist( false );
    }
    if ( /[^\w\s]/.test( field ) ) {
      setSpecialChar( true );
    } else {
      setSpecialChar( false );
      setShowPasswordChecklist( false );
    }
    if ( /[A-Z]/.test( field ) ) {
      setUpperCase( true );
    } else {
      setUpperCase( false );
      setShowPasswordChecklist( false );
    }
    if ( /.{8,}/.test( field ) ) {
      setMinChar( true );
    } else {
      setMinChar( false );
      setShowPasswordChecklist( false );
    }
    if ( confirmPassword !== "" ) {
      if ( e.target.value === confirmPassword ) {
        setPasswordMismatch( false );
        setShowPwdChecklist( false );
      } else {
        setPasswordMismatch( true );
      }
    } else {
      setPasswordMismatch( false );
    }
    return showPasswordChecklist;
  };

  const validateConfirmPassword = ( e: any ) => {
    if ( e.target.value !== "" ) {
      if ( e.target.value === password ) {
        setPasswordMismatch( false );
        setShowPasswordChecklist( false );
      } else {
        setPasswordMismatch( true );
      }
    } else {
      setPasswordMismatch( false );
    }
  };

  const handleClickShowPassword = ( value: any ) => {
    if ( value === "password_visibility" ) {
      setShowPassword( ( show ) => !show );
      var pwdElem = document.getElementById( "password" );
      //@ts-ignore
      pwdElem.focus();
      setTimeout( function () {
        //@ts-ignore
        pwdElem.setSelectionRange( 100, 100 );
      }, 0 );
    } else {
      setShowConfirmPassword( ( show ) => !show );
      var cnfmPwdElem = document.getElementById( "confirm-password" );
      //@ts-ignore
      cnfmPwdElem.focus();
      setTimeout( function () {
        //@ts-ignore
        cnfmPwdElem.setSelectionRange( 100, 100 );
      }, 0 );
    }
  };

  const handleMouseDownPassword = ( e: any ) => {
    e.preventDefault();
  };

  const checkPolicy_Terms = ( event: any ) => {
    setTermsChecked( event.target.checked );
  };

  const onSignIn = () => {
    setAuthState( AUTH_STATES.SIGNIN );
    setAuthTab( AUTH_TAB_TYPES.EMAIL );
    setAuthOption( AUTH_OPTION_TYPES.EMAIL_SIGN_IN );
  };

  const onViewEmailVerificationPending = () => {
    setAuthState( AUTH_STATES.SIGNUP );
    setAuthTab( AUTH_TAB_TYPES.EMAIL );
    setAuthOption( AUTH_OPTION_TYPES.EMAIL_VERIFICATION_PENDING );
  };

  const onSignUpClick = async () => {
    setSignUpLoading( true );
    try {
      const response = await signUpUser(
        dispatch,
        //@ts-ignore
        auth,
        email,
        password,
        hostUrl
      );

      //@ts-ignore
      if ( response?.notRegisteredUser ) {
        setSignUpLoading( false );
        toast.error( "You are not registered yet as NWORX user. Please check.", {
          toastId: "SIGNUP_NOT_REGISTERED",
        } );
        return;
      }

      //@ts-ignore
      if ( response?.alreadySignedUp ) {
        setSignUpLoading( false );
        onSignIn();
        toast.error( "You have already signed up. Please sign in to continue.", {
          toastId: "SIGNUP_ALREADY_SIGNED_UP",
        } );
        return;
      }

      //@ts-ignore
      if ( response?.emailVerificationPending ) {
        setSignUpLoading( false );
        onViewEmailVerificationPending();
        return;
      }
      onSignIn();
      setSignUpLoading( false );
    } catch ( error ) {
      console.log( error );
      setSignUpLoading( false );
    }
  };
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Sign-Up</title>
        </Helmet>
      </HelmetProvider>
      <Box className="right_inner_box">
        <article className="textfield_label">Email Address</article>
        <TextField
          id="emailid"
          placeholder="Enter your mail id"
          variant="outlined"
          size="small"
          fullWidth
          inputProps={ {
            sx: { color: "#3E4248", fontWeight: "500" },
          } }
          value={ email }
          onChange={ ( e ) => {
            setEmail( e.target.value );
            validateEmail( { email: e.target.value, emailError, setEmailError } );
          } }
          helperText={ emailError === true ? "Invalid Email Address" : "" }
          className="input_textfield"
        />
        <article className="textfield_label">Password</article>
        <TextField
          id="password"
          placeholder="********"
          variant="outlined"
          size="small"
          fullWidth
          type={ showPassword ? "text" : "password" }
          inputProps={ {
            sx: { color: "#3E4248", fontWeight: "500" },
          } }
          InputProps={ {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={ () => {
                    handleClickShowPassword( "password_visibility" );
                  } }
                  onMouseDown={ ( e ) => {
                    handleMouseDownPassword( e );
                  } }
                  edge="end"
                  size="small"
                  sx={ { color: "#C8CDD4", "&:hover": { color: "#3E4248" } } }
                >
                  { showPassword ? <VisibilityOffIcon /> : <VisibilityIcon /> }
                </IconButton>
              </InputAdornment>
            ),
          } }
          sx={ { marginBottom: showPwdChecklist === true ? "0px" : "20px" } }
          value={ password }
          onChange={
            ( e ) => {
              setPassword( e.target.value );
            }
            // validatePasswordLength({
            //   password: e.target.value,
            //   passwordError,
            //   setPasswordError,
            // })
          }
          onFocus={ () => setShowPwdChecklist( true ) }
          onBlur={ () => setShowPwdChecklist( false ) }
          onKeyUp={ ( e ) => validatePasswordChecklist( e ) }
        />
        { showPwdChecklist === true ? (
          <Box className="password_checklist" mt="10px" mb="20px">
            <Stack direction="row" spacing={ 1 } alignItems="center">
              <CheckCircleRoundedIcon
                //@ts-ignore
                fontSize="12px"
                sx={ { color: lowerCase === true ? "#2E5DB0" : "#C8CDD4" } }
              />
              <Typography
                className="pwd_checkList_typo"
                sx={ { color: lowerCase === true ? "#2E5DB0" : "#C8CDD4" } }
              >
                One lowercase character
              </Typography>
            </Stack>
            <Stack direction="row" spacing={ 1 } alignItems="center">
              <CheckCircleRoundedIcon
                //@ts-ignore
                fontSize="12px"
                sx={ { color: oneNumber === true ? "#2E5DB0" : "#C8CDD4" } }
              />
              <Typography
                className="pwd_checkList_typo"
                sx={ { color: oneNumber === true ? "#2E5DB0" : "#C8CDD4" } }
              >
                One number
              </Typography>
            </Stack>
            <Stack direction="row" spacing={ 1 } alignItems="center">
              <CheckCircleRoundedIcon
                //@ts-ignore
                fontSize="12px"
                sx={ { color: specialChar === true ? "#2E5DB0" : "#C8CDD4" } }
              />
              <Typography
                className="pwd_checkList_typo"
                sx={ { color: specialChar === true ? "#2E5DB0" : "#C8CDD4" } }
              >
                One Special character
              </Typography>
            </Stack>
            <Stack direction="row" spacing={ 1 } alignItems="center">
              <CheckCircleRoundedIcon
                //@ts-ignore
                fontSize="12px"
                sx={ { color: upperCase === true ? "#2E5DB0" : "#C8CDD4" } }
              />
              <Typography
                className="pwd_checkList_typo"
                sx={ { color: upperCase === true ? "#2E5DB0" : "#C8CDD4" } }
              >
                One uppercase character
              </Typography>
            </Stack>
            <Stack direction="row" spacing={ 1 } alignItems="center">
              <CheckCircleRoundedIcon
                //@ts-ignore
                fontSize="12px"
                sx={ { color: minChar === true ? "#2E5DB0" : "#C8CDD4" } }
              />
              <Typography
                className="pwd_checkList_typo"
                sx={ { color: minChar === true ? "#2E5DB0" : "#C8CDD4" } }
              >
                Minimum eight character
              </Typography>
            </Stack>
          </Box>
        ) : (
          ""
        ) }
        <article className="textfield_label">Confirm Password</article>
        <TextField
          id="confirm-password"
          placeholder="********"
          variant="outlined"
          size="small"
          fullWidth
          type={ showConfirmPassword ? "text" : "password" }
          inputProps={ {
            sx: { color: "#3E4248", fontWeight: "500" },
          } }
          InputProps={ {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm-password visibility"
                  onClick={ () => {
                    handleClickShowPassword( "confirm_paswword_visibility" );
                  } }
                  onMouseDown={ ( e ) => {
                    handleMouseDownPassword( e );
                  } }
                  edge="end"
                  size="small"
                  sx={ { color: "#C8CDD4", "&:hover": { color: "#3E4248" } } }
                >
                  { showConfirmPassword ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  ) }
                </IconButton>
              </InputAdornment>
            ),
          } }
          value={ confirmPassword }
          onChange={ ( e ) => {
            setConfirmPassword( e.target.value );
            validateConfirmPassword( e );
          } }
          helperText={ passwordMismatch === true ? "Password Mismatch" : "" }
          className="input_textfield"
        />
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
            checked={ termsChecked }
            onChange={ checkPolicy_Terms }
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
        { signUpLoading ? (
          <Spinner />
        ) : (
          <Button
            ref={ buttonRef }
            variant="contained"
            sx={ {
              color: "#FFFFFF",
              backgroundColor: loginObj?.buttonColor,
              boxShadow: "none",
              "&:hover": { backgroundColor: loginObj?.buttonColor, boxShadow: "none" },
              textTransform: "capitalize",
            } }
            disabled={
              email &&
                !emailError &&
                password &&
                confirmPassword &&
                lowerCase &&
                oneNumber &&
                specialChar &&
                upperCase &&
                minChar &&
                termsChecked &&
                !passwordMismatch
                ? false
                : true
            }
            onClick={ onSignUpClick }
          >
            Sign Up
          </Button>
        ) }
        <Typography
          align="center"
          color="#989EA5"
          sx={ { fontSize: "12px", fontWeight: "400" } }
          className="form_last_block"
        >
          Already a member?{ " " }
          <span
            style={ { color: loginObj?.buttonColor, fontWeight: "600", cursor: "pointer" } }
            onClick={ onSignIn }
          >
            Sign In
          </span>
        </Typography>
      </Box>
    </>
  );
};
export default SignupForm;
