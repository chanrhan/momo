
// 사업자등록번호 진위여부 검사
// 아래는 데이터 양식
// var data = {
//     "businesses": [
//         {
//             "b_no": $('#b_no').val(),
//             "start_dt": $('#start_dt').val(),
//             "p_nm": $('#p_nm').val(),
//             "p_nm2": $('#p_nm2').val(),
//             "b_nm": "",
//             "corp_no": "",
//             "b_sector": "",
//             "b_type": "",
//             "b_adr": ""
//         }
//     ]
// };
function validateBusinessman(data){
    var rst = null;
    $.ajax({
        url: "/account/validate/bno",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify(data),
        async: false,
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function(result) {
            rst = result;
        },
        error: function(result) {
            console.log(result.responseText); //responseText의 에러메세지 확인
        }
    });
    return rst;
}

// 휴대전화 본인인증 문자메세지 전송
function sendAuthenticationNumber(tel){

}

// 우편번호 및 주소 조회
function getAddressArea(srchwrd, currPage){
    var rst = null;
    var countPerPage = 10;

    $.ajax({
        url: '/zipcode/getaddress' +
            '?srchwrd='+srchwrd+
            '&countPerPage='+countPerPage+
            '&currentPage='+currPage,
        type: 'get',
        async: false,
        success: function (result){
            rst = result.address;
        },
        error: function (result){
            console.log(result);
        }
    });
    return rst;
}