
let pageNo = 1;

function searchCorp(){
    $.ajax({
        url: '/account/search/corp?page='+pageNo+'&keyword='+$('#input_search_corp').val(),
        type: 'get',
        success: function (result){
            var list_shop = document.getElementById('list_shop');
            list_shop.innerHTML = "";

            var list = result.getRecords();
            list.forEach(function (value, index, array){
                list_shop.innerHTML += "<div>" +
                    "<div>" +
                    "<p>" +
                    value.corpNm +
                    "</p>" +
                    "<p>" +
                    value.bNo +
                    "</p>" +
                    "</div>" +
                    "<div>" +
                    "<p>" +
                    value.shopNm +
                    "</p>" +
                    "<p>" +
                    value.shopAddr +
                    "</p>" +
                    "<p>" +
                    value.shopTel +
                    "</p>" +
                    "</div>" +
                    "<button class='btn btn-primary' name='btn_select_shop' value='" +
                    value.shopCd +
                    "'>" +
                    "선택" +
                    "</button>" +
                    "</div>";
            });
            document.getElementsByName('btn_select_shop')
                .forEach(function (value, key, parent) {
                    $(value).on('click',function (){
                        console.log("click: "+$(value).val());
                        submitMANAGER($(value).val());
                    });
                }
            );
        }
    });
}

function submitMANAGER(shopCode){
    var data = {
        id: $('#user_id').val(),
        role: 'MANAGER',
        shopCd: shopCode
    };

    var result = submitRole(data);
    console.log(result);
    if(result){
        console.log("success: "+result);
        window.location.href = "/home";
    }
}
