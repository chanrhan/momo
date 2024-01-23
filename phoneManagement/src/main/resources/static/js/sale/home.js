
let pageNum = 1;
let filter_provider = "";
let order = "actv_dt";
let side = false;

let selected_columns = [
    "cust_nm",
    "cust_tel",
    "cust_cd",
    "ph_md",
    "actv_dt",
    "seller_cms",
    "seller_id"
];


function showSaleDetail(saleNo){
    window.open(
        "/sale/detail/"+saleNo,
        "판매일보 추가",
        "width=800, height=800, location=no"
    );
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

    side = false;
    searchSale();
}

function orderSale(th){
    order = $(th).attr('value');
    side = $(th).hasClass('desc');
    $(th).toggleClass('desc');

    searchSale();
}

function searchSale(){
    var searchMap = {};
    var selectMap = {};

    selectMap["shop_cd"] = $('#filter_shop').val();
    var provider = $('#filter_provider').val();
    if(provider !== ""){
        selectMap["provider"] = provider;
    }
    var keyword = $('#srch_sale').val();
    if(keyword !== ""){
        searchMap = createMapWithSingleKeyword(keyword);
    }

    var body = {
        selectMap: selectMap,
        searchMap: searchMap,
        orderby: order,
        side: side
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


function updateSaleList(result){
    var list_sale = document.getElementById('list_sale');
    list_sale.innerHTML = "";
    result.forEach(function (value, index, array) {
        list_sale.innerHTML += "<tr onclick='showSaleDetail(" +
            value.saleNo +
            ")" +
            "'><td>" +
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