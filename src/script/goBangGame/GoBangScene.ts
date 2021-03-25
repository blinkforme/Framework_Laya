import {ui} from "../../ui/layaMaxUI";
import ChessItem from "./ChessItem";
import EventMgr from "../../mgr/EventMgr";
import EventType from "../../const/EventType";
import GoBangM from "../../model/GoBangM";

export default class GoBangScene extends ui.view.GoBangUI {

    private time: number = 5

    constructor() {
        super();
    }

    public onAwake() {
        super.onAwake();
    }

    public onEnable() {
        var self = this;
        this.GameInit()
        GoBangM.instance.isBlack = true;
        this.chessboard.on(Laya.Event.MOUSE_DOWN, this, this.onChessMouseDown)
        this.startOver.on(Laya.Event.CLICK, this, this.onStartOver)
        this.GameTimer();
    }

    public onStartOver() {
        this.GameInit()
        this.GameTimer();
    }

    public GameInit() {
        this.winTip.visible = this.startOver.visible = false;
        this.chessboard.mouseEnabled = true;
        this.time = 5;
        this.chessboard.destroyChildren()
        let callBackClick: Laya.Handler = Laya.Handler.create(this, this.isWin, null, false)
        for (let x = 0; x < 15; x++) {
            GoBangM.instance.chessList[x] = new Array([])
            for (let y = 0; y < 15; y++) {
                let newNode = new ChessItem(x * 45, y * 45, x, y, callBackClick);
                GoBangM.instance.chessList[x][y] = 0
                //根据棋盘和棋子大小计算使每个棋子节点位于指定位置
                newNode.pos(x * 45, y * 45);
                newNode.anchorX = newNode.anchorY = 0.5;
                // newNode.twoPos[x][y];//根据每个节点的tag就可以算出其二维坐标
                this.chessboard.addChild(newNode);
                // GoBangM.instance.chessList.push(newNode);
            }
        }
    }

    public GameTimer() {
        var self = this;
        Laya.timer.loop(1000, this, function () {
            if (self.time <= 0) {
                let type: number = GoBangM.instance.isBlack ? 1 : 2 //console.log(GoBangM.instance.isBlack?"黑棋赢了":"白棋赢了")
                EventMgr.event(EventType.GoBangWin, type)
            } else {
                self.time--
                self.gameTime.text = "下棋倒计时:" + self.time;
            }
        })
    }

    public onChessMouseDown() {
        GoBangM.instance.mouseDownSwitch = true;
    }


    public isWin(row: number, column: number): boolean {
        let horizontal = 1
        let vertical = 1
        let leftDiagonal = 1
        let rightDiagonal = 1
        let data = GoBangM.instance.chessList;

        const target = data[row][column];

        // 横向
        for (let i = column + 1; i <= 15; i++) {
            if (data[row][i] == target) {
                horizontal++;
            } else {
                break;
            }
        }
        for (let i = column - 1; i >= 0; i--) {
            if (data[row][i] == target) {
                horizontal++;
            } else {
                break;
            }
        }
        console.log('横向', horizontal)
        if (horizontal >= 5) {
            return true;
        }

        // 竖向
        for (let i = row + 1; i <= 15; i++) {
            if (data[i][column] == target) {
                vertical++;
            } else {
                break;
            }
        }
        for (let i = row - 1; i >= 0; i--) {
            if (data[i][column] == target) {
                vertical++;
            } else {
                break;
            }
        }
        console.log('竖向', vertical)
        if (vertical >= 5) {
            return true;
        }

        // 西北-东南对角线
        for (let i = 1; i < 5; i++) {
            if (data[row + i][column + i] == target) {
                leftDiagonal++;
            } else {
                break;
            }
        }
        for (let i = 1; i < 5; i++) {
            if (data[row - i][column - i] == target) {
                leftDiagonal++;
            } else {
                break;
            }
        }
        console.log('左上', leftDiagonal)
        if (leftDiagonal >= 5) {
            return true;
        }

        // 东北-西南对角线
        for (let i = 1; i < 5; i++) {
            if (data[row + i][column - i] == target) {
                rightDiagonal++;
            } else {
                break;
            }
        }
        for (let i = 1; i < 5; i++) {
            if (data[row - i][column + i] == target) {
                rightDiagonal++;
            } else {
                break;
            }
        }
        console.log('右上', leftDiagonal)
        if (rightDiagonal >= 5) {
            return true;
        }
        return false;
    }

    public syncState(type: number) {
        this.winTip.visible = this.startOver.visible = true;
        this.chessboard.mouseEnabled = false;
        Laya.timer.clearAll(this)
        if (type == 1) {
            this.winTip.text = "白棋赢了"
        } else {
            this.winTip.text = "黑棋赢了"
        }
    }

    public syncTime(){
        this.time = 5;
        this.gameTime.text = "下棋倒计时:" + this.time;
        Laya.timer.clearAll(this)
        this.GameTimer()
    }


    public register() {
        EventMgr.on(EventType.GoBangWin, this, this.syncState)
        EventMgr.on(EventType.ChessEd, this, this.syncTime)
    }

    public unRegister() {
        EventMgr.off(EventType.GoBangWin, this, this.syncState)
        EventMgr.off(EventType.ChessEd, this, this.syncTime)
    }
}