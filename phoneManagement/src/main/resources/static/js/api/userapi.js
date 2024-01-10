
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

// 기본 회원가입 정보들(아이디, 비번, 이름, 이메일, 전화번호, 약관동의여부) 제출
function submitDefaultSignup(data){
    var rst = false;
    $.ajax({
        url: '/account/submit',
        type: 'post',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        async: false,
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            rst = result;
        }
    });
    return rst;
}

// 역할 등록
function submitRole(data){
    var rst = false;
    $.ajax({
        url: '/account/submit/role',
        type: 'post',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        async: false,
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            rst = result;
        }
    });
    return rst;
}