const exec = require('child_process').exec;

module.exports = class CmdClient {
    getDDEVProjectList(callback) {
        exec(`ddev list -j`, (error, stdout, stderr) => {
            let escaped = stdout.replace(/\r?\n|\r/g, "").replace(/\\/g,"\\\\");
            let json = JSON.parse(escaped);
            callback(json["raw"]);
        });
    }

    stopDDEVProject(projectName, callback) {
        exec('ddev stop '+projectName, (error, stdout, stderr) => {
            callback(stdout)
        });
    }

    startDDEVProject(projectName, callback) {
        exec('ddev start '+projectName, (error, stdout, stderr) => {
            callback(stdout)
        });
    }
}