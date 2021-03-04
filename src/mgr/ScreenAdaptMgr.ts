import Browser = Laya.Browser;
import GameTools from "./GameTools";
import EventMgr from "./EventMgr";
import EventType from "../const/EventType";


export default class ScreenAdaptMgr {
    static instance = new ScreenAdaptMgr();
    public width: any = 0;
    public height: any = 0;
    public minWidth: any = 1220;
    public maxWidth: any = 1800;
    public minHeight: any = 720;
    public maxHeight: any = 1120;
    public maxRate: number= this.maxWidth / this.minHeight;
    public minRate: number= this.minWidth / this.maxHeight;
    private useClientHeight: number = 0;
    private useClientWidth: number = 0;
    private useBrowserWidth: number = 0;
    private useBrowserHeight: number = 0;
    public notch: string = "left";
    private screenRotation: boolean = null;

    constructor() {

    }

    private update(){
        if (this.screenRotation == null || this.screenRotation != Laya.stage.canvasRotation)
        {
            this.screenRotation = Laya.stage.canvasRotation;
        }

        if (this.useBrowserWidth != Browser.clientWidth || this.useBrowserHeight != Browser.clientHeight || (this.notch != GameTools.prototype.notch() && "normal" != GameTools.prototype.notch()))// || notch !=  __JS__("notch()"))
        {
            //计算适配的设计宽高
            let browserRate:number = Browser.clientWidth / Browser.clientHeight;
            if (Browser.clientWidth < Browser.clientHeight)
            {
                browserRate = Browser.clientHeight / Browser.clientWidth;
            }
            this.useBrowserWidth = Browser.clientWidth;
            this.useBrowserHeight = Browser.clientHeight;
            if ("normal" != GameTools.prototype.notch())
            {
                this.notch = GameTools.prototype.notch();//__JS__("notch()")
            }
            if (browserRate >= this.minRate && browserRate <= this.maxRate)
            {
                var i:number = this.minHeight;
                var preI:number = 0;
                var iminRate:Number = 0;
                var imaxRate:Number = 0;
                var imaxHeight:number = this.maxHeight;
                var findRate:Boolean = false;
                //计算最小i
                i = Math.ceil(this.minWidth / browserRate);
                if (i < this.minHeight)
                {
                    i = this.minHeight;
                }
                while (i <= imaxHeight)
                {
                    iminRate = this.minWidth / i;
                    imaxRate = this.maxWidth / i;
                    if (imaxRate >= browserRate && iminRate <= browserRate)
                    {
                        //找到合适的分辨率

                        findRate = true;
                        this.useClientHeight = i;
                        this.useClientWidth = Math.floor(i * browserRate);
                        //trace("find height = " + useClientHeight + " width = " + useClientWidth);
                        break;
                    }
                    else
                    {
                        preI = i;
                        i = Math.floor((i + imaxHeight) / 2);
                        if ((this.minWidth / i) > browserRate)
                        {
                            imaxHeight = i;
                            i = preI + 1;
                        }
                        else
                        {
                            if (i <= preI)
                            {
                                i = preI + 1;
                            }
                        }
                    }
                }
                if (!findRate)
                {
                    this.useClientWidth = Math.floor(i * browserRate);
                    this.useClientHeight = i;
                }
            }
            else if (browserRate > this.minRate)
            {
                this.useClientHeight = this.minHeight;
                this.useClientWidth = this.maxWidth;
            }
            else
            {
                this.useClientHeight = this.maxHeight;
                this.useClientWidth = this.minWidth;
            }
            //开始调整屏幕适配
            Laya.stage.width = this.useClientWidth;
            Laya.stage.height = this.useClientHeight;
            GameTools.screenResize();
            //trace("width = " + useClientWidth + " height = " + useClientHeight + " bwidth = " + Browser.clientWidth + " bHeight = " + Browser.clientHeight);
            EventMgr.event(EventType.ScreenResize, null);
        }
    }

    public init():void{
        this.update();
        Laya.stage.on(Laya.Event.RESIZE, this, this.update)
    }
}