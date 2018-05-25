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

export const globalURL = "http://shield-app.tk:8000/"
export const globalURLFrontend = "http://shield-site.tk/"

export const globalURL = "http://localhost:8000/"
export const globalURLFrontend = "http://localhost:3000/"
export const MODAL_EXIT_TIME = 2000;

export const STATE_OPTIONS = [
    {text: "AL", value:"AL"},
    {text: "AK", value:"AK"},
    {text: "AZ", value:"AZ"},
    {text: "AR", value:"AR"},
    {text: "CA", value:"CA"},
    {text: "CO", value:"CO"},
    {text: "CT", value:"CT"},
    {text: "DE", value:"DE"},
    {text: "FL", value:"FL"},
    {text: "GA", value:"GA"},
    {text: "HI", value:"HI"},
    {text: "ID", value:"ID"},
    {text: "IL", value:"IL"},
    {text: "IN", value:"IN"},
    {text: "IA", value:"IA"},
    {text: "KS", value:"KS"},
    {text: "KY", value:"KY"},
    {text: "LA", value:"LA"},
    {text: "ME", value:"ME"},
    {text: "MD", value:"MD"},
    {text: "MA", value:"MA"},
    {text: "MI", value:"MI"},
    {text: "MN", value:"MN"},
    {text: "MS", value:"MS"},
    {text: "MO", value:"MO"},
    {text: "MT", value:"MT"},
    {text: "NE", value:"NE"},
    {text: "NV", value:"NV"},
    {text: "NH", value:"NH"},
    {text: "NJ", value:"NJ"},
    {text: "NM", value:"NM"},
    {text: "NY", value:"NY"},
    {text: "NC", value:"NC"},
    {text: "ND", value:"ND"},
    {text: "OH", value:"OH"},
    {text: "OK", value:"OK"},
    {text: "OR", value:"OR"},
    {text: "PA", value:"PA"},
    {text: "RI", value:"RI"},
    {text: "SC", value:"SC"},
    {text: "SD", value:"SD"},
    {text: "TN", value:"TN"},
    {text: "TX", value:"TX"},
    {text: "UT", value:"UT"},
    {text: "VT", value:"VT"},
    {text: "VA", value:"VA"},
    {text: "WA", value:"WA"},
    {text: "WV", value:"WV"},
    {text: "WI", value:"WI"},
    {text: "WY", value:"WY"}
]


