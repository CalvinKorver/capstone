export function isEmpty(s) {
    if (s.length == 0 || s == undefined || s == null) {
        return true;
    } else {
        return false;
    }
}

export function getDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    return (yyyy + '-' + mm + '-' + dd);
}


export function processError(err) {
    if (err.response != undefined) {
        console.log(err.response.data);
        if (err.response.status == 400) {
            let message = ""
            for (let e in err.response.data) {
                message += err.response.data[e] + "\n";
            }
            return ({isError: true, errorMessage: message, isDisplayError: true})
        } else {
            return ({
                isError: true,
                errorMessage: err.response.status + ": " + err.response.statusText,
                isDisplayError: true
            });
        }
    } else {
        return ({isError: true, errorMessage: "Unknown Error!", isDisplayError: true});
    }
}

export function minTwoDigits(n) {
    return (n < 10 ? '0' : '') + n;
}

export const globalURL = "shield-app.tk/"
export const globalURLFrontend = "shield-site.tk/"

// export const globalURL = "http://localhost:8000/"
// export const globalURLFrontend = "http://localhost:3000/"


