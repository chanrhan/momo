
// url 보안
// $(document).ready(function (){
//     var role = $('#user_role').val();
//     if(role !== "NONE"){
//         alert("이미 역할이 등록된 사용자입니다");
//         window.location.href = "/home";
//     }
// });


// 역할 선택 후 페이지 이동
function selectRole(role){
    var dest = window.location.href;
    if(role === 'ADMIN'){
        var data = {
            id: $('#user_id').val(),
            role: role
        }
        if(submitAdmin(data)){
            dest = "/home";
        }
    }else{
        dest = '/account/role/'+role.toLowerCase();
    }
    window.location.href = dest;
}