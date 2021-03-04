import { ui } from "../ui/layaMaxUI";
import UIMgr from "../mgr/UIMgr";
import EUI from "../const/EUI";
import GameMgr from "../mgr/GameMgr";
import UserData from "../mgr/UserData";
import AldSDK from "../platform/AldSDK";
import Utils from "../util/Utils";

/**
 * 失败页——失败，进度小于50%触发
 */
export default class FailView extends ui.view.FailViewUI {

    /**
     * 重写
     */
    public onEnable(): void {
        super.onEnable();
        var self = this, imgRestart = self.imgRestart;
        self.regClick(imgRestart, self.onRestart);
    }

    /**
     * 点击重新开始
     */
    protected onRestart(): void {
            UIMgr.closeUI(EUI.FailView);
            GameMgr.instance.restart();
    }
}