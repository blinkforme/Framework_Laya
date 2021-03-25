
let EventType = {
    //// 通用刷新方法 ////
    EnterLoading: "EnterLoading",           // 开始显示loading
    ResProgress: "ResProgress",             // 资源加载中
    SubpkgProgress: "SubpkgProgress",       // 分包加载
    LoadingSuc: "LoadingSuc",               // loading结束
    OpenUI: "OpenUI",                       // 界面打开
    CloseUI: "CloseUI",                     // 界面关闭
    CheckNewDay: "CheckNewDay",             // 新的一天
    RefreshCacheData: "RefreshCacheData",    // 本地缓存旧于服务器数据
    RefreshScoreSV: "RefreshScoreSV",       // 积分策略
    AddDesktopSuccess: "AddDesktopSuccess",  //添加桌面图标成功
    //// 游戏业务逻辑事件定义 ////
    RefreshGold: "RefreshGold",             // 玩家金币
    RefreshLevel: "RefreshLevel",           // 关卡刷新
    RefreshSkin: "RefreshSkin",             // 刷新皮肤
    CloseSide: "CloseSide",                 // 卖量关闭或消失
    ChangeRoleModel:"ChangeRoleModel",      //改变自己模型

    ScreenResize:"ScreenResize",   //调整适配
    GoBangWin:"GoBangWin",  //五子棋输赢事件
    ChessEd:"ChessEd"  //五子棋输赢事件
}

export default EventType
