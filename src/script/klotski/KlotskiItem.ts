export default class KlotskiItem extends Laya.Image {
    public static WID: number = 80;
    public static HEI: number = 80;
    public id: number
    public tempNullId: number
    public num: number
    public x: number
    public y: number
    public item: Laya.Image
    private cb: Laya.Handler;

    constructor(id: number, tempNullId: number, num: number, x: number, y: number, cb: Laya.Handler) {
        super();
        this.id = id
        this.tempNullId = tempNullId
        this.num = num
        this.x = x
        this.y = y
        console.log("x---",x,"y---",y)
        this.cb = cb
        this.size(180, 180);
        Laya.loader.create('prefab/numBox.json', Laya.Handler.create(this, this.onPrefabLoader), null, Laya.Loader.PREFAB);
    }

    public onPrefabLoader(item: Laya.Prefab) {
        this.item = item.create();
        let img = this.item.getChildByName("img_bg") as Laya.Image;
        let txt = this.item.getChildByName("item_txt") as Laya.Label;
        this.addChild(this.item)
        img.skin = this.num != -1 ?"ui/side/img_bg1.png":""
        txt.text = this.num != -1 ? this.num + "" : ""

        this.item.on(Laya.Event.CLICK, this, this.onItemClick)
    }

    public onItemClick(){
        this.cb.runWith(this)
    }
}