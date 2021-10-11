
window.ActivityMain         = {};
    ActivityMain.Functions      = {};
    ActivityMain.Screens        = {};
    ActivityMain.Data           = {};
    ActivityMain.Objects        = {};

//Data
    ActivityMain.Data.DocumentActivityName  = "#main";

//Functions
    ActivityMain.Functions.ActivityOn       = async function () {
        await Global.Functions.ActivityOn(ActivityMain.Data.DocumentActivityName);
    }
    ActivityMain.Functions.ScreenOn         = async function (_screenName = null) {
        await Global.Functions.ScreenOn (ActivityMain.Data.DocumentActivityName, _screenName);
    }

    ActivityMain.Functions.Start            = async function () {
        await ActivityMain.Functions.ActivityOn();

        if(await ActivityMain.Screens.Call.Objects.StagesData.GetData("chat")){
            await ActivityMain.Functions.ScreenOn(ActivityMain.Screens.Chat.DocumentScreenName);
            ActivityMain.Screens.Chat.Functions.Start();
        }else{
            await ActivityMain.Functions.ScreenOn(ActivityMain.Screens.Call.DocumentScreenName);
            ActivityMain.Screens.Call.Functions.Start();
        }

      }
    ActivityMain.Functions.RemTempData      = async function () {
        await ActivityMain.Screens.Call.Objects.StagesData.RemData();
        await ActivityMain.Screens.Chat.Objects.Chat.RemData();
    };
//Screens

//----------------------------------------------------------------------------------------------------------------------

    //screen-call

        ActivityMain.Screens.Call                                   = {};
        ActivityMain.Screens.Call.Functions                         = {};
        ActivityMain.Screens.Call.BlocksStates                      = [];
        ActivityMain.Screens.Call.Data                              = {};
        ActivityMain.Screens.Call.DocumentScreenName                = "#screen-call";
        ActivityMain.Screens.Call.Objects                           = {};

        ActivityMain.Screens.Call.Objects.Stages                    = {};
        ActivityMain.Screens.Call.Objects.Stages.ActiveStage        = null;
        ActivityMain.Screens.Call.Objects.Stages.History            = [];

        ActivityMain.Screens.Call.Objects.StagesData                = {};
        ActivityMain.Screens.Call.Objects.StagesData.RemData        = async function (){
            await ActivityMain.Screens.Call.Objects.StagesData.SetData("map", null);
            await ActivityMain.Screens.Call.Objects.StagesData.SetData("S1", null);
            await ActivityMain.Screens.Call.Objects.StagesData.SetData("S1_1", null);
            await ActivityMain.Screens.Call.Objects.StagesData.SetData("S2", null);
            await ActivityMain.Screens.Call.Objects.StagesData.SetData("S2_1", null);
            await ActivityMain.Screens.Call.Objects.StagesData.SetData("S3", null);
            await ActivityMain.Screens.Call.Objects.StagesData.SetData("S4", null);
            await ActivityMain.Screens.Call.Objects.StagesData.SetData("history", []);
        }
        ActivityMain.Screens.Call.Objects.StagesData.SetData        = async function (_name = null, _obj = null){
            let result = null;
            if(_name){
                result = await ServiceDB.Functions.SetTempData(_name , _obj);
            }
            return result;
        };
        ActivityMain.Screens.Call.Objects.StagesData.GetData        = async function (_name = null){
            let result = null;
            if(_name){
                result = await ServiceDB.Functions.GetTempData(_name)
            }
            return result;
        };

        ActivityMain.Screens.Call.Functions.BlocksOn                = async function (_panelsName = []) {
            if(_panelsName){
                let documentPart    = document.querySelector("#main");
                let panels          = documentPart.querySelectorAll(".panel-block");

                let useAnimation    = false;
                for(let i = 0; i < panels.length; i++){
                    if(_panelsName.indexOf(panels[i].getAttribute("id")) == -1 ){
                        Global.Functions.slideUp(panels[i], 300);
                        useAnimation = true;
                    } else {
                        Global.Functions.slideDown(panels[i], 300);
                        useAnimation = true;
                    }
                }

                if( useAnimation ) {
                    await Global.Functions.Sleep(300);
                    await ActivityMain.Screens.Call.Objects.Map.MapResize();
                }
            }
        };
        ActivityMain.Screens.Call.Functions.StagesManagerActiveStage= async function (_stagesName = null) {
            ActivityMain.Screens.Call.Objects.Stages.ActiveStage    = _stagesName;
        }
        ActivityMain.Screens.Call.Functions.StagesManagerNext       = async function (_stagesName = null) {

            let History = await ActivityMain.Screens.Call.Objects.StagesData.GetData("history");

            if(_stagesName && ActivityMain.Screens.Call.Objects.Stages[_stagesName]){
                if(History[History.length - 1] != _stagesName){
                    History.push(_stagesName);
                    ActivityMain.Screens.Call.Objects.Stages[_stagesName].StartStep();
                }
            }
            await ActivityMain.Screens.Call.Objects.StagesData.SetData("history", History);

        }
        ActivityMain.Screens.Call.Functions.StagesManagerPrev       = async function () {

            if(ActivityMain.Screens.Call.Objects.Stages.ActiveStage == "S1_1"){
                await ActivityMain.Screens.Call.Objects.Stages.S1.StartStep();
                return;
            }

            if((ActivityMain.Screens.Call.Objects.Stages.ActiveStage == "S2_1" || ActivityMain.Screens.Call.Objects.Stages.ActiveStage == "S2_2")){
                await ActivityMain.Screens.Call.Objects.Stages.S2.StartStep();
                return;
            }

            let History = await ActivityMain.Screens.Call.Objects.StagesData.GetData("history");
            if(History && History.length > 1){
                History.pop();
                ActivityMain.Screens.Call.Objects.Stages[History[History.length - 1]].StartStep();
                await ActivityMain.Screens.Call.Objects.StagesData.SetData("history", History);
                return;
            }

            Global.Functions.ExitApp();

        }

        ActivityMain.Screens.Call.Functions.FunctionKeyDown         = async function () {
            ActivityMain.Screens.Call.Functions.StagesManagerPrev();
            // let History = await ActivityMain.Screens.Call.Objects.StagesData.GetData("history");
            // if(History && History.length>1){
            //         ActivityMain.Screens.Call.Functions.StagesManagerPrev();
            // }else{
            //         Global.Functions.ExitApp();
            // }
        }
        ActivityMain.Screens.Call.Functions.Start                   = async function () {
            await Global.Functions.SetFunctionKeyDown(ActivityMain.Screens.Call.Functions.FunctionKeyDown);

            let History = await ActivityMain.Screens.Call.Objects.StagesData.GetData("history");
            if(History && History.length > 0){
                let Stage = History[History.length - 1];
                History.pop();
                await ActivityMain.Screens.Call.Objects.StagesData.SetData("history", History);
                await ActivityMain.Screens.Call.Functions.StagesManagerNext(Stage);
            }else{
                await ActivityMain.Screens.Call.Functions.StagesManagerNext("S1")
            }

            await ActivityMain.Screens.Call.Objects.Map.MapStart();
        };


