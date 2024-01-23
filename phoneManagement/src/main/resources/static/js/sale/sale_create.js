$(document).ready(function (){
    sessionStorage.removeItem("formData");
})

function stepToNext(){
    var formData = new FormData(document.getElementById('create_form'));
    var body = convertFormDataToObject(formData);

    sessionStorage.setItem("formData", JSON.stringify(body));
    window.location.href = '/sale/msg/rsv';
}