import PickBallGame from "../pickBall/PickBallGame";
import GoBangScene from "./GoBangScene";
import GoBangM from "../../model/GoBangM";
import EventMgr from "../../mgr/EventMgr";
import EventType from "../../const/EventType";
import SoundMgr from "../../mgr/SoundMgr";
import {ESound} from "../../const/ERes";

export default class ChessItem extends Laya.Image {

    public static WID: number = 30;
    public static HEI: number = 30;

    public x: number;
    public y: number;
    public tx: number;
    public ty: number;
    private cb: Laya.Handler;
    public chessIcon: Laya.Image

    constructor(x, y, tx, ty, cb) {
        super();
        this.x = x;
        this.y = y;
        this.tx = tx;
        this.ty = ty;
        this.cb = cb;
        this.size(ChessItem.WID, ChessItem.HEI);
        Laya.loader.create('prefab/chessIcon.json', Laya.Handler.create(this, this.onPrefabLoader), null, Laya.Loader.PREFAB);
    }

    public onPrefabLoader(prefab: Laya.Prefab) {
        this.chessIcon = prefab.create()
        this.chessIcon.centerX = 0
        this.chessIcon.centerY = 0
        this.addChild(this.chessIcon)
        this.chessIcon.on(Laya.Event.MOUSE_UP, this, this.onMouseUpChecked);
        this.chessIcon.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDownChecked);
        this.chessIcon.on(Laya.Event.MOUSE_OUT, this, this.onMouseOutChecked);
        this.chessIcon.on(Laya.Event.MOUSE_OVER, this, this.onMouseOverChecked)
    }

    public onMouseUpChecked() {
        GoBangM.instance.isBlack = !GoBangM.instance.isBlack
        GoBangM.instance.mouseDownSwitch = false;
        SoundMgr.playSound(ESound.chessDown)
        console.log("arr:", GoBangM.instance.chessList)
        if (GoBangM.instance.chessList[this.tx][this.ty] == 0) {
            GoBangM.instance.chessList[this.tx][this.ty] = GoBangM.instance._isBlack ? 1 : 2
            let chess = this.chessIcon.getChildByName("chess") as Laya.Image;
            chess.skin = GoBangM.instance._isBlack ? "ui/common/1.png" : "ui/common/2.png"
            this.chessIcon.skin = ""
            EventMgr.event(EventType.ChessEd)
            console.log(GoBangM.instance.isBlack?"白棋落棋了":"黑棋落棋了")
            if (this.cb.runWith([this.tx, this.ty]))
            {
                let type:number = GoBangM.instance.isBlack ? 1:2 //console.log(GoBangM.instance.isBlack?"黑棋赢了":"白棋赢了")
                EventMgr.event(EventType.GoBangWin, type)
            }
        } else {
            console.log("这里有棋了")
        }
    }

    public onMouseDownChecked(){
        if (GoBangM.instance.chessList[this.tx][this.ty] == 0)
        {
            this.chessIcon.skin = "ui/side/img_redpoint.png"
        }
    }

    private onMouseOutChecked(){
        this.chessIcon.skin = ""
    }

    private onMouseOverChecked(){
        if (GoBangM.instance.mouseDownSwitch)
        {
            this.chessIcon.skin = "ui/side/img_redpoint.png"
        }
    }
}