//---------------------------------------------------------------

        ActivityMain.Screens.Call.Objects.Stages.S1                 = {};
        ActivityMain.Screens.Call.Objects.Stages.S1.PullData        = async function (){
            let data = await ActivityMain.Screens.Call.Objects.StagesData.GetData("S1");
            if(data){
                let documentPart    = document.querySelector(ActivityMain.Screens.Call.DocumentScreenName);

                let main        = documentPart.querySelector(".address-map__address-main");
                let secondary   = documentPart.querySelector(".address-map__address-secondary");
                let lat         = documentPart.querySelector(".cordinates-latitude-main");
                let lon         = documentPart.querySelector(".cordinates-longitude-main");

                if(data.tempAddress){
                    main.innerHTML      = data.tempAddress.data.street_type + " " + data.tempAddress.data.street + " " + data.tempAddress.data.house
                    secondary.innerHTML = data.tempAddress.data.city_type + " " + data.tempAddress.data.city;
                }else{
                    main.innerHTML      = "";
                    secondary.innerHTML = "";
                }
                if(data.tempLocation){
                    lat.innerHTML = data.tempLocation.lat;
                    lon.innerHTML = data.tempLocation.lon;
                }else{
                    lat.innerHTML = "0.0";
                    lon.innerHTML = "0.0";
                }

                let mainCompact         = documentPart.querySelector(".address-compact__address-main");
                let secondaryCompact    = documentPart.querySelector(".address-compact__address-secondary")
                let latCompact          = documentPart.querySelector(".home__cordinates-latitude");
                let lonCompact          = documentPart.querySelector(".home__cordinates-longitude");

                if(data.address){
                    mainCompact.innerHTML      = data.address.data.street_type + " " + data.address.data.street + " " + data.address.data.house
                    secondaryCompact.innerHTML = data.address.data.city_type + " " + data.address.data.city;
                }else{
                    mainCompact.innerHTML      = "";
                    secondaryCompact.innerHTML = "";
                }
                if(data.location){
                    latCompact.innerHTML = data.location.lat;
                    lonCompact.innerHTML = data.location.lon;
                }else{
                    latCompact.innerHTML = "0.0";
                    lonCompact.innerHTML = "0.0";
                }

            }
        }
        ActivityMain.Screens.Call.Objects.Stages.S1.SetData         = async function (_name = null, _obj = null){
            let dataObj = await ActivityMain.Screens.Call.Objects.StagesData.GetData("S1");
            if(dataObj == null) dataObj = {};

            dataObj[_name] = _obj;
            return await ActivityMain.Screens.Call.Objects.StagesData.SetData("S1", dataObj);
        }
        ActivityMain.Screens.Call.Objects.Stages.S1.GetData         = async function (_name = null){
            let result = null;
            let data = await ActivityMain.Screens.Call.Objects.StagesData.GetData("S1");
            if(data){
                if(typeof data[_name] != "undefined")
                    result = data[_name];
            };
            return result;
        }

        ActivityMain.Screens.Call.Objects.Stages.S1.ListenersOn     = async function (){
            let documentPart    = document.querySelector(ActivityMain.Screens.Call.DocumentScreenName);

            let ButtonAccept = documentPart.querySelector(".button--main-accept")
            if (ButtonAccept){
                ButtonAccept.addEventListener('click', async () => {

                    let address   = await ActivityMain.Screens.Call.Objects.Stages.S1.GetData("tempAddress")
                    let location  = await ActivityMain.Screens.Call.Objects.Stages.S1.GetData("tempLocation")

                    //alert(JSON.stringify(address))
                    await Global.Functions.Sleep(100);

                    if(address && location){
                        await ActivityMain.Screens.Call.Objects.Stages.S1.SetData("address", address);
                        await ActivityMain.Screens.Call.Objects.Stages.S1.SetData("location", location);
                        await ActivityMain.Screens.Call.Objects.Map.MapSetMarkerCall(location);

                        await ActivityMain.Screens.Call.Objects.Stages.S1.NextStep();
                    }else{
                        await Global.Functions.ModaMessagesShow(Resources.Messages.SelectAddress.message, Resources.Messages.SelectAddress.buttonText);
                    }

                })
            }

            let ButtonAddress = documentPart.querySelector(".button-address-main")
            if (ButtonAddress){
                ButtonAddress.addEventListener('click', async () => {
                    await ActivityMain.Screens.Call.Objects.Map.MapSetActiveStatus(false);
                    await ActivityMain.Screens.Call.Objects.Stages.S1_1.StartStep();
                })
            }

            let ButtonCompact= documentPart.querySelector(".address-compact-button")
            if (ButtonCompact){
                ButtonCompact.addEventListener('click', async () => {
                    ActivityMain.Screens.Call.Functions.StagesManagerNext("S1");
                })
            }

            let ButtonBack= documentPart.querySelector(".button--back")
            if (ButtonBack){
                ButtonBack.addEventListener('click', async () => {
                    Global.Functions.OnBackKeyDown();
                own
                })
            }

        }
        ActivityMain.Screens.Call.Objects.Stages.S1.ListenersOn();
        ActivityMain.Screens.Call.Objects.Stages.S1.InputEvent      = async function (){
            let tempAddress   = await ActivityMain.Screens.Call.Objects.Map.GetData("address");
            let tempLocation  = await ActivityMain.Screens.Call.Objects.Map.GetData("locationCenter");

            await ActivityMain.Screens.Call.Objects.Stages.S1.SetData("tempAddress", tempAddress);
            await ActivityMain.Screens.Call.Objects.Stages.S1.SetData("tempLocation", tempLocation);

            await ActivityMain.Screens.Call.Objects.Stages.S1.PullData();
        }

        ActivityMain.Screens.Call.Objects.Stages.S1.StartStep       = async function (){
            await ActivityMain.Screens.Call.Functions.StagesManagerActiveStage("S1");

            //await ActivityMain.Screens.Call.Objects.Map.MapResize();
            await ActivityMain.Screens.Call.Objects.Stages.S1.PullData();

            ActivityMain.Screens.Call.BlocksStates = [];
            ActivityMain.Screens.Call.BlocksStates.push("address-map", "address-confirm");

            await ActivityMain.Screens.Call.Functions.BlocksOn(ActivityMain.Screens.Call.BlocksStates);

            await ActivityMain.Screens.Call.Objects.Map.MapSetActiveStatus(true);

        }
        ActivityMain.Screens.Call.Objects.Stages.S1.NextStep        = async function (){

            let History = await ActivityMain.Screens.Call.Objects.StagesData.GetData("history");
            if(History && History.indexOf( 'S2' ) != -1){
                await ActivityMain.Screens.Call.Objects.Map.MapSetActiveStatus(false);
                await ActivityMain.Screens.Call.Functions.StagesManagerNext(History[History.length - 2]);
            }else{
                await ActivityMain.Screens.Call.Objects.Map.MapSetActiveStatus(false);
                await ActivityMain.Screens.Call.Functions.StagesManagerNext('S2');
            }

        }

            // ---

            ActivityMain.Screens.Call.Objects.Stages.S1_1               = {};
            ActivityMain.Screens.Call.Objects.Stages.S1_1.PullData      = async function (){
                let data = await ActivityMain.Screens.Call.Objects.StagesData.GetData("S1_1");
                if(data){
                    let documentPart    = document.querySelector(ActivityMain.Screens.Call.DocumentScreenName);

                    if(data){
                        if(data.inputAddress){
                            ActivityMain.Screens.Call.Objects.Stages.S1_1.Filter(data.inputAddress)
                        }else{
                            ActivityMain.Screens.Call.Objects.Stages.S1_1.Filter("")
                        }
                    }
                }
            }
            ActivityMain.Screens.Call.Objects.Stages.S1_1.SetData       = async function (_name = null, _obj = null){
                let dataObj = await ActivityMain.Screens.Call.Objects.StagesData.GetData("S1_1");
                if(dataObj == null) dataObj = {};

                dataObj[_name] = _obj;
                return await ActivityMain.Screens.Call.Objects.StagesData.SetData("S1_1", dataObj);
            }
            ActivityMain.Screens.Call.Objects.Stages.S1_1.GetData       = async function (_name = null){
                let result = null;
                let data = await ActivityMain.Screens.Call.Objects.StagesData.GetData("S1_1");
                if(data){
                    if(typeof data[_name] != "undefined")
                        result = data[_name];
                };
                return result;
            }

            ActivityMain.Screens.Call.Objects.Stages.S1_1.ListenersOn   = async function (){
                let documentPart    = document.querySelector(ActivityMain.Screens.Call.DocumentScreenName);

                //поиск по строке
                let inputAddress = documentPart.querySelector(".address_search-input")
                let closeAddress = documentPart.querySelector(".address_search-close")
                if (inputAddress) {
                    inputAddress.addEventListener('input', async () =>  {
                        await ActivityMain.Screens.Call.Objects.Stages.S1_1.Filter(inputAddress.value);
                    })
                }
                if (inputAddress && closeAddress) {
                    closeAddress.addEventListener('click', async () =>  {
                        inputAddress.value = "";
                        await ActivityMain.Screens.Call.Objects.Stages.S1_1.Filter(inputAddress.value);
                    })
                }

                //карта
                let buttonMap = documentPart.querySelector(".search-map__button")
                if (buttonMap) {
                    buttonMap.addEventListener('click', async () =>  {
                        await ActivityMain.Screens.Call.Objects.Stages.S1.StartStep();
                    })
                }

            }
            ActivityMain.Screens.Call.Objects.Stages.S1_1.ListenersOn();

            ActivityMain.Screens.Call.Objects.Stages.S1_1.Filter        = async function (_text = null){

                ActivityMain.Screens.Call.Objects.Stages.S1_1.SetData("inputAddress", _text);
                ActivityMain.Screens.Call.Objects.Stages.S1_1.SetData("usedUserAddresses", []);
                ActivityMain.Screens.Call.Objects.Stages.S1_1.SetData("usedDadataAddresses", []);

                //TODO добавить после введения  адресной книжки
                let userAddressesArray = [];
                // //отбор сохраненных адресов
                // ActivityMain.Screens.Call.Data.UseAddressesSaved = [];
                // if(_text != ""){
                //     for(let key in ActivityMain.Screens.Call.Data.SavedAddresses){
                //         let allTextString = "";
                //         for(let keyItem in ActivityMain.Screens.Call.Data.SavedAddresses[key]){
                //             allTextString += ActivityMain.Screens.Call.Data.SavedAddresses[key][keyItem];
                //         }
                //         if(allTextString.indexOf(_text) != -1) {
                //             ActivityMain.Screens.Call.Data.UseAddressesSaved.push(ActivityMain.Screens.Call.Data.SavedAddresses[key]);
                //         }
                //     }
                // }else{
                //     ActivityMain.Screens.Call.Data.UseAddressesSaved = ActivityMain.Screens.Call.Data.SavedAddresses;
                // }
                // ActivityMain.Screens.Call.Functions.CreateAddressesSavedBloks(ActivityMain.Screens.Call.Data.UseAddressesSaved);

                //отбор дадата адресов
                let dadataAddressesArray = []
                let resultServiceAPI = await ServiceAPI.Functions.GetAddressesFromText(_text);
                if(resultServiceAPI && resultServiceAPI.status == "success"){
                    //ActivityMain.Screens.Call.Data.UseAddressesDadata = resultServiceAPI.records;
                    //ActivityMain.Screens.Call.Functions.CreateAddressesMapBloks(ActivityMain.Screens.Call.Data.UseAddressesDadata, 5);
                    //await ActivityMain.Screens.Call.Objects.Stages.S1_1.PullData();
                    dadataAddressesArray = resultServiceAPI.records;
                }

                await ActivityMain.Screens.Call.Objects.Stages.S1_1.SetData("usedUserAddresses", userAddressesArray);
                await ActivityMain.Screens.Call.Objects.Stages.S1_1.SetData("usedDadataAddresses", dadataAddressesArray);
                await ActivityMain.Screens.Call.Objects.Stages.S1_1.PrintAddresses (dadataAddressesArray, userAddressesArray);
            }
            ActivityMain.Screens.Call.Objects.Stages.S1_1.PrintAddresses= async function (_dadataAddressesArray = [], _userAddressesArray = [], _maxCol = 20){

                let dadataAaddressesHtml   = "";
                if(_dadataAddressesArray){
                    let i = 0;
                    for(let key in _dadataAddressesArray){
                        if(i < _maxCol){

                            let itemObj     = JSON.stringify(_dadataAddressesArray[key]);
                            let itemValue   = "" + _dadataAddressesArray[key].value;

                            let itemHtml   = "" ;
                                itemHtml += "<div class='search-input-result'>";
                                itemHtml += "<button  itemObj='" + itemObj + "' class='address-search-button search-input-item' type='button'>";
                                itemHtml += "<span class='search-input-item__picture'></span>";
                                itemHtml += "<div class='search-input-item__address-wrapper'>";
                                itemHtml += "<span class='search-input-item__address'>" + itemValue + "</span>";
                                itemHtml += "</div>";
                                itemHtml += "</button>";
                                itemHtml += "</div>";

                            dadataAaddressesHtml = dadataAaddressesHtml + itemHtml;
                            i = i + 1;
                        }
                    }
                }

                if(dadataAaddressesHtml) {
                    //dadataAaddressesHtml = addressesHtml + "<div class='search-input-separator'></div>";
                }

                let documentPart                = document.querySelector(ActivityMain.Screens.Call.DocumentScreenName);
                let dadataAddressesPart         = documentPart.querySelector(".search-input-results");
                dadataAddressesPart.innerHTML   = dadataAaddressesHtml;

                //события
                let dadataAddressesButtons      = dadataAddressesPart.querySelectorAll(".address-search-button")
                if (dadataAddressesButtons){
                    for(let i = 0; i < dadataAddressesButtons.length; i++){

                        let address = {}
                            address = JSON.parse(dadataAddressesButtons[i].getAttribute("itemObj"));

                        dadataAddressesButtons[i].addEventListener('click', async () => {
                            let inputAddress = documentPart.querySelector(".search-input__field")

                            //alert(JSON.stringify(address))
                            await Global.Functions.Sleep(100);

                            if(address.value == inputAddress.value && address.data.house){
                                inputAddress.value = address.value;
                                inputAddress.focus();
                                inputAddress.setSelectionRange(inputAddress.value.length,inputAddress.value.length);

                                await ActivityMain.Screens.Call.Objects.Stages.S1.SetData("address", address);
                                await ActivityMain.Screens.Call.Objects.Stages.S1.SetData("location", null);
                                await ActivityMain.Screens.Call.Objects.Map.MapSetMarkerCall(null);

                                await ActivityMain.Screens.Call.Objects.Stages.S1.NextStep();
                               }else{
                                inputAddress.value = address.value;
                                inputAddress.focus();
                                inputAddress.setSelectionRange(inputAddress.value.length,inputAddress.value.length);
                                await ActivityMain.Screens.Call.Objects.Stages.S1_1.Filter(inputAddress.value)
                            }
                        })
                    }
                }
            }

            ActivityMain.Screens.Call.Objects.Stages.S1_1.StartStep     = async function (){
                await ActivityMain.Screens.Call.Functions.StagesManagerActiveStage("S1_1")

                await ActivityMain.Screens.Call.Objects.Map.MapSetActiveStatus(false);

                ActivityMain.Screens.Call.BlocksStates = [];
                ActivityMain.Screens.Call.BlocksStates.push("address-search");
                await ActivityMain.Screens.Call.Functions.BlocksOn(ActivityMain.Screens.Call.BlocksStates);

                let mapAddress = await ActivityMain.Screens.Call.Objects.Stages.S1.GetData("tempAddress");
                if(mapAddress){
                    let documentPart = document.querySelector(ActivityMain.Screens.Call.DocumentScreenName);
                    let inputAddress = documentPart.querySelector(".address_search-input")
                    inputAddress.value = mapAddress.value;
                    inputAddress.focus();
                    inputAddress.setSelectionRange(inputAddress.value.length,inputAddress.value.length);
                    await ActivityMain.Screens.Call.Objects.Stages.S1_1.Filter(inputAddress.value)
                }

            }

