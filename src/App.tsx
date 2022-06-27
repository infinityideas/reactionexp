import './styles/app.css';
import { settings } from './scripts/config';
import keyboardimg from './content/images/hands-keyboard.jpg';
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <h1>Welcome to the Symmetry Reaction Time Experiment</h1>
      <h3>We appreciate you taking the time to complete this study.</h3><h3>We expect this task will take around 10 minutes.</h3><br/><br/>
      <h3>Each image will be displayed for {settings.time/1000} {settings.time/1000 > 1 ? "seconds" : "second"}. Keep your gaze on the center of the screen.</h3><br/>
      <h3>When an image appears on the screen, <br/><br/>if it is <em style={{color: "blue"}}>symmetric</em>, press the <span style={{color: "red"}}>m</span> key<br/>if it is <em style={{color: "blue"}}>not symmetric</em>, press the <span style={{color: "red"}}>c</span> key<br/><br/>Try to respond as quickly as possible, although the computer will wait for you to answer before moving on to the next image.<br/>Place one finger from your left hand on the c key and one from your right hand on the m key.</h3>
      <img src={keyboardimg} height="250vh" alt="keyboard"/><br/><br/>
      <Link to="exp"><button style={{width: "100px", height: 50, color: "green"}}>Let's go!</button></Link>
    </div>
  );
}

export default App;
