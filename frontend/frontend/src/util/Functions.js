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

// export const globalURL = "shield-app.tk/"
// export const globalURLFrontend = "shield-site.tk/"

export const globalURL = "http://localhost:8000/"
export const globalURLFrontend = "http://localhost:3000/"


