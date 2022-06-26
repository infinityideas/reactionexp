import React from "react";
import { settings } from "./scripts/config";

const axios = require('axios');

interface ExpState {
    ready: boolean,
    images: Array<string>,
    order: Array<number>,
    currentImage: number,
    showingImage: boolean,
    waited: boolean,
    waiting: boolean,
    started: boolean,
    toSubmit: Object,
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
            started: false,
            toSubmit: {}
        }

        this.timeout = -99;
        this.currentTime = -99;
        this.keyDown = this.keyDown.bind(this);
    }

    keyDown(e: any) {
        const timeTaken = Date.now()-this.currentTime;
        if (e.keyCode == 90 && !this.state.waiting) { // Check for non symmetric
            console.log("NON SYMMETRIC IMAGE "+this.state.currentImage+" | "+(Date.now()-this.currentTime)+"ms taken | "+this.state.images[this.state.order[this.state.currentImage]]);
        } else if (e.keyCode == 77 && !this.state.waiting) { // Check for symmetric
            console.log("SYMMETRIC IMAGE "+this.state.currentImage+" | "+(Date.now()-this.currentTime)+"ms taken | "+this.state.images[this.state.order[this.state.currentImage]]);
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
            let currentSubmit: any = this.state.toSubmit;
            currentSubmit[this.state.currentImage.toString()] = {
                time: timeTaken,
                imageNumber: this.state.order[this.state.currentImage],
                imageURL: this.state.images[this.state.order[this.state.currentImage]],
                answer: e.keyCode == 90 ? "NS" : "S"
            }

            if (this.state.currentImage+1 == this.state.images.length) {
                console.log(currentSubmit);
                axios.post(settings.flaskServer+"data", JSON.stringify(currentSubmit), {
                    headers: {
                        'content-type': 'application/json',
                        'x-api-key': settings.KORAPIKey
                    }
                }).then((resp: any) => {
                    console.log(resp);
                })
                return;
            }
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
                    currentImage: this.state.currentImage+1,
                    toSubmit: currentSubmit
                })
            }, 1000)
            
        }
    }

    componentDidMount() {
        axios.get(settings.flaskServer+"getimages_order", {
            headers: {
                'x-api-key': settings.KORAPIKey
            }
        }).then((response: any) => {
            response["data"]["links"].forEach((picture: string) => {
                new Image().src = picture
            });

            document.addEventListener("keydown", this.keyDown);

            this.setState({
                order: response["data"]["order"],
                images: response["data"]["links"],
                ready: true,
                showingImage: true
            })
        });
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