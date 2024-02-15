export const getLabels = ( data: any, week: any ) => {
	let label: any = [];
	let lastDate: any = null;
	data?.map( ( row: any ) => {
		const date = new Date( row?.date );
		const formattedDate = `${ date.getDate() } ${ getMonthName( date.getMonth() ) }`;
		week ? label.push( formattedDate ) : label.push( formattedDate );
		//label.push( "Week of " + formattedDate );
	} );
	if ( data?.length < 8 ) {

		const availableWeeks = data?.length;
		const remainingWeeks = 8 - availableWeeks;

		const startDate = data[ data?.length - 1 ]?.date || Date.now();
		let currentDate = startDate;


		for ( let i = 0; i < remainingWeeks; i++ ) {
			const nextWeekDate = new Date( currentDate + 7 * 24 * 60 * 60 * 1000 );
			const formattedDate = `${ nextWeekDate.getDate() } ${ getMonthName( nextWeekDate.getMonth() ) }`;
			week ? label.push( formattedDate ) : label.push( formattedDate );

			currentDate = nextWeekDate.getTime();
		}
	}

	console.log( label, data, "lastDate" );
	return label;
};

const getMonthName = ( monthIndex: number ) => {
	const months = [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
	];
	return months[ monthIndex ];
};
