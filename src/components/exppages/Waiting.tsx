import crossImage from '../../content/images/blank.png';
import ImageShow from './ImageShow';

interface WaitingProps {
    started: boolean
}

function Waiting(props: WaitingProps) {
    if (props.started) {
        return (
            <ImageShow src={crossImage} />
        )
    } else {
        return (
            <div style={{textAlign: "center", fontFamily: "sans-serif"}}><h1>Get ready</h1></div>
        )
    }
}

export default Waiting;