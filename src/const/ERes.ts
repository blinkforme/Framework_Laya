/**
 * 为对象添加目录
 * @param obj 
 * @param root 
 */
let addRoot = function (obj: { [key: number]: string }, root: string) {
    for (let i in obj) {
        obj[i] = root + obj[i];
    }
};

let AtlasRoot = "res/atlas/ui/";
let SoundRoot = "music/";
let JsonRoot = "nativescene/";

// 合图文件
let EAtlas = {
    Game: "common.atlas",
};
addRoot(EAtlas, AtlasRoot);



// 音效文件
let ESound = {
    Bgm: "bgmusic.mp3",
    BtnClick: "click.mp3"
};
addRoot(ESound, SoundRoot);

export {  ESound, EAtlas};

