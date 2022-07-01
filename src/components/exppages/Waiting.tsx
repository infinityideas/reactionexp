interface WaitingProps {
    started: boolean
}

function Waiting(props: WaitingProps) {
    if (props.started) {
        return (
            <div></div>
        )
    } else {
        return (
            <div style={{textAlign: "center", fontFamily: "sans-serif"}}><h1>Get ready</h1></div>
        )
    }
}

export default Waiting;