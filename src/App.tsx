import './styles/app.css';
import { settings } from './scripts/config';
import keyboardimg from './content/images/hands-keyboard.jpeg';
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <h1>Welcome to the Symmetry Reaction Time Experiment</h1>
      <h3>We appreciate you taking the time to complete this study.</h3><br/><br/>
      <h3>You will have {settings.time/1000} {settings.time/1000 > 1 ? "seconds" : "second"} to respond whether or not an image is <em>symmetric.</em></h3>
      <h3>When the image appears on the screen, <br/><br/>if it is <em>symmetric</em>, push down on the <span style={{color: "red"}}>m key</span><br/>if it is <em>not symmetric</em>, push down on the <span style={{color: "red"}}>z key</span></h3>
      <img src={keyboardimg} height="250vh"/><br/>
      <Link to="exp"><button>Let's go!</button></Link>
    </div>
  );
}

export default App;
