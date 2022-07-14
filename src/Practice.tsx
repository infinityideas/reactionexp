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
            <div className="container" style={{fontFamily: "arial"}}>
                <div style={{width: "80%", paddingLeft: "10%"}}>
                    <ul style={{fontSize: "1.25em", textAlign: "left"}}>
                        <li>
                            You will now have the chance to familiarize yourself with the study in a 2-3 minute practice session. You will not be evaluated on this part.
                        </li><br/>
                        <li>
                            This will be followed by another short session (lasting 1-2 minutes) in which you will need to achieve at least {settings.practice_required_acc * 100}% accuracy to be able to move on to the full paid study.
                        </li><br/>
                        <li>
                            The full study will last around 15 minutes. You will be able to take breaks at three designated points during the study.
                        </li><br/>
                        <li>
                            After you have finished the full study, you will be shown a <em>completion ID</em> to copy and paste back into MTurk/Prolific for us to link your responses.
                        </li>
                    </ul><br/>
                    <Link to="/practice_ne"><button style={{fontSize: "1.5em"}}>Start Practice Session ➡️</button></Link>
                </div>
            </div>
        )
    }
}

export default Practice;