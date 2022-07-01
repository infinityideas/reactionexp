import React from 'react';
import './styles/app.css';
import { settings } from './scripts/config';
import { Link } from 'react-router-dom';

import Step1 from './content/images/practice/Step1.png';
import Step2 from './content/images/practice/Step2.png';
import Step3 from './content/images/practice/Step3.png';

class Practice extends React.Component{
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <h1>Practice!</h1>
                <h3>How this will work:</h3>
                <h3 style={{color: "red"}}>These are the same steps you will take on the real study.</h3>
                <hr/>
                <h2 style={{border: "1px solid blue"}}><span style={{color: "red"}}>Step Zero:</span> We will load the experimental files</h2>
                <h2 style={{border: "1px solid blue", paddingBottom: "10px"}}><span style={{color: "red"}}>Step One:</span> Press either the {settings.nsKey_string} or the {settings.sKey_string} key to start.
                    <br/><img src={Step1} width="50%" style={{boxShadow: "10px 10px 10px lightblue"}}/>
                </h2>
                <h2 style={{border: "1px solid blue", paddingBottom: "10px"}}><span style={{color: "red"}}>Step Two:</span> Get ready!
                    <br/><img src={Step2} width="50%" style={{boxShadow: "10px 10px 10px lightblue"}}/>
                    <p style={{fontSize: "0.75em"}}>You will have three seconds to get your fingers in position on the {settings.nsKey_string} and {settings.sKey_string} keys.</p>
                </h2>
                <h2 style={{border: "1px solid blue", paddingBottom: "10px"}}><span style={{color: "red"}}>Step Three:</span> Classify the image.
                    <br/><img src={Step3} width="50%" style={{boxShadow: "10px 10px 10px lightblue"}}/>
                    <p style={{fontSize: "0.75em"}}>You will have {settings.time/1000} {settings.time/1000 > 1 ? "seconds" : "second"} to view the image before it disappears. Press the {settings.nsKey_string} key to mark it as <span style={{color: "blue"}}>asymmetric</span> or the {settings.sKey_string} key to mark it as <span style={{color: "blue"}}>symmetric</span>.
                    <br/>Again, try to respond as quickly as possible <span style={{color: "red"}}>without sacrificing accuracy!</span><br/><br/>This step will repeat for all the images. Every several images, you will get a break.</p>
                </h2>
                <h2 style={{border: "1px solid blue"}}><span style={{color: "red"}}>Step Four:</span> Submit your HIT ID.<br/><p style={{fontSize: "0.75em"}}>You will be given a HIT ID to copy and paste back into MTURK for us to link your responses.</p></h2>
                <h3>Ready to try it out before completing the full study?<br/>You will have to have greater than or equal to {settings.practice_required_acc * 100}% accuracy (standard human performance) to move on to the real experiment.</h3><br/>
                <Link to="/practice_exp"><button style={{width: "33%", height: "100px"}}><p style={{fontSize: "5em", margin: 0, color: "green"}}>Practice!</p></button></Link>
            </div>
        )
    }
}

export default Practice;