let selected_columns = [
    "actv_dt",
    "cust_nm",
    "cust_tel",
    "cust_cd",
    "seller_nm"
];

function searchSale(){
    var searchMap = {};
    var selectMap = {};

    selectMap["shop_id"] = $('#filter_shop').val();
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
        url: '/sale/list/srch/comb',
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

function updateSaleList(result){
    var list_sale = document.getElementById('list_sale');
    list_sale.innerHTML = "";
    result.forEach(function (value, index, array) {
        list_sale.innerHTML += "<tr onclick='showSaleDetail(" +
            value.shop_id +
            "," +
            value.sale_id +
            ")'>" +
            "<td>" +
            value.shop_nm +
            "</td>" +
            "<td>" +
            null +
            "</td>" +
            "<td>" +
            value.actv_dt +
            "</td>" +
            "<td>" +
            value.cust_nm +
            "</td>" +
            "<td>" +
            value.cust_tel +
            "</td>" +
            "<td>" +
            value.cust_cd +
            "</td>" +
            "<td>" +
            value.seller_nm +
            "</td>" +
            "<td>" +
            value.spec +
            "</td></tr>";
    })
}