//---------------------------------------------------------------

        ActivityMain.Screens.Call.Objects.Stages.S2                 = {};
        ActivityMain.Screens.Call.Objects.Stages.S2.PullData        = async function (){
            ActivityMain.Screens.Call.Objects.Stages.S1.PullData();

            let data = await ActivityMain.Screens.Call.Objects.StagesData.GetData("S2");
            if(data){
                let documentPart    = document.querySelector(ActivityMain.Screens.Call.DocumentScreenName);

                let compact         = documentPart.querySelector(".person-compact__person-main");

                if(data && data.person){
                    let compactText = "";
                    if(typeof data.person.alienName != "undefined"){
                        compactText = "Неизвестный: " + data.person.alienName;
                    }
                    if(data.person.secondName && data.person.firstName){
                        compactText = "" + data.person.secondName + " " + data.person.firstName ;
                        if(data.person.thirdName)compactText = compactText + " " + data.person.thirdName;
                    }
                    compact.innerHTML = compactText;
                }
            }
        }
        ActivityMain.Screens.Call.Objects.Stages.S2.SetData         = async function (_name = null, _obj = null){
            let dataObj = await ActivityMain.Screens.Call.Objects.StagesData.GetData("S2");
            if(dataObj == null) dataObj = {};

            dataObj[_name] = _obj;
            return await ActivityMain.Screens.Call.Objects.StagesData.SetData("S2", dataObj);
        };
        ActivityMain.Screens.Call.Objects.Stages.S2.GetData         = async function (_name = null){
            let result = null;
            let data = await ActivityMain.Screens.Call.Objects.StagesData.GetData("S2");
            if(data){
                if(typeof data[_name] != "undefined")
                    result = data[_name];
            };
            return result;
        }

        ActivityMain.Screens.Call.Objects.Stages.S2.ListenersOn     = async function (){
            let documentPart   = document.querySelector(ActivityMain.Screens.Call.DocumentScreenName);

            let ButtonCompact= documentPart.querySelector(".person-compact-button")
            if (ButtonCompact){
                ButtonCompact.addEventListener('click', async () => {
                    ActivityMain.Screens.Call.Functions.StagesManagerNext("S2");
                })
            }

            let ButtonAcceptMy = documentPart.querySelector(".person-my")
            if (ButtonAcceptMy) {
                ButtonAcceptMy.addEventListener('click', async () =>  {
                    let person = await ServiceDB.Functions.GetUser();

                    let fio         = person.secondName + " " + person.firstName;
                    if (person.thirdName) fio += " " + person.thirdName;
                    let normalPerson        = person;
                        normalPerson.fio    = fio

                    await ActivityMain.Screens.Call.Objects.Stages.S2.SetData("person", normalPerson);
                    await ActivityMain.Screens.Call.Objects.Stages.S2.NextStep();
                })
            }

            let ButtonContacts = documentPart.querySelector(".person-contacts")
            if (ButtonContacts) {
                ButtonContacts.addEventListener('click', async () =>  {
                    await ActivityMain.Screens.Call.Objects.Stages.S2_2.StartStep();
                })
            }

            let ButtonAlien = documentPart.querySelector(".person-alien")
            if (ButtonAlien) {
                ButtonAlien.addEventListener('click', async () =>  {
                    await ActivityMain.Screens.Call.Objects.Stages.S2_1.StartStep();
                })
            }

        }
        ActivityMain.Screens.Call.Objects.Stages.S2.ListenersOn();

        ActivityMain.Screens.Call.Objects.Stages.S2.StartStep       = async function (){
            await ActivityMain.Screens.Call.Functions.StagesManagerActiveStage("S2");

            ActivityMain.Screens.Call.Objects.Stages.S2.PullData();

            ActivityMain.Screens.Call.BlocksStates = [];
            ActivityMain.Screens.Call.BlocksStates.push("address-compact", "person-search");

            await ActivityMain.Screens.Call.Functions.BlocksOn(ActivityMain.Screens.Call.BlocksStates);
        }
        ActivityMain.Screens.Call.Objects.Stages.S2.NextStep        = async function (){

            let History = await ActivityMain.Screens.Call.Objects.StagesData.GetData("history");
            if(History && History.indexOf( 'S3' ) != -1){
                await ActivityMain.Screens.Call.Functions.StagesManagerNext(History[History.length - 2]);
            }else{
                await ActivityMain.Screens.Call.Functions.StagesManagerNext('S3');
            }

        }

            // ---

            ActivityMain.Screens.Call.Objects.Stages.S2_1               = {};
            ActivityMain.Screens.Call.Objects.Stages.S2_1.PullData      = async function (){
                let data = await ActivityMain.Screens.Call.Objects.StagesData.GetData("S2_1");

                if(data){
                    let documentPart    = document.querySelector(ActivityMain.Screens.Call.DocumentScreenName);

                    if(data && data.alienData){
                        if(data.alienData.alienName){
                            let alienName    = document.querySelector("#alienName");
                            alienName.value = alienData.alienName;
                        }else{
                            alienName.value = "";
                        }
                        if(data.alienData.alienGender){
                            let alienGender    = document.querySelector("#alienGender");
                            alienGender.value = alienData.alienGender;
                        }else{
                            alienGender.value = "";
                        }
                        if(data.alienData.alienBirthday){
                            let alienBirthday    = document.querySelector("#alienBirthday");
                            alienBirthday.value = alienData.alienBirthday;
                        }else{
                            alienBirthday.value = "";
                        }
                        if(data.alienData.alienAdditional){
                            let alienAdditional    = document.querySelector("#alienAdditional");
                            alienAdditional.value = alienData.alienAdditional;
                        }else{
                            alienAdditional.value = "";
                        }
                    }
                }
            }
            ActivityMain.Screens.Call.Objects.Stages.S2_1.SetData       = async function (_name = null, _obj = null){
                let dataObj = await ActivityMain.Screens.Call.Objects.StagesData.GetData("S2_1");
                if(dataObj == null) dataObj = {};

                dataObj[_name] = _obj;
                return await ActivityMain.Screens.Call.Objects.StagesData.SetData("S2_1", dataObj);
            }
            ActivityMain.Screens.Call.Objects.Stages.S2_1.GetData       = async function (_name = null){
                let result = null;
                let data = await ActivityMain.Screens.Call.Objects.StagesData.GetData("S2_1");
                if(data){
                    if(typeof data[_name] != "undefined")
                        result = data[_name];
                };
                return result;
            }

            ActivityMain.Screens.Call.Objects.Stages.S2_1.ListenersOn   = async function (){
                let documentPart    = document.querySelector(ActivityMain.Screens.Call.DocumentScreenName);

                let ButtonConfirm = documentPart.querySelector(".form-person-button")
                if (ButtonConfirm){
                    ButtonConfirm.addEventListener('click', async () => {
                        await  ActivityMain.Screens.Call.Objects.Stages.S2_1.ScanData();
                        let person = await ActivityMain.Screens.Call.Objects.Stages.S2_1.GetData("alienData");
                        await ActivityMain.Screens.Call.Objects.Stages.S2.SetData("person", person);
                        await ActivityMain.Screens.Call.Objects.Stages.S2.NextStep();
                    })
                }

                let personForm      = documentPart.querySelector(".person__form");
                if (personForm){
                    personForm.addEventListener('submit', (evt) => {
                        evt.preventDefault();
                    });
                }
            }
            ActivityMain.Screens.Call.Objects.Stages.S2_1.ListenersOn();

            ActivityMain.Screens.Call.Objects.Stages.S2_1.ScanData   = async function (){
                let documentPart    = document.querySelector(ActivityMain.Screens.Call.DocumentScreenName);
                let personPart      = documentPart.querySelector(".person__form")

                let personData      = {};
                if (personPart){
                    let formData = new FormData(personPart);
                    formData.forEach(function (value, key) {
                        personData[key] = value;
                    });
                }

                let normalPersonData = {
                    "id" : -1,
                    "firstName" : null,
                    "secondName" : null,
                    "thirdName" : null,
                    "fio" : personData.alienName,
                    "gender" : personData.alienGender,
                    "dateBirth" : personData.alienBirthday,
                    "additional" : personData.alienAdditional,
                    "group" : [],
                    "regTime" : 0,
                    "updateTime" : 0
                }

                let alienData       = await ActivityMain.Screens.Call.Objects.Stages.S2_1.SetData("alienData", normalPersonData);
            }

            ActivityMain.Screens.Call.Objects.Stages.S2_1.StartStep     = async function (){
                await ActivityMain.Screens.Call.Functions.StagesManagerActiveStage("S2_1");

                ActivityMain.Screens.Call.BlocksStates = [];
                ActivityMain.Screens.Call.BlocksStates.push("person-search-alien");
                await ActivityMain.Screens.Call.Functions.BlocksOn(ActivityMain.Screens.Call.BlocksStates);
            }

            // ---

            ActivityMain.Screens.Call.Objects.Stages.S2_2               = {};
            ActivityMain.Screens.Call.Objects.Stages.S2_2.PullData      = async function (){
                let data = await ActivityMain.Screens.Call.Objects.Stages.S2_2.GetData("S2_2");

                let documentPart    = document.querySelector(ActivityMain.Screens.Call.DocumentScreenName);
                let contactInput    = documentPart.querySelector(".contact_search-input")

                if(data){
                    if(data){
                        if(data.inputContact){
                            contactInput.value = data.inputContact;
                            ActivityMain.Screens.Call.Objects.Stages.S2_2.Filter(data.inputContact)
                        }else{
                            contactInput.value = "";
                            ActivityMain.Screens.Call.Objects.Stages.S2_2.Filter("")
                        }
                    }
                }else{
                    contactInput.value = "";
                    ActivityMain.Screens.Call.Objects.Stages.S2_2.Filter("")
                }
            }
            ActivityMain.Screens.Call.Objects.Stages.S2_2.SetData       = async function (_name = null, _obj = null){
                let dataObj = await ActivityMain.Screens.Call.Objects.StagesData.GetData("S2_2");
                if(dataObj == null) dataObj = {};

                dataObj[_name] = _obj;
                return await ActivityMain.Screens.Call.Objects.StagesData.SetData("S2_2", dataObj);
            }
            ActivityMain.Screens.Call.Objects.Stages.S2_2.GetData       = async function (_name = null){
                let result = null;
                let data = await ActivityMain.Screens.Call.Objects.StagesData.GetData("S2_2");
                if(data){
                    if(typeof data[_name] != "undefined")
                        result = data[_name];
                };
                return result;
            }

            ActivityMain.Screens.Call.Objects.Stages.S2_2.ListenersOn   = async function (){
                let documentPart    = document.querySelector(ActivityMain.Screens.Call.DocumentScreenName);

                //поиск по строке
                let inputPerson = documentPart.querySelector(".contact_search-input")
                let closePerson = documentPart.querySelector(".contact_search-close")
                if (inputPerson) {
                    inputPerson.addEventListener('input', async () =>  {
                        await ActivityMain.Screens.Call.Objects.Stages.S2_2.Filter(inputPerson.value)
                    })
                }
                if (inputPerson && closePerson) {
                    closePerson.addEventListener('click', async () =>  {
                        inputPerson.value = "";
                        await ActivityMain.Screens.Call.Objects.Stages.S2_2.Filter(inputPerson.value)
                    })
                }
            }
            ActivityMain.Screens.Call.Objects.Stages.S2_2.ListenersOn();

            ActivityMain.Screens.Call.Objects.Stages.S2_2.Filter        = async function (_text = null){

                ActivityMain.Screens.Call.Objects.Stages.S2_2.SetData("inputContact", _text);

                let contacts    = await ServiceDB.Functions.GetContacts();
                let useContacts = {};
                if(contacts){
                    for( let key in contacts ){
                        let allContact = "";
                            allContact += contacts[key].firstName + " ";
                            allContact += contacts[key].secondName + " ";
                            allContact += contacts[key].thirdName + " ";
                            allContact += contacts[key].gender + " ";
                            allContact += contacts[key].dateBirth + " ";
                            allContact = allContact.toLowerCase();

                        let subString = " ";
                        if (_text) subString = _text;
                        subString = subString.toLowerCase();

                        if(allContact.indexOf(subString) > -1){
                            useContacts[key] = contacts[key];
                        }
                    }
                }

                await ActivityMain.Screens.Call.Objects.Stages.S2_2.PrintData(useContacts);
            }
            ActivityMain.Screens.Call.Objects.Stages.S2_2.PrintData   = async function (_useContacts = null){
                let contacts = {};
                if(_useContacts) contacts = _useContacts;

                let contactsHtml = "";
                for (let key in contacts) {
                    let id          = contacts[key].id;
                    let gender      = contacts[key].gender;
                    let birthday    = contacts[key].dateBirth;
                    let fio         = contacts[key].secondName + " " + contacts[key].firstName;
                    if (contacts[key].thirdName) fio += " " + contacts[key].thirdName;
                    contacts[key].fio = fio;

                    let itemHtml = "";
                    itemHtml += '<li itemId="' + id + '"  class="person-contacts-list__item">';
                    itemHtml += '<button class="person-contacts-list__button button" type="button">';
                    itemHtml += '<span class="person-contacts-list__image"></span>';
                    itemHtml += '<div class="person-contacts-list__data">';
                    itemHtml += '<div class="person-contacts-list__data-container">ФИО: ';
                    itemHtml += '<span class="person-contacts-list__name">' + fio + '</span>';
                    itemHtml += '</div>';
                    itemHtml += '<div class="person-contacts-list__data-container">Пол: ';
                    itemHtml += '<span class="person-contacts-list__sex">' + gender + '</span>';
                    itemHtml += '</div>';
                    itemHtml += '<div class="person-contacts-list__data-container">Дата рождения: ';
                    itemHtml += '<span class="person-contacts-list__birthday">' + birthday + '</span>';
                    itemHtml += '</div>';
                    itemHtml += '</div>';
                    itemHtml += '</button>';
                    itemHtml += '</li>';

                    contactsHtml = contactsHtml + itemHtml;
                }

                let documentPart = document.querySelector(ActivityMain.Screens.Call.DocumentScreenName);
                let contactsList = documentPart.querySelector(".person-contacts-list");
                contactsList.innerHTML = contactsHtml;

                //события
                let contactsButton = contactsList.querySelectorAll(".person-contacts-list__item");
                if (contactsButton){
                    for(let i = 0; i < contactsButton.length; i++){
                        contactsButton[i].addEventListener('click', async () => {
                            let id = contactsButton[i].getAttribute("itemId");
                            let contact = contacts[id];
                            await ActivityMain.Screens.Call.Objects.Stages.S2.SetData("person", contact);
                            await ActivityMain.Screens.Call.Objects.Stages.S2.NextStep();
                        })
                    }
                }
            }

            ActivityMain.Screens.Call.Objects.Stages.S2_2.StartStep     = async function (){
                await ActivityMain.Screens.Call.Functions.StagesManagerActiveStage("S2_2");

                ActivityMain.Screens.Call.BlocksStates = [];
                ActivityMain.Screens.Call.BlocksStates.push("person-search-contacts");
                await ActivityMain.Screens.Call.Functions.BlocksOn(ActivityMain.Screens.Call.BlocksStates);

                //await ActivityMain.Screens.Call.Objects.Stages.S2_2.Filter();
                await ActivityMain.Screens.Call.Objects.Stages.S2_2.PullData();
            }


