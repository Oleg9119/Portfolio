
window.ActivityIntro         = {};
        ActivityIntro.Functions      = {};
        ActivityIntro.Screens        = {};
        ActivityIntro.Data           = {};

//Data
        ActivityIntro.Data.DocumentPartName = "#intro";
        ActivityIntro.Data.FirstStart       = false;
        ActivityIntro.Data.Error            = false;

//Functions
        ActivityIntro.Functions.ActivityOn      = async function () {
            let activity = document.querySelector(ActivityIntro.Data.DocumentPartName);
            Global.Functions.DocumentPartOnOff(activity,  true);
        }
        ActivityIntro.Functions.ScreenOn        = async function (_screenName = null) {
            if(_screenName){
                let documentPart    = document.querySelector(ActivityIntro.Data.DocumentPartName);
                let screens         = documentPart.querySelectorAll(".screens");
                for(let i = 0; i < screens.length; i++){
                    Global.Functions.DocumentPartOnOff(screens[i], false);
                }
                let screen = document.querySelector(_screenName);
                if(screen) Global.Functions.DocumentPartOnOff(screen, true);
            }
        }
        ActivityIntro.Functions.LoaderData      = async function (_text = null, _percent = null) {
            let documentPart    = document.querySelector(ActivityIntro.Data.DocumentPartName);
            let loader          = documentPart.querySelector("#intro-loader");

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

        ActivityIntro.Functions.Start           = async function () {
            ActivityIntro.Functions.ActivityOn();
            ActivityIntro.Functions.ScreenOn("#intro-loader");

            await ActivityIntro.Functions.LoaderData("проверка пользователя");
            await Global.Functions.Sleep(100);

            //user check
            ActivityIntro.Functions.CheckStep();
        }

//----------------------------------------------------------------------------------------------------------------------

        ActivityIntro.Functions.CheckStep       = async function () {
            let checkResult = await ActivityIntro.Functions.CheckAll();

            if(checkResult){
                if(ActivityIntro.Data.FirstStart){
                    Global.Functions.ModaMessagesShow(Resources.Messages.RegEnd.message, Resources.Messages.RegEnd.buttonText, ActivityIntro.Functions.SyncStep());
                }else{
                    ActivityIntro.Functions.SyncStep();
                }
            }
        }
        ActivityIntro.Functions.SyncStep        = async function () {

            ActivityIntro.Functions.ScreenOn("#intro-loader");

            await ActivityIntro.Functions.LoaderData("синхронизация адресов");
            await ServiceSystem.Functions.AddressesSync();
            await Global.Functions.Sleep(100);

            await ActivityIntro.Functions.LoaderData("синхронизация поводов");
            await ServiceSystem.Functions.SubjectsSync();
            await Global.Functions.Sleep(100);

            await ActivityIntro.Functions.LoaderData("синхронизация контактов");
            await ServiceSystem.Functions.ContactSync();
            await Global.Functions.Sleep(100);

            ActivityIntro.Functions.FinalStep();
        }
        ActivityIntro.Functions.FinalStep       = async function () {
            Global.Functions.ActivityManager(null, "Main");
        }

//----------------------------------------------------------------------------------------------------------------------

        ActivityIntro.Functions.CheckAll        = async function () {
            let result          = false;
            let resultCheckUser = await ActivityIntro.Functions.CheckUser();

            if(resultCheckUser.status == "success"){
                if(resultCheckUser.records){
                    //старая
                    result = true;
                    await ServiceDB.Functions.SetUser(resultCheckUser.records);
                }else{
                    //новая
                    ActivityIntro.Data.FirstStart = true;
                    await ActivityIntro.Functions.ScreenOn("#intro-user");
                    await ActivityIntro.Screens.RegUser.Functions.Start();
                }
            }else{
                ActivityIntro.Data.Error = true;
                Global.Functions.ModaMessagesShow(resultCheckUser.message, "Подтвердить")
            }

            return result;
        }
        ActivityIntro.Functions.CheckUser       = async function () {

            let result           = {};
                result.status    = "success";
                result.records   = null;

            let localUser        = await ServiceDB.Functions.GetUser();

            if(localUser){
                //есть регистрация
                let serverUser   = await ServiceAPI.Functions.GetUser(localUser.id);
                result           = serverUser;
            }
            return result;
        }

//Screens

    //screen-reg
        ActivityIntro.Screens.RegUser                       = {};
        ActivityIntro.Screens.RegUser.Functions             = {};

        ActivityIntro.Screens.RegUser.Functions.Start       = async function () {
            Global.Functions.ModaMessagesShow(Resources.Messages.FirstStart.message, Resources.Messages.FirstStart.buttonText);
        }

        ActivityIntro.Screens.RegUser.Functions.RegUser     = async function () {

                let documentPart    = document.querySelector(ActivityIntro.Data.DocumentPartName);
                let personPart      = documentPart.querySelector(".person__form");

                let personData      = {};
                let checkData       = true;

                if (personPart){
                    let formData = new FormData(personPart);
                    formData.forEach(function (value, key) {
                        personData[key] = value;
                        if((key == "firstName" || key == "secondName" || key == "gender" || key == "birthday") && value == ""){
                            checkData = false;
                        }
                    });
                }

                if(checkData){
                    let resultRegUser = await ServiceAPI.Functions.RegUser (personData.firstName, personData.secondName, personData.thirdName, personData.gender, personData.dateBirth, personData.additional)

                    if (resultRegUser.status == 'error') {
                        ActivityIntro.Data.Error = true;
                        Global.Functions.ModaMessagesShow(resultRegUser.message, "Подтвердить");
                    }
                    if (resultRegUser.status == 'success') {
                        await ServiceDB.Functions.SetUser(resultRegUser.records);
                        ActivityIntro.Functions.CheckStep();
                    }
                }
        }

        ActivityIntro.Screens.RegUser.Functions.ListenersOn = async function () {
            let documentPart    = document.querySelector(ActivityIntro.Data.DocumentPartName);

            //form-person
            let personButton     = documentPart.querySelector(".form-person-button")
            if (personButton){
                personButton.addEventListener('click', () => {
                    ActivityIntro.Screens.RegUser.Functions.RegUser();
                })
            }
            let personForm      = documentPart.querySelector(".person__form");
            if (personForm){
                personForm.addEventListener('submit', (evt) => {
                    evt.preventDefault();
                });
            }
        }
        ActivityIntro.Screens.RegUser.Functions.ListenersOn();

    // //screen-reg
    //     ActivityIntro.Screens.RegAddress                = {};
    //     ActivityIntro.Screens.RegAddress.Functions      = {};
    //     ActivityIntro.Screens.RegAddress.Data           = {};
    //
    //     ActivityIntro.Screens.RegAddress.Data.addressObj= null;
    //
    //     ActivityIntro.Screens.RegAddress.Functions.Start                = async function () {
    //         ActivityIntro.Screens.RegAddress.Functions.UseAddresses(null);
    //     }
    //
    //     ActivityIntro.Screens.RegAddress.Functions.RegAddress           = async function () {
    //
    //             let documentPart = document.querySelector(ActivityIntro.Data.DocumentPartName);
    //             let addressPart = documentPart.querySelector(".address__form")
    //
    //             let addressData = {};
    //             let checkData = true;
    //
    //             if (addressPart) {
    //                 let formData = new FormData(addressPart);
    //                 formData.forEach(function (value, key) {
    //                     addressData[key] = value;
    //                     if ((key == "name") && value == "") {
    //                         checkData = false;
    //                     }
    //                 });
    //             }
    //             if(ActivityIntro.Screens.RegAddress.Data.addressObj == null){
    //                 checkData = false;
    //                 Global.Functions.ModaMessagesShow(Resources.Messages.SelectAddress.message, Resources.Messages.SelectAddress.buttonText);
    //             }
    //
    //             if (checkData) {
    //                 let localUser = await ServiceDB.Functions.GetUser();
    //                 let patient_id = localUser.id;
    //                 let address = ActivityIntro.Screens.RegAddress.Data.addressObj
    //
    //                 let resultRegAddress = await ServiceAPI.Functions.RegAddress(patient_id, addressData.name, address, addressData.floor, addressData.apartment, addressData.additional);
    //                 if (resultRegAddress.status == 'success') {
    //                     Global.Functions.ModaMessagesShow('!!!!!', "Подтвердить");
    //                 }
    //                 if (resultRegAddress.status == 'error') {
    //                     Global.Functions.ModaMessagesShow(resultRegAddress.message, "Подтвердить");
    //                 }
    //             }
    //
    //     }
    //     ActivityIntro.Screens.RegAddress.Functions.SetAddressesFilter   = async function (_text = "") {
    //         //дадата
    //         let resultServiceAPI = await ServiceAPI.Functions.GetAddressesFromText(_text);
    //         if(resultServiceAPI.status == "success"){
    //             await ActivityIntro.Screens.RegAddress.Functions.CreateAddressesBloks(resultServiceAPI.records, 5);
    //         }else{
    //             Global.Functions.ModaMessagesShow(resultServiceAPI.message, "Подтвердить")
    //         }
    //     }
    //     ActivityIntro.Screens.RegAddress.Functions.CreateAddressesBloks = async function (_addressesArray = [], _maxCol = 10) {
    //
    //         //создание элементов
    //         let addressesHtml   = "";
    //         if(_addressesArray){
    //             let i = 0;
    //             for(let key in _addressesArray){
    //                 if(i < _maxCol){
    //                     let itemValueString  = "" + _addressesArray[key].value;
    //                     let itemJSONString   = "" + JSON.stringify(_addressesArray[key]);
    //                     let itemFinalFlag    = "0";
    //                     if(_addressesArray[key].data.house) {
    //                         itemFinalFlag    = "1";
    //                     }
    //
    //                     let itemHtml         = "" ;
    //                         itemHtml += "<div class='search-input-result'>";
    //                         itemHtml += "<button  itemFinalFlag='" + itemFinalFlag + "'  itemJSONString='" + itemJSONString + "' itemValueString='" + itemValueString + "'class='address-search-button search-input-item' type='button'>";
    //                         itemHtml += "<span class='search-input-item__picture'></span>";
    //                         itemHtml += "<div class='search-input-item__address-wrapper'>";
    //                         itemHtml += "<span class='search-input-item__address'>" + itemValueString + "</span>";
    //                         itemHtml += "</div>";
    //                         itemHtml += "</button>";
    //                         itemHtml += "</div>";
    //
    //                     addressesHtml = addressesHtml + itemHtml;
    //                     //доп условия
    //                     //нет
    //                     i = i + 1;
    //                 }
    //             }
    //         }
    //
    //         let documentPart  = document.querySelector(ActivityIntro.Data.DocumentPartName);
    //         let addressesPart = documentPart.querySelector(".search-input-results");
    //         addressesPart.innerHTML = addressesHtml;
    //
    //         //события
    //         let arrayAddresses = addressesPart.querySelectorAll(".address-search-button")
    //         if (arrayAddresses){
    //             for(let i = 0; i < arrayAddresses.length; i++){
    //
    //                 let data = {}
    //                     data.itemValueString = arrayAddresses[i].getAttribute("itemValueString");
    //                     data.itemJSONString  = arrayAddresses[i].getAttribute("itemJSONString");
    //                     data.itemFinalFlag   = arrayAddresses[i].getAttribute("itemFinalFlag");
    //
    //                 arrayAddresses[i].addEventListener('click', () => {
    //
    //                     let documentPart = document.querySelector(ActivityIntro.Data.DocumentPartName );
    //                     let inputAddress = documentPart.querySelector(".search-input__field");
    //
    //                     if(data.itemFinalFlag == "1"){
    //                             inputAddress.value = data.itemValueString ;
    //                             inputAddress.focus();
    //                             inputAddress.setSelectionRange(inputAddress.value.length,inputAddress.value.length);
    //                             ActivityIntro.Screens.RegAddress.Functions.UseAddresses(data);
    //                         }else{
    //                             inputAddress.value = data.itemValueString ;
    //                             inputAddress.focus();
    //                             inputAddress.setSelectionRange(inputAddress.value.length,inputAddress.value.length);
    //                             ActivityIntro.Screens.RegAddress.Functions.UseAddresses(null);
    //                         }
    //                 })
    //             }
    //         }
    //
    //     };
    //     ActivityIntro.Screens.RegAddress.Functions.UseAddresses = async function (_addressObj = null) {
    //         let documentPart     = document.querySelector(ActivityIntro.Data.DocumentPartName);
    //         let addressString    = documentPart.querySelector("#intro-addressString");
    //
    //         if(addressString){
    //             if(_addressObj){
    //                 ActivityIntro.Screens.RegAddress.Data.addressObj = _addressObj.itemJSONString;
    //                 addressString.innerHTML = _addressObj.itemValueString;
    //             }else{
    //                 ActivityIntro.Screens.RegAddress.Data.addressObj = null;
    //                 addressString.innerHTML = "";
    //             }
    //         }
    //     }
    //
    //     ActivityIntro.Screens.RegAddress.Functions.ListenersOn = async function () {
    //         let documentPart    = document.querySelector(ActivityIntro.Data.DocumentPartName);
    //
    //         //поиск по строке
    //         let inputAddress = documentPart.querySelector(".search-input__field")
    //         let closeAddress = documentPart.querySelector(".search-input__close-button")
    //         if (inputAddress) {
    //             inputAddress.addEventListener('input', () =>  {
    //                 ActivityIntro.Screens.RegAddress.Functions.SetAddressesFilter(inputAddress.value);
    //             })
    //         }
    //         if (inputAddress && closeAddress) {
    //             closeAddress.addEventListener('click', () =>  {
    //                 inputAddress.value = "";
    //                 ActivityIntro.Screens.RegAddress.Functions.UseAddresses(null);
    //                 ActivityIntro.Screens.RegAddress.Functions.SetAddressesFilter(inputAddress.value);
    //             })
    //         }
    //
    //         //form-address
    //         let addressPart     = documentPart.querySelector(".form-address-button")
    //         if (addressPart){
    //             addressPart.addEventListener('click', () => {
    //                 ActivityIntro.Screens.RegAddress.Functions.RegAddress();
    //             });
    //         }
    //         let addressForm      = documentPart.querySelector(".address__form");
    //         if (addressForm){
    //             addressForm.addEventListener('submit', (evt) => {
    //                 evt.preventDefault();
    //             });
    //         }
    //     }
    //     ActivityIntro.Screens.RegAddress.Functions.ListenersOn();

