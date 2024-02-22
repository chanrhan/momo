
function chargePoint(){
    $.ajax({
        url: '/profile/payment/charge?amount='+$('#point').val(),
        type: 'get',
        success: function (result){
            if(result){
                alert("충전이 완료되었습니다.");
            }
        }
    })
}