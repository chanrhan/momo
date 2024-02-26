// import * as openapi from "../api/openapi.js";
// import * as userapi from "../api/userapi.js";

let isIdChecked = false; // 아이디 중복체크 여부
let isPasswordChecked = false;
let isPasswordMatched = false; // 비밀번호 일치 여부
let isEmailChecked = false; // 이메일 형식 및 중복체크 여부
let isNameChecked = false; // 이름 형식 일치 여부
let isTelChecked = false; // 전화번호 형식 일치 여부
let isTelAuthChecked =false; // 휴대폰 본인인증 여부

let authNo = 0;

let termString = "";

$(document).ready(function (){
    // var user_id = $('#user_id').val();
    // if(user_id !== "" ||     user_id !== null){
    //     alert("이미 로그인되어 있습니다. 회원가입을 원하시면 로그아웃 해주십시오");
    //     window.location.href = "/home";
    // }
})

// 아이디 형식 검사
function validateId(){
    var id = $('#id').val();
    $('#error_id').text("");
    isIdChecked = false;

    if(id.length < 5 || id.length > 33){
        $('#error_id').text("아이디는 5~32자리 사이여야 합니다.");
        $('#btn_checkDupId').prop('disabled',true);
        return;
    }

    if(!scRegex.test(id) || !koreanRegex.test(id)){
        $('#error_id').text("아이디에 특수문자,한글은 포함될 수 없습니다.");
        $('#btn_checkDupId').prop('disabled',true);
        return;
    }

    $('#btn_checkDupId').prop('disabled',false);
}

// 비밀번호 형식 검사
function validatePassword(){
    var pwd = $('#pwd').val();
    $('#confirm_pwd').val("");
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
    var pwd = $('#pwd').val();
    var comfirm_pwd = $('#confirm_pwd').val();

    if(pwd !== "" && comfirm_pwd !== "" && pwd === comfirm_pwd){
        $('#error_confirm_pwd').text("비밀번호가 일치합니다.");
        isPasswordMatched = true;
    }else {
        $('#error_confirm_pwd').text("비밀번호가 일치하지 않습니다.");
        isPasswordMatched = false;
    }
}

// 아이디 중복체크
function checkDupId(){
    var result = checkIdDuplication($('#id').val());
    if(result){
        isIdChecked = true;
        alert("사용 가능한 아이디입니다");
    }else{
        isIdChecked = false;
        alert("이미 존재하는 아이디입니다");
    }
}

// 이름 형식 검사
function validateName(){
    var name = $('#name').val();
    isNameChecked = false;

    if(!scRegex.test(name)){
        $('#error_name').text("이름에 특수문자는 포함될 수 없습니다");
        return;
    }

    $('#error_name').text("");
    isNameChecked = true;
}

// 이메일 형식 검사
function validateEmail(){
    var email = $('#email').val();
    isEmailChecked = false;

    if(!emailRegex.test(email)){
        $('#error_email').text("올바른 이메일 형식이어야 합니다.");
        return;
    }
    $('#error_email').text("");
    isEmailChecked = true;
}

// 전화번호 형식 검사
function validateTel(){
    var phNo = $('#tel').val();
    var btn_sendAuth = $('#btn_sendAuth');
    isTelAuthChecked = false;

    if(!telRegex.test(phNo)){
        btn_sendAuth.prop('disabled',true);
        $('#error_tel').text("올바른 전화번호 형식이어야 합니다. ('-' 제외)");
        return;
    }

    btn_sendAuth.prop('disabled',false);
    $('#error_tel').text("");
}

// 인증번호 전송
function sendAuthenticationNumber(){
    authNo = 123;
    $('#area_auth').removeClass("d-none");
    // 곧 대체
    // $.ajax({
    //     url: '/sms/auth?tel='+$('#phNo').val(),
    //     type: 'get',
    //     dataType: 'json',
    //     contentType: 'application/json',
    //     beforeSend: function (xhr){
    //         xhr.setRequestHeader(header, token);
    //     },
    //     success: function (result){
    //         if(result > 0){
    //             console.log(result);
    //             authNo = result;
    //             $('#area_auth').removeClass("d-none");
    //         }
    //     }
    // })
}

// 인증번호 검사
function checkAuthenticationNumber(){
    var input_authNo = $('#authNo').val();

    // console.log(parseInt(input_authNo));
    // console.log(authNo);

    if(authNo === 0 || parseInt(input_authNo) !== authNo){
        isTelAuthChecked = false;
        alert("인증번호가 일치하지 않습니다");
        return;
    }

    alert("인증되었습니다.");
    isTelAuthChecked = true;
}

// 이용약관 체크
function checkTerm(field){
    $(field).toggleClass('checked');
}

function checkAllTerm(){
    document.getElementsByName('icon_check').forEach(function (value, key, parent){
       if(!$(value).hasClass('checked')){
           $(value).addClass('checked');
       }
    });
}

// 이용약관 동의 체크 여부 확인
function isRequiredTermChecked(){
    var rst = true;
    termString = "";
    document.getElementsByName('term_field').forEach(function (value, index, array){
        var icon = $(value).children('i');
        var require = icon.attr('require');
        var st = icon.hasClass('checked');

        termString += (st) ? '1':'0';
        if(require === 'true' && st === false){
            rst = false;
        }
    })
    return rst;
}

// 회원가입을 위한 기본정보 입력이 모두 완료되었는지 검사
function submitSignup(){
    if(!isRequiredTermChecked()){
        alert("'필수' 이용약관에 모두 동의해야 합니다!");
        return false;
    }
    // 아이디, 이메일 중복체크 여부 검사
    if(isIdChecked && isPasswordMatched && isNameChecked && isEmailChecked && isTelAuthChecked){
        var email = $('#email').val();
        if(!checkEmailDuplication(email)){
            alert("이미 가입된 이메일입니다");
            return false;
        }
        var data = {
            id: $('#id').val(),
            pwd: $('#pwd').val(),
            name: $('#name').val(),
            email: email,
            tel: $('#tel').val(),
            terms: termString,
        };
        sessionStorage.setItem('shop_id', $('#shop_id').val());
        sessionStorage.setItem('corp_id',$('#corp_id').val());
        return submitDefaultSignup(data);
    }else{
        alert("올바르지 않은 입력 형식이 있습니다!");
        return false;
    }
}


