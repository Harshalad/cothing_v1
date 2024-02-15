import { useSelector } from "react-redux";
import ConceptPrimer from "../../components/ConceptPrimer/ConceptPrimer";
import VerifyNworx from "../../zustand/HostNameUrl";
import { useEffect } from "react";
import { verifyNworxUserCentral } from "../../actions/auth/verifyNworxUserCentral";
import setHostUrl from "../../constants/setHostUrl";
import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";

const ConceptPrimerPage = () => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  setHostUrl( user );
  return <> <ConceptPrimer /> <PrivacyPolicy user={ user } /></>;

};
export default ConceptPrimerPage;
