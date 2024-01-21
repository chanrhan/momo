
let pageNum = 1;
let filter_provider = "";
let order = "actv_dt";
let selected_columns = [
    "cust_nm",
    "cust_tel",
    "cust_cd",
    "ph_md",
    "actv_dt",
    "seller_cms",
    "seller_id"
];

function updateSaleList(result){
    var list_sale = document.getElementById('list_sale');
    list_sale.innerHTML = "";
    var records = result.records;
    records.forEach(function (value, index, array) {
        list_sale.innerHTML += "<tr><td>" +
            value.custNm +
            "</td>" +
            "<td>" +
            value.custTel +
            "</td>" +
            "<td>" +
            value.custCd +
            "</td>" +
            "<td>" +
            value.phMd +
            "</td>" +
            "<td>" +
            value.actvDt +
            "</td>" +
            "<td>" +
            value.provider +
            "</td>" +
            "<td>" +
            value.sellerCms +
            "</td>" +
            "<td>" +
            value.sellerId +
            "</td></tr>";
    })
}



function showCreateSaleForm(){
    var shopCode = $('#filter_shop').val();
    window.open(
        "/sale/create/form?shopCd="+shopCode,
        "판매일보 추가",
        "width=500, height=500, location=no"
    );
}

function changeShop(){
    $('#srch_sale').val("");
    $('#filter_provider').val("");

    search({});
}

function searchWithKeyword(){
    var keyword = $('#srch_sale').val();
    var provider = $('#filter_provider').val();

    var map = {};
    if(provider !== ""){
        map = {
            "provider": provider
        };
    }


    search(map, createMapWithSingleKeyword(keyword));
}

function search(selectMap, searchMap){
    if(selectMap === null){
        selectMap = {};
    }
    selectMap["shop_cd"] = $('#filter_shop').val();
    var body = {
        page: pageNum,
        selectMap: selectMap,
        searchMap: searchMap,
        orderby: order
    };
    // console.log(body);
    // console.log(JSON.stringify(body));

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