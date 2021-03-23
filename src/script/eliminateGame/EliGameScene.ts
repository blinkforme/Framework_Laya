import {ui} from "../../ui/layaMaxUI";
import EventMgr from "../../mgr/EventMgr";
import EventType from "../../const/EventType";
import UIMgr from "../../mgr/UIMgr";
import EUI from "../../const/EUI";
import ItemBox from "./ItemBox";
import {EliConfig} from "./EliConfig";


export default class EliGameScene extends ui.view.EliGameUI {
    /**方块总数组*/
    public itemArr: Array<any>
    /**当前选中的方块数组*/
    public itemArr_check: Array<any>
    /**方块id*/
    public id: number
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
    public item_H = 9;

    constructor() {
        super();
        this.itemArr = []
    }

    public onAwake() {
        super.onAwake();
    }

    public onEnable() {
        this.GameInit();
        this.GreatBoard();
        this.returnBtn.on(Laya.Event.CLICK, this, this.onReturnClick)
    }

    private GreatBoard(): void {
        if (this.itemArr.length != 0) {
            let nItem: Laya.Image;
            for (let i = 0; i < this.itemArr.length; i++) {
                nItem = this.itemArr[i] as Laya.Image;
                nItem.parent.removeChild(nItem);
            }
        }

        this.itemArr = [];
        this.itemArr_check = [];
        this.id = 0;
        let callBackClick: Laya.Handler = Laya.Handler.create(this, this.setItemState, null, false)
        for (let k = 0; k < this.item_H; k++) {
            for (let j = 0; j < this.item_W; j++) {
                let type: number = Math.ceil(Math.random() * 3);
                let item = new ItemBox(this.id, type, j * EliConfig.ICON_W, k * EliConfig.ICON_W, callBackClick)
                item.pos(j * EliConfig.ICON_W + 40, k * EliConfig.ICON_W + 40);
                item.anchorX = item.anchorY = 0.5;
                this.itemArr.push(item)
                this.board.addChild(item)
                this.id++
            }
        }
    }

    private GameInit(): void {
        this.level = 1;
        this.target = 1000;
        this.scoreAll = 0;
        this.lv.text = this.level.toString();
        this.tarScore.text = this.target.toString();
        this.nowScore.text = this.scoreAll.toString();
    }

    private setItemState(isShow: any, id: any, type: any, x: any, y: any): void {
        this.setVarScore(0, 0);
        if (isShow && this.itemArr_check.length > 2) {
            let nItem: Laya.Image;
            let nIndex: number;
            for (let i = 0; i < this.itemArr_check.length; i++) {
                nItem = this.itemArr_check[i] as Laya.Image;
                nItem.parent.removeChild(nItem);
                nIndex = this.itemArr.indexOf(nItem);

                if (nIndex > -1) {
                    let cItem_x = this.itemArr[nIndex].x
                    let cItem_y = this.itemArr[nIndex].y
                    this.itemArr.splice(nIndex, 1)
                    // let callBackClick: Laya.Handler = Laya.Handler.create(this, this.setItemState, null, false)
                    // let types: number = Math.ceil(Math.random() * 3);
                    // let item = new ItemBox(this.id, types, cItem_x + 40, 0, callBackClick)
                    // item.pos(cItem_x + 40, 0);
                    // item.anchorX = item.anchorY = 0.5;
                    // this.itemArr.push(item)
                    // this.board.addChild(item)
                    // this.id++
                    this.setItemPos(cItem_x, cItem_y);
                }
            }
            this.ChangeScoreTxt();
            let target = Number(this.tarScore.text);
            let score = Number(this.nowScore.text);
            console.log("111")
            if (score > target) {
                console.log("222")
                this.level++
                this.lv.text = this.level + ""
                this.tarScore.text = (Math.ceil(this.target + Math.pow(1000, 1 + this.level / 100))).toString();
                this.target = parseInt(this.tarScore.text)
                let nLen = this.itemArr.length;
                // let prizeScore = this.addPrizeScore(nLen);
                this.nowScore.text = this.scoreAll.toString()//(prizeScore + this.scoreAll).toString()
                Laya.timer.once(500, this, this.GreatBoard);
            } else {
                if (this.isOver()) {
                    console.log("游戏结束")
                }
            }
        } else {

            this.itemArr_check = [];
            //查找当前点击的方块，并添加到 this.itemArr_check
            for (let i = 0; i < this.itemArr.length; i++) {
                if (this.itemArr[i].id === id) {
                    this.itemArr_check.push(this.itemArr[i]);
                }
            }
            this.FindItems(type, x, y);
            let icon: Laya.Image;
            if (this.itemArr_check.length > 0) {
                for (let i = 0; i < this.itemArr_check.length; i++) {
                    icon = this.itemArr_check[i].mItem.getChildByName("icon") as Laya.Image;
                    if (icon) {
                        icon.visible = true;
                    }
                }
            }

            //设置预得分数
            let len = this.itemArr_check.length;
            if (len > 2) {
                this.setVarScore(len, len * len * 5);
            } else {
                this.setVarScore(len, 0);
            }
        }
    }

