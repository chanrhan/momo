
let order = "rsv_dt";
let asc = "asc";

let selected_columns = [
    "shop_nm",
    "cust_nm",
    "cust_tel",
    "seller_nm"
];

function showMsgDetail(shopId, msgId){
    window.open(
        "/msg/detail?shopId="+shopId+"&msgId="+msgId,
        "예약문자 정보",
        "width=400, height=400, location=no"
    );
}

function changeShop(){
    $('#keyword').val("");

    asc = "asc";
    searchMessage();
}

function orderMessage(th){
    order = $(th).attr('value');
    asc = $(th).hasClass('desc') ? 'desc' : 'asc';
    $(th).toggleClass('desc');

    searchMessage();
}

function searchMessage(){
    var searchMap = {};
    var selectMap = {};

    selectMap["shop_id"] = $('#filter_shop').val();
    var keyword = $('#keyword').val();
    if(keyword !== ""){
        searchMap = createMultiMap(keyword, selected_columns);
    }

    var body = {
        select: selectMap,
        search: searchMap,
        order: order,
        asc: asc
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
        list_msg.innerHTML += "<tr onclick='showMsgDetail(" +
            value.shop_id +
            "," +
            value.msg_id +
            ")'>" +
            "<td>" +
            value.shop_nm +
            "</td>" +
            "<td>" +
            value.send_tp +
            "</td>" +
            "<td>" +
            value.cust_nm +
            "</td>" +
            "<td>" +
            value.cust_tel +
            "</td>" +
            "<td>" +
            value.seller_nm +
            "</td>" +
            "<td>" +
            ((value.send_st) ? '발송 완료' : '발송 대기') +
            "</td>" +
            "<td>" +
            value.rsv_dt +
            "</td>" +
            "<td>" +
            value.regi_dt +
            "</td>" +
            "</tr>";
    })
}