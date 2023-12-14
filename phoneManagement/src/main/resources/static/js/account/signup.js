
let checkId = false; // 아이디 중복체크 여부
let checkEmail = true; // 이메일 중복체크 여부

let idElement = document.getElementById("id");

// ID 입력칸이 수정되면 아이디 중복체크 여부를 무조건 false로 변경 
// document.getElementById("id").oninput = function (){
//     checkId = false;
// }

function validId(){

}

// 아이디 중복체크
function checkDupId(){
    $.ajax({
        url: "/account/dup/id?id="+$('#id').val(),
        type: "get",
        success: function (result){
            if(result){
                checkId = true;
                alert("사용 가능한 아이디입니다");
            }else{
                checkId = false;
                alert("이미 존재하는 아이디입니다");
            }
        }
    })
}

// 회원가입을 위한 전처리가 모두 완료되었는지 검사
function valid(){
    // 아이디, 이메일 중복체크 여부 검사
    if(checkId && checkEmail){
        return true;
    }else{
        alert("아이디와 이메일 중복 체크를 해야 합니다!");
        return false;
    }
}