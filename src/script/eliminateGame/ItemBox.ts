import {EliConfig} from "./EliConfig";

export default class ItemBox extends Laya.Image {

    public static WID: number = 80;
    public static HEI: number = 80;

    public mItem: Laya.Image;
    public id: number;
    public type: number;
    public x: number;
    public y: number;
    private callBackClick: Laya.Handler;

    constructor(id: number, type: number, x: number, y: number, cb: Laya.Handler) {
        super();
        this.id = id;
        this.type = type;
        this.x = x;
        this.y = y;
        this.callBackClick = cb;
        this.size(ItemBox.WID, ItemBox.HEI);
        Laya.loader.create('prefab/Image.json', Laya.Handler.create(this, this.onPrefabLoader), null, Laya.Loader.PREFAB);
    }

    private onPrefabLoader(obj: Laya.Prefab):void
    {
        this.mItem = obj.create();
        this.mItem.centerX = 0;
        this.mItem.centerY = 0;
        this.mItem.skin = EliConfig.IMG_URL + this.type + ".png";
        this.addChild(this.mItem);
        this.mItem.on(Laya.Event.CLICK, this, this.onClickChecked);
        this.mItem.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown)
    }

    private onMouseDown():void{

    }

    private onClickChecked():void
    {
        let img = this.mItem.getChildByName("icon") as Laya.Image;
        // this.callBackClick.runWith([this.id, this.type, this.x, this.y])
        let p_visible = img.visible;
        if (p_visible) {
            this.callBackClick.runWith([true, this.id, this.type, this.x, this.y]);
        } else {
            img.visible = true;
            this.callBackClick.runWith([false, this.id, this.type, this.x, this.y]);
        }
    }
}