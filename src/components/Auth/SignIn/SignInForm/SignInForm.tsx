import { useRef, useState, useEffect, use } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Stack,
  Checkbox,
  Typography,
  Container,
  CircularProgress,
  Button,
} from "@mui/material";
import { HelmetProvider, Helmet } from "react-helmet-async";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  AUTH_OPTION_TYPES,
  AUTH_STATES,
  AUTH_TAB_TYPES,
} from "../../../../constants/auth";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store/store";
//@ts-ignore
import { auth } from "../../../../utils/firebase";

// CONSTANTS AND FUNCTIONS IMPORTS
import { validateEmail, validatePasswordLength } from "../../validations";
import signInUser from "../../../../actions/auth/signInUser";
import { toast } from "react-toastify";
import Spinner from "../../../common/Spinner/Spinner";
import {
  fetchNworxUser,
  getNworxUser,
} from "../../../../actions/auth/fetchNworxUser";
import { hulLogin, defultLogin } from "../../../../constants/customLogin";
import { updateReport } from "../../../../actions/user/onboardNworxUser";
import signInWithSSO from "../../../../actions/auth/signInWithSSO";
import { checkIfNworxUser, verifyNworxUser } from "../../../../actions/auth/verifyNworxUser";
import VerifyNworx from "../../../../zustand/HostNameUrl";
import { createUser } from "../../../../actions/user/createUser";
interface SignInFormProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  emailError: string;
  setEmailError: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  passwordError: string;
  setPasswordError: React.Dispatch<React.SetStateAction<string>>;
  authState: string;
  setAuthState: React.Dispatch<React.SetStateAction<string>>;
  authTab: string;
  setAuthTab: React.Dispatch<React.SetStateAction<string>>;
  authOption: string;
  setAuthOption: React.Dispatch<React.SetStateAction<string>>;
  resolver: any;
  setResolver: any;
  verficationId: any;
  setVerificationId: any;
  setPhoneAuthProvider: any;
}

