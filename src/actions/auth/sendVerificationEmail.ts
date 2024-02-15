import { User, sendEmailVerification } from "firebase/auth";
import { toast } from "react-toastify";

const sendVerificationEmail = async (user: User) => {
  if (user && !user.emailVerified) {
    try {
      await sendEmailVerification(user)
        .then(() => {
          console.log("Verification email sent successfully!");
        })
        .catch((err: any) => {
          console.log(err);
          if (err?.code === "auth/too-many-requests") {
            toast.error("Too many requests. Please try again later!", {
              toastId: "SEND_VERIFICATION_TOO_MANY_REQS",
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  }
};

export default sendVerificationEmail;
