import prolific_setup from "../scripts/prolific_setup";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import WelcomeScreen from "../components/instructions/WelcomeScreen";
import '../styles/app.css';

function BaselineIndex(props: any) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentStep, setCurrentStep] = useState(0);

    const newCurrent = (newCurrentStep: any) => {
        setCurrentStep(newCurrentStep);
    }
    
    prolific_setup(searchParams);

    if (currentStep == 0) {
        return (
            <WelcomeScreen headerText="Visual Perception Study" setCurrentStep={newCurrent} currentStep={currentStep} numParts="three"/>
        )
    } else if (currentStep == 1) {
        return (
            <div className="container">
                <h1 style={{color: "rgb(176, 35, 24)", paddingTop: "20px"}}>STUDY 1</h1>
                <h3 style={{fontWeight: "normal"}}>You will be presented with a series of images.</h3><br/>
                <h3 style={{fontWeight: "normal"}}>Keep your gaze on the red cross in the middle of the screen.</h3><br/><br/>
                <h3 style={{fontWeight: "normal"}}>You have to press the space-bar <strong><em>as soon as possible</em></strong> when an image appears.</h3>
                <h3 style={{fontWeight: "normal"}}>We are measuring how fast you respond to visual stimuli.</h3><br/><br/>
                <h3 style={{fontWeight: "normal"}}>The computer will wait for you to respond before displaying the next image.</h3><br/>
                <Link to="st1"><button style={{fontSize: "1.5em"}}>Next ➡️</button></Link>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
    
}

export default BaselineIndex;