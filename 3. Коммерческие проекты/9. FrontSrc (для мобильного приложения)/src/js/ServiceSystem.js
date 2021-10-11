window.ServiceSystem = {};

ServiceSystem.Functions = {};
ServiceSystem.Data      = {};

//Functions
    ServiceSystem.Functions.AddressesSync = async function () {
        let result = null;
        try {
            let user = await ServiceDB.Functions.GetUser();
            if(user && user.id){
                let serverAddresses = await ServiceAPI.Functions.GetAddresses (user.id);
                if(serverAddresses.status == "success"){
                    let addresses = serverAddresses.records
                    result = await ServiceDB.Functions.SetAddresses(addresses);
                }
            }
        }catch (e) {}
        return result;
    }
    ServiceSystem.Functions.SubjectsSync = async function () {
        let result = null;
        try {
                let serverSubjects = await ServiceAPI.Functions.GetSubjects ();
                if(serverSubjects.status == "success"){
                    let subjects = serverSubjects.records
                    result = await ServiceDB.Functions.SetSubjects(subjects);
            }
        }catch (e) {}
        return result;
    }
    ServiceSystem.Functions.ContactSync = async function () {
        let result = null;
        try {

            let user = await ServiceDB.Functions.GetUser();

            let group = JSON.parse(user.group);

            if(group){
                for (let i = 0; i < group.length; i++) {
                    let id =  group[i];
                    let contact = await ServiceAPI.Functions.GetUser(id);
                    await ServiceDB.Functions.RemContact(id);
                    if(contact && contact.status == "success"){
                        await ServiceDB.Functions.SetContact(contact.records);
                    }
                }
            }
            result = true;
        }catch (e) {}
        return result;
    }