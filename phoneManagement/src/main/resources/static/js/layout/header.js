

// 웹소켓 처리
ws.onopen = ()=>{
    console.log("ws connected");
    updateAlarm();
};

ws.onmessage = function (data){
    updateAlarm();
};

function updateAlarm(){
    var body = {
        receiverId: $('#user_id').val(),
        readSt: 0
    }

    $.ajax({
        url: '/alarm/count',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(body),
        beforeSend: function (xhr){
          xhr.setRequestHeader(header, token);
        },
        success: function (result){
            alarm_count = result;
            $('#alarm_count').text(alarm_count);
        }
    });
}