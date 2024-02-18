
function regiSendTel(){
    var body = {
        shop_id: $('#shop_id').val(),
        send_tel: $('#send_tel').val()
    }

    $.ajax({
        url: '/msg/regi/tel',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(body),
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token)
        },
        success: function (result){
            console.log(result);
        }
    })
}