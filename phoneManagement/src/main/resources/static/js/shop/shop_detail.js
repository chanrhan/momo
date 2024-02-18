

function changeShop(){
    var shopId = $('#filter_shop').val();

    $.ajax({
        url: '/shop/list/'+shopId,
        type: 'get',
        success: function (result){
            var shop_detail = document.getElementById('shop_detail');
            shop_detail.innerHTML = '매장명<input type="text" class="form-control" name="shop_nm" value="' +
                result.shop_nm +
                '" disabled>\n' +
                '    <br>\n' +
                '    주소<input type="text" class="form-control" name="shop_addr" value="' +
                result.shop_addr +
                '" disabled>\n' +
                '    <br>\n' +
                '    전화번호<input type="text" class="form-control" name="shop_tel" value="' +
                result.shop_tel +
                '" disabled>\n' +
                '    <br>\n' +
                '    대표<input type="text" class="form-control" name="reps_nm" value="' +
                result.reps_nm +
                '" disabled>\n' +
                '    <br>\n' +
                // '    직원<input type="text" class="form-control" name="emp_cnt" value="' +
                // result.emp_cnt +
                // '">\n' +
                '    <br>\n' +
                '    개업일자<input type="text" class="form-control" name="regi_dt" value="' +
                result.regi_dt +
                '" disabled>';
        }
    })
}