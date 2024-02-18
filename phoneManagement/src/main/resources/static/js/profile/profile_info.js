
let isPasswordChecked = false;
let isPasswordMatched = false;

// 비밀번호 형식 검사
function validatePassword(){
    var pwd = $('#update_pwd').val();
    $('#confirm_update_pwd').val("");
    $('#error_pwd').text("");
    $('#error_confirm_pwd').val("");
    isPasswordMatched = false;
    isPasswordChecked = false;

    if(pwd.length < 8 || pwd.length > 33){
        $('#error_pwd').text("비밀번호는 8~32자리 사이여야 합니다.");
        return;
    }

    if(!pwdRegex.test(pwd)){
        $('#error_pwd').text("비밀번호는 영문,숫자,특수문자 3종류를 모두 조합해야 합니다.");
        return;
    }

    $('#error_pwd').text("");
    isPasswordChecked = true;
}

// 비밀번호와 재확인 비밀번호가 일치하는지 검사
function matchPassword(){
    var pwd = $('#update_pwd').val();
    var comfirm_pwd = $('#confirm_update_pwd').val();

    if(pwd !== "" && comfirm_pwd !== "" && pwd === comfirm_pwd){
        $('#error_confirm_pwd').text("비밀번호가 일치합니다.");
        isPasswordMatched = true;
    }else {
        $('#error_confirm_pwd').text("비밀번호가 일치하지 않습니다.");
        isPasswordMatched = false;
    }
}

function updateProfile(){
    var name = $('#name').val();
    var email = $('#email').val();
    var tel = $('#tel').val();

    if(name === "" || email === "" || tel === ""){
        alert("이름, 이메일, 전화번호는 필수 입력 항목입니다!");
        return;
    }

    var data = {
        id: $('#user_id').val(),
        role: $('#user_role').val(),
        name: name,
        email: email,
        tel: tel,
    }

    $.ajax({
        url: '/profile/update',
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            if(result){
                alert("프로필이 수정되었습니다");
            }else{
                alert("수정에 실패하였습니다");
            }
        }
    })
}

function updatePassword(){
    if(!isPasswordMatched){
        alert("비밀번호를 제대로 입력해 주십시오");
        return;
    }
    var data = {
        id: $('#user_id').val(),
        role: $('#user_role').val(),
        pwd: $('#pwd').val(),
        update_pwd: $('#update_pwd').val()
    };

    $.ajax({
        url: '/profile/update/password',
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            if(result){
                alert("프로필이 수정되었습니다");
            }else {
                alert("수정에 실패하였습니다");
            }
        }
    })
}