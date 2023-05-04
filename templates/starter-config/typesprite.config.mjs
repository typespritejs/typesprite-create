import {defineConfig, MainLoopType} from 'typesprite'

/**
 * Here you can modify the global config of your project.
 *
 * NOTE: Sometimes you need to restart the dev-server to see the changes
 *   (sorry, this will be fixed)
 *
 * Learn more: http://typespritejs.dev/start/config.html
 */
export default (defineConfig(({command}) => {

    // command
    //
    // Contains the command you used to start the server.
    //
    // "dev"   => npm run dev
    // "build" => npm run build
    //
    // This allows you to conditional change this here


    return {

        run: {
            /**
             * Here you can name all worlds that shall be started (*.edf files).
             *
             * You can also do this:
             *   startWorlds: ["core", "world"]     // -> core + world at the same time
             *   startWorlds: [["core"], ["world"]] // -> 1st: core, 2nd: world
             *
             * NOTE: The edf-file can be in any asset-sub-directory. No need for paths here.
             */
            startWorlds: "world",

            /**
             * FPS options:
             *
             * MainLoopType.Render causes onUpdate to be in Sync with onRender (default)
             * MainLoopType.Fixed causes onUpdate to be ensure 120fps
             * MainLoopType.Adjusted causes onUpdate to ensure 60FPS but goes higher if onRender is faster
             *
             * Note: this only effects onUpdate. The onRender will be called once per frame.
             */
            // mainloopType: MainLoopType.Fixed,
            // fixedMainloopFps: 120,            //< adjust the FPS for MainLoopType.Fixed here

        },

        /**
         * If you want to make use of Aseprite files in the spritesheets
         * you can specify the path to your application here.
         *
         * See: http://typespritejs.dev/start/config.html#aseprite-executable-path
         */
        // asepritePath: "/Applications/Aseprite.app/Contents/MacOS/aseprite",
        // asepritePath: "C:\\Program Files\\Aseprite\\Aseprite.exe";

        /** change the dev-server port */
        // servePort: 5001,

    }
}))