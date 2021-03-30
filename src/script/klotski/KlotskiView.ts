import {ui} from "../../ui/layaMaxUI";
import ItemBox from "../eliminateGame/ItemBox";
import {EliConfig} from "../eliminateGame/EliConfig";
import KlotskiItem from "./KlotskiItem";
import Tween = Laya.Tween;

export default class KlotskiView extends ui.view.KlotskiViewUI {

    public bg_sp: Laya.Sprite = new Laya.Sprite();
    public itemArrNum: Array<any> = []
    public temp_arr: Array<any> = []

    constructor() {
        super();
    }

    public onAwake() {
        super.onAwake();
    }

    public onEnable() {
        this.gameInit()
    }

    public gameInit() {
        this.temp_arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, -1];
        let callBackClick: Laya.Handler = Laya.Handler.create(this, this.moveNumItem, null, false)
        let temp_index = Math.round(Math.random() * (this.temp_arr.length - 2));
        let tempNullId = Math.round(Math.random()) * 3 + 12
        let id = 0;
        for (let k = 0; k < 4; k++) {
            for (let j = 0; j < 4; j++) {
                let itemNum;
                if (tempNullId != id) {
                    itemNum = this.temp_arr[temp_index]
                    this.temp_arr.splice(temp_index, 1)
                    temp_index = Math.round(Math.random() * (this.temp_arr.length - 2));
                } else {
                    itemNum = -1;
                }
                console.log("id----:", id, "tempNullId---", tempNullId, "num----", itemNum, "temp_arr---", this.temp_arr, "temp_index----", temp_index)
                let item = new KlotskiItem(id, tempNullId, itemNum, j * 180 + 90, k * 180 + 90, callBackClick)
                item.anchorX = item.anchorY = 0.5;
                this.itemArrNum.push(itemNum)
                // item.pos(, );

                this.case.addChild(item)
                id++
            }
        }
    }

    public moveNumItem(box: KlotskiItem) {
        let id = box.id
        // let itemX = box.x
        // let itemY = box.y
        // let item = this.case.getChildAt(id - 1) as Laya.Image

        console.log("id---", id, "box---", box)
        if (this.itemArrNum[id] != -1) {
            if (this.itemArrNum[id - 4] && this.itemArrNum[id - 4] == -1) {
                Tween.to(box.item, {y: box.item.y - 180}, 100, null, null, 0)
                this.itemArrNum[id - 4] = this.itemArrNum[id];
                this.itemArrNum[id] = -1;
                box.id = box.id - 4
                console.log("up")
            } else if (this.itemArrNum[id + 4] && this.itemArrNum[id + 4] == -1) {
                Tween.to(box.item, {y: box.item.y + 180}, 100, null, null, 0)
                this.itemArrNum[id + 4] = this.itemArrNum[id];
                this.itemArrNum[id] = -1;
                box.id = box.id + 4
                console.log("down")
            } else if (this.itemArrNum[id - 1] && [4, 8, 12].indexOf(id) == -1 && this.itemArrNum[id - 1] == -1) {
                Tween.to(box.item, {x: box.item.x - 180}, 100, null, null, 0)
                this.itemArrNum[id - 1] = this.itemArrNum[id];
                this.itemArrNum[id] = -1;
                box.id = box.id - 1
                console.log("left")
            } else if (this.itemArrNum[id + 1] && [3, 7, 11].indexOf(id) == -1 && this.itemArrNum[id + 1] == -1) {
                Tween.to(box.item, {x: box.item.x + 180}, 100, null, null, 0)
                this.itemArrNum[id + 1] = this.itemArrNum[id];
                this.itemArrNum[id] = -1;
                box.id = box.id + 1
                console.log("right")
            } else {
                console.log("没空缺")
            }
            console.log("itemArrNum--->", this.itemArrNum)
        }

        this.isWin()
    }

    public isWin() {
        if (this.temp_arr == this.itemArrNum) {
            console.log("你赢了")
        }
    }

    public register() {
    }

    public unRegister() {
    }
}