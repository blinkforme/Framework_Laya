import {ui} from "../../ui/layaMaxUI";
import EventMgr from "../../mgr/EventMgr";
import EventType from "../../const/EventType";
import UIMgr from "../../mgr/UIMgr";
import EUI from "../../const/EUI";


export default class EliGameScene extends ui.view.EliGameUI{

    public itemArr: Array<any>
    /**当前选中的方块数组*/
    public itemArr_check: Array<any>
    /**关卡*/
    public level: number
    /**目标分数*/
    public target: number
    /**预计的分数*/
    public score_var: number
    /**总分数*/
    public scoreAll: number
    /**横向方块个数*/
    public item_W = 8;
    /**纵向方块个数*/
    public item_H = 10;

    constructor() {
        super();
        this.itemArr = []
    }

    public onAwake(){
        super.onAwake();
        this.GreatBoard();
    }

    private GreatBoard():void
    {

    }

    private screenResize():void{
        this.size(Laya.stage.width, Laya.stage.height)
        this.bg.size(Laya.stage.width, Laya.stage.height)
    }

    public register(){
        EventMgr.on(EventType.ScreenResize, this, this.screenResize)
    }

    public unRegister(){
        EventMgr.off(EventType.ScreenResize, this, this.screenResize)
    }
}