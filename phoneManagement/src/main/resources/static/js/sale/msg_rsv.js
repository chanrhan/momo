
let child_window = null;

$(document).ready(function (){
    var formData = sessionStorage.getItem("formData");
    if(formData === null || formData === "") {
        alert("잘못된 접근입니다!");
        window.close();
    }
    var formObject = JSON.parse(formData);
    // console.log(formObject);
    $('#custNm').val(formObject.cust_nm);
    $('#custTel').val(formObject.cust_tel);
})

function clickSelectButton(formId){
    $.ajax({
        url: '/sale/msg/form/func?formId='+formId,
        type: 'get',
        success: function (url){
            if(url !== null){
                child_window = window.open(
                    url,
                    "양식 선택",
                    "width=500, height=500, location=no"
                )
            }
        }
    })
}

function submitReservation(){
    var from = sessionStorage.getItem("from");
    if(from === "create"){
        createSale();
    }else{
        reserveMessage();
    }
}

function createSale(){
    var sale_body = JSON.parse(sessionStorage.getItem("formData"));
    var custNm = $('#custNm').val();
    var custTel = $('#custTel').val();
    sale_body["cust_nm"] = custNm;
    sale_body["cust_tel"] = custTel;

    var rst = false;
    $.ajax({
        url: '/sale/create',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(sale_body),
        async: false,
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            rst = result;
        }
    });
    if(rst){
        reserveMessage();
    }
}

function reserveMessage(){
    var custNm = $('#custNm').val();
    var custTel = $('#custTel').val();

    var msgRsv = [];

    var formList = document.getElementsByName('msg_form');
    formList.forEach(function (value, key, parent) {
        var typeField = value.querySelector('input[name="type"]');
        var type;
        if($(typeField).attr('type') === 'checkbox'){
            type = (typeField.checked) ? 1 : -1;
        }else{
            type = $(typeField).attr('type_id');
        }

        if(type !== null && type !== "" && type !== -1){
            var b = {};
            var form_id = value.querySelector('input[name="form_id"]').value;
            b["form_id"] = form_id;
            var rsv_dt = value.querySelector('input[name="rsv_dt"]').value;
            b["rsv_dt"] = rsv_dt;
            b["type_id"] = type;
            msgRsv.push(b);
        }
    });
    // console.log(msgRsv);
    var msg_body = JSON.parse(sessionStorage.getItem("formData"));
    msg_body["cust_nm"] = custNm;
    msg_body["cust_tel"] = custTel;
    msg_body["msg_list"] = msgRsv;

    $.ajax({
        url: '/msg/reserve',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(msg_body),
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result2){
            if(result2){
                sessionStorage.removeItem("formData");
                sessionStorage.removeItem("from");
                window.opener.parent.searchSale();
                window.close();
            }
        }
    })
}