//---------------------------------------------------------------

        ActivityMain.Screens.Call.Objects.Stages.S3                 = {}
        ActivityMain.Screens.Call.Objects.Stages.S3.PullData        = async function (){
            ActivityMain.Screens.Call.Objects.Stages.S2.PullData();

            let data = await ActivityMain.Screens.Call.Objects.StagesData.GetData("S3");
            if(data){

                let documentPart    = document.querySelector(ActivityMain.Screens.Call.DocumentScreenName);

                let buttonCompact   = documentPart.querySelector(".subject-compact-button span");
                let textCompact     = documentPart.querySelector(".subject__textarea");

                if(data.subject){
                    buttonCompact.innerHTML = data.subject.text;
                }else{
                    buttonCompact.innerHTML = "";
                }

                if(data.textSubject){
                    textCompact.innerHTML = data.textSubject;
                }else{
                    textCompact.innerHTML = "";
                }

                if(data.subjects){
                    ActivityMain.Screens.Call.Objects.Stages.S3.PrintSubjects(data.subjects)
                }else{
                    ActivityMain.Screens.Call.Objects.Stages.S3.PrintSubjects();
                }
            }
        }
        ActivityMain.Screens.Call.Objects.Stages.S3.SetData         = async function (_name = null, _obj = null){
            let dataObj = await ActivityMain.Screens.Call.Objects.StagesData.GetData("S3");
            if(dataObj == null) dataObj = {};

            dataObj[_name] = _obj;
            return await ActivityMain.Screens.Call.Objects.StagesData.SetData("S3", dataObj);
        };
        ActivityMain.Screens.Call.Objects.Stages.S3.GetData         = async function (_name = null){
            let result = null;
            let data = await ActivityMain.Screens.Call.Objects.StagesData.GetData("S3");
            if(data){
                if(typeof data[_name] != "undefined")
                    result = data[_name];
            };
            return result;
        }

        ActivityMain.Screens.Call.Objects.Stages.S3.ListenersOn     = async function (){
            let documentPart    = document.querySelector(ActivityMain.Screens.Call.DocumentScreenName);

            let ButtonSubject = documentPart.querySelector(".subject-compact-button")
            if (ButtonSubject) {
                ButtonSubject.addEventListener('click', async () =>  {
                    await ActivityMain.Screens.Call.Functions.StagesManagerNext('S3');
                })
            }

            let TextSubject = documentPart.querySelector(".subject__textarea")
            if (TextSubject) {
                TextSubject.addEventListener('change', async () =>  {
                    await ActivityMain.Screens.Call.Objects.Stages.S3.SetData("textSubject", TextSubject.value)
                })
            }

        }
        ActivityMain.Screens.Call.Objects.Stages.S3.ListenersOn();

        ActivityMain.Screens.Call.Objects.Stages.S3.Subjects        = async function (){
            let subjects = await ServiceDB.Functions.GetSubjects();
            await ActivityMain.Screens.Call.Objects.Stages.S3.SetData("subjects", subjects);
        }
        ActivityMain.Screens.Call.Objects.Stages.S3.PrintSubjects   = async function (_subjectsArray = [], _maxCol = 20){

            let documentPart    = document.querySelector(ActivityMain.Screens.Call.DocumentScreenName);
            let list            = documentPart.querySelector(".subject__list")

            //создание элементов
            let subjectsHtml   = "";

            for(let key in _subjectsArray){
                    if(key <_maxCol){
                        let subject = JSON.stringify(_subjectsArray[key]);

                        let itemHtml = ""
                        itemHtml += "<button subject='" + subject + "' class='subject-search-button subject__item button button--grey' type='button'>" + _subjectsArray[key].text + "</button>";

                        subjectsHtml = subjectsHtml + itemHtml;
                    }
                }
            subjectsHtml = subjectsHtml + "<div class='subject__spacer'></div>"
            list.innerHTML = subjectsHtml;

            //события
            let arraySubjects = list.querySelectorAll(".subject-search-button")
            if (arraySubjects){
                for(let i = 0; i < arraySubjects.length; i++){

                    let subject = {};
                        subject = JSON.parse(arraySubjects[i].getAttribute("subject"));

                    arraySubjects[i].addEventListener('click', async () => {
                        await ActivityMain.Screens.Call.Objects.Stages.S3.SetData("subject", subject);
                        await ActivityMain.Screens.Call.Objects.Stages.S3.NextStep();
                    })
                }
            }
        }

        ActivityMain.Screens.Call.Objects.Stages.S3.StartStep       = async function (){
            await ActivityMain.Screens.Call.Functions.StagesManagerActiveStage("S3");

            await ActivityMain.Screens.Call.Objects.Stages.S3.Subjects();
            await ActivityMain.Screens.Call.Objects.Stages.S3.PullData();

            ActivityMain.Screens.Call.BlocksStates = [];
            ActivityMain.Screens.Call.BlocksStates.push("address-compact", "person-compact" ,"subject-search");

            await ActivityMain.Screens.Call.Functions.BlocksOn(ActivityMain.Screens.Call.BlocksStates);
        }
        ActivityMain.Screens.Call.Objects.Stages.S3.NextStep        = async function (){
                await ActivityMain.Screens.Call.Functions.StagesManagerNext('S4');
        }