    private setVarScore(count: number, score: number) {
        // this.count.set_text(count.toString())
        // this.varScore.set_text(score.toString())
        if (score != 0) {
            this.score_var = score;
        }
    }

    private ChangeScoreTxt(): void {
        this.scoreAll = parseInt(this.nowScore.text);
        this.scoreAll = this.scoreAll + this.score_var;
        this.nowScore.text = this.scoreAll.toString();
    }

    FindItems(type: any, x: any, y: any) {
        let icon: Laya.Image;
        let itemNow: Laya.Image;
        for (let i = 0; i < this.itemArr.length; i++) {
            if (this.itemArr[i].type === type) {
                itemNow = this.itemArr[i] as Laya.Image;
                if (itemNow.x === x + 80 && itemNow.y === y) {
                    if (this.itemArr_check.indexOf(itemNow) == -1) {
                        this.itemArr_check.push(itemNow);
                        this.FindItems(type, itemNow.x, itemNow.y);
                    }
                } else if (itemNow.x === x - 80 && itemNow.y === y) {
                    if (this.itemArr_check.indexOf(itemNow) == -1) {
                        this.itemArr_check.push(itemNow);
                        this.FindItems(type, itemNow.x, itemNow.y);
                    }
                } else if (itemNow.y === y + 80 && itemNow.x === x) {
                    if (this.itemArr_check.indexOf(itemNow) == -1) {
                        this.itemArr_check.push(itemNow);
                        this.FindItems(type, itemNow.x, itemNow.y);
                    }
                } else if (itemNow.y === y - 80 && itemNow.x === x) {
                    if (this.itemArr_check.indexOf(itemNow) == -1) {
                        this.itemArr_check.push(itemNow);
                        this.FindItems(type, itemNow.x, itemNow.y);
                    }
                }
            }
            icon = this.itemArr[i].mItem.getChildByName("icon") as Laya.Image;
            icon.visible = false;
        }
    }

    private setItemPos(x: number, y: number) {
        let n = 0;
        for (let i = 0; i < this.itemArr.length; i++) {
            if (this.itemArr[i].x === x) {
                if (this.itemArr[i].y < y) {
                    Laya.Tween.to(this.itemArr[i], {y: this.itemArr[i].y + 80}, EliConfig.TWEEN_TIME);
                    this.itemArr[i].y = this.itemArr[i].y + 80;
                }

                if (this.itemArr[i].x === x) {
                    n++;
                }
            }
        }

        if (n === 0) {
            for (let i = 0; i < this.itemArr.length; i++) {
                if (this.itemArr[i].x > x) {
                    Laya.Tween.to(this.itemArr[i], {x: this.itemArr[i].x - 80}, EliConfig.TWEEN_TIME);
                    this.itemArr[i].x = this.itemArr[i].x - 80;
                }
            }
        }
    }


    public isOver(): boolean {
        for (let i = 0; i < this.itemArr.length; i++) {
            for (let j = 0; j < this.itemArr.length; j++) {
                if (this.itemArr[i].type === this.itemArr[j].type) {
                    if (this.itemArr[i].y === this.itemArr[j].y) {
                        if (this.itemArr[i].x + 80 === this.itemArr[j].x) {
                            return false;
                        }
                    }
                    if (this.itemArr[i].x === this.itemArr[j].x) {
                        if (this.itemArr[i].y + 80 === this.itemArr[j].y) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }

    private onReturnClick(): void {
        UIMgr.closeUI(EUI.EliminateView)
        UIMgr.openUI(EUI.HomeView)
    }

    private addPrizeScore(len): number {
        if (len >= 10) {
            return 0;
        } else {
            return this.addPrizeScore(len + 1) + (250 + (9 - len) * 40);
        }
    }

    private screenResize(): void {
        this.size(Laya.stage.width, Laya.stage.height)
        this.bg.size(Laya.stage.width, Laya.stage.height)
    }

    public register() {
        EventMgr.on(EventType.ScreenResize, this, this.screenResize)
    }

    public unRegister() {
        EventMgr.off(EventType.ScreenResize, this, this.screenResize)
    }
}