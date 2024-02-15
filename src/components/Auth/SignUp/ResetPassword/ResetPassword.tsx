// import { Link } from "react-router-dom";
import { useState ,useRef} from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Stack,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { Helmet, HelmetProvider } from "react-helmet-async";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import RightBlockContext from "../RightBlockContext";
import { useContext } from "react";

const Resetpassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mismatch, setMismatch] = useState(false);
  const [showPwdChecklist, setShowPwdChecklist] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [oneNumber, setOneNumber] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [minChar, setMinChar] = useState(false);
  const [pwdChecklistStatus, setPwdChecklistStatus] = useState("");
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  //   const { rightInnerBlock } = useContext(RightBlockContext);

    //@ts-ignore
    useEffect(() => {
      //@ts-ignore
      const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          //@ts-ignore
          buttonRef.current.click();
        }
      };
  
      document.addEventListener("keydown", handleKeyDown);
  
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, []);

  const validatePassword = (e) => {
    setPwdChecklistStatus(true);
    setPassword(e.target.value);
    const field = document.getElementById("password").value;
    if (field !== "") {
      setShowPwdChecklist(true);
    } else {
      setShowPwdChecklist(false);
    }
    if (/[a-z]/.test(field)) {
      setLowerCase(true);
    } else {
      setLowerCase(false);
      setPwdChecklistStatus(false);
    }
    if (/[0-9]/.test(field)) {
      setOneNumber(true);
    } else {
      setOneNumber(false);
      setPwdChecklistStatus(false);
    }
    if (/[^\w\s]/.test(field)) {
      setSpecialChar(true);
    } else {
      setSpecialChar(false);
      setPwdChecklistStatus(false);
    }
    if (/[A-Z]/.test(field)) {
      setUpperCase(true);
    } else {
      setUpperCase(false);
      setPwdChecklistStatus(false);
    }
    if (/.{8,}/.test(field)) {
      setMinChar(true);
    } else {
      setMinChar(false);
      setPwdChecklistStatus(false);
    }
    if (confirmPassword !== "") {
      if (e.target.value === confirmPassword) {
        setMismatch(false);
        setShowPwdChecklist(false);
      } else {
        setMismatch(true);
      }
    } else {
      setMismatch(false);
    }
    return pwdChecklistStatus;
  };

  const validateConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== "") {
      if (e.target.value === password) {
        setMismatch(false);
        setShowPwdChecklist(false);
      } else {
        setMismatch(true);
      }
    } else {
      setMismatch(false);
    }
  };

  const handleClickShowPassword = (value) => {
    if (value === "password_visibility") {
      setShowPassword((show) => !show);
      var pwdElem = document.getElementById("password");
      pwdElem.focus();
      setTimeout(function () {
        pwdElem.setSelectionRange(100, 100);
      }, 0);
    } else {
      setShowConfirmPassword((show) => !show);
      var cnfmPwdElem = document.getElementById("confirm-password");
      cnfmPwdElem.focus();
      setTimeout(function () {
        cnfmPwdElem.setSelectionRange(100, 100);
      }, 0);
    }
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const showSuccessBox = () => {
    setOpen(true);
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Reset Password</title>
        </Helmet>
      </HelmetProvider>
      <Box className="right_inner_box">
        <Typography variant="h2" align="center" className="forgot_password">
          Reset your password
        </Typography>
        <Typography
          className="inner_subtext"
          align="center"
          sx={{ fontSize: "16px", fontWeight: "400", color: "#5D636B" }}
        >
          Create a new password
        </Typography>
        <article className="textfield_label">Password</article>
        <TextField
          id="password"
          placeholder="********"
          variant="outlined"
          size="small"
          fullWidth
          type={showPassword ? "text" : "password"}
          inputProps={{
            sx: { fontSize: "16px", color: "#3E4248", fontWeight: "500" },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    handleClickShowPassword("password_visibility");
                  }}
                  onMouseDown={(e) => {
                    handleMouseDownPassword(e);
                  }}
                  edge="end"
                  size="small"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ marginBottom: showPwdChecklist === true ? "0px" : "20px" }}
          value={password}
          onChange={(e) => validatePassword(e)}
          // onFocus={() => setShowPwdChecklist(true)}
          // onBlur={() => setShowPwdChecklist(false)}
        />
        {showPwdChecklist === true ? (
          <Box className="password_checklist" mt="10px" mb="20px">
            <Stack direction="row" spacing={1} alignItems="center">
              <CheckCircleRoundedIcon
                fontSize="12px"
                sx={{ color: lowerCase === true ? "#2E5DB0" : "#C8CDD4" }}
              />
              <Typography
                className="pwd_checkList_typo"
                sx={{ color: lowerCase === true ? "#2E5DB0" : "#C8CDD4" }}
              >
                One lowercase character
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <CheckCircleRoundedIcon
                fontSize="12px"
                sx={{ color: oneNumber === true ? "#2E5DB0" : "#C8CDD4" }}
              />
              <Typography
                className="pwd_checkList_typo"
                sx={{ color: oneNumber === true ? "#2E5DB0" : "#C8CDD4" }}
              >
                One number
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <CheckCircleRoundedIcon
                fontSize="12px"
                sx={{ color: specialChar === true ? "#2E5DB0" : "#C8CDD4" }}
              />
              <Typography
                className="pwd_checkList_typo"
                sx={{ color: specialChar === true ? "#2E5DB0" : "#C8CDD4" }}
              >
                One Special character
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <CheckCircleRoundedIcon
                fontSize="12px"
                sx={{ color: upperCase === true ? "#2E5DB0" : "#C8CDD4" }}
              />
              <Typography
                className="pwd_checkList_typo"
                sx={{ color: upperCase === true ? "#2E5DB0" : "#C8CDD4" }}
              >
                One uppercase character
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <CheckCircleRoundedIcon
                fontSize="12px"
                sx={{ color: minChar === true ? "#2E5DB0" : "#C8CDD4" }}
              />
              <Typography
                className="pwd_checkList_typo"
                sx={{ color: minChar === true ? "#2E5DB0" : "#C8CDD4" }}
              >
                Minimum eight character
              </Typography>
            </Stack>
          </Box>
        ) : (
          ""
        )}
        <article className="textfield_label">Confirm Password</article>
        <TextField
          id="confirm-password"
          placeholder="********"
          variant="outlined"
          size="small"
          fullWidth
          type={showConfirmPassword ? "text" : "password"}
          inputProps={{
            sx: { fontSize: "16px", color: "#3E4248", fontWeight: "500" },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm-password visibility"
                  onClick={() => {
                    handleClickShowPassword("confirm_paswword_visibility");
                  }}
                  onMouseDown={(e) => {
                    handleMouseDownPassword(e);
                  }}
                  edge="end"
                  size="small"
                >
                  {showConfirmPassword ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={confirmPassword}
          onChange={(e) => validateConfirmPassword(e)}
          helperText={mismatch === true ? "Password Mismatch" : ""}
        />
        <Button
          variant="contained"
          sx={{
            color: "#FFFFFF",
            backgroundColor: "#F58A43",
            boxShadow: "none",
            "&:hover": { backgroundColor: "#F58A43", boxShadow: "none" },
            textTransform: "capitalize",
            marginTop: "50px",
          }}
          disabled={
            password &&
            pwdChecklistStatus &&
            confirmPassword &&
            mismatch === false
              ? false
              : true
          }
          onClick={() => {
            showSuccessBox(true);
          }}
        >
          Reset Password
        </Button>
      </Box>
      <Box>
        <Dialog
          open={open}
          aria-labelledby="title"
          aria-describedby="description"
          sx={{ textAlign: "center", padding: "30px" }}
        >
          <Box>
            <TaskAltRoundedIcon
              className="reset_checked"
              sx={{ fontSize: "80px" }}
            />
          </Box>
          <DialogTitle
            id="title"
            sx={{
              color: "#252525",
              fontWeight: "700",
              fontSize: { mobile: "18px", tablet: "31px" },
              marginTop: "20px",
              padding: "0 0 0px 0",
            }}
          >
            Password Reset was Successful
          </DialogTitle>
          <DialogContent sx={{ padding: "0 0 0px 0" }}>
            <DialogContentText
              id="description"
              sx={{
                color: "#5D636B",
                fontWeight: "400",
                fontSize: { mobile: "16px", tablet: "20px" },
                marginBottom: "20px",
                padding: "0 0 0px 0",
              }}
            >
              Use your new password to sign in to your account
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {/* <Link
              to="/signin"
              style={{ margin: "0 auto", textDecoration: "none" }}
              onClick={() => {
                rightInnerBlock("/");
              }}
            > */}
            <Button
            ref={buttonRef}
              sx={{
                color: "#FFFFFF",
                backgroundColor: "#F58A43",
                boxShadow: "none",
                "&:hover": { backgroundColor: "#F58A43", boxShadow: "none" },
                textTransform: "capitalize",
                width: "150px !important",
              }}
            >
              Sign In
            </Button>
            {/* </Link> */}
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};
export default Resetpassword;
