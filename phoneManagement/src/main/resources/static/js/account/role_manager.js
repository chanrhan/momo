
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
                list_shop.innerHTML += "<tr th:shop_cd='" +
                    value.shopCd +
                    "' th:reps_id='" +
                    value.id +
                    "' onclick='submitMANAGER(this)" +
                    "'><td>" +
                    "<td>" +
                    value.corpNm +
                    "</td>" +
                    "<td>" +
                    value.bNo +
                    "</td>" +
                    "<td>" +
                    value.shopNm +
                    "</td>" +
                    "<td>" +
                    value.shopAddr +
                    "</td>" +
                    "<td>" +
                    value.shopTel +
                    "</td>" +
                    "</tr>";
            });
            // document.getElementsByName('btn_select_shop')
            //     .forEach(function (value, key, parent) {
            //         $(value).on('click',function (){
            //             var shopCode = $(value).val();
            //             var repsId = $(value).attr('reps_id');
            //             submitMANAGER(shopCode, repsId);
            //         });
            //     }
            // );
        }
    });
}

function submitMANAGER(_this){
    var userId = $('#user_id').val();
    var shopCode = $(_this).attr('shop_cd');
    var repsId = $(_this).attr('reps_id');

    var data = {
        id: userId,
        role: 'MANAGER',
        shopCd: shopCode
    };
    console.log(data);
    return;

    var result = submitRole(data);
    if(result){
        data = {
            alarmTp: 'approval',
            senderId: userId,
            receiverId: repsId
        };

        ws.send(JSON.stringify(data));
        window.location.href = "/home";
    }
}
