
function updateProfile(){
    var data = {
        id: $('#user_id').val(),
        role: $('#user_role').val(),
        name: $('#name').val(),
        email: $('#email').val(),
        tel: $('#tel').val(),
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
            console.log(result);
        }
    })
}

function updatePassword(){
    var data = {
        id: $('#user_id').val(),
        role: $('#user_role').val(),
        pwd: $('#pwd').val(),
        updatePwd: $('#update_pwd').val()
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