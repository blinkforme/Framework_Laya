import { ui } from "../ui/layaMaxUI";
import UIMgr from "../mgr/UIMgr";
import EUI from "../const/EUI";
import EventMgr from "../mgr/EventMgr";
import EventType from "../const/EventType";

export default class HomeView extends ui.view.HomeViewUI{

    public onAwake(){
        super.onAwake();
        UIMgr.closeUI(EUI.LoadingView);
        console.log("适配调整1")
        this.screenResize();
        this.regClick(this.eliBtn,this.onEliBtnClick);
        this.regClick(this.pickBtn,this.onPickBallClick)
        this.regClick(this.chessBtn,this.onChessClick)
        this.regClick(this.numGameBtn,this.onNumGameClick)
        this.regClick(this.klotskiBtn,this.onKlotskiClick)

    }

    private screenResize():void{
        console.log("适配调整2","Laya.stage.height----",Laya.stage.height,"Laya.stage.width---",Laya.stage.width)
        // this.view_bg.width = 1280;
        // this.view_bg.height = 720;
        // if ((Laya.stage.height / Laya.stage.width) > (720 / 1280))
        // {
        //     this.view_bg.height = Laya.stage.height;
        // } else
        // {
        //     this.view_bg.width = Laya.stage.width;
        // }
        this.size(Laya.stage.width, Laya.stage.height)
    }

    private onEliBtnClick(){
        console.log("点击")
        UIMgr.closeUI(EUI.HomeView)
        UIMgr.openUI(EUI.EliminateView);
    }

    private onPickBallClick(){
        UIMgr.closeUI(EUI.HomeView)
        UIMgr.openUI(EUI.PickBallView);
    }

    private onChessClick(){
        UIMgr.closeUI(EUI.HomeView)
        UIMgr.openUI(EUI.ChessView);
    }

    private onNumGameClick(){
        UIMgr.closeUI(EUI.HomeView)
        UIMgr.openUI(EUI.NumGameView);
    }

    public onKlotskiClick(){
        UIMgr.closeUI(EUI.HomeView)
        UIMgr.openUI(EUI.KlotskiView);
    }

    public register(){
        console.log("主界面消息注册器")
        EventMgr.on(EventType.ScreenResize, this, this.screenResize)
    }

    public unRegister(){
        EventMgr.off(EventType.ScreenResize, this, this.screenResize)
    }
}