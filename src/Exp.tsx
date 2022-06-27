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
    finished: boolean,
    HITID: string,
    break: boolean,
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
            toSubmit: {},
            finished: false,
            HITID: "",
            break: false
        }

        this.timeout = -99;
        this.currentTime = -99;
        this.keyDown = this.keyDown.bind(this);
        this.afterBreak = this.afterBreak.bind(this);
    }

    keyDown(e: any) {
        const timeTaken = Date.now()-this.currentTime;
        if (e.keyCode === 67 && !this.state.waiting && this.state.waited) { // Check for non symmetric
            console.log("NON SYMMETRIC IMAGE "+this.state.currentImage+" | "+(Date.now()-this.currentTime)+"ms taken | "+this.state.images[this.state.order[this.state.currentImage]]);
        } else if (e.keyCode === 77 && !this.state.waiting && this.state.waited) { // Check for symmetric
            console.log("SYMMETRIC IMAGE "+this.state.currentImage+" | "+(Date.now()-this.currentTime)+"ms taken | "+this.state.images[this.state.order[this.state.currentImage]]);
        } else if ((e.keyCode === 67 || e.keyCode === 77) && !this.state.waited) {
            this.setState({
                waiting: true
            })
            setTimeout(()=> {
                this.setState({
                    waited: true,
                    waiting: false,
                    started: true
                })
            }, 3000);
            return
        }

        if (((e.keyCode === 67) || (e.keyCode === 77)) && this.state.break) {
            this.afterBreak();
        }

        if (((e.keyCode === 67) || (e.keyCode === 77)) && !this.state.waiting && this.state.waited && !this.state.break) {
            let currentSubmit: any = this.state.toSubmit;
            currentSubmit[this.state.currentImage.toString()] = {
                time: timeTaken,
                imageNumber: this.state.order[this.state.currentImage],
                imageURL: this.state.images[this.state.order[this.state.currentImage]],
                answer: e.keyCode === 67 ? "NS" : "S"
            }

            if (this.state.currentImage+1 === this.state.images.length) {
                console.log(currentSubmit);
                axios.post(settings.flaskServer+"data", JSON.stringify(currentSubmit), {
                    headers: {
                        'content-type': 'application/json',
                        'x-api-key': settings.KORAPIKey
                    }
                }).then((resp: any) => {
                    this.setState({
                        finished: true,
                        HITID: resp["data"]["id"]
                    })
                })
                return;
            } else if ((this.state.currentImage % 50 == 0) && this.state.currentImage != 0) {
                this.setState({
                    break: true,
                    toSubmit: currentSubmit
                });
                return;
            }
            if (this.timeout !== -99) {
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

    afterBreak() {
        if (this.timeout !== -99) {
            clearTimeout(this.timeout);
        }
        this.setState({
            waiting: true,
            break: false
        });
        setTimeout(() => {
            this.setState({
                waiting: false,
                showingImage: true,
                currentImage: this.state.currentImage+1,
            })
        }, 1000)
    }

    render() {
        if (this.state.break) {
            return (
                <div style={{textAlign: "center", fontFamily: "sans-serif"}}>
                    <h1>Take a break!</h1>
                    <h3>Get up, walk around, have some water and come back when you're ready.</h3><br/>
                    <h3>Remember: you have one hour from when you started the task to finish it.</h3><br/>
                    <h3><strong>DO NOT</strong> close this tab! You will lose your progress.</h3>
                    <br/>
                    <h3>Press <span style={{color: "red"}}>m</span> or <span style={{color: "red"}}>c</span> to keep going</h3>
                </div>
            )
        }
        if (this.state.finished) {
            return (
                <div style={{textAlign: "center", fontFamily: "sans-serif"}}>
                    <h1>Thank you for completing the study!</h1>
                    <h3>Please enter the following code into MTURK as your completion id: <span style={{color: "red"}}>{this.state.HITID}</span></h3>
                    <br/><br/>
                    <h4>Any questions? Please email psinha@mit.edu. You will need to send your completion id for us to assist with any issues.</h4>
                </div>
            )
        }
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
                <div style={{textAlign: "center", fontFamily: "sans-serif"}}><h1>Press <span style={{color: "red"}}>m</span> or <span style={{color: "red"}}>c</span> to start</h1></div>
            )
        }
        if (this.state.showingImage) {
            this.currentTime = Date.now()
            return (
                <div style={{textAlign: "center", width: "100%", paddingTop: window.innerHeight/2-window.innerWidth/10}}>
                    <img src={this.state.images[this.state.order[this.state.currentImage]]} width="100%" alt=""/>
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