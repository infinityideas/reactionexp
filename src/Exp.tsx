import React from "react";

interface ExpState {
    ready: boolean,
    images: Array<string>,
    order: Array<number>,
    currentImage: number,
    showingImage: boolean,
    waited: boolean,
    waiting: boolean,
    started: boolean
}

class Exp extends React.Component<{}, ExpState> {
    private timeout: any
    private currentTime: number

    constructor(props: any) {
        super(props);
        this.state ={
            ready: false,
            images: [],
            order: [],
            currentImage: 0,
            showingImage: false,
            waited: false,
            waiting: false,
            started: false
        }

        this.timeout = -99;
        this.currentTime = -99;
        this.keyDown = this.keyDown.bind(this);
    }

    keyDown(e: any) {
        if (e.keyCode == 90 && !this.state.waiting) { // Check for non symmetric
            console.log("NON SYMMETRIC IMAGE "+this.state.currentImage+" | "+(Date.now()-this.currentTime)+"ms taken | "+this.state.images[this.state.currentImage]);
        } else if (e.keyCode == 77 && !this.state.waiting) { // Check for symmetric
            console.log("NON SYMMETRIC IMAGE "+this.state.currentImage+" | "+(Date.now()-this.currentTime)+"ms taken | "+this.state.images[this.state.currentImage]);
        } else if (e.keyCode == 13 && !this.state.waited) {
            this.setState({
                waiting: true
            })
            setTimeout(()=> {
                this.setState({
                    waited: true,
                    waiting: false,
                    started: true
                })
            }, 3000)
        }

        if ((e.keyCode == 90) || (e.keyCode == 77) && !this.state.waiting) {
            if (this.timeout != -99) {
                clearTimeout(this.timeout);
            }
            this.setState({
                waiting: true
            });
            setTimeout(() => {
                this.setState({
                    waiting: false,
                    showingImage: true,
                    currentImage: this.state.currentImage+1
                })
            }, 1000)
            
        }
    }

    componentDidMount() {
        const urls = [
            "https://res.cloudinary.com/ddup446vc/image/upload/v1656009160/symmetry/NS4_2_zszmai.png",
            "https://res.cloudinary.com/ddup446vc/image/upload/v1656009160/symmetry/NS4_4_u0bskb.png",
            "https://res.cloudinary.com/ddup446vc/image/upload/v1656009160/symmetry/NS4_3_r1x4bv.png",
            "https://res.cloudinary.com/ddup446vc/image/upload/v1656009160/symmetry/NS4_1_ftebte.png",
            "https://res.cloudinary.com/ddup446vc/image/upload/v1656009160/symmetry/NS4_5_htulid.png",
            "https://res.cloudinary.com/ddup446vc/image/upload/v1656009156/symmetry/S4_1_qdtc91.png",
            "https://res.cloudinary.com/ddup446vc/image/upload/v1656009156/symmetry/S4_4_oizpmx.png",
            "https://res.cloudinary.com/ddup446vc/image/upload/v1656009155/symmetry/S4_5_kaeqx0.png",
            "https://res.cloudinary.com/ddup446vc/image/upload/v1656009155/symmetry/S4_2_ewosk0.png",
            "https://res.cloudinary.com/ddup446vc/image/upload/v1656009155/symmetry/S4_3_qhogll.png",
        ]

        let order = [3, 7, 6, 1, 9, 0, 4, 2, 5, 8];

        urls.forEach((picture: string) => {
            new Image().src = picture
        })

        document.addEventListener("keydown", this.keyDown);

        this.setState({
            order: order,
            images: urls,
            ready: true,
            showingImage: true,
        })
    }

    componentDidUpdate() {
        if (this.state.showingImage && this.state.ready && this.state.waited && !this.state.waiting) {
            this.timeout = setTimeout(() => {
                this.setState({
                    showingImage: false
                })
            }, 1000)
            
        }
    }

    render() {
        if (!this.state.ready) {
            return (
                <div style={{textAlign: "center", fontFamily: "sans-serif"}}>
                    <h1>Loading the experiment...</h1>
                </div>
            )
        }
        if (this.state.waiting) {
            if (this.state.started) {
                return (
                    <div></div>
                )
            } else {
                return (
                    <div style={{textAlign: "center", fontFamily: "sans-serif"}}><h1>Get ready</h1></div>
                )
            }
            
        }
        if (!this.state.waited) {
            return (
                <div style={{textAlign: "center", fontFamily: "sans-serif"}}><h1>Press return to start</h1></div>
            )
        }
        if (this.state.showingImage) {
            this.currentTime = Date.now()
            return (
                <div style={{textAlign: "center"}}>
                    <img src={this.state.images[this.state.order[this.state.currentImage]]} />
                </div>
            )
        }
        return (
            <div>

            </div>
        )
    }
}

export default Exp;