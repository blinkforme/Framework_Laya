import {ui} from "../../ui/layaMaxUI";

export default class NumGameScene extends ui.view.NumGameViewUI {

    public bg_sp: Laya.Sprite = new Laya.Sprite();
    public bg_sp_width:number = 0;
    public bg_sp_height:number = 0;
    public drawColorArr: Array<string> = ["#EEE4DA", "#EDE0C8", "#F2B179", "#F65E3B", "#F67C5F", "#F2B179", "#EDCF72", "#EDCC61", "#F65E3B", "#FF0000"];
    public data_map = new Map();

    constructor() {
        super();
    }

    public onAwake() {
        super.onAwake()
    }

    public onEnable() {
        this.GameInit()
    }

    public GameInit() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                this.data_map.set(i + "" + j, null);
            }
        }

        this.drawStage()
        this.controlSlide()

        /**初始化两个位置*/
        for (let i = 0; i < 2; i++) {
            let indexArr = this.getRandomIndex(); //返回一个随机的位置数组
            this.createNumber(indexArr[0], indexArr[1]);
        }

        // this.controlSlide()
    }

    public drawStage() {
        /**绘制背景矩形*/
        this.stage.bgColor = "#363434"
        let bg_size_width, bg_size_height;
        bg_size_width = bg_size_height = Laya.stage.width * 0.8;
        this.bg_sp.size(bg_size_width, bg_size_height);
        this.bg_sp.graphics.drawRect(0, 0, bg_size_width, bg_size_height, "#BBADA0")
        this.bg_sp.pos(Laya.stage.width * 0.1, Laya.stage.height / 3);
        this.addChild(this.bg_sp)
        this.bg_sp_width = this.bg_sp.width;
        this.bg_sp_height = this.bg_sp.height;

        /**绘制内部小矩形*/
        let box_sp: Laya.Sprite = new Laya.Sprite();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                box_sp.graphics.drawRect(
                    (i + 1) * bg_size_width * 0.04 + i * bg_size_width * 0.2,
                    (j + 1) * bg_size_height * 0.04 + j * bg_size_height * 0.2,
                    bg_size_width * 0.2,
                    bg_size_width * 0.2, "#CDC1B4")
            }
        }
        this.bg_sp.addChild(box_sp)
        this.bg_sp.cacheAs = "bitmap"
    }


    public getRandomIndex() {
        /**出一个暂时的集合*/
        let mapTemp = new Map()
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                mapTemp.set(i + "" + j, -1)
            }
        }

        /**把集合里有数据的剔除*/
        this.data_map.forEach(function (k, v) {
            if (v != null) {
                mapTemp.delete(k)
            }
        })

        let count = 0; //遍历计数
        let index = Math.round(Math.random() * (mapTemp.size - 1))

        /**在没数据的集合里随机取一个位置*/
        for (let key of mapTemp.keys()) {
            if ((count++) == index) {
                let random_x = parseInt(key.toString().charAt(0));
                let random_y = parseInt(key.toString().charAt(1));
                return [random_x, random_y];
            }
        }
        return []
    }

    public createNumber(random_x, random_y) {
        let sp_number = new Laya.Sprite();
        sp_number.scale(0.8, 0.8)
        sp_number.size(this.bg_sp_width * 0.2, this.bg_sp_height * 0.2)
        sp_number.pos(this.bg_sp_width * 0.04 * (random_y + 1) + random_y * this.bg_sp_width * 0.2,
            this.bg_sp_height * 0.04 * (random_x + 1) + random_x * this.bg_sp_height * 0.2);
        sp_number.graphics.drawRect(0, 0, this.bg_sp_width * 0.2, this.bg_sp_height * 0.2, this.drawColorArr[0])

        Laya.timer.once(100, this, function () {
            sp_number.scale(1, 1);
            sp_number.graphics.fillText("2", sp_number.width * 0.5, sp_number.height * 0.5 - 40, "100px Microsoft YaHei", "#776E65", "center");
        });

        this.bg_sp.addChild(sp_number)
        this.data_map.set(random_x + "" + random_y, {"number": 2, "sp_number": sp_number})
    }

    public controlSlide() {
        /**按下时的坐标*/
        let self = this;
        let touch_x, touch_y
        touch_x = touch_y = 0
        // let total_number = 2;

        this.bg_sp.on(Laya.Event.MOUSE_DOWN, this, function () {
            touch_x = Laya.stage.mouseX
            touch_y = Laya.stage.mouseY
        })

        this.bg_sp.on(Laya.Event.MOUSE_UP, this, function () {
            let touch_now_x = Laya.stage.mouseX
            let touch_now_y = Laya.stage.mouseY
            let isMoved = false;                        //格子是否有移动，有移动才生产新的格子
            let moveCount = 0                               //移动的位置 初始为0
            let isDouble = false;                           // 是否合并了
            let new_number, new_color, new_font;    //new_number 新的格子数值，new_color 格子的颜色，new_font 新的字体
            if (Math.abs(touch_now_x - touch_x) > Math.abs(touch_now_y - touch_y) && touch_now_x > touch_x) {
                console.log("向右滑")
                for (let i = 0; i < 4; i++) {                               //遍历外部的4行
                    for (let j = 2; j >= 0; j--) {                          //从第三列开始倒序遍历
                        if (self.data_map.get(i + "" + j) != null) {        //第三列格子有值

                            for (let k = (j + 1); k <= 3; k++) {
                                if (self.data_map.get(i + "" + k) == null) {   // j后面一格为空
                                    moveCount++
                                } else if (self.data_map.get(i + "" + k) == self.data_map.get(i + "" + j)) {  //j的值==j的下一个格子
                                    moveCount++
                                    isDouble = true;
                                    break;
                                } else {
                                    break
                                }

                                if (moveCount > 0) {
                                    let sp_number:Laya.Sprite = self.data_map.get(i + "" + j).sp_number as Laya.Sprite;    //去除准备跑的一个格子
                                    let now_x = sp_number.x + self.bg_sp.width * 0.24 * moveCount  //向后移动的距离
                                    Laya.Tween.to(sp_number, { x: now_x }, 100, Laya.Ease.linearIn, null, 0);  //move

                                    //更新位置
                                    if (isDouble){
                                        self.bg_sp.removeChild(self.data_map.get(i + "" + (j + moveCount)).sp_number);//将原来的清除掉
                                        new_number = self.data_map.get(i + "" + j).number * 2;//数值翻倍

                                        for (let i_color = 2; i_color <= 15; i_color++) {//获取当前数值是 2 的多少次方，1024 是 2 的10次方
                                            if (Math.pow(2, i_color) == new_number) {
                                                new_color = i_color <= self.drawColorArr.length ? self.drawColorArr[i_color - 1] : self.drawColorArr[self.drawColorArr.length - 1];
                                                if (i_color < 4) {
                                                    new_font = 90;
                                                } else if (i_color < 7) {
                                                    new_font = 70;
                                                } else if (i_color < 10) {
                                                    new_font = 50;
                                                } else {
                                                    new_font = 40;
                                                }
                                                break;
                                            }
                                        }
                                        sp_number.graphics.clear();//清除原来的绘图指令，然后重绘
                                        sp_number.graphics.drawRect(0, 0, self.bg_sp_width * 0.2, self.bg_sp_height * 0.2, new_color);
                                        sp_number.graphics.fillText(new_number + "",
                                            sp_number.width * 0.5, sp_number.height * 0.5 - new_font / 2, new_font + "px SimHei", "#fff", "center");
                                        self.data_map.get(i + "" + j).number = new_number;//更新缓存的数据
                                    self.data_map.set(i + "" + (j + moveCount), { "number": self.data_map.get(i + "" + j).number, "sp_number": sp_number });
                                    self.data_map.set(i + "" + j, null);
                                    }
                                    isMoved = true;
                                }

                            }
                        }
                    }
                }
            }else if (Math.abs(touch_now_x - touch_x) > Math.abs(touch_now_y - touch_y) && touch_now_x < touch_x) {
                console.log("左移动");
                for (let i = 0; i < 4; i++) {
                    for (let j = 1; j < 4; j++) {//第1列是不需要再移动的
                        if (self.data_map.get(i + "" + j) != null) {
                            for (let k = (j - 1); k >= 0; k--) {
                                if (self.data_map.get(i + "" + k) == null) {
                                    moveCount++;
                                } else if (self.data_map.get(i + "" + j).number == self.data_map.get(i + "" + k).number) {
                                    moveCount++;
                                    isDouble = true;
                                    break;
                                } else {
                                    break;
                                }
                            }
                            //移动数字位置
                            if (moveCount > 0) {
                                let sp_number:Laya.Sprite = self.data_map.get(i + "" + j).sp_number as Laya.Sprite;    //去除准备跑的一个格子
                                let new_x = sp_number.x - self.bg_sp_width * 0.04 * moveCount - moveCount * self.bg_sp_width * 0.2;
                                Laya.Tween.to(sp_number, { x: new_x }, 100, Laya.Ease.linearIn, null, 0);
                                //更新位置数据
                                if (isDouble) {
                                    self.bg_sp.removeChild(self.data_map.get(i + "" + (j - moveCount)).sp_number);//将原来的清除掉
                                    new_number = self.data_map.get(i + "" + j).number * 2;//数值翻倍
                                    for (let i_color = 2; i_color <= 15; i_color++) {//获取当前数值是 2 的多少次方，1024 是 2 的10次方
                                        if (Math.pow(2, i_color) == new_number) {
                                            new_color = i_color <= self.drawColorArr.length ? self.drawColorArr[i_color - 1] : self.drawColorArr[self.drawColorArr.length - 1];
                                            if (i_color < 4) {
                                                new_font = 90;
                                            } else if (i_color < 7) {
                                                new_font = 70;
                                            } else if (i_color < 10) {
                                                new_font = 50;
                                            } else {
                                                new_font = 40;
                                            }
                                            break;
                                        }
                                    }
                                    sp_number.graphics.clear();//清除原来的绘图指令，然后重绘
                                    sp_number.graphics.drawRect(0, 0, self.bg_sp_width * 0.2, self.bg_sp_height * 0.2, new_color);
                                    sp_number.graphics.fillText(new_number + "",
                                        sp_number.width * 0.5, sp_number.height * 0.5 - new_font / 2, new_font + "px SimHei", "#fff", "center");
                                    self.data_map.get(i + "" + j).number = new_number;//更新缓存的数据
                                }
                                self.data_map.set(i + "" + (j - moveCount), { "number": self.data_map.get(i + "" + j).number, "sp_number": sp_number });
                                self.data_map.set(i + "" + j, null);
                                isMoved = true;
                            }
                        }
                    }
                }
            } else if (Math.abs(touch_now_x - touch_x) < Math.abs(touch_now_y - touch_y) && touch_now_y > touch_y) {
                console.log("下滑动");
                for (let i = 2; i >= 0; i--) {//第4行无需移动
                    for (let j = 0; j < 4; j++) {
                        if (self.data_map.get(i + "" + j) != null) {
                            for (let k = (i + 1); k <= 3; k++) {
                                if (self.data_map.get(k + "" + j) == null) {
                                    moveCount++;
                                } else if (self.data_map.get(i + "" + j).number == self.data_map.get(k + "" + j).number) {
                                    moveCount++;
                                    isDouble = true;
                                    break;
                                } else {
                                    break;
                                }
                            }
                            //移动数字位置
                            if (moveCount > 0) {
                                let sp_number:Laya.Sprite = self.data_map.get(i + "" + j).sp_number as Laya.Sprite;    //去除准备跑的一个格子
                                let new_y = sp_number.y + self.bg_sp_height * 0.04 * moveCount + moveCount * self.bg_sp_height * 0.2;
                                Laya.Tween.to(sp_number, { y: new_y }, 100, Laya.Ease.linearIn, null, 0);
                                //更新位置数据
                                if (isDouble) {
                                    self.bg_sp.removeChild(self.data_map.get((i + moveCount) + "" + j).sp_number);//将原来的清除掉
                                    let new_number, new_color, new_font;//new_number 新的格子数值，new_color 格子的颜色
                                    new_number = self.data_map.get(i + "" + j).number * 2;//数值翻倍
                                    for (let i_color = 2; i_color <= 15; i_color++) {//获取当前数值是 2 的多少次方，1024 是 2 的10次方
                                        if (Math.pow(2, i_color) == new_number) {
                                            new_color = i_color <= self.drawColorArr.length ? self.drawColorArr[i_color - 1] : self.drawColorArr[self.drawColorArr.length - 1];
                                            if (i_color < 4) {
                                                new_font = 90;
                                            } else if (i_color < 7) {
                                                new_font = 70;
                                            } else if (i_color < 10) {
                                                new_font = 50;
                                            } else {
                                                new_font = 40;
                                            }
                                            break;
                                        }
                                    }
                                    sp_number.graphics.clear();//清除原来的绘图指令，然后重绘
                                    sp_number.graphics.drawRect(0, 0, self.bg_sp_width * 0.2, self.bg_sp_height * 0.2, new_color);
                                    sp_number.graphics.fillText(new_number + "",
                                        sp_number.width * 0.5, sp_number.height * 0.5 - new_font / 2, new_font + "px SimHei", "#fff", "center");
                                    self.data_map.get(i + "" + j).number = new_number;//更新缓存的数据
                                }
                                self.data_map.set(((i + moveCount) + "" + j), { "number": self.data_map.get(i + "" + j).number, "sp_number": sp_number });
                                self.data_map.set(i + "" + j, null);
                                isMoved = true;
                            }
                        }
                    }
                }
            } else if (Math.abs(touch_now_x - touch_x) < Math.abs(touch_now_y - touch_y) && touch_now_y < touch_y) {
                console.log("上滑动");
                for (let i = 1; i < 4; i++) {//第1行无需移动，从第2行开始
                    for (let j = 0; j < 4; j++) {
                        if (self.data_map.get(i + "" + j) != null) {
                            for (let k = (i - 1); k >= 0; k--) {
                                if (self.data_map.get(k + "" + j) == null) {
                                    moveCount++;
                                } else if (self.data_map.get(i + "" + j).number == self.data_map.get(k + "" + j).number) {
                                    moveCount++;
                                    isDouble = true;
                                    break;
                                } else {
                                    break;
                                }
                            }
                            //移动数字位置
                            if (moveCount > 0) {
                                let sp_number:Laya.Sprite = self.data_map.get(i + "" + j).sp_number as Laya.Sprite;    //去除准备跑的一个格子
                                let now_y = sp_number.y - self.bg_sp_height * 0.04 * moveCount - moveCount * self.bg_sp_height * 0.2;
                                Laya.Tween.to(sp_number, { y: now_y }, 100, Laya.Ease.linearIn, null, 0);
                                //更新位置数据
                                if (isDouble) {
                                    self.bg_sp.removeChild(self.data_map.get((i - moveCount) + "" + j).sp_number);//将原来的清除掉
                                    new_number = self.data_map.get(i + "" + j).number * 2;//数值翻倍
                                    for (let i_color = 2; i_color <= 15; i_color++) {//获取当前数值是 2 的多少次方，1024 是 2 的10次方
                                        if (Math.pow(2, i_color) == new_number) {
                                            new_color = i_color <= self.drawColorArr.length ? self.drawColorArr[i_color - 1] : self.drawColorArr[self.drawColorArr.length - 1];
                                            if (i_color < 4) {
                                                new_font = 90;
                                            } else if (i_color < 7) {
                                                new_font = 70;
                                            } else if (i_color < 10) {
                                                new_font = 50;
                                            } else {
                                                new_font = 40;
                                            }
                                            break;
                                        }
                                    }

                                    sp_number.graphics.clear();//清除原来的绘图指令，然后重绘
                                    sp_number.graphics.drawRect(0, 0, self.bg_sp_width * 0.2, self.bg_sp_height * 0.2, new_color);
                                    sp_number.graphics.fillText(new_number + "",
                                        sp_number.width * 0.5, sp_number.height * 0.5 - new_font / 2, new_font + "px SimHei", "#fff", "center");
                                    self.data_map.get(i + "" + j).number = new_number;//更新缓存的数据
                                }
                                self.data_map.set(((i - moveCount) + "" + j), { "number": self.data_map.get(i + "" + j).number, "sp_number": sp_number });
                                self.data_map.set(i + "" + j, null);
                                isMoved = true;
                            }
                        }
                    }
                }
            }
            if (isMoved) {//只有各自发生移动，才生产新的数字
                let indexArr = self.getRandomIndex();
                if (indexArr.length == 0) {
                    alert("Game Over");
                } else {
                    self.createNumber(indexArr[0], indexArr[1]);
                }
            }
            console.log(self.data_map);
        });
    }

    public applyData(){
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.data_map.get([i+""+j]))
                {}
            }
        }
    }

    public register() {
    }

    public unRegister() {
    }
}