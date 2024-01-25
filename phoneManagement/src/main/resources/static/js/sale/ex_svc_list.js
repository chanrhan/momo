
function searchExsvc(){
    var keyword = $('#srch').val();

    var body = {
        searchMap: {
            "ex_svc_nm": keyword
        }
    };

    $.ajax({
        url: '/sale/exsvc/srch',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(body),
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            var list_exsvc = document.getElementById('list_exsvc');
            list_exsvc.innerHTML = "";
            result.forEach(function (value, index, array) {
                list_exsvc.innerHTML += "<tr th:exsvc_id='" +
                    value.exSvcId +
                    "' th:exsvc_nm='" +
                    value.exSvcNm +
                    "' onclick='selectExsvc(this)" +
                    "'><td>" +
                    value.exSvcNm +
                    "</td>" +
                    "<td>" +
                    value.description +
                    "</td>" +
                    "</tr>";
            });
        }
    });
}

function selectExsvc(_this){
    var exsvcId = $(_this).attr('exsvc_id');
    var exsvcNm = $(_this).attr('exsvc_nm');
    // console.log(exsvcId + ", " + exsvcNm);

    var parent = window.opener.document;
    parent.getElementsByName('msg_form').forEach(function (value, key, parent){
        var formId = value.querySelector('input[name="form_id"]').value;
        console.log(formId);
        if(formId === "-3"){
            var inputField = value.querySelector('input[name="type"]');
            console.log(inputField);
            $(inputField).attr('type_id',exsvcId);
            inputField.value = exsvcNm;
            window.close();
        }
    })
}
