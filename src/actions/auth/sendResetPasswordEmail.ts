import { Auth, sendPasswordResetEmail } from "firebase/auth";

const sendResetPasswordEmail = async (auth: Auth, email: string) => {
  try {
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Password reset email sent successfully!");
      })
      .catch((err: any) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

export default sendResetPasswordEmail;
