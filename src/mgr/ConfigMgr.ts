export default class ConfigMgr {

    public static manifestPath: string = "res/config/manifest.json";
    /*配表远程路径*/
    private static _allConfigPath: string = "res/config/config.json";

    private static _cfg_names: any;

    public static sheet_cache: any = {}

    constructor() {

    }

    public static getConfigPath(): string {
        return ConfigMgr.allConfigPath;
    }

    public static getClazzBySheetName(sheetName: string): any {
        return this._cfg_names[sheetName]
    }

    public static getConfBySheet(sheetName: string): any {
        return this.sheet_cache[sheetName];
    }

    /*
     * cfg_names:所有配表名称,例如：cfg_names:any={"cfg_anicollision":cfg_anicollision}
     * */
    public static init(cfg_names: any, callback: any = null): void {
        this._cfg_names = cfg_names;
        Laya.loader.load([{
            url: this.allConfigPath,
            type: Laya.Loader.JSON
        }], Laya.Handler.create(ConfigMgr, this.initConfig, [callback]));
    }

    private static initConfig(callback: any = null): void {
        let dicRes: any;
        dicRes = Laya.loader.getRes(this._allConfigPath);
        for (let sheetName in this._cfg_names) {
            let a: any = {};
            let sheetDicRes: any = dicRes[sheetName];

            let cfg: any = this.getClazzBySheetName(sheetName);
            for (let key in sheetDicRes) {

                a[key] = cfg.init(sheetDicRes[key])
            }
            this.sheet_cache[sheetName] = a
        }
        if (callback != null) {
            callback();
        }
    }

    public static getConfObject(sheetName: string, id: any): any {
        return this.sheet_cache[sheetName][id];
    }

    public static getConfValue(sheetName: string, id: any, name: string): any {
        return this.sheet_cache[sheetName][id][name];
    }

    public static items(cfg_name: string): any[] {
        let cfgs: any = this.sheet_cache[cfg_name]
        let arr: any[] = []
        for (let i of cfgs) {
            arr.push(cfgs[i])
        }
        return arr
    }

    public static filter(cfg_name: string, func: Function): any[] {
        let items: any[] = ConfigMgr.items(cfg_name);

        if (!func) {
            return items;
        }
        let arr: any[] = [];
        for (let i of items) {
            if (func(items[i])) {
                arr.push(items[i])
            }
        }
        return arr
    }

    public static groupby(cfg_name: string, field: any): any {
        let items: any[] = ConfigMgr.items(cfg_name);
        let d: any = {};

        for (let i of items) {
            let item: any = items[i];

            let value: any = item[field];
            if (d[value] === undefined) {
                d[value] = [];
            }
            d[value].push(item)
        }
        return d;
    }


    public static get allConfigPath(): string {
        return this._allConfigPath;
    }

    public static set allConfigPath(value: string) {
        this._allConfigPath = value;
    }
}
