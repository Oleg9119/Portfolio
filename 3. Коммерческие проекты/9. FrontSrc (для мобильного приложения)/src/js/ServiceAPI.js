window.ServiceAPI = {};

ServiceAPI.Configs   = {};
ServiceAPI.Data      = {};
ServiceAPI.Functions = {};

//Configs
    //ServiceAPI.Configs.server = "http://192.168.63.230:5024";
    ServiceAPI.Configs.server = "https://ssmp-call-server.1ckab.ru";

//Data
    ServiceAPI.Data.connections                  = {}
    ServiceAPI.Data.connections.ok               = "ok";
    ServiceAPI.Data.connections.unknownError     = "unknownError";
    ServiceAPI.Data.connections.badGateway       = "badGateway";
    ServiceAPI.Data.connections.accessDenied     = "accessDenied";
    ServiceAPI.Data.connections.connectionError  = "connectionError";
    ServiceAPI.Data.connections.serverError      = "serverError";

    ServiceAPI.Data.messages                     = {}
    ServiceAPI.Data.messages.ok                  = "овет получен";
    ServiceAPI.Data.messages.unknownError        = "неизвестная ошибка";
    ServiceAPI.Data.messages.badGateway          = "сервер недоступен";
    ServiceAPI.Data.messages.accessDenied        = "доступ запрещен";
    ServiceAPI.Data.messages.connectionError     = "ошибка соединения";
    ServiceAPI.Data.messages.serverError         = "ошибка сервера";

