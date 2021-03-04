import GameConst from "../const/GameConst";

export default class GameTools {

    static  _designPosDivideScreenPosWidth:number = 1;
    static  _designPosDivideScreenPosHeight:number = 1;
    static  _screenPosDivideDesignPosWidth:number = 1;
    static  _screenPosDivideDesignPosHeight:number = 1;

    constructor(){

    }

    public static  screenResize():void
    {
        this._screenPosDivideDesignPosWidth = Laya.stage.width / GameConst.design_width;
        this._screenPosDivideDesignPosHeight = Laya.stage.height / GameConst.design_height;
        this._designPosDivideScreenPosWidth = GameConst.design_width / Laya.stage.width;
        this._designPosDivideScreenPosHeight = GameConst.design_height / Laya.stage.height;
    }

    notch():string{
        {
            var _notch:string = 'left';
            var tmpwindow:any = window;
            var tmpscreen:any = screen;
            if ('orientation' in tmpwindow)
            {
                // Mobile
                if (tmpwindow.orientation == 90)
                {
                    _notch = 'left';
                } else if (tmpwindow.orientation == -90)
                {
                    _notch = 'right';
                }
            } else if ('orientation' in tmpwindow.screen)
            {
                // Webkit
                if (tmpwindow.screen.orientation.type === 'landscape-primary')
                {
                    _notch = 'left';
                } else if (tmpwindow.screen.orientation.type === 'landscape-secondary')
                {
                    _notch = 'right';
                }
            } else if ('mozOrientation' in tmpwindow.screen)
            {
                // Firefox
                if (tmpwindow.screen.mozOrientation === 'landscape-primary')
                {
                    _notch = 'left';
                } else if (tmpwindow.screen.mozOrientation === 'landscape-secondary')
                {
                    _notch = 'right';
                }
            }
            return _notch;
        }
        return "left";
    }
}