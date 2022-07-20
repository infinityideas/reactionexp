import { Link } from "react-router-dom";

interface ImageDemoProps {
    symm1: any,
    symm2: any,
    nsymm1: any,
    nsymm2: any,
    to: string
}

function ImageDemo(props: ImageDemoProps) {
    return (
        <div className="container" style={{fontFamily: "arial"}}>
        <h1><span style={{fontSize: "0.75em", color: "maroon"}}>Sample images</span></h1>
        <div style={{width: "90%", margin: "auto", textAlign: "center", borderRadius: "10px", backgroundColor: "rgb(229, 239, 219)"}}>
          <p style={{fontSize: "1.2em", paddingTop: 10}}>Here are two examples of <em style={{color: "rgb(44, 113, 186)"}}><strong>S</strong>ymmetric</em> images.
          <br/>Notice that the left and right sides of these images are identical but flipped.</p>
          <table>
            <tr style={{border: "none"}}>
              <td style={{width: "50%", textAlign: "center"}}><img src={props.symm1} width="95%" /></td>
              <td style={{width: "50%", textAlign: "center"}}><img src={props.symm2} width="95%" /></td>
            </tr>
          </table>
        </div>
        <div style={{width: "90%", margin: "auto", textAlign: "center", borderRadius: "10px", backgroundColor: "rgb(229, 239, 219)"}}>
          <p style={{fontSize: "1.2em", paddingTop: 10}}>Here are two examples of <em style={{color: "rgb(44, 113, 186)"}}><strong>A</strong>symmetric</em> images.
          <br/>The left and right sides of these images are different from each other.</p>
          <table>
            <tr style={{border: "none"}}>
              <td style={{width: "50%", textAlign: "center"}}><img src={props.nsymm1} width="95%" /></td>
              <td style={{width: "50%", textAlign: "center"}}><img src={props.nsymm2} width="95%" /></td>
            </tr>
          </table>
        </div><br/>
        <Link to={props.to}><button style={{fontSize: "1.5em"}}>Next ➡️</button></Link>
      </div>
    )
}

export default ImageDemo;