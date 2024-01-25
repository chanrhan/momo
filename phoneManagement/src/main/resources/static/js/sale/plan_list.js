
function searchPlan(){
    var keyword = $('#srch').val();

    var body = {
        searchMap: {
            "plan_nm": keyword
        }
    };

    $.ajax({
        url: '/sale/plan/srch',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(body),
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            var list_plan = document.getElementById('list_plan');
            list_plan.innerHTML = "";

            result.forEach(function (value, index, array) {
                list_plan.innerHTML += "<tr th:plan_id='" +
                    value.planId +
                    "' th:plan_nm='" +
                    value.planNm +
                    "' onclick='selectPlan(this)" +
                    "'><td>" +
                    value.planNm +
                    "</td>" +
                    "<td>" +
                    value.description +
                    "</td>" +
                    "</tr>";
            });
        }
    });
}

function selectPlan(_this){
    var planId = $(_this).attr('plan_id');
    var planNm = $(_this).attr('plan_nm');
    console.log(planId + ", " + planNm);

    var parent = window.opener.document;
    parent.getElementsByName('msg_form').forEach(function (value, key, parent){
        var formId = value.querySelector('input[name="form_id"]').value;
        console.log(formId);
        if(formId === "-2"){
            var inputField = value.querySelector('input[name="type"]');
            console.log(inputField);
            $(inputField).attr('type_id',planId);
            inputField.value = planNm;
            window.close();
        }
    })
}