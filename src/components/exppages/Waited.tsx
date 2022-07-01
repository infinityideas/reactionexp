import { settings } from "../../scripts/config"

function Waited() {
    return (
        <div style={{textAlign: "center", fontFamily: "sans-serif"}}><h1>Press <span style={{color: "red"}}>{settings.nsKey_string}</span> or <span style={{color: "red"}}>{settings.sKey_string}</span> to start</h1></div>
    )
}

export default Waited;