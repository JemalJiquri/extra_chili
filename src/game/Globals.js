class Globals {
    static width = 2048;
    static height = 1024;

    static minWidth = 1300;

    static windowWidth = 2048;
    static windowHeight = 1024;
    static SoundNameID = 0
    static isTest = false;
    static backgroundColor = 0x000000;
    static LoaderConfig = {
        preload: [["LoaderLogo", "atlass/LoaderLogo.png"]],
        load: [
            ["Animations0", "atlass/Animations0.json"],
            ["Animations1", "atlass/Animations1.json"],
            ["Animations2", "atlass/Animations2.json"],
            ["Animations3", "atlass/Animations3.json"],
            ["Animations4", "atlass/Animations4.json"],
            ["Animations5", "atlass/Animations5.json"],
            ["Animations6", "atlass/Animations6.json"],
            ["Animations7", "atlass/Animations7.json"],
            ["Animations8", "atlass/Animations8.json"],
            ["Animations9", "atlass/Animations9.json"],
            ["Animations10", "atlass/Animations10.json"],
            ["Animations11", "atlass/Animations11.json"],
            ["Animations12", "atlass/Animations12.json"],
            ["Backgrounds0", "atlass/Backgrounds0.json"],
            ["Backgrounds1", "atlass/Backgrounds1.json"],
            ["Backgrounds2", "atlass/Backgrounds2.json"],
            ["Backgrounds3", "atlass/Backgrounds3.json"],
            ["Backgrounds4", "atlass/Backgrounds4.json"],
            ["Backgrounds5", "atlass/Backgrounds5.json"],
            ["Backgrounds6", "atlass/Backgrounds6.json"],
            ["Backgrounds7", "atlass/Backgrounds7.json"],
            ["GameElements0", "atlass/GameElements0.json"],
            ["GameElements1", "atlass/GameElements1.json"],
            ["GameElements2", "atlass/GameElements2.json"],
            ["GameElements3", "atlass/GameElements3.json"],
            ["GameElements4", "atlass/GameElements4.json"],
            ["GameElements5", "atlass/GameElements5.json"],
            ["GameElements6", "atlass/GameElements6.json"],
            ["GameElements7", "atlass/GameElements7.json"],
            ["GameElements8", "atlass/GameElements8.json"],
            ["GameElements9", "atlass/GameElements9.json"],
            ["GameElements10", "atlass/GameElements10.json"],
            ["GameElements11", "atlass/GameElements11.json"],
            ["GameElements12", "atlass/GameElements12.json"],
            ["GameElements13", "atlass/GameElements13.json"],
            ["GameElementsHigh0", "atlass/GameElementsHigh0.json"],
            ["GameElementsHigh1", "atlass/GameElementsHigh1.json"],
            ["GameElementsHigh2", "atlass/GameElementsHigh2.json"],
            ["CommonElementsHigh0", "atlass/CommonElementsHigh0.json"],
            ["ExtraChilliLayouts", "atlass/ExtraChilliLayouts.json"],
            ["Common", "atlass/Common.json"],
            ["FlagARotated", "images/FlagARotated.png"],
            ["FlagBRotated", "images/FlagBRotated.png"],
            ["D891", "fonts/D891.fnt"],
            ["Panel_A", "images/Panel_A.png"],
            ["Panel_B", "images/Panel_B.png"],
            ["Panel_C", "images/Panel_C.png"],
            ["Panel_D", "images/Panel_D.png"],
            ["Panel_E", "images/Panel_E.png"],
            ["Panel_F", "images/Panel_F.png"],
            ["Panel_G", "images/Panel_G.png"],
            ["Panel_K", "images/Panel_K.png"],
            ["Panel_J", "images/Panel_J.png"],
            ["Panel_L", "images/Panel_L.png"],
            ["Panel_H", "images/Panel_H.png"],
        ],
        postload: [],
    };

    static firstMessage = {
        secondaryReel: ["S1", "S2", "S3", "S4"],
        machineState: {},
        winnings: [],
        symbols: [
            ["S3", "S3", "S3", "S3", "S3", "S3", "K"],
            ["A", "SC", "N", "S1"],
            ["S2", "Q", "K", "N", "Q", "Q", "S2"],
            ["S4", "N", "K", "T", "S4", "Q", "S3"],
            ["S1", "S3", "SC", "S4", "S4"],
            ["S4", "T", "S2", "K", "T"],
        ],
        reelHeights: [7, 3, 6, 6, 4, 5],
        stops: [5, 140, 80, 17, 102, 8],
    };

    static PixiApp = null;
    static Game = null;
    static WS = null;
    //debug
    static debugGraphics = null;
    static debugElements = [];
    static buffers = [];
    static downPanel = null;
}

export default Globals;
