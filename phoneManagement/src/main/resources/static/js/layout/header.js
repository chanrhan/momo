
const ws = new WebSocket("ws://192.168.35.241:8080/ws");

let alarm_count = 0;

// 웹소켓 처리
ws.onopen = ()=>{
    console.log("ws connected");
    updateAlarm();
};

ws.onmessage = function (data){
    updateAlarm();
};

function updateAlarm(){
    var id = $('#user_id').val();

    $.ajax({
        url: '/alarm/count?receiver='+id,
        type: 'get',
        success: function (result){
            alarm_count = result;
            $('#alarm_count').text(alarm_count);
        }
    });
}