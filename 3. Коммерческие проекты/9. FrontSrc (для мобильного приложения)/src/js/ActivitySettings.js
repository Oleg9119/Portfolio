
window.ActivitySettings         = {};
    ActivitySettings.Functions      = {};
    ActivitySettings.Screens        = {};
    ActivitySettings.Data           = {};
    ActivitySettings.Objects        = {};

//Data
    ActivitySettings.Data.DocumentActivityName  = "#settings";
    ActivitySettings.Data.CallbackActivity      = null;

//Functions
    ActivitySettings.Functions.ActivityOn       = async function () {
            await Global.Functions.ActivityOn(ActivitySettings.Data.DocumentActivityName);
        }
    ActivitySettings.Functions.ScreenOn         = async function (_screenName = null) {
            await Global.Functions.ScreenOn (ActivitySettings.Data.DocumentActivityName, _screenName);
        }

    ActivitySettings.Functions.Start            = async function (_callbackActivity = null) {
            ActivitySettings.Data.CallbackActivity      = _callbackActivity;
            await ActivitySettings.Functions.ActivityOn();
            ActivitySettings.Screens.Main.Functions.Start();
        }
//Screens

//----------------------------------------------------------------------------------------------------------------------

    //screen-main

    ActivitySettings.Screens.Main                                   = {};
    ActivitySettings.Screens.Main.Functions                         = {};
    ActivitySettings.Screens.Main.Data                              = {};
    ActivitySettings.Screens.Main.DocumentScreenName                = "#settings-main";

    ActivitySettings.Screens.Main.Functions.FunctionKeyDown         = async function () {
            if(ActivitySettings.Data.CallbackActivity && ActivitySettings.Data.CallbackActivity != ActivitySettings.Data.DocumentActivityName){
                Global.Functions.ActivityManager(null, ActivitySettings.Data.CallbackActivity);
            }else{
                Global.Functions.ActivityManager(null, "Main");
            }
        }
    ActivitySettings.Screens.Main.Functions.Start                   = async function () {
            await Global.Functions.SetFunctionKeyDown(ActivitySettings.Screens.Main.Functions.FunctionKeyDown);
            await ActivitySettings.Functions.ScreenOn(ActivitySettings.Screens.Main.DocumentScreenName);
        };

    ActivitySettings.Screens.Main.Functions.ListenersOn             = async function () {
            let documentPart = document.querySelector(ActivitySettings.Data.DocumentActivityName);

            let ButtonUser = documentPart.querySelector(".settings__button--user")
            if (ButtonUser){
                ButtonUser.addEventListener('click', async () => {
                    await ActivitySettings.Screens.Person.Functions.Start();
                })
            }

            let ButtonContacts = documentPart.querySelector(".settings__button--contacts")
            if (ButtonContacts){
                ButtonContacts.addEventListener('click', async () => {
                    await ActivitySettings.Screens.Contacts.Functions.Start();
                })
            }

        }
    ActivitySettings.Screens.Main.Functions.ListenersOn();

