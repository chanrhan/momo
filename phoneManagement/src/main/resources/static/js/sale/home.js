
let filter_provider = "";

let selected_columns = [
    "cust_nm",
    "cust_tel",
    "cust_cd",
    "ph_md",
    "actv_dt",
    "seller_cms",
    "seller_id"
];



function showCreateSaleForm(){
    var shopId = $('#filter_shop').val();
    if(shopId === null || shopId === ""){
        shopId = document.getElementById('filter_shop').options[1].value;
    }
    window.open(
        "/sale/create/form?shopId="+shopId,
        "판매일보 추가",
        "width=700, height=1000, location=no"
    );
}

function searchSale(){
    var searchMap = {};
    var selectMap = {};

    selectMap["shop_id"] = $('#filter_shop').val();
    var provider = $('#filter_provider').val();
    if(provider !== ""){
        selectMap["provider"] = provider;
    }
    var keyword = $('#srch_sale').val();
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
        url: '/sale/list/srch',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(body),
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            // console.log(result.records);
            updateSaleList(result);
        }
    });
}


function    updateSaleList(result){
    var list_sale = document.getElementById('list_sale');
    list_sale.innerHTML = "";
    result.forEach(function (value, index, array) {
        list_sale.innerHTML += "<tr onclick='showSaleDetail(" +
            value.sale_id +
            ")" +
            "' class='" +
            ((value.rsv_st == false) ? 'msg-send' : '') +
            "'><td>" +
            value.shop_nm +
            "</td>" +
            "<td>" +
            value.cust_nm +
            "</td>" +
            "<td>" +
            value.cust_tel + " " + "(" + value.dup_tel + ")" +
            "</td>" +
            "<td>" +
            value.cust_cd +
            "</td>" +
            "<td>" +
            value.ph_md +
            "</td>" +
            "<td>" +
            value.actv_dt +
            "</td>" +
            "<td>" +
            value.provider +
            "</td>" +
            "<td>" +
            value.seller_cms +
            "</td>" +
            "<td>" +
            value.seller_nm +
            "</td></tr>";
    })
}