import '../styles/app.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import same from '../content/images/baseline/same.png';
import different1 from '../content/images/baseline/different1.png';
import different2 from '../content/images/baseline/different2.png';

function Screen3() {
    const [currentStep, setCurrentStep] = useState(0);

    if (currentStep == 0) {
        return (
            <div className="container">
                <h1 style={{color: "rgb(176, 35, 24)", paddingTop: "100px", fontSize: "3em"}}>End of Study 2</h1>
                <h3 style={{fontWeight: "normal"}}>Take a break or keep going!</h3><br/><br/>
                <button style={{fontSize: "1.5em"}} onClick={() => {setCurrentStep(currentStep+1)}}>Next Study ➡️</button>
            </div>
        )
    } else if (currentStep == 1) {
        return (
            <div className="container" style={{fontFamily: "arial"}}>
                <h1 style={{color: "rgb(176, 35, 24)", paddingTop: "20px"}}>STUDY 3</h1>
                <h3 style={{fontWeight: "normal"}}>You will be presented with a series of image pairs.<br/>The two members of a pair will be displayed one after the other with an intervening blank.<br/><br/><span>Keep your gaze on the red cross in the middle of the screen.</span></h3><br/>
                <h3 style={{fontWeight: "normal"}}>You have to indicate whether the two members of the pair were<br/><span style={{color: "rgb(44, 113, 186)"}}>S</span>ame or <span style={{color: "rgb(44, 113, 186)"}}>D</span>ifferent, by pressing the <span style={{color: "rgb(44, 113, 186)"}}>S</span> or <span style={{color: "rgb(44, 113, 186)"}}>D</span> keys.
                <br/>You can respond as soon as the second image in the set appears.<br/><br/>No need to rush.<br/>The computer will wait for you to respond before displaying the next image pair.</h3><br/>
                <button style={{fontSize: "1.5em"}} onClick={() => {setCurrentStep(currentStep+1)}}>Next ➡️</button>
            </div>
        )
    } else if (currentStep == 2) {
        return (
            <div className="container" style={{fontFamily: "arial"}}>
                <h1><span style={{fontSize: "0.75em", color: "maroon"}}>Sample images</span></h1>
                <div style={{width: "90%", margin: "auto", textAlign: "center", borderRadius: "10px", backgroundColor: "rgb(229, 239, 219)"}}>
                <p style={{fontSize: "1.2em", paddingTop: 10}}>Here is a pair with <em style={{color: "rgb(44, 113, 186)"}}><strong>S</strong>ame</em> images.</p>
                <table>
                    <tr style={{border: "none"}}>
                    <td style={{width: "50%", textAlign: "center"}}><img src={same} width="95%" /></td>
                    <td style={{width: "50%", textAlign: "center"}}><img src={same} width="95%" /></td>
                    </tr>
                </table>
                </div>
                <div style={{width: "90%", margin: "auto", textAlign: "center", borderRadius: "10px", backgroundColor: "rgb(229, 239, 219)"}}>
                <p style={{fontSize: "1.2em", paddingTop: 10}}>Here is a pair with <em style={{color: "rgb(44, 113, 186)"}}><strong>D</strong>ifferent</em> images.</p>
                <table>
                    <tr style={{border: "none"}}>
                    <td style={{width: "50%", textAlign: "center"}}><img src={different1} width="95%" /></td>
                    <td style={{width: "50%", textAlign: "center"}}><img src={different2} width="95%" /></td>
                    </tr>
                </table>
                </div><br/>
                <Link to={"/baseline/st3"}><button style={{fontSize: "1.5em"}}>Next ➡️</button></Link>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default Screen3;