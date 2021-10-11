window.ServiceFL = {};
ServiceFL.Functions = {};

//Functions
    ServiceFL.Functions.ReadFile = function (_filename) {
        let $P = new Promise(function (resolve, reject) {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
                fs.root.getFile(_filename, {create: true, exclusive: false}, function (fileEntry) {
                    fileEntry.file(function (file) {
                        let reader = new FileReader();

                        reader.onloadend = function () {
                            resolve(this.result)
                        };

                        reader.readAsText(file);

                    }, function (e) {
                        reject(e)
                    });

                }, function (e) {
                    reject(e)
                });

            }, function (e) {
                reject(e)
            });
        })
        return $P
    }
    ServiceFL.Functions.WriteFile = function (_filename, _content) {
        let $P = new Promise(function (resolve, reject) {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
                fs.root.getFile(_filename, {create: true, exclusive: false}, function (fileEntry) {
                    fileEntry.createWriter(function (fileWriter) {
                        fileWriter.onwriteend = function () {
                            resolve(fileEntry);
                        };

                        fileWriter.onerror = function (e) {
                            reject(e.toString());
                        };

                        // If data object is not passed in,
                        // create a new Blob instead.
                        if (!_content) {
                            content = '';
                        }
                        let dataObj = new Blob([_content], {type: 'text/plain'});

                        fileWriter.write(dataObj);
                    });
                }, function (e) {
                    reject(e)
                });

            }, function (e) {
                reject(e)
            });
        })
        return $P
    }



