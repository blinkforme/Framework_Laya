import {ui} from "../../ui/layaMaxUI";
import UIMgr from "../../mgr/UIMgr";
import EUI from "../../const/EUI";
import EventMgr from "../../mgr/EventMgr";
import EventType from "../../const/EventType";
import Tween = Laya.Tween;
import ItemBox from "../eliminateGame/ItemBox";
import Handler = Laya.Handler;
import Event = Laya.Event;
import Rectangle = Laya.Rectangle;
import SoundMgr from "../../mgr/SoundMgr";
import {ESound} from "../../const/ERes";
import ItemBall from "./ItemBall";
import ChessItem from "../goBangGame/ChessItem";

export default class PickBallGame extends ui.view.pickBallViewUI {

    public num: number = 3
    public nowScore: number
    public pickTime: number = 10

    constructor() {
        super();
        this.num = 3
    }


    public onAwake() {
        super.onAwake();
    }

    public onEnable() {
        this.returnBtn.on(Laya.Event.CLICK, this, this.onReturnClick)
        this.plank.on(Event.MOUSE_DOWN, this, this.onStartDrag)
        this.restart.on(Event.CLICK, this, this.gameInit)
        this.exitLobby.on(Event.CLICK, this, this.onReturnClick)
        this.bmask.on(Event.CLICK, this, null)
        this.gameInit()
    }

    public gameInit(): void {
        var self = this;
        Laya.timer.clearAll(this)
        self.bmask.visible = self.scoreBox.visible = false;
        let id = 0;
        this.pickTime = 10;
        let time = this.pickTime;
        this.nowScore = 0;
        this.timeBar.value = 1;
        this.updateScore();
        Laya.timer.resume()
        let funA: Laya.Handler = Handler.create(this, function () {
            Laya.timer.loop(1000, this, function () {
                if (time > 0) {
                    time--
                    this.timeBar.value = time / self.pickTime
                } else {
                    Laya.timer.pause()
                    self.bmask.visible = true;
                    self.scoreBox.visible = true;
                    self.finalScore.text = "最终得分:"+self.nowScore;
                    Laya.stage.event(Event.MOUSE_UP)
                    // Laya.timer.clearAll(self)
                }
            })
        })

        let funB: Laya.Handler = Handler.create(this, function () {
            Laya.timer.frameLoop(20, this, function () {
                // for (let x = 0; x < this.num; x++) {
                    let posType: number = Math.ceil(Math.random() * this.num)
                    let type: number = Math.ceil(Math.random() * 5);
                    let y:number = 0 //Math.floor(Math.random()*-500)
                    let item = new ItemBall(id, type, 40, y)
                    item.anchorX = item.anchorY = 0.5;
                    item.pos(self.ballView.width / (this.num + 1) * posType, y)
                    this.ballView.addChild(item)
                    id++
                    Tween.to(item, {
                        y: 900,
                        complete: Handler.create(this, this.onTimerComplete),
                        update: new Handler(this, this.updateC, [item])
                    }, 600, null, Handler.create(this, function () {
                        if (item && item.parent && item.parent.contains(item)) {
                            Tween.clearAll(item);
                            item.parent.removeChild(item);
                        }
                    }), null, false, true)
                // }
            })
        })

        funA.run();
        funB.run();
    }

    public onStartDrag(e: Event): void {
        let dragRegion = new Rectangle(88, 714, 550, 170);
        this.plank.startDrag(dragRegion)
    }

    public onTimerComplete(item: any) {
        // item.parent.removeChild(item);
    }

    public updateC(item: any) {
        if (Math.abs(item.x - this.plank.x) < item.width / 2 + this.plank.width / 2 &&
            Math.abs(item.y - this.plank.y) < item.height / 2 + this.plank.height / 2) {
            this.nowScore += 10
            Tween.clearAll(item);
            item.parent.removeChild(item)
            SoundMgr.playSound(ESound.getCoin)
            this.updateScore()
        }
    }

    public updateScore() {
        this.tarScore.text = this.nowScore + "";
    }

    private setItemState() {

    }

    private onReturnClick(): void {
        Laya.timer.clearAll(this)
        Tween.clearAll(this)
        UIMgr.closeUI(EUI.PickBallView)
        UIMgr.openUI(EUI.HomeView)
    }

    private screenResize(): void {
        // this.size(Laya.stage.width, Laya.stage.height)
    }

    public register() {
        EventMgr.on(EventType.ScreenResize, this, this.screenResize)
    }

    public unRegister() {
        EventMgr.off(EventType.ScreenResize, this, this.screenResize)
    }
}