//---------------------------------------------------------------

        ActivityMain.Screens.Call.Objects.Stages.S4                 = {};
        ActivityMain.Screens.Call.Objects.Stages.S4.PullData        = async function (){
            ActivityMain.Screens.Call.Objects.Stages.S3.PullData();

            let data = await ActivityMain.Screens.Call.Objects.StagesData.GetData("S4");
            if(data){
                let documentPart    = document.querySelector(ActivityMain.Screens.Call.DocumentScreenName);


            }
        }
        ActivityMain.Screens.Call.Objects.Stages.S4.SetData         = async function (_name = null, _obj = null){
            let dataObj = await ActivityMain.Screens.Call.Objects.StagesData.GetData("S4");
            if(dataObj == null) dataObj = {};

            dataObj[_name] = _obj;
            return await ActivityMain.Screens.Call.Objects.StagesData.SetData("S4", dataObj);
        };
        ActivityMain.Screens.Call.Objects.Stages.S4.GetData         = async function (_name = null){
            let result = null;
            let data = await ActivityMain.Screens.Call.Objects.StagesData.GetData("S4");
            if(data){
                if(typeof data[_name] != "undefined")
                    result = data[_name];
            };
            return result;
        }

        ActivityMain.Screens.Call.Objects.Stages.S4.ListenersOn     = async function (){
            let documentPart    = document.querySelector(ActivityMain.Screens.Call.DocumentScreenName);

            let ButtonCall = documentPart.querySelector(".subject-next-button")
            if (ButtonCall) {
                ButtonCall.addEventListener('click', async () =>  {
                    await ActivityMain.Screens.Call.Objects.Stages.S4.NextStep();
                })
            }
        }
        ActivityMain.Screens.Call.Objects.Stages.S4.ListenersOn();

        ActivityMain.Screens.Call.Objects.Stages.S4.StartStep       = async function (){
            await ActivityMain.Screens.Call.Functions.StagesManagerActiveStage("S4");

            await ActivityMain.Screens.Call.Objects.Stages.S4.PullData();

            ActivityMain.Screens.Call.BlocksStates = [];
            ActivityMain.Screens.Call.BlocksStates.push("address-compact", "person-compact" , "subject-compact", "subject-next");

            await ActivityMain.Screens.Call.Functions.BlocksOn(ActivityMain.Screens.Call.BlocksStates);
        }
        ActivityMain.Screens.Call.Objects.Stages.S4.NextStep        = async function (){

            let callData = {}
                callData.locationMy     = await ActivityMain.Screens.Call.Objects.Map.GetData("locationMy");
                callData.address        = await ActivityMain.Screens.Call.Objects.Stages.S1.GetData("address");
                callData.location       = await ActivityMain.Screens.Call.Objects.Stages.S1.GetData("location");
                callData.person         = await ActivityMain.Screens.Call.Objects.Stages.S2.GetData("person");
                callData.subject        = await ActivityMain.Screens.Call.Objects.Stages.S3.GetData("subject");
                callData.textSubject    = await ActivityMain.Screens.Call.Objects.Stages.S3.GetData("textSubject");
                callData.user           = await ServiceDB.Functions.GetUser();

             await ActivityMain.Screens.Call.Objects.Stages.S4.SetData("callData", callData);
             await ActivityMain.Functions.ScreenOn("#screen-chat");
             ActivityMain.Screens.Chat.Functions.Start();
        }

