

let order = "actv_dt";
let asc = 'asc';

function showSaleDetail(saleNo){
    window.open(
        "/sale/detail/"+saleNo,
        "판매일보 추가",
        "width=800, height=1400, location=no"
    );
}

function changeShop(){
    $('#srch_sale').val("");
    $('#filter_provider').val("");

    order = 'actv_dt';
    asc = 'desc';
    searchSale();
}

function orderSale(th){
    order = $(th).attr('value');
    asc = $(th).hasClass('desc') ? 'desc' : 'asc';
    $(th).toggleClass('desc');

    searchSale();
}