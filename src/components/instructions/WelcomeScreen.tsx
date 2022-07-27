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
        
        <h3 style={{fontWeight: "normal"}}><strong>Some important information about your data</strong></h3>
        <p style={{padding: 20}}><strong>What data do we collect? </strong>We collect your Prolific/MTurk ID, your responses, and demographic data provided to us if you use Prolific.
        <br/><strong>How will the data be used?</strong> We will use your data to conduct and publish scientific research through scientific papers, conferences, or other means. We have no way to link you personally to the data you provide.
        <br/><strong>How long will we store your data? </strong>We may store your responses indefinitely but we do not collect any data by which we can use to identify you personally.
        <br/><strong>Your privacy: </strong>As mentioned, we do not collect data through which we can identify you personally. We use your Prolific ID to keep record of responses and demographics.
        <br/><strong>How we may share data: </strong>We will share anonymized data with others as required by law or by the mandates of the journal/means of publishing.
        <br/><strong>How can you opt out of this consent?</strong> You may choose to not participate by closing this tab and returning the HIT/Study without completion to either Prolific or MTurk.
        <br/><strong>This study and the data collected from it will be goverened by the laws of the United States of America and the Commonwealth of Massachusetts.</strong><br/><br/>This study is part of a MIT scientific research project. Your decision to complete this study is voluntary. There is no way for us to personally identify you. The only information we will have, in addition to your responses, is the time at which you completed the study as well as any information provided by Prolific. The results of the research may be presented at scientific meetings or published in scientific journals. Clicking on the 'Next' button on the bottom of this page indicates that you are at least 18 years of age and agree to complete this HIT voluntarily.</p>
        
        <button style={{fontSize: "1.5em"}} onClick={() => {props.setCurrentStep(props.currentStep+1)}}>Next ➡️</button>
      </div>
    )
}

export default WelcomeScreen;