//---------------------------------------------------------------

        //map
            ActivityMain.Screens.Call.Objects.Map                   = {};
            ActivityMain.Screens.Call.Objects.Map.L                 = null;
            ActivityMain.Screens.Call.Objects.Map.map               = null;
            ActivityMain.Screens.Call.Objects.Map.check             = false;
            ActivityMain.Screens.Call.Objects.Map.markerMy          = null;
            ActivityMain.Screens.Call.Objects.Map.markerCall        = null;

            ActivityMain.Screens.Call.Objects.Map.PullData                = async function (){
                let data = await ActivityMain.Screens.Call.Objects.StagesData.GetData("map");
                if(data){
                    if(data.locationCall)
                        ActivityMain.Screens.Call.Objects.Map.MapSetMarkerCall(data.locationCall);
                }
            }
            ActivityMain.Screens.Call.Objects.Map.SetData                 = async function (_name = null, _obj = null){
                let dataObj = await ActivityMain.Screens.Call.Objects.StagesData.GetData("map");
                if(dataObj == null) dataObj = {};

                dataObj[_name] = _obj;
                return await ActivityMain.Screens.Call.Objects.StagesData.SetData("map", dataObj);
            }
            ActivityMain.Screens.Call.Objects.Map.GetData                 = async function (_name = null){
                let result = null;
                let data = await ActivityMain.Screens.Call.Objects.StagesData.GetData("map");
                if(data){
                    if(typeof data[_name] != "undefined")
                        result = data[_name];
                };
                return result;
            }

            ActivityMain.Screens.Call.Objects.Map.MapStart                = async function () {

                await ActivityMain.Screens.Call.Objects.Map.MapInit();
                await ActivityMain.Screens.Call.Objects.Map.MapListenersOn();
                await ActivityMain.Screens.Call.Objects.Map.MapSetActiveStatus(true);

                await ActivityMain.Screens.Call.Objects.Map.MapCheck();

                let oldLocationCenter  = await ActivityMain.Screens.Call.Objects.Map.GetData("locationCenter");
                if(oldLocationCenter){
                    await ActivityMain.Screens.Call.Objects.Map.MapSetCenter(oldLocationCenter);
                    await ActivityMain.Screens.Call.Objects.Map.map.setZoom(18, 500);
                    await ActivityMain.Screens.Call.Objects.Map.MapAddMe();
                }else{
                    await ActivityMain.Screens.Call.Objects.Map.MapToMe(18);
                }

                let oldLocationMy  = await ActivityMain.Screens.Call.Objects.Map.GetData("locationMy");
                if(oldLocationMy){
                    await ActivityMain.Screens.Call.Objects.Map.MapSetMarkerMy(oldLocationMy);
                    await ActivityMain.Screens.Call.Objects.Map.MapAddMe();
                }

                let oldLocationCall  = await ActivityMain.Screens.Call.Objects.Map.GetData("locationCall");
                if(oldLocationCall){
                    await ActivityMain.Screens.Call.Objects.Map.MapSetMarkerCall(oldLocationCall);
                    await ActivityMain.Screens.Call.Objects.Map.MapAddMe();
                }

                await ActivityMain.Screens.Call.Objects.Map.MapResize();
            }
            ActivityMain.Screens.Call.Objects.Map.MapOutputEvent          = async function () {
                ActivityMain.Screens.Call.Objects.Stages.S1.InputEvent();
            };

            ActivityMain.Screens.Call.Objects.Map.MapInit                 = async function () {

                let _mapid          = "map";
                let _type           = "osm" ;

                let documentPart    = document.querySelector("#main");
                let mapPart         = documentPart.querySelector("#" + _mapid);
                  if (mapPart) {

                    //установка карты
                    ActivityMain.Screens.Call.Objects.Map.L =  L;
                    ActivityMain.Screens.Call.Objects.Map.map = await L.map(_mapid).setView({lon: 0, lat: 0}, 15);
                    switch (_type) {
                        case "osm":
                            await L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                                attribution: 'Open Street Map'
                            }).addTo(ActivityMain.Screens.Call.Objects.Map.map);
                            break;

                        case "ya":
                            await L.tileLayer(
                                'http://vec{s}.maps.yandex.net/tiles?l=map&v=20.09.03-0&z={z}&x={x}&y={y}&scale=2&lang=ru_RU', {
                                    subdomains: ['01', '02', '03', '04'],
                                    attribution: '<a http="//yandex.ru" target="_blank">Яндекс.Карты</a>',
                                    reuseTiles: true,
                                    updateWhenIdle: false
                                }
                            ).addTo(ActivityMain.Screens.Call.Objects.Map.map);
                            break;

                        case "google":
                            await L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
                                maxZoom: 20,
                                subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
                                attribution: '<a http="//google.ru" target="_blank">Google Карты Спутник</a>'
                            }).addTo(ActivityMain.Screens.Call.Objects.Map.map);
                            break;

                        case "thunderforest":
                            await L.tileLayer('http://tile.thunderforest.com/cycle/{z}/{x}/{y}{r}.png?apikey=<insert-your-apikey-here>', {
                                attribution: 'Open Street Map'
                            }).addTo(ActivityMain.Screens.Call.Objects.Map.map);
                            break;

                        default:
                            break;
                    }

                    //включаем слежение
                    //ActivityMain.Screens.Call.Objects.Map.MapListenersOn(true);
                }
            }
            ActivityMain.Screens.Call.Objects.Map.MapCheck                = async function () {

                //исправление ощибок
                correction_error_2 = async function(_result){
                     let permissions = cordova.plugins.permissions;
                     permissions.hasPermission(permissions.ACCESS_FINE_LOCATION, function( status ){
                        if(!status.hasPermission){

                            function error() {
                                Global.Functions.ModaMessagesShow(Resources.Messages.MapNotGetPermission.message, Resources.Messages.MapNotGetPermission.buttonText);
                            }
                            function success( status ) {
                                ActivityMain.Screens.Call.Objects.Map.MapToMe();
                            }

                            permissions.requestPermission(permissions.ACCESS_FINE_LOCATION, success, error);
                            }
                         });
                }

                correction_error_3 = async function(_result){
                }

                //обработка ответа
                GeolocationGetLocation_resolve = async function(_resolve){
                    ActivityMain.Screens.Call.Objects.Map.check = true;

                };
                GeolocationGetLocation__reject = async function(_reject){
                    ActivityMain.Screens.Call.Objects.Map.check = false;
                    if(_reject && _reject.code){
                        if(_reject.code == 2 ) {
                            correction_error_2();
                            // Global.Functions.ModaMessagesShow(Resources.Messages.LocationNotPermition.message,
                            //     Resources.Messages.LocationNotPermition.buttonText,
                            //     correction_error_2);
                        }
                        if(_reject.code == 3 ){
                            Global.Functions.ModaMessagesShow(Resources.Messages.LocationOff.message,
                                                                                 Resources.Messages.LocationOff.buttonText,
                                                                                 correction_error_3  );
                        }
                    }
                };

                //запрос координат
                Global.Functions.GeolocationGetLocation(GeolocationGetLocation_resolve, GeolocationGetLocation__reject);
            }
            ActivityMain.Screens.Call.Objects.Map.MapListenersOn          = async function () {
                let documentPart  = document.querySelector("#main");

                let ButtonMapToMe = documentPart.querySelector(".map__where-am-i")
                if (ButtonMapToMe) {
                    ButtonMapToMe.addEventListener('click', () => {
                        ActivityMain.Screens.Call.Objects.Map.MapToMe();
                    })
                }
                let ButtonMapCall = documentPart.querySelector(".map__call")
                if (ButtonMapCall) {
                    ButtonMapCall.addEventListener('click', () => {
                        window.location.href = 'tel:112';
                    })
                }

                let ButtonHandbook = documentPart.querySelector(".map__handbook")
                if (ButtonHandbook) {
                    ButtonHandbook.addEventListener('click', () => {
                        Global.Functions.ActivityManager(null, "Handbook", "Main");
                    })
                }

                if (ActivityMain.Screens.Call.Objects.Map.map) {

                    ActivityMain.Screens.Call.Objects.Map.map.on('movestart', function () {
                        ActivityMain.Screens.Call.Objects.Map.PinUp();
                    });

                    ActivityMain.Screens.Call.Objects.Map.map.on('moveend', function () {
                        ActivityMain.Screens.Call.Objects.Map.PinDown();
                    });

                    ActivityMain.Screens.Call.Objects.Map.map.on('moveend', async function () {
                        //новый центр
                        let newCenter = "" + ActivityMain.Screens.Call.Objects.Map.map.getCenter();
                        let LatLonArray = newCenter.slice(newCenter.indexOf('(') + 1, newCenter.indexOf(')') - 1).split(",");

                        let locationCenter      = null;
                        let activeStatus        = await ActivityMain.Screens.Call.Objects.Map.GetData("activeStatus");
                        let oldLocationCenter   = await ActivityMain.Screens.Call.Objects.Map.GetData("locationCenter");

                        if(oldLocationCenter == null || (oldLocationCenter.lat != LatLonArray[0] || oldLocationCenter.lon != LatLonArray[1])){
                            locationCenter      = await ActivityMain.Screens.Call.Objects.Map.SetData("locationCenter", {lat: LatLonArray[0], lon: LatLonArray[1]});;
                        }

                        if (activeStatus && locationCenter) {
                            await ActivityMain.Screens.Call.Objects.Map.MapSetAdressFromСoord({lat: LatLonArray[0], lon: LatLonArray[1]})
                        }

                    });

                }
            };

            ActivityMain.Screens.Call.Objects.Map.MapSetActiveStatus      = async function (_status =  false){

                if(_status) {
                    //ActivityMain.Screens.Call.Objects.Map.activeStatus = true;
                    await ActivityMain.Screens.Call.Objects.Map.SetData("activeStatus",true)
                    let documentPart  = document.querySelector("#main");
                    let mapPin        = documentPart.querySelector("#mapPin");
                    mapPin.style.display = "block";
                }else{
                    //ActivityMain.Screens.Call.Objects.Map.activeStatus = false;
                    await ActivityMain.Screens.Call.Objects.Map.SetData("activeStatus",false)
                    let documentPart  = document.querySelector("#main");
                    let mapPin        = documentPart.querySelector("#mapPin");
                    mapPin.style.display = "none";
                }
            }
            ActivityMain.Screens.Call.Objects.Map.MapSetCenter            = async function (_coord = null){
                if(ActivityMain.Screens.Call.Objects.Map.map && _coord){
                    await ActivityMain.Screens.Call.Objects.Map.map.setView({lat : _coord.lat, lon : _coord.lon});

                    //ActivityMain.Screens.Call.Objects.Map.locationCenter = {lat : _lat, lon : _lon};
                    await ActivityMain.Screens.Call.Objects.Map.SetData("locationCenter",_coord)
                }
            }
            ActivityMain.Screens.Call.Objects.Map.MapSetMarkerMy          = async function (_coord = null){

                if(ActivityMain.Screens.Call.Objects.Map.map && _coord){

                    if(ActivityMain.Screens.Call.Objects.Map.markerMy){
                        ActivityMain.Screens.Call.Objects.Map.map.removeLayer(ActivityMain.Screens.Call.Objects.Map.markerMy);
                    }

                    let marker = await ActivityMain.Screens.Call.Objects.Map.L.AwesomeMarkers.icon(Resources.MapPins.ConfigMyLocation);
                    ActivityMain.Screens.Call.Objects.Map.markerMy          = ActivityMain.Screens.Call.Objects.Map.L.marker([_coord.lat, _coord.lon], {
                            icon: marker
                    }).addTo(ActivityMain.Screens.Call.Objects.Map.map);

                    //ActivityMain.Screens.Call.Objects.Map.locationMy = {lat : _lat, lon : _lon};
                    await ActivityMain.Screens.Call.Objects.Map.SetData("locationMy",_coord)
                }
                if(ActivityMain.Screens.Call.Objects.Map.map && _coord == null){
                    if(ActivityMain.Screens.Call.Objects.Map.markerMy){
                        ActivityMain.Screens.Call.Objects.Map.map.removeLayer(ActivityMain.Screens.Call.Objects.Map.markerMy);
                    }
                    ActivityMain.Screens.Call.Objects.Map.markerMy   = null;
                    //ActivityMain.Screens.Call.Objects.Map.locationMy = null;
                    await ActivityMain.Screens.Call.Objects.Map.SetData("locationMy",null)
                }
            }
            ActivityMain.Screens.Call.Objects.Map.MapSetMarkerCall        = async function (_coord = null){
                if(ActivityMain.Screens.Call.Objects.Map.map && _coord){

                    if(ActivityMain.Screens.Call.Objects.Map.markerCall){
                        ActivityMain.Screens.Call.Objects.Map.map.removeLayer(ActivityMain.Screens.Call.Objects.Map.markerCall);
                    }

                    let marker = await ActivityMain.Screens.Call.Objects.Map.L.AwesomeMarkers.icon(Resources.MapPins.ConfigCallLocation);
                    ActivityMain.Screens.Call.Objects.Map.markerCall        =ActivityMain.Screens.Call.Objects.Map.L.marker([_coord.lat, _coord.lon], {
                            icon: marker
                        }).addTo(ActivityMain.Screens.Call.Objects.Map.map);


                    //ActivityMain.Screens.Call.Objects.Map.locationCall = {lat : _lat, lon : _lon};
                    await ActivityMain.Screens.Call.Objects.Map.SetData("locationCall",_coord)
                }

                if(ActivityMain.Screens.Call.Objects.Map.map && _coord == null){
                    if(ActivityMain.Screens.Call.Objects.Map.markerCall){
                        ActivityMain.Screens.Call.Objects.Map.map.removeLayer(ActivityMain.Screens.Call.Objects.Map.markerCall);
                    }
                    ActivityMain.Screens.Call.Objects.Map.markerCall   = null;
                    //ActivityMain.Screens.Call.Objects.Map.locationCall = null;
                    await ActivityMain.Screens.Call.Objects.Map.SetData("locationCall",null)
                }
            }

            ActivityMain.Screens.Call.Objects.Map.MapResize               = async function () {
                if(ActivityMain.Screens.Call.Objects.Map.map){
                    await ActivityMain.Screens.Call.Objects.Map.map.invalidateSize(true);
                    let locationCenter = await ActivityMain.Screens.Call.Objects.Map.GetData("locationCenter")

                    if(locationCenter) {
                        await  ActivityMain.Screens.Call.Objects.Map.MapSetCenter (locationCenter);
                    }

                }
            }
            ActivityMain.Screens.Call.Objects.Map.MapToMe                 = async function (_zoom = null) {

                UseLocation = async function(_resolve){
                    if(ActivityMain.Screens.Call.Objects.Map.map &&_resolve && _resolve.coords && _resolve.coords.latitude && _resolve.coords.longitude){
                        await ActivityMain.Screens.Call.Objects.Map.MapSetCenter({lat: _resolve.coords.latitude , lon:_resolve.coords.longitude});
                        await ActivityMain.Screens.Call.Objects.Map.MapSetMarkerMy({lat: _resolve.coords.latitude , lon: _resolve.coords.longitude});

                        if(_zoom){
                            ActivityMain.Screens.Call.Objects.Map.map.setZoom(_zoom, 500);
                        }
                    }
                }
                Global.Functions.GeolocationGetLocation(UseLocation);
            }
            ActivityMain.Screens.Call.Objects.Map.MapAddMe                = async function () {

                UseLocation = async function(_resolve){
                    if(ActivityMain.Screens.Call.Objects.Map.map &&_resolve && _resolve.coords && _resolve.coords.latitude && _resolve.coords.longitude){
                        await ActivityMain.Screens.Call.Objects.Map.MapSetMarkerMy({lat: _resolve.coords.latitude , lon: _resolve.coords.longitude});
                    }
                }
                Global.Functions.GeolocationGetLocation(UseLocation);
            }

            ActivityMain.Screens.Call.Objects.Map.MapSetAdressFromСoord   = async function (_coord) {

                let addresses = await ServiceAPI.Functions.GetAddressesFromLocaion(_coord.lat, _coord.lon);

                if(addresses.status = "success" && addresses.records[0]){
                    let flag = false;
                    for(let key in addresses.records){
                        if (addresses.records[key].data.house){
                            //ActivityMain.Screens.Call.Functions.ProcessStepSetData("address-map-move", addresses.records[key]);
                            await ActivityMain.Screens.Call.Objects.Map.SetData("address",addresses.records[key])
                            flag = true;
                            break;
                        }
                    }
                    if(!flag){

                       // ActivityMain.Screens.Call.Functions.ProcessStepSetData("address-map-move", null);
                       await ActivityMain.Screens.Call.Objects.Map.SetData("address",null);
                    }
                }else{
                    //ActivityMain.Screens.Call.Functions.ProcessStepSetData("address-map-move", null);
                    await ActivityMain.Screens.Call.Objects.Map.SetData("address",null);
                }

                await ActivityMain.Screens.Call.Objects.Map.MapOutputEvent();
            }

            ActivityMain.Screens.Call.Objects.Map.PinUp                   = async function () {
                let documentPart    = document.querySelector("#main");
                let mapPin          = documentPart.querySelector("#mapPin");
                mapPin.classList.add("map__pin--up");
            }
            ActivityMain.Screens.Call.Objects.Map.PinDown                 = async function () {
                let documentPart    = document.querySelector("#main");
                let mapPin          = documentPart.querySelector("#mapPin");
                mapPin.classList.remove("map__pin--up");
            }

