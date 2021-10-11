window.ServiceDB = {};

ServiceDB.Functions = {};
ServiceDB.Data      = {};

//Data
    ServiceDB.Data.userFileName         = "userFile";
    ServiceDB.Data.addressFileName      = "addressFile";
    ServiceDB.Data.addressesFileName    = "addressesFile";
    ServiceDB.Data.contactsFileName     = "contactsFile";
    ServiceDB.Data.subjectsFileName     = "subjectsFile";

//System
    ServiceDB.Functions.Get = async function (_fileName = null) {
        let result = null;
        try {
            if(_fileName){

                //FL
                // let resultServiceFL = await ServiceFL.Functions.ReadFile(_fileName);
                // result = JSON.parse(resultServiceFL);

                //CrPr
                let resultServiceCrPr = await window.localStorage.getItem(_fileName);
                result = await JSON.parse(resultServiceCrPr);
            }
        }catch (e) {}
        return result;
    }
    ServiceDB.Functions.Set = async function (_fileName = null, _data = null) {
        let result = null;
        try {

            if(_fileName){
                //FL
                // let dataText = JSON.stringify(_data);
                // await ServiceFL.Functions.WriteFile(_fileName,dataText);
                // let resultServiceFL = await ServiceFL.Functions.ReadFile(_fileName);
                // result = JSON.parse(resultServiceFL);

                //CrPr
                let dataText = JSON.stringify(_data);
                await window.localStorage.setItem(_fileName, dataText);
                let resultServiceCrPr = await window.localStorage.getItem(_fileName);
                result = await JSON.parse(resultServiceCrPr);
            }

            //CrPr
            //await window.localStorage.setItem('_fileName',_data)

        }catch (e) {}
        return result;
    }
    ServiceDB.Functions.Rem = async function (_fileName = null) {
        let result = null;
        try {
            if(_fileName){

                //CrPr
                let resultServiceCrPr = window.localStorage.removeItem(_fileName);
                result = _fileName;
            }
        }catch (e) {}
        return result;
    }

//Functions

    ServiceDB.Functions.GetUUID         = async function () {
        let result = await ServiceDB.Functions.Get("UUID");
        return result;
    }
    ServiceDB.Functions.SetUUID         = async function ( _data = null) {
        let result = await ServiceDB.Functions.Set("UUID" , _data );
        return result
    }

    ServiceDB.Functions.GetTempData     = async function (_name = null) {
        let result = await ServiceDB.Functions.Get(_name);
        return result;
    }
    ServiceDB.Functions.SetTempData     = async function (_name = null, _data = null) {
        let result = await ServiceDB.Functions.Set(_name , _data );
        return result
    }

    //profile
    ServiceDB.Functions.GetUser         = async function () {
        return await ServiceDB.Functions.Get(ServiceDB.Data.userFileName);
    }
    ServiceDB.Functions.SetUser         = async function (_data = null) {
        return await ServiceDB.Functions.Set(ServiceDB.Data.userFileName, _data);
    }
    ServiceDB.Functions.RemUser         = async function () {
        return await ServiceDB.Functions.Rem(ServiceDB.Data.userFileName);
    }

    ServiceDB.Functions.GetAddress      = async function () {
        return await ServiceDB.Functions.Get(ServiceDB.Data.addressFileName);
    }
    ServiceDB.Functions.SetAddress      = async function (_data = null) {
        return await ServiceDB.Functions.Set(ServiceDB.Data.addressFileName, _data);
    }
    ServiceDB.Functions.RemAddress      = async function () {
        return await ServiceDB.Functions.Rem(ServiceDB.Data.addressFileName);
    }

    ServiceDB.Functions.GetContacts     = async function () {
        let result = []
        let resultServiceDB = await ServiceDB.Functions.Get(ServiceDB.Data.contactsFileName);
        if(resultServiceDB) result = resultServiceDB;
        return result;
    }
    ServiceDB.Functions.SetContact      = async function (_data = null) {
        let result = null;
        if(_data && _data.id){

            let contacts = {};
            let oldContacts = await ServiceDB.Functions.Get(ServiceDB.Data.contactsFileName);
            if(oldContacts){
                contacts = oldContacts;
            }
            contacts[_data.id] = _data;
            result = await ServiceDB.Functions.Set(ServiceDB.Data.contactsFileName, contacts);
        }
        return result;
    }
    ServiceDB.Functions.RemContact      = async function (_id =  null) {
        let result = null;
        if(_id){

            let contacts = {};
            let oldContacts = await ServiceDB.Functions.Get(ServiceDB.Data.contactsFileName);
            if(oldContacts){
                contacts = oldContacts;
            }
            if(contacts[_id]){
                result = contacts[_id];
            }
            delete contacts[_id];

            await ServiceDB.Functions.Set(ServiceDB.Data.contactsFileName, contacts);
        }
        return result;
    }

    //content
    ServiceDB.Functions.GetAddresses    = async function () {
        return await ServiceDB.Functions.Get(ServiceDB.Data.addressesFileName);
    }
    ServiceDB.Functions.SetAddresses    = async function (_data = null) {
        return await ServiceDB.Functions.Set(ServiceDB.Data.addressesFileName, _data);
    }

    ServiceDB.Functions.GetSubjects     = async function () {
        return await ServiceDB.Functions.Get(ServiceDB.Data.subjectsFileName);
    }
    ServiceDB.Functions.SetSubjects     = async function (_data = null) {
        return await ServiceDB.Functions.Set(ServiceDB.Data.subjectsFileName, _data);
    }




