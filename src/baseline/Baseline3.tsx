import React from 'react';
import Break from '../components/exppages/Break';
import Finished from '../components/exppages/Finished';
import ImageShow from '../components/exppages/ImageShow';
import Loading from '../components/exppages/Loading';
import Waited from '../components/exppages/Waited';
import Waiting from '../components/exppages/Waiting';
import { settings } from '../scripts/config';
import { getRndInteger } from '../scripts/randomInt';

const axios = require('axios');

interface Baseline3State {
    HITID: string,
    order: Array<number>,
    images: Array<Array<string>>,
    currentSet: number,
    ready: boolean,
    showingSet: boolean,
    waitingStart: boolean,
    waitingExp: boolean,
    started: boolean,
    currentImageInSet: number,
    betweenSets: boolean,
    submission: any,
    finished: boolean,
    break: boolean
}

const sameKey: number = 83;
const diffKey: number = 68;

class Baseline3 extends React.Component<{}, Baseline3State> {
    private expref: any;
    private currentTime: number;
    private timeouts: any;
    private breaktime: any;

    constructor(props: any) {
        super(props);

        this.getCurrent = this.getCurrent.bind(this);
        this.keyDown = this.keyDown.bind(this);

        this.expref = React.createRef();
        this.currentTime = 0;
        this.timeouts = [0,0,0];
        this.breaktime = -99;

        this.state = {
            HITID: "",
            order: [],
            images: [],
            currentSet: 0,
            ready: false,
            showingSet: false,
            waitingStart: true,
            waitingExp: false,
            started: false,
            currentImageInSet: 0,
            betweenSets: false,
            submission: {},
            finished: false,
            break: false
        }
    }

    componentDidMount() {
        axios.get(settings.flaskServer+"getimages_order", {
            params: {
                type: "baseline3"
            },
            headers: {
                'x-infiniteapi-key': settings.KORAPIKey
            }
        }).then((response: any) => {
            response["data"]["links"].forEach((picturelist: Array<string>) => {
                new Image().src = picturelist[0];
                new Image().src = picturelist[1];
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
                showingSet: true,
                HITID: HITID
            });
        })
    }

    componentDidUpdate() {
        if (!this.state.waitingStart && !this.state.waitingExp && !this.state.betweenSets && !this.state.break && this.state.currentImageInSet == 0) {
            this.timeouts[0] = setTimeout(() => {
                this.setState({
                    currentImageInSet: 1,
                    waitingExp: true
                })
            }, settings.baselineImageShow);
        } else if (this.state.waitingExp && this.state.currentImageInSet == 1 && !this.state.break) {
            this.timeouts[1] = setTimeout(() => {
                this.setState({
                    waitingExp: false
                })
            }, settings.baselineImageBetween)
        } else if (!this.state.waitingExp && this.state.currentImageInSet == 1 && !this.state.break) {
            this.timeouts[2] = setTimeout(() => {
                this.setState({
                    betweenSets: true,
                    currentImageInSet: 0,
                    showingSet: false
                })
            }, settings.baselineImageShow);
        }
    }

    keyDown(e: any) {
        if (this.state.break && ((e.keyCode == sameKey) || (e.keyCode == diffKey)) && ((Date.now()-this.breaktime)>=settings.breakdelay)) {
            this.setState({
                waitingExp: true,
                break: false
            });
            setTimeout(() => {
                this.setState({
                    showingSet: true,
                    currentSet: this.state.currentSet+1,
                    waitingExp: false,
                });
            }, getRndInteger(1000, 1500));
            return;
        }
        if (this.state.waitingStart && ((e.keyCode == sameKey) || (e.keyCode == diffKey))) {
            this.expref.current.webkitRequestFullscreen();
            this.setState({
                waitingExp: true
            })
            setTimeout(()=> {
                this.setState({
                    waitingStart: false,
                    waitingExp: false,
                    started: true
                })
            }, 5000);
            return
        } else if ((this.state.betweenSets || (this.state.currentImageInSet == 1 && !this.state.waitingExp)) && ((e.keyCode == sameKey) || (e.keyCode == diffKey))) {
            let timeTaken = Date.now()-this.currentTime;
            
            let toSubmit = this.state.submission;

            toSubmit[this.state.currentSet.toString()] = {
                time: timeTaken,
                type: "baseline3",
                setNumber: this.state.order[this.state.currentSet],
                imageURLs: this.state.images[this.state.order[this.state.currentSet]],
                answer: e.keyCode == sameKey ? "S" : "D",
                hit: this.state.HITID,
                screenSize: ((window.innerWidth).toString())+"x"+((window.innerHeight).toString())
            }

            if (this.state.currentSet+1 == this.state.order.length) {
                axios.post(settings.flaskServer+"data", JSON.stringify(toSubmit), {
                    headers: {
                        'content-type': 'application/json',
                        'x-infiniteapi-key': settings.KORAPIKey
                    }
                }).then((resp: any) => {
                    document.removeEventListener("keydown", this.keyDown);
                    document.exitFullscreen();
                    let newState: any = {};
                    if (window.localStorage.getItem("SYMM_PROLIFIC_PID") != null) {
                        newState.HITID = resp["data"]["id"];
                        window.localStorage.removeItem("SYMM_PROLIFIC_PID");
                    }
                    if (window.localStorage.getItem("SYMM_BASELINE_HITID") != null) {
                        window.localStorage.removeItem("SYMM_BASELINE_HITID");
                    }
                    newState.finished = true;
                    this.setState(newState);
                })
                return;
            }

            if (!this.state.betweenSets) {
                for (let x=0; x<3; x++) {
                    window.clearTimeout(this.timeouts[x]);
                }
            }
            this.setState({
                waitingExp: true,
                currentImageInSet: 0,
            });

            if (this.state.currentSet+1 == 50) {
                setTimeout(() => {
                    this.setState({
                        betweenSets: false,
                        break: true,
                        submission: toSubmit,
                    })
                }, getRndInteger(1000, 1500));
            } else {
                setTimeout(() => {
                    this.setState({
                        betweenSets: false,
                        showingSet: true,
                        submission: toSubmit,
                        currentSet: this.state.currentSet+1,
                        waitingExp: false
                    })
                }, getRndInteger(1000, 1500));
            }
        }
    }

    getCurrent() {
        if (!this.state.ready) {
            return (
                <Loading />
            )
        } else if (this.state.break) {
            this.breaktime = Date.now();
            return (
                <Break type={"baseline3"}/>
            )
        } else if (this.state.finished) {
            return (
                <Finished HITID={this.state.HITID} type="exp" accuracy={0}/>
            )
        } else if (this.state.betweenSets) {
            return (
                <Waiting started={true} />
            )
        } else if (this.state.waitingExp) {
            return (
                <Waiting started={this.state.started} />
            )
        } else if (this.state.waitingStart) {
            return (
                <Waited type="baseline3"/>
            )
        } else if (this.state.showingSet) {
            if (this.state.currentImageInSet == 1) {
                this.currentTime = Date.now()
            }
            return (
                <ImageShow src={this.state.images[this.state.order[this.state.currentSet]][this.state.currentImageInSet]} />
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

export default Baseline3;