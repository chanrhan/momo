
$(document).ready(function (){
    var formData = sessionStorage.getItem("formData");
    if(formData === null || formData === "") {
        alert("잘못된 접근입니다!");
        window.close();
    }
    var formObject = JSON.parse(formData);
    // console.log(formObject);
    $('#custNm').val(formObject.custNm);
    $('#custTel').val(formObject.custTel);
})

function clickSelectButton(formId){

}

function createSale(){
    var body = JSON.parse(sessionStorage.getItem("formData"));
    body["custNm"] = $('#custNm').val();
    body["custTel"] = $('#custTel').val();

    var msgRsv = [];

    var formList = document.getElementsByName('msg_form');
    formList.forEach(function (value, key, parent) {
        var typeField = value.querySelector('input[name="type"]');
        var type;
        if($(typeField).attr('type') === 'checkbox'){
            type = (typeField.checked) ? 1 : -1;
        }else{
            type = typeField.value;
        }
        if(type !== null && type !== "" && type !== -1){
            var b = {};
            var form_id = value.querySelector('input[name="form_id"]').value;
            b["formId"] = form_id;
            var rsv_dt = value.querySelector('input[name="rsv_dt"]').value;
            b["rsvDt"] = rsv_dt;
            b["typeId"] = type;
            msgRsv.push(b);
        }
    });
    console.log(msgRsv);
    body["msgRsvList"] = msgRsv;

    $.ajax({
        url: '/sale/create',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(body),
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            if(result){
                sessionStorage.removeItem("formData");
                window.opener.parent.searchSale();
                window.close();
            }
        }
    })
}