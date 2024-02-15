import { useSelector } from "react-redux";
import { TestDetails } from "../../components/Assessment/TestDeatail";
import setHostUrl from "../../constants/setHostUrl";
import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";

const TestDetailsPage = () => {

    //@ts-ignore
    const user = useSelector( ( state ) => state?.auth?.nWorxUser );
    setHostUrl( user );
    return <><TestDetails /><PrivacyPolicy user={ user } /> </>
}

export default TestDetailsPage;