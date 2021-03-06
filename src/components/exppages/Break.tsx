import { settings } from "../../scripts/config";

interface BreakProps {
    type: string
}

function Break(props: BreakProps) {
    let continueButton = <div></div>;
    if (props.type == "baseline1") {
        continueButton = <span style={{color: "red"}}>{settings.baseline1key_string}</span>
    } else if (props.type == "baseline3") {
        continueButton = <span><span style={{color: "red"}}>s</span> or <span style={{color: "red"}}>d</span></span>
    } else {
        continueButton = <span><span style={{color: "red"}}>{settings.nsKey_string}</span> or <span style={{color: "red"}}>{settings.sKey_string}</span></span>
    }
    return (
        <div style={{textAlign: "center", fontFamily: "sans-serif"}}>
            <h1>Take a break!</h1>
            <h3>Get up, walk around, have some water and come back when you're ready.</h3><br/>
            <h3>Remember: you have one hour from when you started the task to finish it.</h3><br/>
            <h3><strong>DO NOT</strong> close this tab! You will lose your progress.</h3>
            <br/>
            <h3>Press {continueButton} to keep going</h3>
        </div>
    )
}

export default Break;