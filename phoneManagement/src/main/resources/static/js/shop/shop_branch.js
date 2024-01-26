
function changeState(){
    var state = $('#state').val();

    $.ajax({
        url: '/shop/city?state='+state,
        type: 'get',
        success: function (result){
            var list_city = document.getElementById('city');
            list_city.innerHTML = "<option selected value disabled>시/군/구 선택</option>";
            result.forEach(function (value, index, arr) {
                list_city.innerHTML += "<option value='" +
                    value +
                    "'>" +
                    value +
                    "</option>";
            })
        }
    })
}

function addBranchShop(){
    var shop_nm = $('#shop_nm').val();
    var shop_tel = $('#shop_tel').val();
    var state = $('#state').val();
    var city = $('#city').val();
    var detail = $('#addr_detail').val();

    if(shop_nm === null || shop_tel === null || state === null || city === null){
        return;
    }

    var shop_addr = state + " " + city + " " + detail;

    var data = {
        repsId: $('#user_id').val(),
        shopNm: shop_nm,
        shopTel: shop_tel,
        shopAddr: shop_addr
    };

    $.ajax({
        url: '/shop/create',
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        // async: false,
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            if(result){
                window.location.href = '/shop';
            }
        }
    })
}