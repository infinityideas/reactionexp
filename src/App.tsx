import './styles/app.css';
import { settings } from './scripts/config';
import { Link } from "react-router-dom";
import example from './content/images/PictureEx.png';

function App() {
  return (
    <div className="container">
      <h1>Welcome to the Symmetry Reaction Time Experiment</h1>
      <h3>We appreciate you taking the time to complete this study.</h3><h3>We expect this task will take around 10 minutes.</h3><h4>Please sit around 50cm from the screen.</h4><br/>
      <h3>Each image will be displayed for {settings.time/1000} {settings.time/1000 > 1 ? "seconds" : "second"}. Keep your gaze on the center of the screen.</h3><br/>
      <h3>When an image appears on the screen, 
        <br/><br/>if it is <em style={{color: "blue"}}>symmetric</em>, 
        press the <span style={{color: "red"}}>{settings.sKey_string}</span> key<br/>
        if it is <em style={{color: "blue"}}>not symmetric</em>, press the 
        <span style={{color: "red"}}> {settings.nsKey_string}</span> key<br/><br/>
        <span style={{fontSize: "2em"}}>Remember!</span><br/> <span style={{color: "red"}}>{settings.sKey_string}</span> for <span style={{color: "blue"}}>symmetric</span> and<br/>
        <span style={{color: "red"}}>{settings.nsKey_string}</span> for <span style={{color: "blue"}}>asymmetric</span><br/><br/>
        Try to respond as quickly as possible <strong style={{color: 'red'}}>without compromising accuracy</strong>, 
        although the computer will wait for you to answer before moving on to the next image.
        <br/>Place one finger from your left hand on the c key and one from your right hand on the m key.</h3><br/>
        <h3>Click the "<span style={{color: "green"}}>Let's go</span>" button at the bottom of this page to start the study.</h3>
      <br/>
      <img src={example} width="35%" /><br/><br/>
      <Link to="practice"><button style={{width: "100px", height: 50, color: "green"}}>Let's go!</button></Link>
    </div>
  );
}

export default App;
