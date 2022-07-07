import React from "react";
import Break from "./components/exppages/Break";
import Finished from "./components/exppages/Finished";
import ImageShow from "./components/exppages/ImageShow";
import Loading from "./components/exppages/Loading";
import Waited from "./components/exppages/Waited";
import Waiting from "./components/exppages/Waiting";
import { settings } from "./scripts/config";
import get_accuracy from "./scripts/get_accuracy";

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

interface ExpProps {
    type: string
}

const nsKey: number = settings.nsKey;
const sKey: number = settings.sKey;

class Exp extends React.Component<ExpProps, ExpState> {
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
        if ((e.keyCode === nsKey || e.keyCode === sKey) && !this.state.waited) {
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

        if (((e.keyCode === nsKey) || (e.keyCode === sKey)) && this.state.break) {
            this.afterBreak();
        }

        if (((e.keyCode === nsKey) || (e.keyCode === sKey)) && !this.state.waiting && this.state.waited && !this.state.break) {
            let currentSubmit: any = this.state.toSubmit;
            currentSubmit[this.state.currentImage.toString()] = {
                time: timeTaken,
                imageNumber: this.state.order[this.state.currentImage],
                imageURL: this.state.images[this.state.order[this.state.currentImage]],
                answer: e.keyCode === nsKey ? "NS" : "S"
            }

            if ((this.state.currentImage+1 === this.state.images.length)) {
                if (this.props.type == "practice" || this.props.type == "ne") {
                    this.setState({
                        finished: true,
                        HITID: "Your HIT ID would appear here!",
                        toSubmit: currentSubmit
                    })
                    return;
                }
                axios.post(settings.flaskServer+"data", JSON.stringify(currentSubmit), {
                    headers: {
                        'content-type': 'application/json',
                        'x-api-key': settings.KORAPIKey
                    }
                }).then((resp: any) => {
                    document.removeEventListener("keydown", this.keyDown);
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
            }, settings.waittime)
            
        }
    }

    componentDidMount() {
        axios.get(settings.flaskServer+"getimages_order", {
            params: {
                type: this.props.type
            },
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
            }, settings.time)
            
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
        }, settings.waittime)
    }

    render() {
        if (this.state.break) {
            return (
                <Break/>
            )
        }
        if (this.state.finished) {
            if (this.props.type=="practice") {
                if (get_accuracy(this.state.toSubmit, this.state.images.length) >= settings.practice_required_acc) {
                    return (
                        <Finished HITID={this.state.HITID} type="practice-pass" accuracy={get_accuracy(this.state.toSubmit, this.state.images.length)}/>
                    )
                } else {
                    return (
                        <Finished HITID={this.state.HITID} type="practice-fail" accuracy={get_accuracy(this.state.toSubmit, this.state.images.length)}/>
                    )
                }
            } else if (this.props.type=="exp") {
                return (
                    <Finished HITID={this.state.HITID} type="exp" accuracy={0}/>
                )
            } else if (this.props.type == "ne") {
                return (
                    <Finished HITID={this.state.HITID} type="ne" accuracy={get_accuracy(this.state.toSubmit, this.state.images.length)}/>
                )
            }
        }
        if (!this.state.ready) {
            return (
                <Loading/>
            )
        }
        if (this.state.waiting) {
            return (
                <Waiting started={this.state.started}/>
            )
        }
        if (!this.state.waited) {
            return (
                <Waited/>
            )
        }
        if (this.state.showingImage) {
            this.currentTime = Date.now()
            return (
                <ImageShow src={this.state.images[this.state.order[this.state.currentImage]]}/>
            )
        } else {
            return (
                <Waiting started={this.state.started}/>
            )
        }
    }
}

export default Exp;