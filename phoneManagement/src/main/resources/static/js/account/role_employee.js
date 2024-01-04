
// 사업자등록번호 조회 API
function checkBusinessmanNo(){
    var data = {
        "businesses": [
            {
                "b_no": $('#b_no').val(),
                "start_dt": $('#start_dt').val(),
                "p_nm": $('#p_nm').val(),
                "p_nm2": $('#p_nm2').val(),
                "b_nm": "",
                "corp_no": "",
                "b_sector": "",
                "b_type": "",
                "b_adr": ""
            }
        ]
    };

    var result = validateBusinessman(data);
    if(result !== null && result.status_code === "OK"){
        console.log(result);
        if(result.data[0].valid === "01"){
            alert("인증이 완료되었습니다");
        }else{
            alert("등록되지 않은 사업자입니다");
        }
    }else{
        alert("오류가 발생했습니다");
    }
}

// 우편번호 조회 UI 띄워주기
function showZipCodeUI(){
    window.open(
        "/zipcode/window/open",
        "check Zip Code",
        "width=500, height=500, location=no"
    );
}

// 사업자번호 유효성 검사
function validateBNo(_this){
    var st = true;
    var b_no = $(_this).val();

    if(b_no.length !== 10){
        $(_this).next('.fieldError').text("사업자번호는 10자리로 입력하여야 합니다");
        st = false;
    }

    $(_this).attr('valid',st);
    $('#btn_validBNo').prop('disabled', !st);
}

function validateOpenDate(_this){
    var st = true;
    var b_no = $(_this).val();

    if(b_no.length !== 10){
        $(_this).nextUntil('.fieldError').text("사업자번호는 10자리로 입력하여야 합니다");
        st = false;
    }

    $(_this).attr('valid',st);
}



// 최종 회원가입 정보들 서버로 전송
function signupSubmit(){
    var addr = $('#shopAddr').val() + " " + $('#shopAddr_detail').val();
    var data = {
        id: sessionStorage.getItem('id'),
        pwd: sessionStorage.getItem('pwd'),
        name: sessionStorage.getItem('name'),
        email: sessionStorage.getItem('email'),
        tel: sessionStorage.getItem('tel'),
        role: sessionStorage.getItem('role'),
        termString: sessionStorage.getItem('termStr'),
        businessNo: $('#b_no').val(),
        businessName: $('#p_nm').val(),
        shopName: $('#shopName').val(),
        shopAddr: addr,
        shopTel: $('#shopTel').val()
    }

    var result = submitSignupData(data);
    if(result){
        window.location.href = "/";
    }

}