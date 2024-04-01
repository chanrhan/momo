
$(document).ready(function (){
    var role = $('#user_role').val();
    // console.log(role);
    switch (role){
        case "NONE":
            alert("역할이 등록되지 않았습니다. 역할 등록 페이지로 이동합니다.");
            window.location.href = "/account/role";
            break;
        case "" || null:
            alert("잘못된 접근입니다");
            window.location.href = "/";
            break;
    }
});