interface FinishedProps {
    HITID: string,
    type: string
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
                <p><span style={{color: "red"}}>This was a practice round.</span> You passed! Ready to start the real thing?</p>
                <a href="/exp"><button>Continue!</button></a>
            </div>
        )
    } else {
        return (
            <div style={{textAlign: "center", fontFamily: "sans-serif"}}>
                {basicTemplate}
                <p><span style={{color: "red"}}>This was a practice round.</span> Unfortunately you didn't get the required accuracy. Try again!</p>
                <button onClick={() => {window.location.reload()}}>Try again</button>
            </div>
        )
    }
}

export default Finished;