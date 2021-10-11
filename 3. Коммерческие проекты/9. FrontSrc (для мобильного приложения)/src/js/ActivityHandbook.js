
window.ActivityHandbook         = {};
        ActivityHandbook.Functions      = {};
        ActivityHandbook.Screens        = {};
        ActivityHandbook.Data           = {};
        ActivityHandbook.Objects        = {};
//Data
        ActivityHandbook.Data.DocumentActivityName  = "#handbook";
        ActivityHandbook.Data.IframeSRC             = "https://ssmp-call-server.1ckab.ru/pages/spravochnik.html";
        ActivityHandbook.Data.CallbackActivity      = null;

//Functions
        ActivityHandbook.Functions.ActivityOn       = async function () {
            await Global.Functions.ActivityOn(ActivityHandbook.Data.DocumentActivityName);
        }
        ActivityHandbook.Functions.ScreenOn         = async function (_screenName = null) {
            await Global.Functions.ScreenOn (ActivityHandbook.Data.DocumentActivityName, _screenName);
        }

        ActivityHandbook.Functions.Start            = async function (_callbackActivity) {
                        ActivityHandbook.Data.CallbackActivity      = _callbackActivity;

                        await Global.Functions.SetFunctionKeyDown(ActivityHandbook.Functions.FunctionKeyDown);

                        await ActivityHandbook.Functions.ActivityOn();
                        await ActivityHandbook.Functions.LoadFrame();
                    }

//----------------------------------------------------------------------------------------------------------------------
        ActivityHandbook.Objects.Iframe             = null;

        ActivityHandbook.Functions.FunctionKeyDown  = async function () {
            if(!ActivityHandbook.Objects.Iframe || ActivityHandbook.Objects.Iframe.contentWindow.location.href == ActivityHandbook.Data.IframeSRC ){
                if(ActivityHandbook.Data.CallbackActivity && ActivityHandbook.Data.CallbackActivity != ActivityHandbook.Data.DocumentActivityName){
                    Global.Functions.ActivityManager(null, ActivityHandbook.Data.CallbackActivity);
                }else{
                    Global.Functions.ActivityManager(null, "Main");
                }
            }else{
                ActivityHandbook.Objects.Iframe.contentWindow.history.back();
            }
        }
        ActivityHandbook.Functions.LoadFrame        = async function () {
            let documentPart = document.querySelector(ActivityHandbook.Data.DocumentActivityName);
            let handbookPart = documentPart.querySelector(".content");
            if(handbookPart){
                handbookPart.innerHTML          = "<iframe class='mainContent__iframe' id = 'handbook_iframe_id'  src='" + ActivityHandbook.Data.IframeSRC + "'></iframe>"
                ActivityHandbook.Objects.Iframe = handbookPart.querySelector("#handbook_iframe_id");
             }
        }
