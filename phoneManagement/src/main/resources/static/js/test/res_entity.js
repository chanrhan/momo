
function getResponseEntity(status){
    $.ajax({
        url: '/test/res/entity/get?status='+status,
        type: 'get',
        success: function (result){
            console.log(result);
            console.log(result.status);
        }
    })
}
