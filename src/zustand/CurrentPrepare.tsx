import { create } from 'zustand';

type Store = {
	sheet: any;
	setCurrentSheet: ( report: any ) => void;
};

const CurrentPrepare = create<Store>( ( set ) => ( {
	sheet: null,
	setCurrentSheet: ( cursheet ) =>
		set( ( state ) => ( {
			sheet: {
				goalName: cursheet.goalName,
				milestoneName: cursheet.milestoneName,
			},
		} ) ),
} ) );

export default CurrentPrepare;