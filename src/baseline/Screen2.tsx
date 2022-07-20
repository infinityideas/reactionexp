import '../styles/app.css';
import { settings } from '../scripts/config';
import { useState } from 'react';

import example from '../content/images/baseline/example.png';
import ImageDemo from '../components/instructions/ImageDemo';

import symm1 from '../content/images/baseline/symm1.png';
import symm2 from '../content/images/baseline/symm2.png';
import nsymm1 from '../content/images/baseline/nsymm1.png';
import nsymm2 from '../content/images/baseline/nsymm2.png';

function Screen2() {
    const [currentStep, setCurrentStep] = useState(0);

    if (currentStep == 0) {
        return (
            <div className="container">
                <h1 style={{color: "rgb(176, 35, 24)", paddingTop: "100px", fontSize: "3em"}}>End of Study 1</h1>
                <h3 style={{fontWeight: "normal"}}>Take a break or keep going!</h3><br/><br/>
                <button style={{fontSize: "1.5em"}} onClick={() => {setCurrentStep(currentStep+1)}}>Next Study ➡️</button>
            </div>
        )
    } else if (currentStep == 1) {
        return (
            <div className="container" style={{fontFamily: "arial"}}>
                <h1 style={{color: "rgb(176, 35, 24)", paddingTop: "20px"}}>STUDY 2</h1>
                <h3 style={{fontWeight: "normal"}}>You will be presented with a series of images. Some will be a bit blurry.<br/>Each image will be displayed for {settings.time/1000} {settings.time/1000 == 1 ? "second" : "seconds"}. <br/><br/><span>Keep your gaze on the red cross in the middle of the screen.</span></h3><br/>
                <h3 style={{fontWeight: "normal"}}>You have to press one of two keys when an image appears
                <div style={{marginLeft: "33%"}}>
                <ul style={{textAlign: "left"}}>
                <li>If the image is <em style={{color: "blue"}}><strong>S</strong>ymmetric</em>, press the <strong><em style={{color: "red"}}>{(settings.sKey_string).toUpperCase()}</em></strong> key</li>  
                <li>If it is <em style={{color: "blue"}}><strong>A</strong>symmetric</em>, press the <strong><em style={{color: "red"}}>{(settings.nsKey_string).toUpperCase()}</em></strong> key</li>
                </ul></div><p>We suggest that you use both hands; position the left-hand index finger
        on the A key and the right-hand index finger on the S key.</p> 
        <img src={example} width="35%" /><br/><br/>
                Try to respond as quickly as possible <em>without compromising accuracy</em>.<br/> 
                The computer will wait for you to answer before moving on to the next image.
                <br/></h3><br/>
                <button style={{fontSize: "1.5em"}} onClick={() => {setCurrentStep(currentStep+1)}}>Next ➡️</button>
            </div>
        )
    } else if (currentStep == 2) {
        return (
            <ImageDemo symm1={symm1} symm2={symm2} nsymm1={nsymm1} nsymm2={nsymm2} to="/baseline/st2"/>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default Screen2;