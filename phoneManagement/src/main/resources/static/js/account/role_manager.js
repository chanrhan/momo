
let pageNo = 1;

function searchCorp(){
    var keyword = $('#input_search_corp').val();
    var body = {
        searchMap: {
            b_no: keyword,
            p_ko_nm: keyword,
            p_en_nm: keyword,
            shop_nm: keyword,
            shop_addr: keyword,
            corp_nm: keyword
        },
        order: "regi_dt"
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
                list_shop.innerHTML += "<tr shop_cd='" +
                    value.shop_cd +
                    "' reps_id='" +
                    value.reps_id +
                    "' onclick='submitMANAGER(this)" +
                    "'>" +
                    "<td>" +
                    value.corp_nm +
                    "</td>" +
                    "<td>" +
                    value.p_ko_nm +
                    "</td>" +
                    "<td>" +
                    value.b_no +
                    "</td>" +
                    "<td>" +
                    value.shop_nm +
                    "</td>" +
                    "<td>" +
                    value.shop_addr +
                    "</td>" +
                    "<td>" +
                    value.shop_tel +
                    "</td>" +
                    "</tr>";
            });
        }
    });
}

function submitMANAGER(_this){
    var userId = $('#user_id').val();
    var shopCode = $(_this).attr('shop_cd');
    var repsId = $(_this).attr('reps_id');
    console.log(shopCode + ", "+ repsId);

    var data = {
        id: userId,
        role: 'MANAGER',
        shop_cd: shopCode
    };

    var result = submitRole(data);
    if(result){
        data = {
            alarm_tp: 'approval',
            sende_id: userId,
            receiver_id: repsId
        };

        ws.send(JSON.stringify(data));
        window.location.href = "/home";
    }
}
