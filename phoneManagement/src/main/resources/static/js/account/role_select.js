
// url 보안
$(document).ready(function (){
    var role = $('#user_role').val();
    if(role !== "" || role !== null){
        alert("잘못된 접근입니다!");
        window.location.href = "/home";
    }
});


// 역할 선택 후 페이지 이동
function selectRole(role){
    if(role === 'ADMIN'){
        var data = {
            id: $('#user_id').val(),
            role: role
        }
        if(submitRole(data)){
            window.location.href = "/home";
        }
    }else{
        window.location.href = '/account/role/'+role.toLowerCase();
    }
}