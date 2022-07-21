import { settings } from "../../scripts/config"

interface WaitedProps {
    type: string
}

function Waited(props: WaitedProps) {
    let requiredKey: any = "";

    if (props.type == "baseline1") {
        requiredKey = <span style={{color: "red"}}>{settings.baseline1key_string}</span>
    } else if (props.type == "baseline3") {
        requiredKey = <span><span style={{color: "red"}}>s</span> or <span style={{color: "red"}}>d</span></span>
    } else {
        requiredKey = <span><span style={{color: "red"}}>{settings.nsKey_string}</span> or <span style={{color: "red"}}>{settings.sKey_string}</span></span>
    }
    return (
        <div style={{textAlign: "center", fontFamily: "sans-serif"}}><h1>Move your mouse cursor somewhere to the bottom of the screen,<br/>then press {requiredKey} to start</h1></div>
    )
}

export default Waited;