import ConfigMgr from "../mgr/ConfigMgr";

export default class cfg_vip
{
    public static init(sheet:any):cfg_vip
    {
        let a = new cfg_vip();

        
        a.register_vip_extra_reward_nums=sheet[1];
        a.reward_item_price2=sheet[2];
        a.reward_item_price1=sheet[3];
        a.is_send_gift=sheet[18];
        a.register_vip_extra_reward_ids=sheet[4];
        a.reset_basic_coin=sheet[15];
        a.reward_item_price1_title=sheet[16];
        a.real_hitup_rate=sheet[6];
        a.right_title=sheet[7];
        a.right_content=sheet[8];
        a.vip_package=sheet[9];
        a.vip=sheet[10];
        a.base_coin_values=sheet[17];
        a.contest_score_vip_rate=sheet[11];
        a.exp=sheet[12];
        a.base_coin_times=sheet[13];
        a.vip_reward_image=sheet[0];
        a.id=sheet[14];
        a.change=sheet[5];
        a.hide_txt=sheet[19];

        return a;
    }

    public static instance(key:any):cfg_vip
	{
        return ConfigMgr.getConfObject("cfg_vip",key);
	}


    
    public register_vip_extra_reward_nums:number[];
    public reward_item_price2:number;
    public reward_item_price1:number;
    public is_send_gift:number;
    public register_vip_extra_reward_ids:number[];
    public reset_basic_coin:number;
    public reward_item_price1_title:string;
    public real_hitup_rate:number;
    public right_title:string;
    public right_content:string[];
    public vip_package:number[];
    public vip:number;
    public base_coin_values:number;
    public contest_score_vip_rate:number;
    public exp:number;
    public base_coin_times:number;
    public vip_reward_image:string;
    public id:number;
    public change:number[];
    public hide_txt:string;


}