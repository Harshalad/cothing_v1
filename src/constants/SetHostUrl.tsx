// SetHostUrl.js
import { useSelector } from "react-redux";
import VerifyNworx from "../zustand/HostNameUrl";
import { useEffect } from "react";
import { verifyNworxUserCentral } from "../actions/auth/verifyNworxUserCentral";

const setHostUrl = async ( user: any ) => {
	const { hostUrl } = VerifyNworx();

	const isNWORXRegisteredUser = await verifyNworxUserCentral( user?.email, hostUrl );
	// Handle the result if needed
};

export default setHostUrl;
