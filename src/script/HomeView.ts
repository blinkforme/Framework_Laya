import { ui } from "./../ui/layaMaxUI";
import UIMgr from "../mgr/UIMgr";
import EUI from "../const/EUI";
import EventMgr from "../mgr/EventMgr";
import EventType from "../const/EventType";

/**
 * 主页   误触已经集成到框架，请统一使用
 */
export default class HomeView extends ui.view.HomeViewUI {

    public onAwake(){
        super.onAwake();
        UIMgr.closeUI(EUI.LoadingView);
        this.screenResize()
        this.regClick(this.btnStart,this.onStart);
    }

    private screenResize():void{
        // this.size(Laya.stage.width, Laya.stage.height)
    }

    private onStart(){
        console.log("点击")
            // UIMgr.openUI(EUI.FailView);
    }

    public register(){
        // EventMgr.on(EventType.ScreenResize, this, this.screenResize)
    }

    public unRegister(){
        // EventMgr.off(EventType.ScreenResize, this, this.screenResize)
    }
}