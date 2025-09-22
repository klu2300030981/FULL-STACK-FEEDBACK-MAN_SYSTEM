export function callApi(method, url, data, callbacksuccess, callbackerror)
{
    var xhttp = new XMLHttpRequest();
    xhttp.open(method, url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(data);

    xhttp.onreadystatechange = function(){
        if(this.readyState === 4)
        {
            if(this.status === 200)
                callbacksuccess(this.responseText);
            else
                callbackerror("Error: 404 - Service not available");
        }
    };
}

export const setAdminDetails = (adminName) => {
    sessionStorage.setItem('adminName', adminName);
};

export const getAdminName = () => {
    return sessionStorage.getItem('adminName');
};

export const setStudentDetails = (firstName, lastName) => {
    sessionStorage.setItem('studentFirstName', firstName);
    sessionStorage.setItem('studentLastName', lastName);
};

export function getStudentFirstName() {
    return sessionStorage.getItem('studentFirstName') || 'Student';
}

export function getStudentLastName() {
    return sessionStorage.getItem('studentLastName') || '';
}
