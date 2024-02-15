interface EmailValidationTypes {
  email: string;
  emailError: string;
  setEmailError: any;
}
export const validateEmail = ({
  email,
  emailError,
  setEmailError,
}: EmailValidationTypes) => {
  if (
    email !== "" &&
    !/^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,27})+$/.test(email)
  ) {
    setEmailError(true);
    return true;
  } else {
    setEmailError(false);
    return false;
  }
};

interface PasswordLengthValidationTypes {
  password: string;
  passwordError: string;
  setPasswordError: any;
}
export const validatePasswordLength = ({
  password,
  passwordError,
  setPasswordError,
}: PasswordLengthValidationTypes) => {
  if (password !== "" && password.length < 8) {
    setPasswordError("Please enter a password of 8 or more characters.");
    return true;
  } else {
    // setPasswordError("");
    return false;
  }
};
