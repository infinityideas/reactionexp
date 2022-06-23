import './styles/app.css';
import { settings } from './scripts/config';
import keyboardimg from './content/images/hands-keyboard.jpeg';

function App() {
  return (
    <div className="container">
      <h1>Welcome to the Symmetry Reaction Time Experiment</h1>
      <h3>We appreciate you taking the time to complete this study.</h3><br/><br/>
      <h3>You will have {settings.time/1000} {settings.time/1000 > 1 ? "seconds" : "second"} to respond whether or not an image is <em>symmetric.</em></h3>
      <h3>When the image appears on the screen, and if it is symmetric, push down on the spacebar.</h3>
      <img src={keyboardimg} height="250vh"/><br/>
      <button>Let's go!</button>
    </div>
  );
}

export default App;
