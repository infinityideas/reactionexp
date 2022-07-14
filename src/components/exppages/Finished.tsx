import { settings } from "../../scripts/config";

interface FinishedProps {
    HITID: string,
    type: string,
    accuracy: number
}

function Finished(props: FinishedProps) {
    const basicTemplate = (
        <div style={{textAlign: "center", fontFamily: "sans-serif"}}>
            <h1>Thank you for completing the study!</h1>
            <h3>Please enter the following code into MTURK/Prolific as your completion ID: <span style={{color: "red"}}>{props.HITID}</span></h3>
            <br/><br/>
            <h4>Any questions? Please email psinha@mit.edu. You will need to send your completion ID for us to assist with any issues.</h4>
        </div>
    )

    if (props.type == "exp") {
        return (
            <div>
                {basicTemplate}
            </div>
        )
    }
    
    var accuracy = props.accuracy * 100;
    accuracy = +accuracy.toFixed(2);

    if (props.type == "practice-pass") {
        return (
            <div style={{textAlign: "center", fontFamily: "sans-serif"}}>
                <p><span style={{color: "red"}}>This was the qualification round.</span> You passed with {accuracy}% accuracy! Ready to start the real thing?</p>
                <a href="/exp"><button>Continue!</button></a>
            </div>
        )
    } else if (props.type == "practice-fail") {
        return (
            <div style={{textAlign: "center", fontFamily: "sans-serif"}}>
                <p><span style={{color: "red"}}>This was the qualification round.</span> Unfortunately you didn't get the required accuracy. You had a {accuracy}% accuracy.<br/>Please feel free to try again or you can also exit the study now by closing this tab.</p>
                <button onClick={() => {window.location.reload()}}>Try again</button>
            </div>
        )
    } else if (props.type == "ne") {
        return (
            <div style={{textAlign: "center", fontFamily: "sans-serif"}}>
                <p><span style={{color: "red"}}>This was a practice round.</span> You had a {accuracy}% accuracy.<br/>You can now take the qualification test to see if you can move on to the real experiment, <br/>but remember: you will need at least {settings.practice_required_acc * 100}% accuracy to pass.<br/>You can also repeat the practice round to get more comfortable.</p>
                <button onClick={() => {window.location.reload()}} style={{marginRight: 10}}>Repeat practice round</button>
                <a href="/practice_exp"><button>Take the qualification test</button></a>
            </div>
        )
    } else {
        return (<div></div>)
    }
}

export default Finished;