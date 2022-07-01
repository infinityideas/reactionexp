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
            <h3>Please enter the following code into MTURK as your completion id: <span style={{color: "red"}}>{props.HITID}</span></h3>
            <br/><br/>
            <h4>Any questions? Please email psinha@mit.edu. You will need to send your completion id for us to assist with any issues.</h4>
        </div>
    )

    if (props.type == "exp") {
        return (
            <div>
                {basicTemplate}
            </div>
        )
    } else if (props.type == "practice-pass") {
        return (
            <div style={{textAlign: "center", fontFamily: "sans-serif"}}>
                {basicTemplate}
                <p><span style={{color: "red"}}>This was a practice round.</span> You passed with {props.accuracy * 100}% accuracy! Ready to start the real thing?</p>
                <a href="/exp"><button>Continue!</button></a>
            </div>
        )
    } else if (props.type == "practice-fail") {
        return (
            <div style={{textAlign: "center", fontFamily: "sans-serif"}}>
                {basicTemplate}
                <p><span style={{color: "red"}}>This was a practice round.</span> Unfortunately you didn't get the required accuracy. You had a {props.accuracy * 100}% accuracy. Try again!</p>
                <button onClick={() => {window.location.reload()}}>Try again</button>
            </div>
        )
    } else if (props.type == "ne") {
        return (
            <div style={{textAlign: "center", fontFamily: "sans-serif"}}>
                {basicTemplate}
                <p><span style={{color: "red"}}>This was a practice round.</span> You had a {props.accuracy * 100}% accuracy.<br/>You can now take the test to see if you can move on to the real experiment, but remember: you will need greater than or equal to {settings.practice_required_acc * 100}% accuracy to pass.<br/>You can also repeat this practice round to get more comfortable.</p>
                <button onClick={() => {window.location.reload()}}>Repeat practice round</button>
                <a href="/practice_exp"><button>Take the test</button></a>
            </div>
        )
    } else {
        return (<div></div>)
    }
}

export default Finished;