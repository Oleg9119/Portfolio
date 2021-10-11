window.Global       = {};
Global.Functions    = {};
Global.Data         = {};

// системные

    Global.Functions.Sleep              = async function (ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    Global.Functions.ActivityOn         = async function (_nameActivity = null) {

        let activity = document.querySelector(_nameActivity);
        if(activity){
            await Global.Functions.DocumentPartOnOff(activity, true);
        }

        let activities = document.querySelectorAll(".activity");
        for(let i = 0; i < activities.length; i++){
            if(activities[i] != activity)
                await Global.Functions.DocumentPartOnOff(activities[i], false);
        }
    }
    Global.Functions.ScreenOn           = async function (_nameActivity = null, _screenName = null) {
        if(_screenName){
            let activity        = document.querySelector(_nameActivity);
            if(activity){
                let screens         = activity.querySelectorAll(".screens");
                for(let i = 0; i < screens.length; i++){
                    if(screens[i]) Global.Functions.DocumentPartOnOff(screens[i], false);
                }
                let screen = document.querySelector(_screenName);
                if(screen) await Global.Functions.DocumentPartOnOff(screen, true);
            }
        }
    }
    Global.Functions.DocumentPartOnOff  = async function (_documentPart = null , _statusOnOff = false) {
        if(_documentPart){
            if(_statusOnOff){
                if(_documentPart.classList.contains("documentPart-off")) _documentPart.classList.remove("documentPart-off");
                _documentPart.classList.add("documentPart-on");
            }else{
                if(_documentPart.classList.contains("documentPart-on")) _documentPart.classList.remove("documentPart-on");
                _documentPart.classList.add("documentPart-off");
            }
        }
    }

    Global.Functions.GeolocationTracking        = async function (_OnOff = false,  _resolve = null, _reject = null) {
        if(_OnOff){
            let options = {
                maximumAge: 10000,
                timeout: 5000,
                enableHighAccuracy: true
            };
            let onSuccess = function (position) {
                if (_resolve) _resolve(position);
            };
            let onError = function (error) {
                if (_reject) _reject(error);
            };

            navigator.geolocation.watchPosition(onSuccess, onError, options);
        }else{
            navigator.geolocation.clearWatch();
        }
    }
    Global.Functions.GeolocationGetLocation     = async function (_resolve = null, _reject = null) {
            let options = {
                maximumAge: 10000,
                timeout: 5000,
                enableHighAccuracy: true
            };
            //               'Latitude: '          position.coords.latitude
            //               'Longitude: '         position.coords.longitude
            //               'Altitude: '          position.coords.altitude
            //               'Accuracy: '          position.coords.accuracy
            //               'Altitude Accuracy: ' position.coords.altitudeAccuracy
            //               'Heading: '           position.coords.heading
            //               'Speed: '             position.coords.speed
            //               'Timestamp: '         position.timestamp
            let onSuccess = function (position) {
                if (_resolve) _resolve(position);
            };
            //code : 2 - нет разрешения ; 3 - геолокация отключена
            let onError = function (error) {
                if (_reject) _reject(error);
            };
        navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    }
    Global.Functions.GeolocationGetUUID         = async function (_resolve = null, _reject = null) {
        if (window.plugins && window.plugins.uniqueDeviceID) {
            let onSuccess = function  (_uuid)
            {
                if(_resolve)
                    _resolve(_uuid);
            };
            let onError = function()
            {
                if(_reject)
                    _reject();
            };

            await window.plugins.uniqueDeviceID.get(onSuccess, onError);
        }else{
            if(_reject)
                _reject();
        }
}

    Global.Functions.ModaMessagesShow = async function (_textHtml = "", _buttonHtml = "ДА", _callback = null) {
        let documentPart    = document.querySelector("#modalMessages");
        let modalPartText   = documentPart.querySelector(".modal__text");
        let modalPartButton = documentPart.querySelector(".modal__button");

        modalPartText.innerHTML = _textHtml;
        modalPartButton.innerHTML = _buttonHtml;

        modalPartButton.removeEventListener('click', Global.Functions.DocumentPartOnOff);
        modalPartButton.removeEventListener('click', Global.Functions.ModaMessagesCallback);

        modalPartButton.addEventListener('click', Global.Functions.DocumentPartOnOff.bind(null, documentPart, false));
        modalPartButton.addEventListener('click', Global.Functions.ModaMessagesCallback.bind(null, _callback, true));

        Global.Functions.DocumentPartOnOff( documentPart, true)
    }
    Global.Functions.ModaOkNotShow = async function (_textHtml = "", _buttonOkHtml = "ДА", _buttonNotHtml = "НЕТ",  _callback = null) {
        let documentPart    = document.querySelector("#modalMessagesOkNot");
        let modalPartText       = documentPart.querySelector(".modal__text");
        let modalPartButtonOk   = documentPart.querySelector(".buttonOk");
        let modalPartButtonNot  = documentPart.querySelector(".buttonNot");

        modalPartText.innerHTML = _textHtml;
        modalPartButtonOk.innerHTML = _buttonOkHtml;
        modalPartButtonNot.innerHTML = _buttonNotHtml;

        modalPartButtonOk.removeEventListener('click', Global.Functions.DocumentPartOnOff);
        modalPartButtonOk.removeEventListener('click', Global.Functions.ModaMessagesCallback);

        modalPartButtonOk.addEventListener('click', Global.Functions.DocumentPartOnOff.bind(null, documentPart, false));
        modalPartButtonOk.addEventListener('click', Global.Functions.ModaMessagesCallback.bind(null, _callback, true));

        modalPartButtonNot.removeEventListener('click', Global.Functions.DocumentPartOnOff);
        modalPartButtonNot.removeEventListener('click', Global.Functions.ModaMessagesCallback);

        modalPartButtonNot.addEventListener('click', Global.Functions.DocumentPartOnOff.bind(null, documentPart, false));
        modalPartButtonNot.addEventListener('click', Global.Functions.ModaMessagesCallback.bind(null, _callback, false));

        Global.Functions.DocumentPartOnOff( documentPart, true)
    }

    Global.Functions.ModaMessagesCallback = async function (_callback, _data) {
        if(_callback) _callback(_data);
    }

// Кнопки

    Global.Functions.SetFunctionKeyDown = async function(_function = null) {
         Global.Functions.UsedKeyDown = _function;
     }
    Global.Functions.OnBackKeyDown = async function() {
        if(Global.Functions.UsedKeyDown){
            Global.Functions.UsedKeyDown();
        }else{
            window.navigator.app.exitApp();
        }
    }
    Global.Functions.ExitApp = async function() {
        window.navigator.app.exitApp();
    }
    Global.Functions.OnPause = async function() {
        //
    }
// Анимации

        Global.Functions.slideUp = (target, duration=500) => {

            target.style.transitionProperty = 'height, margin, padding';
            target.style.transitionDuration = duration + 'ms';
            target.style.boxSizing = 'border-box';
            target.style.height = target.offsetHeight + 'px';
            target.offsetHeight;
            target.style.overflow = 'hidden';
            target.style.height = 0;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout( () => {
                  target.style.display = 'none';
                  target.style.removeProperty('height');
                  target.style.removeProperty('padding-top');
                  target.style.removeProperty('padding-bottom');
                  target.style.removeProperty('margin-top');
                  target.style.removeProperty('margin-bottom');
                  target.style.removeProperty('overflow');
                  target.style.removeProperty('transition-duration');
                  target.style.removeProperty('transition-property');
                  //alert("!");
            }, duration);
        }
        Global.Functions.slideDown = (target, duration=500) => {
    
            target.style.removeProperty('display');
            let display = window.getComputedStyle(target).display;
            if (display === 'none') display = 'block';
            target.style.display = display;
            let height = target.offsetHeight;
            target.style.overflow = 'hidden';
            target.style.height = 0;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.boxSizing = 'border-box';
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + 'ms';
            target.style.height = height + 'px';
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            window.setTimeout( () => {
              target.style.removeProperty('height');
              target.style.removeProperty('overflow');
              target.style.removeProperty('transition-duration');
              target.style.removeProperty('transition-property');
            }, duration);
        }
        Global.Functions.slideToggle = (target, duration = 500) => {
            if (window.getComputedStyle(target).display === 'none') {
              return slideDown(target, duration);
            } else {
              return slideUp(target, duration);
            }
        }

// Managers

    Global.Functions.ActivityManager = async function (e, _nameActivity = null, _callbackActivity = null){
        let lostActivity = await ServiceDB.Functions.GetTempData("lostActivity");
        let time         = new Date().getTime();
        let activities   = document.querySelectorAll(".activity");

        if(lostActivity == null || lostActivity.time + (600 * 1000) < time){
            await ActivityMain.Functions.RemTempData();

            //новый запуск
            for(let i = 0; i < activities.length; i++){
                await Global.Functions.DocumentPartOnOff(activities[i],  false);
            }
            await ActivityUpdate.Functions.Start();
            await ServiceDB.Functions.SetTempData("lostActivity",{nameActivity: "Update", time: time})

        }else{
            let nameActivity = null;
            if(_nameActivity == null){
                //восстановление
                nameActivity = lostActivity.nameActivity;
            }else{
                //переход
                nameActivity = _nameActivity;
            }

            let flag = false;
            if(nameActivity == "Update") {
                for(let i = 0; i < activities.length; i++){
                    await Global.Functions.DocumentPartOnOff(activities[i],  false);
                }
                await ActivityUpdate.Functions.Start();
                flag = true;
            }
            if(nameActivity == "Intro"){
                for(let i = 0; i < activities.length; i++){
                    await Global.Functions.DocumentPartOnOff(activities[i],  false);
                }
                await ActivityIntro.Functions.Start(_callbackActivity);
                flag = true;
            }
            if(nameActivity == "Main") {
                for(let i = 0; i < activities.length; i++){
                    await Global.Functions.DocumentPartOnOff(activities[i],  false);
                }
                await ActivityMain.Functions.Start(_callbackActivity);
                flag = true;
            }
            if(nameActivity == "Handbook") {
                for(let i = 0; i < activities.length; i++){
                    await Global.Functions.DocumentPartOnOff(activities[i],  false);
                }
                await ActivityHandbook.Functions.Start(_callbackActivity);
                flag = true;
            }
            if(nameActivity == "Settings") {
                for(let i = 0; i < activities.length; i++){
                    await Global.Functions.DocumentPartOnOff(activities[i],  false);
                }
                await ActivitySettings.Functions.Start(_callbackActivity);
                flag = true;
            }

            if(flag)
                await ServiceDB.Functions.SetTempData("lostActivity",{nameActivity: nameActivity, time: time})
        }
    }
    Global.Functions.MenuManager     = async function (){
        let navNavigation            = document.querySelector('.nav .nav__navigation');
        if(navNavigation){
            let navNavigationSettings= navNavigation.querySelector('.nav__link--settings');
            if(navNavigationSettings){
                navNavigationSettings.addEventListener('click',  async () => {
                    window.Nav.toggle(false);
                    let lostActivity = await ServiceDB.Functions.GetTempData("lostActivity");
                    let nameActivity = null;
                    if(lostActivity && lostActivity.nameActivity)
                        nameActivity = lostActivity.nameActivity;
                    if(nameActivity != "Settings")
                        Global.Functions.ActivityManager(null,"Settings",nameActivity);
                })
            }
            let navNavigationHandbook= navNavigation.querySelector('.nav__link--handbook');
            if(navNavigationHandbook) {
                navNavigationHandbook.addEventListener('click', async () => {
                    window.Nav.toggle(false);
                    let lostActivity = await ServiceDB.Functions.GetTempData("lostActivity");
                    let nameActivity = null;
                    if (lostActivity && lostActivity.nameActivity)
                        nameActivity = lostActivity.nameActivity;
                    if(nameActivity != "Handbook")
                        Global.Functions.ActivityManager(null, "Handbook", nameActivity);
                })
            }
        }
    }

    //TODO ПОТОМ УДАЛИТЬ
    Global.Functions.ActivityTestStartE = async function () {

        // let activities = document.querySelectorAll(".activity");
        // for(let i = 0; i < activities.length; i++){
        //     Global.Functions.DocumentPartOnOff(activities[i],  false);
        // }
        // let activity = document.querySelector("#main");
        // Global.Functions.DocumentPartOnOff(activity,  true);
        //
        // await ActivityMain.Functions.ScreenOn("#screen-call");

        await Global.Functions.ActivityMainStart();
     //   await ActivityMain.Functions.ScreenOn("#screen-chat");
      //  ActivityMain.Screens.Chat.Functions.Start("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    }
    Global.Functions.ActivityTestStart = async function () {

        // let mainActivityMain = document.querySelector("#main");
        // const mainActivityScreenSettings = mainActivityMain.querySelector('#screen-settings');
        // const mainActivityScreenSettingsAddress = mainActivityScreenSettings.querySelector('#address-settings');
        // const mainActivityScreenSettingsPerson = mainActivityScreenSettings.querySelector('#person-settings');
        // const mainActivityScreenSettingsContacts = mainActivityScreenSettings.querySelector('#contacts-settings');
        // const mainActivityScreenSettingsAddresses = mainActivityScreenSettings.querySelector('#addresses-settings');

        // mainActivityMain.style.display = 'block';
        // mainActivityScreenSettings.style.display = 'block';
        // mainActivityScreenSettingsPerson.style.display = 'none';
        // mainActivityScreenSettingsAddress.style.display = 'block';
        // mainActivityScreenSettingsContacts.style.display = 'none';
        // mainActivityScreenSettingsAddresses.style.display = 'none';

        // const topBlockMain = document.querySelector('.top');
        // const contentBlockMain = document.querySelector('.content');

        // if(topBlockMain) {
        //     const topHeight = topBlockMain.offsetHeight;
        //     contentBlockMain.style.paddingTop = topHeight + 'px';
        // }


        //Чат ---------------------------------------------------->
        // let mainActivity = document.querySelector("#main");
        // const mainActivityScreenSettings = mainActivity.querySelector('#screen-chat');
        // mainActivity.style.display = 'flex';
        // mainActivityScreenSettings.style.display = 'flex';

        // const chatForm  = mainActivityScreenSettings.querySelector('#chat-send-message');
        // chatForm.style.display = 'hidden';

        // const chatCancel  = mainActivityScreenSettings.querySelector('#chat-cancel-call');
        // chatCancel.style.display = 'block';

        // const topBlock = document.querySelector('.top');
        // const contentBlock = document.querySelector('.content');
        // if(topBlock) {
        //     const topHeight = topBlock.offsetHeight;
        //     contentBlock.style.paddingTop = topHeight + 'px';
        // }

        //Настройки человека ---------------------------------------------------->
        // let mainActivity = document.querySelector("#settings");
        // const mainActivityScreenSettings = mainActivity.querySelector('#settings-content');
        // mainActivity.style.display = 'flex';
        // mainActivityScreenSettings.style.display = 'flex';

        // const chatForm  = mainActivityScreenSettings.querySelector('#settings-person');
        // chatForm.style.display = 'flex';
        // chatForm.style.paddingTop = 65 + 'px';


        // // const chatForm  = mainActivityScreenSettings.querySelector('#settings-contacts');
        // // chatForm.style.display = 'block';
        // // chatForm.style.paddingTop = 65 + 'px';

        // // const chatForm  = mainActivityScreenSettings.querySelector('#settings-contacts-form');
        // // chatForm.style.display = 'flex';
        // // chatForm.style.paddingTop = 65 + 'px';
        

        // // const chatCancel  = mainActivityScreenSettings.querySelector('#chat-cancel-call');
        // // chatCancel.style.display = 'block';

        // const topBlock = document.querySelector('.top');
        // const contentBlock = document.querySelector('.content');
        // if(topBlock) {
        //     const topHeight = topBlock.offsetHeight;
        //     contentBlock.style.paddingTop = topHeight + 'px';
        // }


        // let mainActivity = document.querySelector("#modal");
        // mainActivity.style.display = 'block';
        // const topBlock = document.querySelector('.top');
        // const contentBlock = document.querySelector('.content');
        // if(topBlock) {
        //     const topHeight = topBlock.offsetHeight;
        //     contentBlock.style.paddingTop = topHeight + 'px';
        // }



        // Global.Functions.ActivityMainStart()

        let mainActivity = document.querySelector("#main");
        const mainActivityScreenSettings = mainActivity.querySelector('#screen-call');
        // const addressMap = mainActivityScreenSettings.querySelector("#address-map");
        // const personCompact = mainActivityScreenSettings.querySelector("#person-compact");
        // const personSearch = mainActivityScreenSettings.querySelector("#person-search");
        // const subjectCompact = mainActivityScreenSettings.querySelector("#subject-compact");
        const personSearchContacts =   mainActivityScreenSettings.querySelector("#person-search-contacts");      
        mainActivity.style.display = 'block';
        mainActivityScreenSettings.style.display = 'block';
        // addressMap.style.display = "block";
        // personCompact.style.display = "block";
        // personSearch.style.display = "block";
        // subjectCompact.style.display = "block";
        personSearchContacts.style.display = "block";
        const topBlock = document.querySelector('.top');
        const contentBlock = document.querySelector('.content');
        if(topBlock) {
            const topHeight = topBlock.offsetHeight;
            contentBlock.style.paddingTop = topHeight + 'px';
        }



        // Global.Functions.ActivityMainStart()

        // let mainActivity = document.querySelector("#main");
        // const mainActivityScreenSettings = mainActivity.querySelector('#screen-call');

        // mainActivity.style.display = 'block';
        // mainActivityScreenSettings.style.display = 'block';

        // const topBlock = document.querySelector('.top');
        // const contentBlock = document.querySelector('.content');

        // if(topBlock) {
        //     const topHeight = topBlock.offsetHeight;
        //     contentBlock.style.paddingTop = topHeight + 'px';
        // }

        //Шаблон справочника ------------------->
        // let mainActivity = document.querySelector("#handbook");
        // mainActivity.style.display = 'flex';
        // const topBlock = document.querySelector('.top#handbook-header');
        // const contentBlock = document.querySelector('.content#handbook-content');
        // if(topBlock) {
        //     const topHeight = topBlock.offsetHeight;
        //     contentBlock.style.paddingTop = topHeight + 15 + 'px';
        // }

        //Карта ------------------->
        // let mainActivity = document.querySelector("#main");
        // const mainActivityScreenSettings = mainActivity.querySelector('#screen-call');
        // const mainActivityScreenSettingsMap = mainActivityScreenSettings.querySelector('.map__wrapper');
        // mainActivityScreenSettings.querySelector('.map__wrapper').display = 'flex';
        // const zeroNext = document.querySelector('#zero-next');
        // // mainActivityScreenSettings.querySelector('.map').style.height = '20vh';
        // // mainActivityScreenSettings.querySelector('.map__controls').style.height = '20vh';
        // mainActivity.style.display = 'flex';
        // zeroNext.style.display = 'flex';
        // mainActivityScreenSettings.style.display = 'flex';
        // const topBlock = document.querySelector('.top#handbook-header');
        // const contentBlock = document.querySelector('.content#handbook-content');
        // if(topBlock) {
        //     const topHeight = topBlock.offsetHeight;
        //     contentBlock.style.paddingTop = topHeight + 15 + 'px';
        // }
    }


// document.addEventListener("DOMContentLoaded", Global.Functions.ActivityUpdateStart)
// document.addEventListener("DOMContentLoaded", Global.Functions.ActivityIntroStart)
//  document.addEventListener("DOMContentLoaded", Global.Functions.ActivityTestStartE)

// document.addEventListener("DOMContentLoaded", Global.Functions.ActivityTestStart);
//document.addEventListener('deviceready', Global.Functions.ActivityIntroStart());
 //document.addEventListener('deviceready', Global.Functions.main,false);
// document.addEventListener('resume', Global.Functions.StartIntro, false);


document.addEventListener("DOMContentLoaded", Global.Functions.ActivityManager);
document.addEventListener("DOMContentLoaded", Global.Functions.MenuManager);
document.addEventListener('deviceready', function() {
        document.addEventListener("backbutton", Global.Functions.OnBackKeyDown, false);
        document.addEventListener("pause", Global.Functions.OnPause, false);
    }, false);
