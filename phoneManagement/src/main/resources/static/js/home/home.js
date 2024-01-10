
$(document).ready(function (){
    var role = $('#user_role').val();
    if(role === "" || role === null){
        alert("역할이 등록되지 않았습니다. 역할 등록 페이지로 이동합니다.");
        window.location.href = "/role";
    }
});