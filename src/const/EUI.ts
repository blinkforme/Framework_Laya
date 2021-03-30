/**
 * UI 枚举 { [key: string]: IUIConfig }
 *
 * 
    class: string;              // UI类路径
    mask?: boolean;             // 是否显示遮罩
    banner?: boolean;           // 是否显示banner
    tween?: boolean;            // 显示和隐藏伴随动画
    res?: any;                  // 预加载资源，格式同Laya.loader.load，暂无效
    misTouch?:any;              // 误触传入button名字即可
    name?:string;               // 界面名称 一般用于界面打点
 */
let EUI = {

    /////////////////////////////////////////////////////////////////////
    // 通用UI
    DebugView: {
        class: "script/DebugView.ts"
    },
    LoadingView: {
        class: "script/LoadingView.ts"
    },
    HomeView: {
        class: "script/HomeView.ts"
    },
    GameView: {
        class: "script/GameView.ts",
    },
    RankingView: {
        class: "script/RankingView.ts",
        mask: true
    },
    TrySkinView: {
        class: "script/TrySkinView.ts",
        mask: true
    },
    SettingView: {
        class:"script/SettingView.ts",
        mask:true,
        banner:true,
    },
    /////////////////////////////////////////////////////////////////////

    FailView: {
        class: "script/FailView.ts",
        mask: true,
        banner: true,
        misTouch:'imgRestart'
    },
    ReviveView: {
        class: "script/ReviveView.ts",
        mask: true,
        banner: true
    },
    ResultView: {
        class: "script/ResultView.ts",
        mask: true,
        banner: true
    },
    EliminateView: {
        class: "script/eliminateGame/EliGameScene.ts",
        mask: true,
        banner: true,
        misTouch:'imgRestart'
    },
    PickBallView: {
        class: "script/pickBall/PickBallGame.ts",
        mask: true,
        banner: true,
        misTouch:'imgRestart'
    },
    ChessView: {
        class: "script/goBangGame/GoBangScene.ts",
        mask: true,
        banner: true,
        misTouch:'imgRestart'
    },
    NumGameView: {
        class: "script/2048Game/NumGameScene.ts",
        mask: true,
        banner: true,
        misTouch:'imgRestart'
    },
    KlotskiView: {
        class: "script/klotski/KlotskiView.ts",
        mask: true,
        banner: true,
        misTouch:'imgRestart'
    },
}

export default EUI;