
window.ActivityUpdate         = {};
        ActivityUpdate.Functions      = {};
        ActivityUpdate.Screens        = {};
        ActivityUpdate.Data           = {};

//Data
        ActivityUpdate.Data.DocumentPartName = "#update";

//Functions
        ActivityUpdate.Functions.ActivityOn      = async function () {
            let activity = document.querySelector("#update");
            Global.Functions.DocumentPartOnOff(activity,  true);
        }
        ActivityUpdate.Functions.ScreenOn        = async function (_screenName = null) {
            if(_screenName){
                let documentPart    = document.querySelector("#update");
                let screens         = documentPart.querySelectorAll(".screens");
                for(let i = 0; i < screens.length; i++){
                    Global.Functions.DocumentPartOnOff(screens[i], false);
                }
                let screen = document.querySelector(_screenName);
                if(screen) Global.Functions.DocumentPartOnOff(screen, true);
            }
        }
        ActivityUpdate.Functions.LoaderData       = async function (_text = null, _percent = null) {
            let documentPart    = document.querySelector(ActivityUpdate.Data.DocumentPartName);
            let loader          = documentPart.querySelector("#update-loader");

            if(_text != null){
                let text            = loader.querySelector(".loader__text");
                text.innerHTML      = _text
                Global.Functions.DocumentPartOnOff (text, true);
            }
            if(_percent != null){
                let bar             = loader.querySelector(".ldBar");
                await bar.ldBar.set(_percent,false)
                Global.Functions.DocumentPartOnOff (bar, true);
            }
        }


        ActivityUpdate.Functions.Start           = async function () {
                ActivityUpdate.Functions.ActivityOn();
                ActivityUpdate.Functions.ScreenOn("#update-loader");

                //user check
                ActivityUpdate.Functions.CheckStep();
            }

//----------------------------------------------------------------------------------------------------------------------


        ActivityUpdate.Functions.CheckStep    = async function () {
            await ActivityUpdate.Functions.LoaderData("определение устройства")

            let flag = false;

                document.addEventListener('deviceready', async function() {
                    flag = true;

                    let uuid = await ServiceDB.Functions.GetUUID();
                    if(uuid == null){
                        let onGet = async function  (_uuid) {
                            await ServiceDB.Functions.SetUUID(_uuid);
                        };
                        let onError = async function() {
                            await ServiceDB.Functions.SetUUID(null)
                        };
                        await Global.Functions.GeolocationGetUUID(onGet, onError);
                    }

                    await Global.Functions.Sleep(100);
                    ActivityUpdate.Functions.FinalStep ();
                });

            if(!flag){
                await Global.Functions.Sleep(100);
                ActivityUpdate.Functions.FinalStep ();
                }

            }

        ActivityUpdate.Functions.FinalStep    = async function () {
            Global.Functions.ActivityManager(null, "Intro");
            }