export default class StartParam {

    static instance = new StartParam();
    public config:object = {}; //初始默认值
    public params:object = {}; //整理完成后的值
    constructor(){

    }

    /**
     * 初始化启动参数
     * require:   true:不可被默认值代替   false:可被默认值代替
     * default:   设置默认值，未携带参数则用默认值代替
     * name:   参数名称
     *
     * 举例:  player: {"require": false, "default": "xiaoliang1", "name": "player"}
     */



    /**是否可被设定好的默认值代替*/
    public paramIsValid(param:any,config:object):boolean{
        if (this.config['require'])
        {
            if (!param)
            {
                console.log(config["name"] + " is required")
                return false
            }
        }
        return true;
    }

    /**取值前检测是否为空值*/
    public isEmpty(obj:any):boolean{
        if (typeof obj == 'boolean')
        {
            return false
        }

        if (obj != null && obj != 'undefined')
        {
            return false
        }

        return true
    }

    /**初始化-----先将设置好的值存进config*/
    public init(res:object):void
    {
        this.config = res;
    }

    /**取值
     * name  参数名
     * */
    public getParam(name:string):any
    {
        if (!this.isEmpty(this.params[name]))
        {
            return this.params[name]
        }else
        {
            return null;
        }
    }

    /**用新的数据赋值
     *
     * kv：从html链接上拿的参数{key:value形式}
     * isFirst：是否初次赋值
     *
     * */
    public parseParam(kv:object, isFirst:boolean = false):void
    {
        if (isFirst)
        {
            for (let param_key in this.config)
            {
                let conf = this.config[param_key]
                let value = kv[param_key]
                let isValid:Boolean = this.paramIsValid(value, conf)

                if (isValid)
                {
                    if (value == "" || value == null || value == "undefined")
                    {
                        kv[param_key] = conf["default"]
                    }
                } else
                {
                    console.log("param error")
                }
            }
        }

        for (let i in kv)
        {
            this.params[i] = kv[i]
        }
    }

    /**解析HTML参数*/
    public parseHtmlParamString():void
    {
        let kv = {};
        let url = window.document.location.href.toString()
        let u = url.split("?");
        if (u[1])
        {
            u = u[1].split("&");
            for (let i in u)
            {
                let j = u[i].split("=");
                kv[j[0]] = j[1];
            }
        }

        this.parseParam(kv, true)
    }
}