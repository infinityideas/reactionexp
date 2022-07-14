interface ImageShowProps {
    src: any
}

function ImageShow(props: ImageShowProps) {
    return (
        <div style={{textAlign: "center", width: "100%", paddingTop: window.innerHeight/2-window.innerWidth/10}}>
            <img src={props.src} width="100%" alt=""/>
        </div>
    )
}

export default ImageShow;