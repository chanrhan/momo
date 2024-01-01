
// 아이디 중복 여부 검사
function checkIdDuplication(id){
    var state = false;
    $.ajax({
        url: "/account/validate/dup/id?value="+id,
        type: "get",
        async: false,
        success: function (result){
            state = result;
        }
    });
    return state;
}

// 이메일 중복 여부 검사
function checkEmailDuplication(email){
    $.ajax({
        url: "/account/validate/dup/email?value="+email,
        type: "get",
        async: false,
        success: function (result){
            return result;
        }
    });
    return false;
}

// 프로필 수정
function updateProfile(data){
    $.ajax({
        url: "/profile/update",
        type: 'post',
        data: data,
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            return result;
        }
    });
    return false;
}

// 회원가입 정보 서버로 제출
function submitSignupData(data){
    $.ajax({
        url: '/account/submit',
        type: 'post',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            if(result){
                sessionStorage.removeItem('id');
                sessionStorage.removeItem('pwd');
                sessionStorage.removeItem('name');
                sessionStorage.removeItem('email');
                sessionStorage.removeItem('phNo');
            }
            return result;
        }
    });
    return null;
}