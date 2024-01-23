
let pageNo = 1;

function searchCorp(){
    var keyword = $('#input_search_corp').val();
    var body = {
        searchMap: {
            b_no: keyword,
            shop_nm: keyword,
            shop_addr: keyword,
            corp_nm: keyword
        },
        orderby: "regi_dt"
    }

    $.ajax({
        url: '/account/search/corp',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(body),
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            var list_shop = document.getElementById('list_shop');
            list_shop.innerHTML = "";

            result.forEach(function (value, index, array){
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
    if(result){
        data = {
            alarmTp: 'approval',
            senderId: $('#user_id').val(),
            receiverId: repsId
        };

        ws.send(JSON.stringify(data));
        window.location.href = "/home";
    }
}
