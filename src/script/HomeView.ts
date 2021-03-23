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
        this.regClick(this.btnStart,this.onStart);

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

    private onStart(){
        console.log("点击")
        UIMgr.openUI(EUI.EliminateView);
    }

    public register(){
        console.log("主界面消息注册器")
        EventMgr.on(EventType.ScreenResize, this, this.screenResize)
    }

    public unRegister(){
        EventMgr.off(EventType.ScreenResize, this, this.screenResize)
    }
}