//Functions

    //main
    ServiceAPI.Functions.GetUser      = async function (_user_id) {

        function getServerConnection(_user_id) {
            let prom = new Promise(function (resolve, reject) {

                let result              = {}
                    result.status       = "error";
                    result.connection   = window.ServiceAPI.Data.connections.unknownError;
                    result.message      = window.ServiceAPI.Data.messages.unknownError;

                let data = {
                    'id': _user_id
                }

                let xhr = new XMLHttpRequest();
                xhr.open('post', window.ServiceAPI.Configs.server + "/Api/getPatient");
                xhr.setRequestHeader('content-type', 'application/json');
                xhr.send(JSON.stringify(data));
                xhr.onload = async function () {

                    if (this.status == 502) {
                        result.connection       = window.ServiceAPI.Data.connections.badGateway;
                        result.message          = window.ServiceAPI.Data.messages.badGateway;
                    } else if (this.status != 200) {
                        result.connection       = window.ServiceAPI.Data.connections.connectionError;
                        result.message          = window.ServiceAPI.Data.messages.connectionError;
                    } else {
                        //есть ответ
                        let response = JSON.parse(this.responseText);

                        if (response.status == 'error') {
                            result.connection   = ServiceAPI.Data.connections.serverError;
                            result.message      = response.message;
                        }else{
                            result.status       = "success";
                            result.connection   = window.ServiceAPI.Data.connections.ok;
                            result.message      = window.ServiceAPI.Data.messages.ok;
                            result.records      = response.records;
                        }
                    }

                    resolve(result)
                };
                xhr.onerror = function (e) {
                    resolve(result)
                };
            });
            return prom;
        }

        let result = await getServerConnection(_user_id);

        return result;
    }
    ServiceAPI.Functions.RegUser      = async function (_firstName, _secondName, _thirdName, _gender, _dateBirth, _additional) {

        function getServerConnection(_firstName, _secondName, _thirdName, _gender, _dateBirth, _additional) {
            let prom = new Promise(function (resolve, reject) {

                let result              = {}
                    result.status       = "error";
                    result.connection   = window.ServiceAPI.Data.connections.unknownError;
                    result.message      = window.ServiceAPI.Data.messages.unknownError;

                let data = {
                    'firstName': _firstName,
                    'secondName': _secondName,
                    'thirdName': _thirdName,
                    'gender': _gender,
                    'dateBirth': _dateBirth,
                    'additional': _additional,
                }

                let xhr = new XMLHttpRequest();
                xhr.open('post', window.ServiceAPI.Configs.server + "/Api/regPatient");
                xhr.setRequestHeader('content-type', 'application/json');
                xhr.send(JSON.stringify(data));
                xhr.onload = async function () {

                    if (this.status == 502) {
                        result.connection       = window.ServiceAPI.Data.connections.badGateway;
                        result.message          = window.ServiceAPI.Data.messages.badGateway;
                    } else if (this.status != 200) {
                        result.connection       = window.ServiceAPI.Data.connections.connectionError;
                        result.message          = window.ServiceAPI.Data.messages.connectionError;
                    } else {
                        //есть ответ
                        let response = JSON.parse(this.responseText);

                        if (response.status == 'error') {
                            result.connection   = ServiceAPI.Data.connections.serverError;
                            result.message      = response.message;
                        }else{
                            result.status       = "success";
                            result.connection   = window.ServiceAPI.Data.connections.ok;
                            result.message      = window.ServiceAPI.Data.messages.ok;
                            result.records      = response.records;
                        }
                    }

                    resolve(result)
                };
                xhr.onerror = function (e) {
                    resolve(result)
                };
            });
            return prom;
        }

        let result = await getServerConnection(_firstName, _secondName, _thirdName, _gender, _dateBirth, _additional);

        return result;
    }
    ServiceAPI.Functions.EditUser   = async function (_data) {

        function getServerConnection(_data) {
            let prom = new Promise(function (resolve, reject) {

                let result              = {}
                result.status       = "error";
                result.connection   = window.ServiceAPI.Data.connections.unknownError;
                result.message      = window.ServiceAPI.Data.messages.unknownError;

                let data = _data;

                let xhr = new XMLHttpRequest();
                xhr.open('post', window.ServiceAPI.Configs.server + "/Api/editPatient");
                xhr.setRequestHeader('content-type', 'application/json');
                xhr.send(JSON.stringify(data));
                xhr.onload = async function () {

                    if (this.status == 502) {
                        result.connection       = window.ServiceAPI.Data.connections.badGateway;
                        result.message          = window.ServiceAPI.Data.messages.badGateway;
                    } else if (this.status != 200) {
                        result.connection       = window.ServiceAPI.Data.connections.connectionError;
                        result.message          = window.ServiceAPI.Data.messages.connectionError;
                    } else {
                        //есть ответ
                        let response = JSON.parse(this.responseText);

                        if (response.status == 'error') {
                            result.connection   = ServiceAPI.Data.connections.serverError;
                            result.message      = response.message;
                        }else{
                            result.status       = "success";
                            result.connection   = window.ServiceAPI.Data.connections.ok;
                            result.message      = window.ServiceAPI.Data.messages.ok;
                            result.records      = response.records;
                        }
                    }

                    resolve(result)
                };
                xhr.onerror = function (e) {
                    resolve(result)
                };
            });
            return prom;
        }

        let result = await getServerConnection(_data);

        return result;
    }

    ServiceAPI.Functions.addHomeContact  = async function (_data) {
        let user = await ServiceDB.Functions.GetUser();
        _data.patient_id = user.id;
        let uuid = await ServiceDB.Functions.GetUUID();
        _data.device_id = uuid;

        function getServerConnection(_data) {
            let prom = new Promise(function (resolve, reject) {

                let result              = {}
                result.status       = "error";
                result.connection   = window.ServiceAPI.Data.connections.unknownError;
                result.message      = window.ServiceAPI.Data.messages.unknownError;

                let data = _data

                let xhr = new XMLHttpRequest();
                xhr.open('post', window.ServiceAPI.Configs.server + "/Api/addHomeContact");
                xhr.setRequestHeader('content-type', 'application/json');
                xhr.send(JSON.stringify(data));
                xhr.onload = async function () {

                    if (this.status == 502) {
                        result.connection       = window.ServiceAPI.Data.connections.badGateway;
                        result.message          = window.ServiceAPI.Data.messages.badGateway;
                    } else if (this.status != 200) {
                        result.connection       = window.ServiceAPI.Data.connections.connectionError;
                        result.message          = window.ServiceAPI.Data.messages.connectionError;
                    } else {
                        //есть ответ
                        let response = JSON.parse(this.responseText);

                        if (response.status == 'error') {
                            result.connection   = ServiceAPI.Data.connections.serverError;
                            result.message      = response.message;
                        }else{
                            result.status       = "success";
                            result.connection   = window.ServiceAPI.Data.connections.ok;
                            result.message      = window.ServiceAPI.Data.messages.ok;
                            result.records      = response.records;
                        }
                    }

                    resolve(result)
                };
                xhr.onerror = function (e) {
                    resolve(result)
                };
            });
            return prom;
        }

        let result = await getServerConnection(_data);
        return result;
    }
    ServiceAPI.Functions.remHomeContact  = async function (_data) {

        let user = await ServiceDB.Functions.GetUser();
        _data.patient_id = user.id;
        let uuid = await ServiceDB.Functions.GetUUID();
        _data.device_id = uuid;

        function getServerConnection(_data) {
            let prom = new Promise(function (resolve, reject) {

                let result              = {}
                result.status       = "error";
                result.connection   = window.ServiceAPI.Data.connections.unknownError;
                result.message      = window.ServiceAPI.Data.messages.unknownError;

                let data = _data;

                let xhr = new XMLHttpRequest();
                xhr.open('post', window.ServiceAPI.Configs.server + "/Api/remHomeContact");
                xhr.setRequestHeader('content-type', 'application/json');
                xhr.send(JSON.stringify(data));
                xhr.onload = async function () {

                    if (this.status == 502) {
                        result.connection       = window.ServiceAPI.Data.connections.badGateway;
                        result.message          = window.ServiceAPI.Data.messages.badGateway;
                    } else if (this.status != 200) {
                        result.connection       = window.ServiceAPI.Data.connections.connectionError;
                        result.message          = window.ServiceAPI.Data.messages.connectionError;
                    } else {
                        //есть ответ
                        let response = JSON.parse(this.responseText);

                        if (response.status == 'error') {
                            result.connection   = ServiceAPI.Data.connections.serverError;
                            result.message      = response.message;
                        }else{
                            result.status       = "success";
                            result.connection   = window.ServiceAPI.Data.connections.ok;
                            result.message      = window.ServiceAPI.Data.messages.ok;
                            result.records      = response.records;
                        }
                    }

                    resolve(result)
                };
                xhr.onerror = function (e) {
                    resolve(result)
                };
            });
            return prom;
        }

        let result = await getServerConnection(_data);
        return result;
    }
    ServiceAPI.Functions.getHomeContact  = async function (_data) {
        let user = await ServiceDB.Functions.GetUser();
        _data.patient_id = user.id;
        let uuid = await ServiceDB.Functions.GetUUID();
        _data.device_id = uuid;

        function getServerConnection(_data) {
            let prom = new Promise(function (resolve, reject) {

                let result              = {}
                result.status       = "error";
                result.connection   = window.ServiceAPI.Data.connections.unknownError;
                result.message      = window.ServiceAPI.Data.messages.unknownError;

                let data = _data;

                let xhr = new XMLHttpRequest();
                xhr.open('post', window.ServiceAPI.Configs.server + "/Api/getHomeContact");
                xhr.setRequestHeader('content-type', 'application/json');
                xhr.send(JSON.stringify(data));
                xhr.onload = async function () {

                    if (this.status == 502) {
                        result.connection       = window.ServiceAPI.Data.connections.badGateway;
                        result.message          = window.ServiceAPI.Data.messages.badGateway;
                    } else if (this.status != 200) {
                        result.connection       = window.ServiceAPI.Data.connections.connectionError;
                        result.message          = window.ServiceAPI.Data.messages.connectionError;
                    } else {
                        //есть ответ
                        let response = JSON.parse(this.responseText);

                        if (response.status == 'error') {
                            result.connection   = ServiceAPI.Data.connections.serverError;
                            result.message      = response.message;
                        }else{
                            result.status       = "success";
                            result.connection   = window.ServiceAPI.Data.connections.ok;
                            result.message      = window.ServiceAPI.Data.messages.ok;
                            result.records      = response.records;
                        }
                    }

                    resolve(result)
                };
                xhr.onerror = function (e) {
                    resolve(result)
                };
            });
            return prom;
        }

        let result = await getServerConnection(_data);
        return result;
    }

    ServiceAPI.Functions.GetSubjects  = async function () {

            function getServerConnection() {
                let prom = new Promise(function (resolve, reject) {

                    let result              = {}
                        result.status       = "error";
                        result.connection   = window.ServiceAPI.Data.connections.unknownError;
                        result.message      = window.ServiceAPI.Data.messages.unknownError;

                    let data = {
                    }

                    let xhr = new XMLHttpRequest();
                    xhr.open('post', window.ServiceAPI.Configs.server + "/Api/listSubject");
                    xhr.setRequestHeader('content-type', 'application/json');
                    xhr.send(JSON.stringify(data));
                    xhr.onload = async function () {
                        if (this.status == 502) {
                            result.connection       = window.ServiceAPI.Data.connections.badGateway;
                            result.message          = window.ServiceAPI.Data.messages.badGateway;
                        } else if (this.status != 200) {
                            result.connection       = window.ServiceAPI.Data.connections.connectionError;
                            result.message          = window.ServiceAPI.Data.messages.connectionError;
                        } else {
                            //есть ответ
                            let response = JSON.parse(this.responseText);

                            if (response.status == 'error') {
                                result.connection   = ServiceAPI.Data.connections.serverError;
                                result.message      = response.message;
                            }else{
                                result.status       = "success";
                                result.connection   = window.ServiceAPI.Data.connections.ok;
                                result.message      = window.ServiceAPI.Data.messages.ok;
                                result.records      = response.records;
                            }
                        }

                        resolve(result)
                    };
                    xhr.onerror = function (e) {
                        resolve(result)
                    };
                });
                return prom;
            }

            let result = await getServerConnection();
            return result;
        }

    ServiceAPI.Functions.GetAddresses = async function (_user_id) {

        function getServerConnection(_user_id) {
            let prom = new Promise(function (resolve, reject) {

                let result              = {}
                result.status       = "error";
                result.connection   = window.ServiceAPI.Data.connections.unknownError;
                result.message      = window.ServiceAPI.Data.messages.unknownError;

                let data = {
                    'patient_id': _user_id,
                }

                let xhr = new XMLHttpRequest();
                xhr.open('post', window.ServiceAPI.Configs.server + "/Api/listAddress");
                xhr.setRequestHeader('content-type', 'application/json');
                xhr.send(JSON.stringify(data));
                xhr.onload = async function () {

                    if (this.status == 502) {
                        result.connection       = window.ServiceAPI.Data.connections.badGateway;
                        result.message          = window.ServiceAPI.Data.messages.badGateway;
                    } else if (this.status != 200) {
                        result.connection       = window.ServiceAPI.Data.connections.connectionError;
                        result.message          = window.ServiceAPI.Data.messages.connectionError;
                    } else {
                        //есть ответ
                        let response = JSON.parse(this.responseText);

                        if (response.status == 'error') {
                            result.connection   = ServiceAPI.Data.connections.serverError;
                            result.message      = response.message;
                        }else{
                            result.status       = "success";
                            result.connection   = window.ServiceAPI.Data.connections.ok;
                            result.message      = window.ServiceAPI.Data.messages.ok;
                            result.records      = response.records;
                        }
                    }

                    resolve(result)
                };
                xhr.onerror = function (e) {
                    resolve(result)
                };
            });
            return prom;
        }

        let result = await getServerConnection(_user_id);
        return result;
    }
    ServiceAPI.Functions.RegAddress   = async function (_user_id, _name, _address, _floor, _apartment, _additional) {

        function getServerConnection(_user_id, _name, _address, _floor, _apartment, _additional) {
            let prom = new Promise(function (resolve, reject) {

                let result              = {}
                result.status       = "error";
                result.connection   = window.ServiceAPI.Data.connections.unknownError;
                result.message      = window.ServiceAPI.Data.messages.unknownError;

                let data = {
                    'patient_id': _user_id,
                    'name': _name,
                    'address': _address,
                    'floor': _floor,
                    'apartment': _apartment,
                    'additional': _additional,
                }

                let xhr = new XMLHttpRequest();
                xhr.open('post', window.ServiceAPI.Configs.server + "/Api/regAddress");
                xhr.setRequestHeader('content-type', 'application/json');
                xhr.send(JSON.stringify(data));
                xhr.onload = async function () {

                    if (this.status == 502) {
                        result.connection       = window.ServiceAPI.Data.connections.badGateway;
                        result.message          = window.ServiceAPI.Data.messages.badGateway;
                    } else if (this.status != 200) {
                        result.connection       = window.ServiceAPI.Data.connections.connectionError;
                        result.message          = window.ServiceAPI.Data.messages.connectionError;
                    } else {
                        //есть ответ
                        let response = JSON.parse(this.responseText);

                        if (response.status == 'error') {
                            result.connection   = ServiceAPI.Data.connections.serverError;
                            result.message      = response.message;
                        }else{
                            result.status       = "success";
                            result.connection   = window.ServiceAPI.Data.connections.ok;
                            result.message      = window.ServiceAPI.Data.messages.ok;
                            result.records      = response.records;
                        }
                    }

                    resolve(result)
                };
                xhr.onerror = function (e) {
                    resolve(result)
                };
            });
            return prom;
        }

        let result = await getServerConnection(_user_id, _name, _address, _floor, _apartment, _additional);
        return result;
    }

    // ServiceAPI.Functions.GetAddress   = async function (_address_id) {
    //     function getServerConnection(_address_id) {
    //         let prom = new Promise(function (resolve, reject) {
    //
    //             let result          = {}
    //                 result.status   = "error";
    //                 result.message  = window.ServiceAPI.Data.messages.unknownError;
    //
    //             let data = {
    //                 'id': _address_id
    //             }
    //
    //             let xhr = new XMLHttpRequest();
    //             xhr.open('post', window.ServiceAPI.Configs.server + "/Api/getAddress");
    //             xhr.setRequestHeader('content-type', 'application/json');
    //             xhr.send(JSON.stringify(data));
    //             xhr.onload = async function () {
    //
    //                 if (this.status == 502) {
    //                     result.message  = window.ServiceAPI.Data.messages.badGateway;
    //                     result.code     = 502;
    //                 } else if (this.status != 200) {
    //                     result.message  = window.ServiceAPI.Data.messages.connectionError;
    //                     result.code     = 200;
    //                 } else {
    //                     //есть ответ
    //                     let response = JSON.parse(this.responseText);
    //
    //                     if (response.status == 'error') {
    //                         result.message  = response.message;
    //                         result.code     = 1;
    //                     }else{
    //                         result.status   = "success";
    //                         result.records  = response.records;
    //                         result.code     = 2;
    //                     }
    //                 }
    //
    //                 resolve(result)
    //             };
    //             xhr.onerror = function (e) {
    //                 result.message = e;
    //                 result.code     = 3;
    //                 resolve(result)
    //             };
    //         });
    //         return prom;
    //     }
    //
    //     let result = await getServerConnection(_address_id);
    //     return result;
    // }
    // ServiceAPI.Functions.RegAddress   = async function (_patient_id, _name, _city, _street, _district, _house, _building, _floor, _apartment, _additional) {
    //
    // function getServerConnection(_patient_id, _name, _city, _street, _district, _house, _building, _floor, _apartment, _additional) {
    //     let prom = new Promise(function (resolve, reject) {
    //
    //         let result          = {}
    //         result.status   = "error";
    //         result.message  = window.ServiceAPI.Data.messages.unknownError;
    //
    //         let data = {
    //             'patient_id': _patient_id,
    //             'name': _name,
    //             'city': _city,
    //             'street': _street,
    //             'district': _district,
    //             'house': _house,
    //             'floor': _floor,
    //             'apartment': _apartment,
    //             'additional': _additional,
    //         }
    //
    //         let xhr = new XMLHttpRequest();
    //         xhr.open('post', window.ServiceAPI.Configs.server + "/Api/regAddress");
    //         xhr.setRequestHeader('content-type', 'application/json');
    //         xhr.send(JSON.stringify(data));
    //         xhr.onload = async function () {
    //
    //             if (this.status == 502) {
    //                 result.message  = window.ServiceAPI.Data.messages.badGateway;
    //                 result.code     = 502;
    //             } else if (this.status != 200) {
    //                 result.message  = window.ServiceAPI.Data.messages.connectionError;
    //                 result.code     = 200;
    //             } else {
    //                 //есть ответ
    //                 let response = JSON.parse(this.responseText);
    //
    //                 if (response.status == 'error') {
    //                     result.message  = response.message;
    //                     result.code     = 1;
    //                 }else{
    //                     result.status   = "success";
    //                     result.records  = response.records;
    //                     result.code     = 2;
    //                 }
    //             }
    //
    //             resolve(result)
    //         };
    //         xhr.onerror = function (e) {
    //             result.message = e;
    //             result.code    = 3;
    //             resolve(result)
    //         };
    //     });
    //     return prom;
    // }
    //
    // let result = await getServerConnection(_patient_id, _name, _city, _street, _district, _house, _building, _floor, _apartment, _additional);
    // return result;
    // }
    //
    // ServiceAPI.Functions.EditGroup    = async function (_patient_id, _group) {
    //
    //     function getServerConnection(_patient_id, _group) {
    //         let prom = new Promise(function (resolve, reject) {
    //
    //             let result          = {}
    //             result.status   = "error";
    //             result.message  = window.ServiceAPI.Data.messages.unknownError;
    //
    //             let data = {
    //                 'id': _patient_id,
    //                 'group': _group,
    //             }
    //
    //             let xhr = new XMLHttpRequest();
    //             xhr.open('post', window.ServiceAPI.Configs.server + "/Api/editPatient");
    //             xhr.setRequestHeader('content-type', 'application/json');
    //             xhr.send(JSON.stringify(data));
    //             xhr.onload = async function () {
    //
    //                 if (this.status == 502) {
    //                     result.message  = window.ServiceAPI.Data.messages.badGateway;
    //                 } else if (this.status != 200) {
    //                     result.message  = window.ServiceAPI.Data.messages.connectionError;
    //                 } else {
    //                     //есть ответ
    //                     let response = JSON.parse(this.responseText);
    //
    //                     if (response.status == 'error') {
    //                         result.message  = response.message;
    //                     }else{
    //                         result.status   = "success";
    //                         result.records  = response.records;
    //                     }
    //                 }
    //
    //                 resolve(result)
    //             };
    //             xhr.onerror = function (e) {
    //                 result.message = e;
    //                 resolve(result)
    //             };
    //         });
    //         return prom;
    //     }
    //
    //     let result = await getServerConnection(_patient_id, _group);
    //     return result;
    // }
    // ServiceAPI.Functions.EditAddress  = async function (_patient_id, _id, _name, _city, _street, _district, _house, _building, _floor, _apartment, _additional) {
    //
    //     function getServerConnection(_id, _patient_id, _name, _city, _street, _district, _house, _building, _floor, _apartment, _additional) {
    //         let prom = new Promise(function (resolve, reject) {
    //
    //             let result      = {}
    //             result.status   = "error";
    //             result.message  = window.ServiceAPI.Data.messages.unknownError;
    //
    //             let data = {
    //                 'id': _id,
    //                 'patient_id': _patient_id,
    //                 'name': _name,
    //                 'city': _city,
    //                 'street': _street,
    //                 'district': _district,
    //                 'house': _house,
    //                 'building': _building,
    //                 'floor': _floor,
    //                 'apartment': _apartment,
    //                 'additional': _additional,
    //             }
    //
    //             let xhr = new XMLHttpRequest();
    //             xhr.open('post', window.ServiceAPI.Configs.server + "/Api/editAddress");
    //             xhr.setRequestHeader('content-type', 'application/json');
    //             xhr.send(JSON.stringify(data));
    //             xhr.onload = async function () {
    //
    //                 if (this.status == 502) {
    //                     result.message  = window.ServiceAPI.Data.messages.badGateway;
    //                 } else if (this.status != 200) {
    //                     result.message  = window.ServiceAPI.Data.messages.connectionError;
    //                 } else {
    //                     //есть ответ
    //                     let response = JSON.parse(this.responseText);
    //
    //                     if (response.status == 'error') {
    //                         result.message  = response.message;
    //                     }else{
    //                         result.status   = "success";
    //                         result.records  = response.records;
    //                     }
    //                 }
    //
    //                 resolve(result)
    //             };
    //             xhr.onerror = function (e) {
    //                 result.message = e;
    //                 resolve(result)
    //             };
    //         });
    //         return prom;
    //     }
    //
    //     let result = await getServerConnection(_id, _patient_id, _name, _city, _street, _district, _house, _building, _floor, _apartment, _additional);
    //     return result;
    // }

    //DADATA
    ServiceAPI.Functions.GetAddressesFromLocaion = async function (_lat, _lon) {

        function getServerConnection(_lat, _lon) {
            let prom = new Promise(function (resolve, reject) {

                let result              = {}
                    result.status       = "error";
                    result.connection   = window.ServiceAPI.Data.connections.unknownError;
                    result.message      = window.ServiceAPI.Data.messages.unknownError;

                let data = {
                    'lon': _lon,
                    'lat': _lat,
                }

                let xhr = new XMLHttpRequest();
                xhr.open('post', window.ServiceAPI.Configs.server + "/Api/getAddressesFromLocaion");
                xhr.setRequestHeader('content-type', 'application/json');
                xhr.send(JSON.stringify(data));
                xhr.onload = async function () {

                    if (this.status == 502) {
                        result.connection       = window.ServiceAPI.Data.connections.badGateway;
                        result.message          = window.ServiceAPI.Data.messages.badGateway;
                    } else if (this.status != 200) {
                        result.connection       = window.ServiceAPI.Data.connections.connectionError;
                        result.message          = window.ServiceAPI.Data.messages.connectionError;
                    } else {
                        //есть ответ
                        let response = JSON.parse(this.responseText);

                        if (response.status == 'error') {
                            result.connection   = ServiceAPI.Data.connections.serverError;
                            result.message      = response.message;
                        }else{
                            result.status       = "success";
                            result.connection   = window.ServiceAPI.Data.connections.ok;
                            result.message      = window.ServiceAPI.Data.messages.ok;
                            result.records      = response.records;
                        }
                    }

                    resolve(result)
                };
                xhr.onerror = function (e) {
                    resolve(result)
                };
            });
            return prom;
        }

        let result = await getServerConnection(_lat, _lon);
        return result;
    }
    ServiceAPI.Functions.GetAddressesFromText    = async function (_text) {

        function getServerConnection(_text) {
            let prom = new Promise(function (resolve, reject) {

                let result              = {}
                    result.status       = "error";
                    result.connection   = window.ServiceAPI.Data.connections.unknownError;
                    result.message      = window.ServiceAPI.Data.messages.unknownError;

                let data = {
                    'text': _text,
                }

                let xhr = new XMLHttpRequest();
                xhr.open('post', window.ServiceAPI.Configs.server + "/Api/getAddressesFromText");
                xhr.setRequestHeader('content-type', 'application/json');
                xhr.send(JSON.stringify(data));
                xhr.onload = async function () {

                    if (this.status == 502) {
                        result.connection       = window.ServiceAPI.Data.connections.badGateway;
                        result.message          = window.ServiceAPI.Data.messages.badGateway;
                    } else if (this.status != 200) {
                        result.connection       = window.ServiceAPI.Data.connections.connectionError;
                        result.message          = window.ServiceAPI.Data.messages.connectionError;
                    } else {
                        //есть ответ
                        let response = JSON.parse(this.responseText);

                        if (response.status == 'error') {
                            result.connection   = ServiceAPI.Data.connections.serverError;
                            result.message      = response.message;
                        }else{
                            result.status       = "success";
                            result.connection   = window.ServiceAPI.Data.connections.ok;
                            result.message      = window.ServiceAPI.Data.messages.ok;
                            result.records      = response.records;
                        }
                    }

                    resolve(result)
                };
                xhr.onerror = function (e) {
                    resolve(result)
                };
            });
            return prom;
        }

        let result = await getServerConnection(_text);
        return result;
    }

    //Чат
        ServiceAPI.Functions.ChatSendCall           = async function (_data) {
            let user = await ServiceDB.Functions.GetUser();
            _data.patient_id = user.id;
            let uuid = await ServiceDB.Functions.GetUUID();
            _data.device_id = uuid;
            let sendTime = Date.now();
            _data.sendTime = sendTime;

            function getServerConnection(_data) {
                let prom = new Promise(function (resolve, reject) {

                    let result          = {}
                        result.status       = "error";
                        result.connection   = window.ServiceAPI.Data.connections.unknownError;
                        result.message      = window.ServiceAPI.Data.messages.unknownError;

                    let data = _data

                    let xhr = new XMLHttpRequest();
                    xhr.open('post', window.ServiceAPI.Configs.server + "/Apichat/sendCall");
                    xhr.setRequestHeader('content-type', 'application/json');
                    xhr.send(JSON.stringify(data));
                    xhr.onload = async function () {

                        if (this.status == 502) {
                            result.connection       = window.ServiceAPI.Data.connections.badGateway;
                            result.message          = window.ServiceAPI.Data.messages.badGateway;
                        } else if (this.status != 200) {
                            result.connection       = window.ServiceAPI.Data.connections.connectionError;
                            result.message          = window.ServiceAPI.Data.messages.connectionError;
                        } else {
                            //есть ответ
                            let response = JSON.parse(this.responseText);

                            if (response.status == 'error') {
                                result.connection   = ServiceAPI.Data.connections.serverError;
                                result.message      = response.message;
                            }else{
                                result.status       = "success";
                                result.connection   = window.ServiceAPI.Data.connections.ok;
                                result.message      = window.ServiceAPI.Data.messages.ok;
                                result.records      = response.records;
                            }
                        }

                        resolve(result)
                    };
                    xhr.onerror = function (e) {
                        resolve(result)
                    };
                });
                return prom;
            }

            let result = await getServerConnection(_data);
            return result;
        }
        ServiceAPI.Functions.ChatSendCallCancel     = async function (_data) {
            let user = await ServiceDB.Functions.GetUser();
            _data.patient_id = user.id;
            let uuid = await ServiceDB.Functions.GetUUID();
            _data.device_id = uuid;
            let sendTime = Date.now();
            _data.sendTime = sendTime;

            function getServerConnection(_data) {
                let prom = new Promise(function (resolve, reject) {

                    let result          = {}
                        result.status       = "error";
                        result.connection   = window.ServiceAPI.Data.connections.unknownError;
                        result.message      = window.ServiceAPI.Data.messages.unknownError;

                    let data = _data

                    let xhr = new XMLHttpRequest();
                    xhr.open('post', window.ServiceAPI.Configs.server + "/Apichat/cancelCall");
                    xhr.setRequestHeader('content-type', 'application/json');
                    xhr.send(JSON.stringify(data));
                    xhr.onload = async function () {

                        if (this.status == 502) {
                            result.connection       = window.ServiceAPI.Data.connections.badGateway;
                            result.message          = window.ServiceAPI.Data.messages.badGateway;
                        } else if (this.status != 200) {
                            result.connection       = window.ServiceAPI.Data.connections.connectionError;
                            result.message          = window.ServiceAPI.Data.messages.connectionError;
                        } else {
                            //есть ответ
                            let response = JSON.parse(this.responseText);

                            if (response.status == 'error') {
                                result.connection   = ServiceAPI.Data.connections.serverError;
                                result.message      = response.message;
                            }else{
                                result.status       = "success";
                                result.connection   = window.ServiceAPI.Data.connections.ok;
                                result.message      = window.ServiceAPI.Data.messages.ok;
                                result.records      = response.records;
                            }
                        }

                        resolve(result)

                    };
                    xhr.onerror = function (e) {
                        resolve(result)
                    };
                });
                return prom;
            }

            let result = await getServerConnection(_data);
            return result;
        }
        ServiceAPI.Functions.ChatSubscribe          = async function (_data) {
            let user = await ServiceDB.Functions.GetUser();
            _data.patient_id = user.id;
            let uuid = await ServiceDB.Functions.GetUUID();
            _data.device_id = uuid;
            let sendTime = Date.now();
            _data.sendTime = sendTime;

            function getServerConnection(_data) {
                let prom = new Promise(function (resolve, reject) {

                    let result              = {}
                        result.status       = "error";
                        result.connection   = window.ServiceAPI.Data.connections.unknownError;
                        result.message      = window.ServiceAPI.Data.messages.unknownError;

                    let data = _data

                    let xhr = new XMLHttpRequest();
                    xhr.open('post', window.ServiceAPI.Configs.server + "/Apichat/subscribe");
                    xhr.setRequestHeader('content-type', 'application/json');
                    xhr.send(JSON.stringify(data));
                    xhr.onload = async function () {

                        if (this.status == 502) {
                            result.connection       = window.ServiceAPI.Data.connections.badGateway;
                            result.message          = window.ServiceAPI.Data.messages.badGateway;
                        } else if (this.status != 200) {
                            result.connection       = window.ServiceAPI.Data.connections.connectionError;
                            result.message          = window.ServiceAPI.Data.messages.connectionError;
                        } else {
                            //есть ответ
                            let response = JSON.parse(this.responseText);

                            if (response.status == 'error') {
                                result.connection   = ServiceAPI.Data.connections.serverError;
                                result.message      = response.message;
                            }else{
                                result.status       = "success";
                                result.connection   = window.ServiceAPI.Data.connections.ok;
                                result.message      = window.ServiceAPI.Data.messages.ok;
                                result.records      = response.records;
                            }
                        }

                        resolve(result)
                    };
                    xhr.onerror = function (e) {
                        resolve(result)
                    };
                });
                return prom;
            }

            let result = await getServerConnection(_data);
            return result;
        }
        ServiceAPI.Functions.ChatSendMessage        = async function (_data) {
            let user = await ServiceDB.Functions.GetUser();
            _data.patient_id = user.id;
            let uuid = await ServiceDB.Functions.GetUUID();
            _data.device_id = uuid;
            let sendTime = Date.now();
            _data.sendTime = sendTime;

            function getServerConnection(_data) {
                let prom = new Promise(function (resolve, reject) {

                    let result          = {}
                    result.status   = "error";
                    result.message  = window.ServiceAPI.Data.messages.unknownError;

                    let data = _data

                    let xhr = new XMLHttpRequest();
                    xhr.open('post', window.ServiceAPI.Configs.server + "/Apichat/sendChatsMessage");
                    xhr.setRequestHeader('content-type', 'application/json');
                    xhr.send(JSON.stringify(data));
                    xhr.onload = async function () {

                        if (this.status == 502) {
                            result.message  = window.ServiceAPI.Data.messages.badGateway;
                            result.code     = 502;
                        } else if (this.status != 200) {
                            result.message  = window.ServiceAPI.Data.messages.connectionError;
                            result.code     = 200;
                        } else {
                            //есть ответ
                            let response = JSON.parse(this.responseText);

                            if (response.status == 'error') {
                                result.message  = response.message;
                                result.code     = 1;
                            }else{
                                result.status   = "success";
                                result.records  = response.records;
                                result.code     = 2;
                            }
                        }

                        resolve(result)
                    };
                    xhr.onerror = function (e) {
                        result.message = e;
                        result.code     = 3;
                        resolve(result)
                    };
                });
                return prom;
            }

            let result = await getServerConnection(_data);
            return result;
        }
        ServiceAPI.Functions.ChatSendDelivery       = async function (_data) {
            let user = await ServiceDB.Functions.GetUser();
            _data.patient_id = user.id;
            let uuid = await ServiceDB.Functions.GetUUID();
            _data.device_id = uuid;
            let sendTime = Date.now();
            _data.sendTime = sendTime;

            function getServerConnection(_data) {
                let prom = new Promise(function (resolve, reject) {

                    let result          = {}
                    result.status   = "error";
                    result.message  = window.ServiceAPI.Data.messages.unknownError;

                    let data = _data

                    let xhr = new XMLHttpRequest();
                    xhr.open('post', window.ServiceAPI.Configs.server + "/Apichat/deliveryChatsMessage");
                    xhr.setRequestHeader('content-type', 'application/json');
                    xhr.send(JSON.stringify(data));
                    xhr.onload = async function () {

                        if (this.status == 502) {
                            result.message  = window.ServiceAPI.Data.messages.badGateway;
                            result.code     = 502;
                        } else if (this.status != 200) {
                            result.message  = window.ServiceAPI.Data.messages.connectionError;
                            result.code     = 200;
                        } else {
                            //есть ответ
                            let response = JSON.parse(this.responseText);

                            if (response.status == 'error') {
                                result.message  = response.message;
                                result.code     = 1;
                            }else{
                                result.status   = "success";
                                result.records  = response.records;
                                result.code     = 2;
                            }
                        }

                        resolve(result)
                    };
                    xhr.onerror = function (e) {
                        result.message = e;
                        result.code     = 3;
                        resolve(result)
                    };
                });
                return prom;
            }

            let result = await getServerConnection(_data);
            return result;
        }


