class ENV {


    /**
     * 设置一个参数，可控制游戏内部功能模块或参数数值
     * require:   true:不可被默认值代替   false:可被默认值代替
     * default:   设置默认值，如果链接未携带参数则可用默认值代替
     * name:   参数名称
     * reg:   参数所要求的正则格式，若不匹配则用默认值代替
     */

    public static config =
        {
            rate: {require: false, default: 100, name: "rate", reg: /[\d]$/}
        }
}