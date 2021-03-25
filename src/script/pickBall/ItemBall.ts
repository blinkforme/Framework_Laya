import {EliConfig} from "../eliminateGame/EliConfig";

export default class ItemBall extends Laya.Image {

    public nItem: Laya.Image;
    public type: any;
    private callBackClick: Laya.Handler;

    constructor(id: number, type: number, x: number, y: number) {
        super();
        this.type = type;
        Laya.loader.create('prefab/starIcon.json', Laya.Handler.create(this, this.onPrefabLoader), null, Laya.Loader.PREFAB);
    }

    private onPrefabLoader(img: Laya.Prefab):void
    {
        this.nItem = img.create();
        this.nItem.centerX = 0;
        this.nItem.centerY = 0;
        this.nItem.skin = EliConfig.IMG_URL + this.type + ".png";
        this.addChild(this.nItem);
    }
}