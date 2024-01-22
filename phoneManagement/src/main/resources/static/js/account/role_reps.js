
// url 보안
$(document).ready(function (){
    var role = $('#user_role').val();
    if(role !== "NONE"){
        alert("잘못된 접근입니다!");
        window.location.href = "/home";
    }
});

let isBNoChecked = false;

// 사업자등록번호 조회 API
function checkBusinessmanNo(){
    var data = {
        "businesses": [
            {
                "b_no": $('#b_no').val(),
                "start_dt": $('#start_dt').val(),
                "p_nm": $('#p_en_nm').val(),
                "p_nm2": $('#p_ko_nm').val(),
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
        if(result.data[0].valid === "01"){
            alert("인증이 완료되었습니다");
            isBNoChecked = true;
        }else{
            alert("등록되지 않은 사업자입니다");
            isBNoChecked = false;
        }
    }else{
        alert("오류가 발생했습니다");
        isBNoChecked = false;
    }
}

// 사업자번호 유효성 검사
function validateBNo(_this) {
    isBNoChecked = false;
    var st = true;
    var b_no = $(_this).val();

    if (b_no.length !== 10) {
        $(_this).next('.fieldError').text("사업자번호는 10자리로 입력하여야 합니다");
        st = false;
    } else {
        $(_this).next('.fieldError').text("");
    }

    $(_this).attr('valid', st);
    $('#btn_validBNo').prop('disabled', !st);
}


// 최종 회원가입 정보들 서버로 전송
function submitREPS(){
    if(!isBNoChecked){
        alert("사업자번호 인증은 필수입니다!");
        return;
    }

    var pKoNm = $('#p_ko_nm').val();
    var pEnNm = $('#p_en_nm').val();
    var corpNm = $('#corpName').val();
    var corpTel = $('#corpTel').val();
    var startDt = $('#start_dt').val();

    if(pKoNm == null || pEnNm == null || corpNm == null || corpTel == null || startDt == null){
        return;
    }

    var data = {
        id: $('#user_id').val(),
        role: 'REPS',
        bNo: $('#b_no').val(),
        pKoNm: pKoNm,
        pEnNm: pEnNm,
        corpNm: corpNm,
        corpTel: corpTel,
        startDt: startDt
    };

    var result = submitRole(data);
    if(result){
        window.location.href = "/home";
    }

}