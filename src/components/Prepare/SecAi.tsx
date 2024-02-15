const aiOpenIcon = "/images/aigenicon.svg"
const SecAi = ( { secAiView, section }: any ) => {
	return (
		<>
			{ <div style={ { width: "auto", paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10, background: 'rgba(89, 173, 196, 0.10)', borderRadius: 48, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex' } }>
				<div style={ { mixBlendMode: 'multiply', textAlign: 'center', color: '#2E5DB0', fontSize: 16, fontFamily: 'SF Pro', fontWeight: '400', wordWrap: 'break-word' } }><img
					//@ts-ignore
					src={ aiOpenIcon }
					width={ 24 }
					height={ 24 }
					alt="manager guidance"
				/></div>
				<div style={ { mixBlendMode: 'multiply', textAlign: 'center', color: '#2E5DB0', fontSize: 16, fontFamily: 'sans-serif', fontWeight: '600', wordWrap: 'break-word' } }>{ secAiView ? `View Feedback for ${ section?.name } Section ` : `Generate Feedback for ${ section?.name } Section` }</div>
			</div> }
		</>
	);
}
export default SecAi;