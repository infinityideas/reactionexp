import './styles/app.css';
import { settings } from './scripts/config';
import { Link, useSearchParams } from "react-router-dom";
import example from './content/images/PictureEx.png';
import { useState } from 'react';

import symm1 from './content/images/Symm1.png';
import symm2 from './content/images/Symm2.png';
import nsymm1 from './content/images/NSymm1.png';
import nsymm2 from './content/images/NSymm2.png';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);

  window.localStorage.removeItem("SYMM_PROLIFIC_PID");

  if (searchParams.get("PROLIFIC_PID") != null) {
    window.localStorage.setItem('SYMM_PROLIFIC_PID', searchParams.get("PROLIFIC_PID") as string)
  }

  if (currentStep == 0) {
    return (
      <div className="container" style={{fontFamily: "arial"}}>
        <h1><span style={{fontSize: "0.75em"}}>Welcome to the</span><br/><span style={{color: "darkblue"}}>Symmetry Perception Study</span></h1>
        <br/><br/><h3 style={{fontWeight: "normal"}}>We appreciate your participation.</h3><br/><h3 style={{fontWeight: "normal"}}>This study will take roughly 20 minutes.</h3><h3 style={{fontWeight: "normal"}}>Please sit approximately 50cm from the screen.<br/>Please make sure that your screen's brightness is turned up.</h3><br/>
        <button style={{fontSize: "1.5em"}} onClick={() => {setCurrentStep(currentStep+1)}}>Next ➡️</button>
      </div>
    );
  } else if (currentStep == 1) {
    return (
      <div className="container" style={{fontFamily: "arial"}}>
        <h3 style={{fontWeight: "normal"}}>You will be presented with a series of images.<br/>Each image will be displayed for {settings.time/1000} {settings.time/1000 == 1 ? "second" : "seconds"}. <br/><br/><span>Keep your gaze on the red cross in the middle of the screen.</span></h3><br/>
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
      <div className="container" style={{fontFamily: "arial"}}>
        <h1><span style={{fontSize: "0.75em", color: "maroon"}}>Sample images</span></h1>
        <div style={{width: "90%", margin: "auto", textAlign: "center", borderRadius: "10px", backgroundColor: "rgb(229, 239, 219)"}}>
          <p style={{fontSize: "1.2em", paddingTop: 10}}>Here are two examples of <em style={{color: "rgb(44, 113, 186)"}}><strong>S</strong>ymmetric</em> images.
          <br/>Notice that the left and right sides of these images are identical but flipped.</p>
          <table>
            <tr style={{border: "none"}}>
              <td style={{width: "50%", textAlign: "center"}}><img src={symm1} width="95%" /></td>
              <td style={{width: "50%", textAlign: "center"}}><img src={symm2} width="95%" /></td>
            </tr>
          </table>
        </div>
        <div style={{width: "90%", margin: "auto", textAlign: "center", borderRadius: "10px", backgroundColor: "rgb(229, 239, 219)"}}>
          <p style={{fontSize: "1.2em", paddingTop: 10}}>Here are two examples of <em style={{color: "rgb(44, 113, 186)"}}><strong>A</strong>symmetric</em> images.
          <br/>The left and right sides of these images are different from each other.</p>
          <table>
            <tr style={{border: "none"}}>
              <td style={{width: "50%", textAlign: "center"}}><img src={nsymm1} width="95%" /></td>
              <td style={{width: "50%", textAlign: "center"}}><img src={nsymm2} width="95%" /></td>
            </tr>
          </table>
        </div><br/>
        <Link to="practice"><button style={{fontSize: "1.5em"}}>Next ➡️</button></Link>
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

export default App;
