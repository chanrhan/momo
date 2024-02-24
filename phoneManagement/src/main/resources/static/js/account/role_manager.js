
let pageNo = 1;

function searchCorp(){
    var keyword = $('#input_search_corp').val();
    var body = {
        search: {
            bp_no: keyword,
            bp_ko_nm: keyword,
            bp_en_nm: keyword,
            shop_nm: keyword,
            shop_addr: keyword,
            corp_nm: keyword
        },
        order: "regi_dt"
    }

    $.ajax({
        url: '/shop/search/shop',
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
                list_shop.innerHTML += "<tr shop_id='" +
                    value.shop_id +
                    "' corp_id='" +
                    value.corp_id +
                    "' reps_id='" +
                    value.reps_id +
                    "' onclick='submitMANAGER(this)" +
                    "'>" +
                    "<td>" +
                    value.corp_nm +
                    "</td>" +
                    "<td>" +
                    value.bp_ko_nm +
                    "</td>" +
                    "<td>" +
                    value.bp_no +
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
    var shopId = $(_this).attr('shop_id');
    var corpId = $(_this).attr('corp_id');
    var repsId = $(_this).attr('reps_id');

    var data = {
        emp_id: userId,
        role: 'MANAGER',
        shop_id: shopId,
        corp_id: corpId
    };

    var result = submitManager(data);
    if(result){
        // data = {
        //     alarm_tp: 'approval',
        //     sender_id: userId,
        //     receiver_id: repsId
        // };
        //
        // ws.send(JSON.stringify(data));
        window.location.href = "/home";
    }
}

function submitManager(data){
    var rst = false;
    $.ajax({
        url: '/account/submit/manager',
        type: 'post',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        async: false,
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            rst = result;
            console.log(result);
        }
    });
    console.log("end: "+rst);
    return rst;
}
