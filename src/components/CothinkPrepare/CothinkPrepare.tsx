import { useEffect, useState } from "react";
import { fetchUserSheet } from "../../actions/coThinkPrep/fetchUserSheet";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const CothinkPrepare = () => {
	const [ worksheet, setWorksheet ] = useState();
	const router = useRouter();
	const [ userWorkSheetId, setUserWorksheetId ] = useState<any>( null );
	const [ type, setType ] = useState<any>( null );
	useEffect( () => {
		setUserWorksheetId( router?.query?.id );
		setType( router?.query?.type === "prep" ? "PREPARE" : "QP" );
	}, [ router ] )
	//@ts-ignore
	const user = useSelector( ( state ) => state?.auth?.nWorxUser );
	useEffect( () => {
		const getUserWorksheet = async () => {
			const response = fetchUserSheet( { userId: user?.id, programId: user?.activeProgramId, userWorksheetId: userWorkSheetId, type: type } );
		}
		getUserWorksheet();
	}, [ userWorkSheetId, type ] )

	return (
		<>
			New Prepare
		</>
	);
}
export default CothinkPrepare;