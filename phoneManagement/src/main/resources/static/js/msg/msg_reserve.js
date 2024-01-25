
let order = "rsv_dt";
let side = false;

let selected_columns = [
    "shop_nm",
    "cust_nm",
    "cust_tel",
    "send_st",
    "seller_nm"
];

function changeShop(){
    $('#keyword').val("");

    side = false;
    searchMessage();
}

function orderMessage(th){
    order = $(th).attr('value');
    side = $(th).hasClass('desc');
    $(th).toggleClass('desc');

    searchMessage();
}

function searchMessage(){
    var searchMap = {};
    var selectMap = {};

    selectMap["shop_cd"] = $('#filter_shop').val();
    var keyword = $('#keyword').val();
    if(keyword !== ""){
        searchMap = createMapWithSingleKeyword(keyword, selected_columns);
    }

    var body = {
        selectMap: selectMap,
        searchMap: searchMap,
        orderby: order,
        side: side
    };

    $.ajax({
        url: '/msg/list/srch',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(body),
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            // console.log(result.records);
            updateMessageList(result);
        }
    });
}

function updateMessageList(list){
    // console.log(list);
    var list_msg = document.getElementById('list_msg');
    list_msg.innerHTML = "";
    list.forEach(function (value, index, array) {
        list_msg.innerHTML += "<tr>" +
            "<td>" +
            value.shopNm +
            "</td>" +
            "<td>" +
            value.sendTp +
            "</td>" +
            "<td>" +
            value.custNm +
            "</td>" +
            "<td>" +
            value.custTel +
            "</td>" +
            "<td>" +
            value.sellerNm +
            "</td>" +
            "<td>" +
            ((value.sendSt) ? '발송 완료' : '발송 대기') +
            "</td>" +
            "<td>" +
            value.rsvDt +
            "</td>" +
            "<td>" +
            value.regiDt +
            "</td>" +
            "</tr>";
    })
}