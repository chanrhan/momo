

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


// 최종 회원가입 정보들 서버로 전송
function signupSubmit(){
    var data = {
        id: sessionStorage.getItem('id'),
        pwd: sessionStorage.getItem('pwd'),
        name: sessionStorage.getItem('name'),
        email: sessionStorage.getItem('email'),
        phNo: sessionStorage.getItem('phNo'),
        role: sessionStorage.getItem('role'),
        bisName: $('#bisName').val(),
        bisregiNo: $('#bisregiNo').val(),
        shopName: $('#shopName').val(),
        shopAddr: $('#shopAddr').val(),
        shopPhNo: $('#shopPhNo').val()
    }

    var result = submitSignupData(data);
    if(result){
        window.location.href = "/";
    }

}