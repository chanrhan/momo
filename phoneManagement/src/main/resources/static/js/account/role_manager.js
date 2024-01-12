
function searchShop(){
    var state = $('#list_state').val();
    var city = $('#list_city').val();
    if(state === "" || city === ""){
        return;
    }
    var detail = $('#input_detailAddr').val();
    var data = {
        state: state,
        city: city,
        detail: detail
    };

    $.ajax({
        url: '/account/search/shop',
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            var list_shop = document.getElementById('list_shop');
            list_shop.innerHTML = "";
            result.forEach(function (value, index, array){
                list_shop.innerHTML += "<div>" +
                    "<div>" +
                    value.shopNm +
                    "</div>" +
                    "<div>" +
                    "<p>" +
                    value.shopAddr +
                    "</p>" +
                    "<p>" +
                    value.shopTel +
                    "</p>" +
                    "</div>" +
                    "<button class='btn btn-primary' name='btn_selectShop' value='" +
                    value.shopCd +
                    "'>" +
                    "선택" +
                    "</button>" +
                    "</div>";
            });
            document.getElementsByName('btn_selectShop')
                .forEach(function (value, key, parent) {
                    $(value).on('click',function (){
                        console.log("click: "+$(value).val());
                    });
                }
            );
        }

    });

}