
function getException(){
    $.ajax({
        url: '/test/exception/get',
        type: 'get',
        success: function (result){
            console.log(result);
        }
    })
}