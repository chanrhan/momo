
// 역할 선택 후 페이지 이동
function signupStep2(){
    var form = $('#role_select_form');
    var role = $('#role').val();
    sessionStorage.setItem('role',role);
    if(role === 'ADMIN'){
        form.attr('action','/');
        signupSubmit();
    }else{
        form.attr('action','/account/role/'+role.toLowerCase());
    }
    return true;
}