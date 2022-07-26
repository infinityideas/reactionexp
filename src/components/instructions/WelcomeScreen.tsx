import '../../styles/app.css';

interface WelcomeProps {
    headerText: string,
    setCurrentStep: any,
    currentStep: any,
    numParts: string
}

function WelcomeScreen(props: WelcomeProps) {
    return (
    <div className="container" style={{fontFamily: "arial"}}>
        <h1><span style={{fontSize: "0.75em"}}>Welcome to the</span><br/><span style={{color: "darkblue"}}>{props.headerText}</span></h1>
        <br/><br/><h3 style={{fontWeight: "normal"}}>We appreciate your participation.<br/><strong>This experiment is not compatible with Firefox. Please use a browser like Google Chrome or Safari.</strong></h3><br/><h3 style={{fontWeight: "normal"}}>{props.numParts == "" ? "This study will take roughly 20 minutes." : "This study has "+props.numParts+" parts. They will take 20 minutes."}</h3><h3 style={{fontWeight: "normal"}}>Please sit approximately 50cm from the screen.<br/>Please make sure that your screen's brightness is turned up.</h3><br/>
        <button style={{fontSize: "1.5em"}} onClick={() => {props.setCurrentStep(props.currentStep+1)}}>Next ➡️</button>
      </div>
    )
}

export default WelcomeScreen;