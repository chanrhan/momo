
let pageNo = 1;

function searchCorp(){
    $.ajax({
        url: '/account/search/corp?page='+pageNo+'&keyword='+$('#input_search_corp').val(),
        type: 'get',
        success: function (result){
            var list_shop = document.getElementById('list_shop');
            list_shop.innerHTML = "";

            var list = result.records;
            list.forEach(function (value, index, array){
                console.log(value.shopCd);
                console.log(value.id);
                list_shop.innerHTML += "<div>" +
                    "<div>" +
                    "<p>" +
                    value.corpNm +
                    "</p>" +
                    "<p>" +
                    value.bNo +
                    "</p>" +
                    "</div>" +
                    "<div>" +
                    "<p>" +
                    value.shopNm +
                    "</p>" +
                    "<p>" +
                    value.shopAddr +
                    "</p>" +
                    "<p>" +
                    value.shopTel +
                    "</p>" +
                    "</div>" +
                    "<button class='btn btn-primary' name='btn_select_shop' value='" +
                    value.shopCd +
                    "' reps_id='" +
                    value.id +
                    "'>" +
                    "선택" +
                    "</button>" +
                    "</div>";
            });
            document.getElementsByName('btn_select_shop')
                .forEach(function (value, key, parent) {
                    $(value).on('click',function (){
                        var shopCode = $(value).val();
                        var repsId = $(value).attr('reps_id');
                        console.log("click: "+shopCode +" / " + repsId);
                        submitMANAGER(shopCode, repsId);
                    });
                }
            );
        }
    });
}

function submitMANAGER(shopCode, repsId){
    var data = {
        id: $('#user_id').val(),
        role: 'MANAGER',
        shopCd: shopCode
    };

    var result = submitRole(data);
    console.log(result);
    if(result){
        data = {
            alarmTp: 'approval',
            sender: $('#user_id').val(),
            receiver: repsId
        };

        ws.send(JSON.stringify(data));
        console.log("success: "+result);
        window.location.href = "/home";
    }
}