//----------------------------------------------------------------------------------------------------------------------

    //screen-user

        ActivitySettings.Screens.Person                                     = {};
        ActivitySettings.Screens.Person.Functions                           = {};
        ActivitySettings.Screens.Person.Data                                = {};
        ActivitySettings.Screens.Person.DocumentScreenName                  = "#settings-person";

        ActivitySettings.Screens.Person.Data.User                           = null;

        ActivitySettings.Screens.Person.Functions.FunctionKeyDown           = async function () {
            ActivitySettings.Screens.Main.Functions.Start();
        }
        ActivitySettings.Screens.Person.Functions.Start                     = async function () {
            ActivitySettings.Screens.Person.Data.User                     = null;

            await Global.Functions.SetFunctionKeyDown(ActivitySettings.Screens.Person.Functions.FunctionKeyDown);
            await ActivitySettings.Functions.ScreenOn(ActivitySettings.Screens.Person.DocumentScreenName);
            await ActivitySettings.Screens.Person.Functions.LoadData();
        };

        ActivitySettings.Screens.Person.Functions.LoadData                  = async function () {
            ActivitySettings.Screens.Person.Data.User = await ServiceDB.Functions.GetUser();
            let userData    = ActivitySettings.Screens.Person.Data.User;

            let documentPart = document.querySelector(ActivitySettings.Screens.Person.DocumentScreenName);

            let secondName  = documentPart.querySelector("#last-name-3");
            let firstName   = documentPart.querySelector("#first-name-3");
            let thirdName   = documentPart.querySelector("#patronymic-name-3");
            let gender      = documentPart.querySelector("#sex-3");
            let dateBirth   = documentPart.querySelector("#birthday-3");
            let additional  = documentPart.querySelector("#additional-3");

            if(userData && userData.secondName){
                secondName.value = userData.secondName
            };
            if(userData && userData.firstName){
                firstName.value = userData.firstName
            };
            if(userData && userData.thirdName){
                thirdName.value = userData.thirdName
            };
            if(userData && userData.gender){
                gender.value = userData.gender
            };
            if(userData && userData.dateBirth){
                dateBirth.value = userData.dateBirth
            };
            if(userData && userData.additional){
                additional.value = userData.additional
            };
        };
        ActivitySettings.Screens.Person.Functions.ScanData                  = async function () {
            let documentPart    = document.querySelector(ActivitySettings.Screens.Person.DocumentScreenName);
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
                let data = {}
                data.id         = ActivitySettings.Screens.Person.Data.User.id
                data.firstName  = personData.firstName;
                data.secondName = personData.secondName;
                data.thirdName  = personData.thirdName;
                data.gender     = personData.gender;
                data.dateBirth  = personData.dateBirth;
                data.additional = personData.additional;

                let resultRegUser = await ServiceAPI.Functions.EditUser (data);
                if (resultRegUser.status == 'error') {
                    Global.Functions.ModaMessagesShow(resultRegUser.message, "Подтвердить");
                }
                if (resultRegUser.status == 'success') {
                    await ServiceDB.Functions.SetUser(resultRegUser.records);
                    Global.Functions.ModaMessagesShow(Resources.Messages.DataEdit.message, Resources.Messages.DataEdit.buttonText);
                    await Global.Functions.OnBackKeyDown();
                }
            }
        }

        ActivitySettings.Screens.Person.Functions.ListenersOn               = async function () {
            let documentPart = document.querySelector(ActivitySettings.Screens.Person.DocumentScreenName);

            let ButtonSave = documentPart.querySelector(".form-person-button.button--save")
            if (ButtonSave){
                ButtonSave.addEventListener('click', async () => {
                    ActivitySettings.Screens.Person.Functions.ScanData();
                })
            }

            let ButtonCancel = documentPart.querySelector(".form-person-button.button--cancel")
            if (ButtonCancel){
                ButtonCancel.addEventListener('click', async () => {
                    ActivitySettings.Screens.Person.Functions.FunctionKeyDown();
                })
            }

            let personForm      = documentPart.querySelector(".person__form");
            if (personForm){
                personForm.addEventListener('submit', (evt) => {
                    evt.preventDefault();
                });
            }

        }
        ActivitySettings.Screens.Person.Functions.ListenersOn();

    //screen-contacts

        ActivitySettings.Screens.Contacts                                   = {};
        ActivitySettings.Screens.Contacts.Functions                         = {};
        ActivitySettings.Screens.Contacts.Data                              = {};
        ActivitySettings.Screens.Contacts.DocumentScreenName                = "#settings-contacts";

        ActivitySettings.Screens.Contacts.Data.Contacts                     = {};

        ActivitySettings.Screens.Contacts.Functions.FunctionKeyDown         = async function () {
            ActivitySettings.Screens.Main.Functions.Start();
        }
        ActivitySettings.Screens.Contacts.Functions.Start                   = async function () {
            await Global.Functions.SetFunctionKeyDown(ActivitySettings.Screens.Contacts.Functions.FunctionKeyDown);
            await ActivitySettings.Functions.ScreenOn(ActivitySettings.Screens.Contacts.DocumentScreenName);
            ActivitySettings.Screens.Contacts.Data.Contacts = await ServiceDB.Functions.GetContacts();
            await ActivitySettings.Screens.Contacts.Functions.PrintData ();
        };

        ActivitySettings.Screens.Contacts.Functions.PrintData               = async function () {
            let contacts = ActivitySettings.Screens.Contacts.Data.Contacts;
            let contactsHtml = "";

            for (let key in contacts) {
                let id          = contacts[key].id;
                let fio         = contacts[key].secondName + " " + contacts[key].firstName;
                    if (contacts[key].thirdName) fio += " " + contacts[key].thirdName;
                let gender      = contacts[key].gender;
                let birthday    = contacts[key].dateBirth;

                let itemHtml = "";
                itemHtml += '<li itemId="' + id + '"  class="person-home-list__item">';
                itemHtml += '<button class="person-home-list__button button" type="button">';
                itemHtml += '<span class="person-home-list__image"></span>';
                itemHtml += '<div class="person-home-list__data">';
                itemHtml += '<div class="person-home-list__data-container">ФИО: ';
                itemHtml += '<span class="person-home-list__name">' + fio + '</span>';
                itemHtml += '</div>';
                itemHtml += '<div class="person-home-list__data-container">Пол: ';
                itemHtml += '<span class="person-home-list__sex">' + gender + '</span>';
                itemHtml += '</div>';
                itemHtml += '<div class="person-home-list__data-container">Дата рождения: ';
                itemHtml += '<span class="person-home-list__birthday">' + birthday + '</span>';
                itemHtml += '</div>';
                itemHtml += '</div>';
                itemHtml += '</button>';
                itemHtml += '</li>';

                contactsHtml = contactsHtml + itemHtml;
            }

            let documentPart = document.querySelector(ActivitySettings.Screens.Contacts.DocumentScreenName);
            let contactsList = documentPart.querySelector(".person-home-list");
            contactsList.innerHTML = contactsHtml;

            //события
            let contactsButton = contactsList.querySelectorAll(".person-home-list__item");
            if (contactsButton){
                for(let i = 0; i < contactsButton.length; i++){
                    contactsButton[i].addEventListener('click', async () => {
                        let id = contactsButton[i].getAttribute("itemId");
                        ActivitySettings.Screens.Contactform.Functions.Start(ActivitySettings.Screens.Contacts.Data.Contacts[id])
                    })
                }
            }

        }

        ActivitySettings.Screens.Contacts.Functions.ListenersOn             = async function () {
            let documentPart = document.querySelector(ActivitySettings.Screens.Contacts.DocumentScreenName);

            let ButtonAdd = documentPart.querySelector(".person-list_button--add")
            if (ButtonAdd){
                ButtonAdd.addEventListener('click', async () => {
                    await ActivitySettings.Screens.Contactform.Functions.Start();
                })
            }
        }
        ActivitySettings.Screens.Contacts.Functions.ListenersOn();

    //screen-contact-form

        ActivitySettings.Screens.Contactform                                = {};
        ActivitySettings.Screens.Contactform.Functions                      = {};
        ActivitySettings.Screens.Contactform.Data                           = {};
        ActivitySettings.Screens.Contactform.DocumentScreenName             = "#settings-contacts-form";

        ActivitySettings.Screens.Contactform.Data.Contact                   = null;

        ActivitySettings.Screens.Contactform.Functions.FunctionKeyDown      = async function () {
            ActivitySettings.Screens.Contacts.Functions.Start();
        }
        ActivitySettings.Screens.Contactform.Functions.Start                = async function (_data = null) {
            ActivitySettings.Screens.Contactform.Data.Contact               = _data;

            await Global.Functions.SetFunctionKeyDown(ActivitySettings.Screens.Contactform.Functions.FunctionKeyDown);
            await ActivitySettings.Functions.ScreenOn(ActivitySettings.Screens.Contactform.DocumentScreenName);
            await ActivitySettings.Screens.Contactform.Functions.LoadData()
        };

        ActivitySettings.Screens.Contactform.Functions.LoadData             = async function () {
            let documentPart    = document.querySelector(ActivitySettings.Screens.Contactform.DocumentScreenName);
            let personPart      = documentPart.querySelector(".person__form");

            let secondName      = personPart.querySelector("#last-name3");
            let firstName       = personPart.querySelector("#first-name3");
            let thirdName       = personPart.querySelector("#patronymic-name3");
            let gender          = personPart.querySelector("#sex3");
            let dateBirth       = personPart.querySelector("#birthday3");

            let contactData    = ActivitySettings.Screens.Contactform.Data.Contact;

            if(contactData){
                if(contactData && contactData.secondName){
                    secondName.value = contactData.secondName
                };
                if(contactData && contactData.firstName){
                    firstName.value = contactData.firstName
                };
                if(contactData && contactData.thirdName){
                    thirdName.value = contactData.thirdName
                };
                if(contactData && contactData.gender){
                    gender.value = contactData.gender
                };
                if(contactData && contactData.dateBirth){
                    dateBirth.value = contactData.dateBirth
                };
            }else{
                    secondName.value    = '' ;
                    firstName.value     = '' ;
                    thirdName.value     = '' ;
                    gender.value        = '' ;
                    dateBirth.value     = '' ;
            }
        };
        ActivitySettings.Screens.Contactform.Functions.ScanData             = async function () {
            let documentPart    = document.querySelector(ActivitySettings.Screens.Contactform.DocumentScreenName);
            let personPart      = documentPart.querySelector(".person__form");

            let personData      = {};
            let checkData       = true;

            if (personPart){
                let formData = new FormData(personPart);
                formData.forEach(function (value, key) {
                    personData[key] = value;
                    if((key == "firstName" || key == "secondName" || key == "gender" || key == "dateBirth") && value == ""){
                        checkData = false;
                    }
                });
            }

            if(checkData){
                let data = {}
                data.firstName  = personData.firstName;
                data.secondName = personData.secondName;
                data.thirdName  = personData.thirdName;
                data.gender     = personData.gender;
                data.dateBirth  = personData.dateBirth;

                let resultRegUser = await ServiceAPI.Functions.addHomeContact (data);
                if (resultRegUser.status == 'error') {
                    Global.Functions.ModaMessagesShow(resultRegUser.message, "Подтвердить");
                }
                if (resultRegUser.status == 'success') {
                   let contactData  = ActivitySettings.Screens.Contactform.Data.Contact;
                   if(contactData){
                       await ServiceDB.Functions.RemContact(contactData.id);
                       await ServiceAPI.Functions.remHomeContact({contact_id: contactData.id});
                   }

                   await ServiceDB.Functions.SetContact(resultRegUser.records);
                   await ActivitySettings.Screens.Contactform.Functions.FunctionKeyDown();
                }
            }
        }

        ActivitySettings.Screens.Contactform.Functions.ListenersOn          = async function () {
            let documentPart = document.querySelector(ActivitySettings.Screens.Contactform.DocumentScreenName);

            let ButtonSave = documentPart.querySelector(".form-person-button.button--save")
            if (ButtonSave){
                ButtonSave.addEventListener('click', async () => {
                    ActivitySettings.Screens.Contactform.Functions.ScanData();
                })
            }

            let ButtonCancel = documentPart.querySelector(".form-person-button.button--cancel")
            if (ButtonCancel){
                ButtonCancel.addEventListener('click', async () => {
                    ActivitySettings.Screens.Contactform.Functions.FunctionKeyDown();
                })
            }

            let personForm      = documentPart.querySelector(".person__form");
            if (personForm){
                personForm.addEventListener('submit', (evt) => {
                    evt.preventDefault();
                });
            }

        }
        ActivitySettings.Screens.Contactform.Functions.ListenersOn();