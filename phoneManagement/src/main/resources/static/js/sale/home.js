
let pageNum = 1;

function showCreateSaleForm(){
    var shopCode = $('#filter_shop').val();
    window.open(
        "/sale/create?shopCd="+shopCode,
        "판매일보 추가",
        "width=500, height=500, location=no"
    );
}

function filterProvider(){
    var provider = $('#filter_provider').val();

    $.ajax({
        url: '/sale/list/filter?page='+ pageNum +'&provider='+provider,
        type: 'get',
        success: function (result){

        }
    });
}

function searchSale(){
    var keyword = $('#srch_sale').val();

    $.ajax({
        url: '/sale/list/srch?page='+ pageNum +'&keyword='+keyword,
        type: 'get',
        success: function (result){

        }
    });
}