export default class GoBangM{
    constructor() {
    }

    static _instance:GoBangM

    /**该哪个人下棋*/
    public _isBlack:boolean = true;
    /**棋盘list*/
    public chessList:Array<any> = new Array<any>();
    /**存一个二维数组*/
    public twoPos:Array<any> = []
    /**鼠标按下的状态*/
    public mouseDownSwitch:boolean = false;

    public static get instance():GoBangM{
        return this._instance || (this._instance = new GoBangM())
    }

    public set isBlack(value:boolean){
        this._isBlack = value
    }

    public get isBlack(){
        return this._isBlack;
    }
}