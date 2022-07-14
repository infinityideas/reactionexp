import { settings } from "../../scripts/config"

function Waited() {
    return (
        <div style={{textAlign: "center", fontFamily: "sans-serif"}}><h1>Move your mouse cursor somewhere to the bottom of the screen,<br/>then press <span style={{color: "red"}}>{settings.nsKey_string}</span> or <span style={{color: "red"}}>{settings.sKey_string}</span> to start</h1></div>
    )
}

export default Waited;