const SignInForm = ( {
  email,
  setEmail,
  emailError,
  setEmailError,
  password,
  setPassword,
  passwordError,
  setPasswordError,
  authState,
  setAuthState,
  authTab,
  setAuthTab,
  authOption,
  setAuthOption,
  resolver,
  setResolver,
  verficationId,
  setVerificationId,
  setPhoneAuthProvider,
}: SignInFormProps ) => {
  const [ showPassword, setShowPassword ] = useState( false );
  const [ signInLoading, setSignInLoading ] = useState( false );
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { hostUrl } = VerifyNworx();
  // const { rightInnerBlock } = useContext(RightBlockContext);
  const [ validationResult, setValidationResult ] = useState( false );
  const [ userExists, setuserExists ] = useState( false );
  const [ click, setClick ] = useState( false );
  const [ numberDb, setNumberDb ] = useState( false );
  const [ mfaEnabled, setMfaEnabled ] = useState( false );
  const buttonRef = useRef( null );
  const [ loginObj, setLoginObj ] = useState<any>( null );
  const hostingUrl = window.location.host;

  const [ hul, setHul ] = useState( hostingUrl.includes( "hul" ) );
  console.log( hostingUrl, "hostingurl" );
  useEffect( () => {
    if ( hul ) {
      setLoginObj( hulLogin );
    } else {
      setLoginObj( defultLogin );
    }
  }, [ hul ] )

  //@ts-ignore
  const nWorxUser = useSelector( ( state ) => state?.auth?.nWorxUser );

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

  const onSignUp = () => {
    setAuthState( AUTH_STATES.SIGNUP );
    setAuthTab( AUTH_TAB_TYPES.EMAIL );
    setAuthOption( AUTH_OPTION_TYPES.EMAIL_SIGNUP );
    setPassword( "" );
  };

  const onViewEmailVerificationPending = () => {
    setAuthState( AUTH_STATES.SIGNUP );
    setAuthTab( AUTH_TAB_TYPES.EMAIL );
    setAuthOption( AUTH_OPTION_TYPES.EMAIL_VERIFICATION_PENDING );
  };

  const onMultiFactorAuth = () => {
    setAuthState( AUTH_STATES.SIGNIN );
    setAuthTab( AUTH_TAB_TYPES.EMAIL );
    setAuthOption( AUTH_OPTION_TYPES.MULTI_FACTOR_AUTH );
  };

  const onSignInClick = async ( e: any ) => {
    e.preventDefault();
    setSignInLoading( true );
    try {
      const response = await signInUser(
        dispatch,
        //@ts-ignore
        auth,
        email,
        password,
        setResolver,
        setPhoneAuthProvider,
        setVerificationId,
        hostUrl
      );
      console.log( response, "response1234" );
      //@ts-ignore
      if ( response?.notRegisteredUser ) {
        setSignInLoading( false );
        toast.error( "You are not registered yet as NWORX user. Please check.", {
          toastId: "SIGNIN_NOT_REGISTERED",
        } );
      }
      //@ts-ignore
      if ( response?.requiresSignUp ) {
        setSignInLoading( false );
        toast.error(
          "You need to sign up before you can sign in. Please sign up below.",
          { toastId: "SIGNIN_NOT_SIGNEDUP" }
        );
        onSignUp();
        return;
      }
      //@ts-ignore
      if ( response?.emailVerificationPending ) {
        setSignInLoading( false );
        onViewEmailVerificationPending();
        return;
      }
      //@ts-ignore
      if ( response?.multiFactorAuthRequired ) {
        setSignInLoading( false );
        onMultiFactorAuth();
        return;
      }
      //@ts-ignore
      if ( response?.wrongPassword ) {
        setSignInLoading( false );
        toast.error( "You have entered the wrong password.", {
          toastId: "SIGNIN_WRONG_PASSWORD",
        } );
        return;
      }
      //@ts-ignore
      if ( response?.signInSuccessful ) {
        await dispatch( fetchNworxUser( email ) );

        setSignInLoading( false );
        const userObj: any = await getNworxUser( email );
        const user = userObj?.nWorxUser;
        console.log( "SIGN UP FORM", user );
        if ( !user?.onboarded ) {
          router.push( "/onboarding" );
          return;
        }
        console.log( "SIGN UP FORM 22", user );
        if ( user?.onboarded && user?.showGoalOverview ) {
          router.push( "/goal/overview" );
          return;
        } else {
          console.log( "SIGN UP FORM 3333", user );
          router.push( "/action-center" );
          return;
        }
      }

      setSignInLoading( false );
    } catch ( err ) {
      console.log( err );
      setSignInLoading( false );
    }
  };

  useEffect( () => {
    const fun = () => {
      const isServer = typeof window === 'undefined';

      if ( !isServer ) {
        const getResult = async () => {
          const result = await signInWithSSO();
          //@ts-ignore
          const parsedResult = JSON.parse( result?._tokenResponse?.rawUserInfo );
          console.log( parsedResult, "ssoresult" );
          if ( parsedResult ) {
            const response = await createUser( { name: parsedResult?.name, designation: parsedResult?.designation, band: "", department: parsedResult?.department, email: result?.user?.email, employeeCode: parsedResult?.employeeCode, manager: null, managerEmail: null, city: parsedResult?.city, hostUrl: hostingUrl } )
            if ( response ) {

              let email = result?.user?.email;
              console.log( email, "isNWORXRegisteredUser" );
              //@ts-ignore
              const isNWORXRegisteredUser = await dispatch( verifyNworxUser( email ) );
              if ( isNWORXRegisteredUser?.payload?.isVerifiedUser === undefined || !isNWORXRegisteredUser?.payload?.isVerifiedUser ) {
                return;
              }
              //@ts-ignore
              await dispatch( fetchNworxUser( email ) );
              const userObj: any = await getNworxUser( email );
              const user = userObj?.nWorxUser;
              console.log( "SIGN UP FORM", user );
              if ( !user?.onboarded ) {
                router.push( "/onboarding" );
                return;
              }
              console.log( "SIGN UP FORM 22", user );
              if ( user?.onboarded && user?.showGoalOverview ) {
                router.push( "/goal/overview" );
                return;
              } else {
                console.log( "SIGN UP FORM 3333", user );
                router.push( "/action-center" );
                return;
              }
            }
          }
        };

        getResult();
      }
    }
    if ( hostingUrl.includes( "icici" ) ) {
      fun();
    }
  }, [] )

  const handleClickShowPassword = () => {
    setShowPassword( ( show ) => !show );
    var elem = document.getElementById( "password" );
    if ( elem ) {
      elem.focus();
      setTimeout( function () {
        //@ts-ignore
        elem.setSelectionRange( 100, 100 );
      }, 0 );
    }
  };

  const handleMouseDownPassword = ( event: any ) => {
    event.preventDefault();
  };

  const onForgotPassword = () => {
    setAuthState( AUTH_STATES.SIGNIN );
    setAuthTab( AUTH_TAB_TYPES.EMAIL );
    setAuthOption( AUTH_OPTION_TYPES.FORGOT_PASSWORD );
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Sign-In</title>
        </Helmet>
      </HelmetProvider>
      <Box className="right_inner_box">
        <article className="textfield_label">Email Address</article>
        <TextField
          id="emailid"
          autoFocus
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
          helperText={ emailError ? "Invalid Email Address" : "" }
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
                  onClick={ handleClickShowPassword }
                  onMouseDown={ handleMouseDownPassword }
                  edge="end"
                  size="small"
                  sx={ { color: "#C8CDD4", "&:hover": { color: "#3E4248" } } }
                >
                  { showPassword ? <VisibilityOffIcon /> : <VisibilityIcon /> }
                </IconButton>
              </InputAdornment>
            ),
          } }
          value={ password }
          onChange={ ( e ) => {
            // console.log(e.target.value, password);
            setPassword( e.target.value );
            // validatePasswordLength({
            //   password: e.target.value,
            //   passwordError,
            //   setPasswordError,
            // });
          } }
          // helperText={passwordError ? "Minimum 8 characters" : ""}
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
          />
          <Typography
            color="#999999"
            sx={ { fontSize: "12px", fontWeight: "400" } }
          >
            Keep me logged in
          </Typography>
          <div
            style={ {
              textDecoration: "none",
              marginLeft: "auto",
              cursor: "pointer",
            } }
            onClick={ onForgotPassword }
          >
            <Typography
              color={ loginObj?.buttonColor }
              sx={ { fontSize: "12px", fontWeight: "400", cursor: "pointer" } }
            >
              Forgot Password?
            </Typography>
          </div>
        </Stack>
        <Container id="recaptcha-container" />
        { signInLoading ? (
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
            disabled={ !email || !password }
            onClick={ onSignInClick }
          >
            Sign In
          </Button>
        ) }
        <Typography
          align="center"
          mt="8px"
          color="#989EA5"
          sx={ { fontSize: "12px", fontWeight: "400" } }
          className="form_last_block"
        >
          First time here?{ " " }
          <span
            onClick={ onSignUp }
            style={ { color: loginObj?.buttonColor, fontWeight: "600", cursor: "pointer" } }
          >
            Sign Up
          </span>
        </Typography>
        {/* <Typography
          align="center"
          color="#989EA5"
          sx={{ fontSize: "12px", fontWeight: "400" }}
        >
          View Email Verification Pending?{" "}
          <span
            style={{ color: loginObj?.buttonColor, fontWeight: "600", cursor: "pointer" }}
            onClick={onViewEmailVerificationPending}
          >
            Click here!
          </span>
        </Typography> */}
      </Box>
    </>
  );
};

export default SignInForm;
