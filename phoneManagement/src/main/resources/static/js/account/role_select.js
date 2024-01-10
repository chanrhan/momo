
// url 보안
$(document).ready(function (){
    var id = sessionStorage.getItem('id');
    var pwd = sessionStorage.getItem('pwd');
    var name = sessionStorage.getItem('name');
    var email = sessionStorage.getItem('email');
    var tel = sessionStorage.getItem('tel');
    var termString = sessionStorage.getItem('termStr');

    if(id=== null || pwd===null||name===null||email===null||tel===null||termString===null){
        alert("잘못된 접근입니다!");
        window.location.href = "/";
    }
});


// 역할 선택 후 페이지 이동
function selectRole(){
    var form = $('#role_select_form');
    var role = sessionStorage.getItem('role');
    if(role === 'ADMIN'){
        form.attr('action','/home');
        var data = {
            id: $('#user_id').val(),
            role: role
        }
        return submitRole(data);
    }else{
        form.attr('action','/account/role/'+role.toLowerCase());
    }
    return true;
}