//----------------------------------------------------------------------------------------------------------------------

    //screen-chat

        ActivityMain.Screens.Chat                                   = {};
        ActivityMain.Screens.Chat.Functions                         = {};
        ActivityMain.Screens.Chat.BlocksStates                      = [];
        ActivityMain.Screens.Chat.Data                              = {};
        ActivityMain.Screens.Chat.Data.ActiveApp                    = false;
        ActivityMain.Screens.Chat.Data.User                         = null;
        ActivityMain.Screens.Chat.DocumentScreenName                = "#screen-chat";
        ActivityMain.Screens.Chat.Objects                           = {};
        ActivityMain.Screens.Chat.Objects.Chat                      = {};

        ActivityMain.Screens.Chat.Functions.BlocksOn                = async function (_panelsName = []) {
            if(_panelsName){
                await ActivityMain.Screens.Chat.Objects.Chat.SetData("panel", _panelsName);

                let documentPart    = document.querySelector("#screen-chat");
                let panels          = documentPart.querySelectorAll(".panel-block");

                let useAnimation    = false;
                for(let i = 0; i < panels.length; i++){
                    if(_panelsName.indexOf(panels[i].getAttribute("id")) == -1 ){
                        Global.Functions.slideUp(panels[i], 300);
                        useAnimation = true;
                    } else {
                        Global.Functions.slideDown(panels[i], 300);
                        useAnimation = true;
                    }
                }
            }
        };

        ActivityMain.Screens.Chat.Objects.Chat.RemData              = async function (){
            await ActivityMain.Screens.Call.Objects.StagesData.SetData("chat", null);
        }
        ActivityMain.Screens.Chat.Objects.Chat.SetData              = async function (_name = null, _obj = null){
            let dataObj = await ActivityMain.Screens.Call.Objects.StagesData.GetData("chat");
            if(dataObj == null) dataObj = {};

            dataObj[_name] = _obj;
            return await ActivityMain.Screens.Call.Objects.StagesData.SetData("chat", dataObj);
        }
        ActivityMain.Screens.Chat.Objects.Chat.GetData              = async function (_name = null){
            let result = null;
            let data = await ActivityMain.Screens.Call.Objects.StagesData.GetData("chat");
            if(data){
                if(typeof data[_name] != "undefined")
                    result = data[_name];
            };
            return result;
        }

        ActivityMain.Screens.Chat.Functions.FunctionKeyDown         = async function () {
            let panelsName = await ActivityMain.Screens.Chat.Objects.Chat.GetData("panel");

            if(panelsName && panelsName[0] != "chat-cancelled"){
                if(panelsName && panelsName[0] == "chat-send-message"){
                    await ActivityMain.Screens.Chat.Functions.BlocksOn(["chat-cancel-call"]);
                }else{
                    await ActivityMain.Screens.Chat.Functions.BlocksOn(["chat-send-message"]);
                }
            }else{
                await ActivityMain.Functions.RemTempData();
                await ActivityMain.Functions.Start ();
            }
        }
        ActivityMain.Screens.Chat.Functions.Start                   = async function () {
            ActivityMain.Screens.Chat.Data.User = await ServiceDB.Functions.GetUser();

            await Global.Functions.SetFunctionKeyDown(ActivityMain.Screens.Chat.Functions.FunctionKeyDown);

            //await ActivityMain.Screens.Chat.Objects.Chat.SetData("callID", null);
            let callID = await ActivityMain.Screens.Chat.Objects.Chat.GetData("callID");

            if(callID){
                if(!ActivityMain.Screens.Chat.Data.ActiveApp){
                    //возврат из спящего режима
                    //требуется перерисовка и подключение
                    let logMessages = await ActivityMain.Screens.Chat.Functions.GetLogMessages("logMessages");
                    if(logMessages){
                        await ActivityMain.Screens.Chat.Functions.PrintMessages(logMessages)
                    }
                    await ActivityMain.Screens.Chat.Functions.BlocksOn(["chat-send-message"]);

                    ActivityMain.Screens.Chat.Functions.Subscribe();
                }
            }else{
                await ActivityMain.Screens.Chat.Functions.ClearMessages();

                ActivityMain.Screens.Chat.Objects.Chat.SetData("callAccept", false);
                ActivityMain.Screens.Chat.Objects.Chat.SetData("callID", null);
                ActivityMain.Screens.Chat.Objects.Chat.SetData("useChatsSubscribe", null);
                ActivityMain.Screens.Chat.Objects.Chat.SetData("useChatsLastTime", null);

                await ActivityMain.Screens.Chat.Functions.BlocksOn(["chat-send-message"]);

                let callData = await ActivityMain.Screens.Call.Objects.Stages.S4.GetData("callData");
                ActivityMain.Screens.Chat.Functions.SendCall(callData);

                Global.Functions.ModaMessagesShow(Resources.Messages.NewCall.message, Resources.Messages.NewCall.buttonText);
            }

        };

        ActivityMain.Screens.Chat.Functions.SendCall                = async function (_callData) {
            let callData = _callData;
            let message = "";

            if(callData){

                if(callData.person.fio)
                    message += "ФИО: " +  callData.person.fio + "<br>";
                if(callData.person.additional)
                    message += "ДОП: " + callData.person.additional + "<br>";
                if(callData.person.gender)
                    message += "ПОЛ: " + callData.person.gender + "<br>";
                if(callData.person.dateBirth)
                    message += "ДР: " + callData.person.dateBirth + "<br>";
                if(callData.address.value)
                    message += "АДРЕС: " + callData.address.value + "<br>";
                if(callData.subject.text)
                    message += "ПОВОД: " + callData.subject.text + "<br>";
                if(callData.textSubject)
                    message += "ПОВОД ДОП: " + callData.textSubject + "<br>";

            }

            ActivityMain.Screens.Chat.Objects.Chat.SetData("firstMessage", callData);

            let callDataString = "{}";
            if(callData){
                callDataString = JSON.stringify(callData);
            }
            let data = {
                'message': message,
                'callData': callDataString,
            }

            let resultServiceAPI = await ServiceAPI.Functions.ChatSendCall(data);

            if(resultServiceAPI && resultServiceAPI.status =="success"){
                ActivityMain.Screens.Chat.Data.ActiveApp    = true;
                await ActivityMain.Screens.Chat.Objects.Chat.SetData("callID", resultServiceAPI.records.id);
                ActivityMain.Screens.Chat.Functions.Subscribe();
            }else{
                Global.Functions.ModaMessagesShow (resultServiceAPI.message, "ПОДТВЕРДИТЬ");
            }
        };
        ActivityMain.Screens.Chat.Functions.CancelCall              = async function (_cancelItem, _cancelText) {
            let data = {
                'call_id': await ActivityMain.Screens.Chat.Objects.Chat.GetData("callID"),
                'reason': _cancelItem,
                'additional': _cancelText,
            }
            let resultCallCancel = await ServiceAPI.Functions.ChatSendCallCancel (data);
            if(resultCallCancel && resultCallCancel.status  == "success"){
                await ActivityMain.Functions.RemTempData();
                await ActivityMain.Functions.Start ();
                Global.Functions.ModaMessagesShow(Resources.Messages.CancelCall.message, Resources.Messages.CancelCall.buttonText);
            }else{
                Global.Functions.ModaMessagesShow(Resources.Messages.CancelCallError.message, Resources.Messages.CancelCallError.buttonText);
            }
        };
        ActivityMain.Screens.Chat.Functions.Subscribe               = async function () {

            if(await ActivityMain.Screens.Chat.Objects.Chat.GetData("callID")){

                await ActivityMain.Screens.Chat.Objects.Chat.SetData("useChatsSubscribe", Date.now())
                await ActivityMain.Screens.Chat.Objects.Chat.SetData("useChatsLastTime", 0)

                //цикл работающий пока лонгпулл актуален
                let tempSubscribe = await ActivityMain.Screens.Chat.Objects.Chat.GetData("useChatsSubscribe");

                while( await ActivityMain.Screens.Chat.Objects.Chat.GetData("useChatsSubscribe") == tempSubscribe ) {
                    let data = {
                        'device_id':    await ActivityMain.Screens.Chat.Objects.Chat.GetData("device_ID"),
                        'call_id':      await ActivityMain.Screens.Chat.Objects.Chat.GetData("callID"),
                        'lastTime':     await ActivityMain.Screens.Chat.Objects.Chat.GetData("useChatsLastTime")
                    }
                    let resultServiceAPI =  await ServiceAPI.Functions.ChatSubscribe(data);

                    if(resultServiceAPI.status = "success" && await ActivityMain.Screens.Chat.Objects.Chat.GetData("useChatsSubscribe") == tempSubscribe){

                        //есть ответ
                            let resultMessages      = resultServiceAPI.records;

                            //устанавливаем флаги действий
                            let flagUpdateRequest   = false; // обновление запроса
                            let flagUpdateDate      = false; // обновление данных
                            let flagUpdateTime      = false; // обновление времени
                            let flagCancelCall      = false; // обновление времени

                            if(resultServiceAPI.records == "closeCall"){
                                flagUpdateRequest   = false;
                                flagCancelCall      = true;
                            }else{
                                flagUpdateRequest   = true;
                                if(resultServiceAPI.records == "reconnectCall" ){
                                        //пакет системный
                                }else{
                                        //пакет данных - перерисовка требуется, обновление времени требуется
                                        flagUpdateDate = true;
                                        flagUpdateTime = true;
                                }
                            }

                            //используем флаги действий
                            if(flagUpdateDate){
                                await ActivityMain.Screens.Chat.Functions.AddLogMessages (resultMessages)
                                ActivityMain.Screens.Chat.Functions.PrintMessages(resultMessages);
                            }
                            if(flagUpdateTime){
                                for (let key in resultMessages) {
                                    if (resultMessages[key].updateTime > await ActivityMain.Screens.Chat.Objects.Chat.GetData("useChatsLastTime"))
                                        await ActivityMain.Screens.Chat.Objects.Chat.SetData("useChatsLastTime", resultMessages[key].updateTime);
                                }
                            }
                            if(!flagUpdateRequest){
                                await ActivityMain.Screens.Chat.Objects.Chat.SetData("useChatsSubscribe", null);
                            }

                            if(flagCancelCall){
                                await Global.Functions.Sleep(1000);
                                await ActivityMain.Screens.Chat.Functions.CallIsCanceled();
                            }
                    }else{
                        await Global.Functions.Sleep(5000);
                    }
                }
            }
        };
        ActivityMain.Screens.Chat.Functions.Delivery                = async function (_messagesId = null){

            if(_messagesId){
                let data = {
                    'call_id':await ActivityMain.Screens.Chat.Objects.Chat.GetData("callID"),
                    'sendTime': Date.now(),
                    'messagesId': _messagesId,
                }
                ServiceAPI.Functions.ChatSendDelivery (data);
            }
        }
        ActivityMain.Screens.Chat.Functions.SendMessage             = async function (_message = null){
            if(await ActivityMain.Screens.Chat.Objects.Chat.GetData("callID")  && _message){
                let data = {
                    'call_id': await ActivityMain.Screens.Chat.Objects.Chat.GetData("callID"),
                    'message': _message,
                }
               ServiceAPI.Functions.ChatSendMessage (data);
            }
        }
        ActivityMain.Screens.Chat.Functions.CallIsCanceled          = async function (){
               await ActivityMain.Screens.Chat.Functions.BlocksOn(["chat-cancelled"]);
        }

        ActivityMain.Screens.Chat.Functions.AddLogMessages          = async function (_messages = null){
           let allMessages = {};

           let oldLog = await ActivityMain.Screens.Chat.Objects.Chat.GetData('logMessages');
           if(oldLog) allMessages = oldLog;

           if(_messages){
               for(let key in _messages){
                   allMessages[_messages[key].id] = _messages[key];
               }
           }

           await ActivityMain.Screens.Chat.Objects.Chat.SetData('logMessages', allMessages);
        }
        ActivityMain.Screens.Chat.Functions.GetLogMessages          = async function (){
            let allMessages = {};

            let oldLog = await ActivityMain.Screens.Chat.Objects.Chat.GetData('logMessages');

            if(oldLog)allMessages = oldLog;
            return allMessages;
        }

        ActivityMain.Screens.Chat.Functions.ListenersOn             = async function () {
            let documentPart = document.querySelector(ActivityMain.Screens.Chat.DocumentScreenName);

            let ButtonSend = documentPart.querySelector(".chat-bottom__send")
            if (ButtonSend){
                ButtonSend.addEventListener('click', async () => {
                    if(await ActivityMain.Screens.Chat.Objects.Chat.GetData("callID") && await ActivityMain.Screens.Chat.Objects.Chat.GetData("callAccept")){
                        let InputSend = documentPart.querySelector(".chat-bottom__input");
                        ActivityMain.Screens.Chat.Functions.SendMessage(InputSend.value);
                        InputSend.value = "";
                        InputSend.style.height = "auto"
                    }else{
                        Global.Functions.ModaMessagesShow(Resources.Messages.ChatWait.message, Resources.Messages.ChatWait.buttonText);
                    }
                })
            }

            let ButtonCanceled = documentPart.querySelector(".chat-bottom__canceled")
            if (ButtonCanceled){
                ButtonCanceled.addEventListener('click', async () => {
                    ActivityMain.Screens.Chat.Functions.FunctionKeyDown();
                })
            }

            let ButtonCancel = documentPart.querySelector(".system_chat_cancel_button");
            if (ButtonCancel){
                ButtonCancel.addEventListener('click', async () => {
                    let cancelItem = await ActivityMain.Screens.Chat.Objects.Chat.GetData("cancelItem");
                    let cancelText = null;
                    if(cancelItem == "Свой ответ")
                        cancelText = await ActivityMain.Screens.Chat.Objects.Chat.GetData("cancelText");
                    await ActivityMain.Screens.Chat.Functions.CancelCall (cancelItem, cancelText);
                })
            }

            let CancelText = documentPart.querySelector(".chat-cancel__textarea")
            if (CancelText){
                CancelText.addEventListener('input', async () => {
                    await ActivityMain.Screens.Chat.Objects.Chat.SetData("cancelText", CancelText.value);
                })
            }

            let RadioGroup = documentPart.querySelectorAll(".chat-cancel__radio-group")
            if (RadioGroup){
                for(let i = 0; i < RadioGroup.length; i++) {
                    RadioGroup[i].addEventListener('change', async () => {
                        let button = RadioGroup[i].querySelector(".chat-cancel__radio-label")
                        if(button){
                           await ActivityMain.Screens.Chat.Objects.Chat.SetData("cancelItem", button.textContent);
                        }
                    })
                }
            }
        }
        ActivityMain.Screens.Chat.Functions.ListenersOn();

        ActivityMain.Screens.Chat.Functions.PrintMessages           = async function (_messages = null) {
            if(_messages){

                let documentPart = document.querySelector(ActivityMain.Screens.Chat.DocumentScreenName);
                let chatMain     = documentPart.querySelector(".chat-main");
                let chatPart     = documentPart.querySelector(".chat-main__messages-list");

                let scrollFlag = false;
                if (chatMain.scrollTop === (chatMain.scrollHeight - chatMain.offsetHeight)) {
                    scrollFlag = true;
                }
                let newMessagesIdArray = [];

                for(let key in _messages){

                    //есть ответ
                    if(_messages[key].user_id != ActivityMain.Screens.Chat.Data.User.id)
                        await ActivityMain.Screens.Chat.Objects.Chat.SetData("callAccept",true)

                    let id = _messages[key].id;

                    let message = _messages[key].message;
                    let classMy = "";
                        if(_messages[key].type && _messages[key].type == "patient") classMy = "chat-main__message--own";
                    let classDT = "";
                        if(_messages[key].deliveryTime) classDT = "chat-main__message--checked";
                    let classSYS = "";
                        if(_messages[key].type  && _messages[key].type.startsWith("system")) classSYS = "chat-main__message--" + "system";

                    let time = "";
                        if(classMy != ""){
                            time = ActivityMain.Screens.Chat.Functions.TimeConverter(_messages[key].sendTime);
                        }else{
                            time = ActivityMain.Screens.Chat.Functions.TimeConverter(_messages[key].regTime);
                        }

                    let messagesPart = chatPart.querySelector("#message_" + id);

                    if(messagesPart){
                        //обновление
                        if(classMy)  messagesPart.classList.add(classMy);
                        if(classDT && classMy)  messagesPart.classList.add(classDT);
                        if(classSYS)  messagesPart.classList.add(classSYS);

                        let timePart = messagesPart.querySelector("chat-main__message-time");

                        if(timePart) {
                            timePart.textContent = time;
                        }
                    }else{
                        //добавлени
                        if(!classMy)
                            newMessagesIdArray.push(id);

                        let item = window.document.createElement("div");
                            item.setAttribute("id", "message_" + id);
                            item.classList.add("chat-main__message" );
                            if(classMy)  item.classList.add(classMy);
                            if(classDT && classMy)  item.classList.add(classDT);
                            if(classSYS) item.classList.add(classSYS)

                        let itemHtml = ""
                            itemHtml += "<button class='chat-main__message-main' type='button'>"
                            itemHtml += "<div class='chat-main__message-text'>"
                            itemHtml += "<p>" + message + "</p>"
                            itemHtml += "</div>"
                            itemHtml += "<div class='chat-main__message-right-block'>"
                            itemHtml += "<div class='chat-main__message-right-block-bottom'>"
                            itemHtml += "<p class='chat-main__message-time'>" + time + "</p>"
                            itemHtml += "<div class='chat-main__checked'>"
                            itemHtml += "</div>"
                            itemHtml += "</div>"
                            itemHtml += "</div>"
                            itemHtml += "</button>"

                        item.innerHTML = itemHtml;
                        chatPart.appendChild(item);

                    }
                }

                if(newMessagesIdArray && newMessagesIdArray.length > 0){
                    //alert(JSON.stringify(newMessagesIdArray))
                    ActivityMain.Screens.Chat.Functions.Delivery(newMessagesIdArray);                    
                }

                if(scrollFlag) {
                    chatMain.scrollTop = 10000;
                }
            }
        }
        ActivityMain.Screens.Chat.Functions.ClearMessages           = async function () {
            let documentPart = document.querySelector(ActivityMain.Screens.Chat.DocumentScreenName);
            let chatPart     = documentPart.querySelector(".chat-main__messages-list");

            chatPart.innerHTML = "";
        }

        ActivityMain.Screens.Chat.Functions.TimeConverter           = function (UNIX_timestamp){
            let d = new Date(UNIX_timestamp);

            var date = ("0" + d.getDate()).slice(-2) + "." + ("0" + (d.getMonth() + 1)).slice(-2) + "." + d.getFullYear();
            var time = d.getHours() + ":" + ("0" + d.getMinutes(2)).slice(-2);
            return time + ' ' + date;
        }




