import React from "react";
import Break from "./components/exppages/Break";
import Finished from "./components/exppages/Finished";
import ImageShow from "./components/exppages/ImageShow";
import Loading from "./components/exppages/Loading";
import Waited from "./components/exppages/Waited";
import Waiting from "./components/exppages/Waiting";
import { settings } from "./scripts/config";
import get_accuracy from "./scripts/get_accuracy";
import { getRndInteger } from "./scripts/randomInt";

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
    private expref: any
    private breaktime: any

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
        this.breaktime = -99;

        this.keyDown = this.keyDown.bind(this);
        this.afterBreak = this.afterBreak.bind(this);
        this.getCurrent = this.getCurrent.bind(this);
        this.expref = React.createRef();
    }

    keyDown(e: any) {
        const timeTaken = Date.now()-this.currentTime;
        if (((((e.keyCode === nsKey) || (e.keyCode === sKey)) && this.props.type != "baseline1") || ((e.keyCode === settings.baseline1key) && this.props.type == "baseline1"))&& !this.state.waited) {
            this.expref.current.webkitRequestFullscreen();
            this.setState({
                waiting: true
            })
            setTimeout(()=> {
                this.setState({
                    waited: true,
                    waiting: true,
                    started: true
                });
                setTimeout(() => {
                    this.setState({
                        waiting: false
                    })
                }, 1500)
            }, 5000);
            return
        }

        if (((((e.keyCode === nsKey) || (e.keyCode === sKey)) && this.props.type != "baseline1") || ((e.keyCode === settings.baseline1key) && this.props.type == "baseline1")) && this.state.break) {
            if (Date.now()-this.breaktime >= settings.breakdelay) {
                this.afterBreak();
            }
        }

        if (((((e.keyCode === nsKey) || (e.keyCode === sKey)) && this.props.type != "baseline1") || ((e.keyCode === settings.baseline1key) && this.props.type == "baseline1")) && !this.state.waiting && this.state.waited && !this.state.break) {
            let currentSubmit: any = this.state.toSubmit;
            let currentAnswer = "";

            if (e.keyCode === nsKey) {
                currentAnswer = "NS";
            } else if (e.keyCode === sKey) {
                currentAnswer = "S";
            } else if (e.keyCode === settings.baseline1key) {
                currentAnswer = "NA";
            }
            currentSubmit[this.state.currentImage.toString()] = {
                time: timeTaken,
                type: this.props.type,
                imageNumber: this.state.order[this.state.currentImage],
                imageURL: this.state.images[this.state.order[this.state.currentImage]],
                answer: currentAnswer,
                hit: this.state.HITID,
                screenSize: ((window.innerWidth).toString())+"x"+((window.innerHeight).toString())
            }

            if ((this.state.currentImage+1 === this.state.images.length)) {
                if (this.props.type == "practice" || this.props.type == "ne") {
                    document.removeEventListener("keydown", this.keyDown);
                    document.exitFullscreen();
                    setTimeout(() => {
                        this.setState({
                            finished: true,
                            HITID: "Your completion code would appear here!",
                            toSubmit: currentSubmit
                        })
                    }, getRndInteger(settings.waitmin, settings.waitmax))
                    return;
                }
                axios.post(settings.flaskServer+"data", JSON.stringify(currentSubmit), {
                    headers: {
                        'content-type': 'application/json',
                        'x-infiniteapi-key': settings.KORAPIKey
                    }
                }).then((resp: any) => {
                    document.removeEventListener("keydown", this.keyDown);
                    document.exitFullscreen();
                    if ((this.props.type != "baseline1") && (this.props.type != "baseline2")) {
                        window.localStorage.removeItem("SYMM_PROLIFIC_PID");
                    }
                    if (this.props.type == "baseline1") {
                        if (window.localStorage.getItem("SYMM_PROLIFIC_PID") == null) {
                            window.localStorage.setItem("SYMM_BASELINE_HITID", resp["data"]["id"]);
                        }
                        window.location.replace("/baseline/screen2");
                        return;
                    } else if (this.props.type == "baseline2") {
                        window.location.replace("/baseline/screen3");
                        return;
                    }
                    setTimeout(() => {
                        this.setState({
                            finished: true,
                            HITID: resp["data"]["id"]
                        });
                    }, getRndInteger(1000, 1500));
                })
                return;
            } else if ((this.state.currentImage % 50 == 0) && this.state.currentImage != 0) {
                this.setState({
                    waiting: true
                });
                setTimeout(() => {
                    this.setState({
                        break: true,
                        waiting: false,
                        toSubmit: currentSubmit
                    });
                }, settings.waittime);
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
                    toSubmit: currentSubmit,
                })
            }, getRndInteger(settings.waitmin, settings.waitmax))
            
        }
    }

    componentDidMount() {
        axios.get(settings.flaskServer+"getimages_order", {
            params: {
                type: this.props.type
            },
            headers: {
                'x-infiniteapi-key': settings.KORAPIKey
            }
        }).then((response: any) => {
            response["data"]["links"].forEach((picture: string) => {
                new Image().src = picture
            });

            document.addEventListener("keydown", this.keyDown);

            let HITID = "";

            if (window.localStorage.getItem("SYMM_PROLIFIC_PID") == null) {
                if (window.localStorage.getItem("SYMM_BASELINE_HITID") != null) {
                    HITID = (window.localStorage.getItem("SYMM_BASELINE_HITID") as string)
                }
            } else {
                HITID = (window.localStorage.getItem("SYMM_PROLIFIC_PID") as string)
            }

            this.setState({
                order: response["data"]["order"],
                images: response["data"]["links"],
                ready: true,
                showingImage: true,
                HITID: HITID
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
        }, getRndInteger(settings.waitmin, settings.waitmax))
    }

    getCurrent() {
        if (this.state.break) {
            this.breaktime = Date.now();
            return (
                <Break type={this.props.type}/>
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
                <Waited type={this.props.type}/>
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

    render() {
        return (
            <div ref={this.expref} style={{height: "100%", backgroundColor: "white"}}>
                {this.getCurrent()}
            </div>
        )
    }
}

export default Exp;