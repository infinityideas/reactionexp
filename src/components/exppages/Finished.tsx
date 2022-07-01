interface FinishedProps {
    HITID: string
}

function Finished(props: FinishedProps) {
    return (
        <div style={{textAlign: "center", fontFamily: "sans-serif"}}>
            <h1>Thank you for completing the study!</h1>
            <h3>Please enter the following code into MTURK as your completion id: <span style={{color: "red"}}>{props.HITID}</span></h3>
            <br/><br/>
            <h4>Any questions? Please email psinha@mit.edu. You will need to send your completion id for us to assist with any issues.</h4>
        </div>
    )
}

export default Finished;