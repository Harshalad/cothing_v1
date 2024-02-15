import React, { useEffect } from "react";
import EmployeeGoalDiscussion from "../../../components/Align/EmployeeGoalDiscussion/EmployeeGoalDiscussion";
import VerifyNworx from "../../../zustand/HostNameUrl";
import { verifyNworxUserCentral } from "../../../actions/auth/verifyNworxUserCentral";
import { useSelector } from "react-redux";
import setHostUrl from "../../../constants/setHostUrl";

const EmployeeGoalDiscussionPage = () => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  setHostUrl( user );
  return <EmployeeGoalDiscussion />;
};

export default EmployeeGoalDiscussionPage;
