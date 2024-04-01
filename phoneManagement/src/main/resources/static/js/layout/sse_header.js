

// // 웹소켓 처리
// ws.onopen = ()=>{
//     console.log("ws connected");
//     updateAlarm();
// };
//
// ws.onmessage = function (data){
//     updateAlarm();
// };
let sse = null;

let alarm_count = 0;
$(document).ready(function (){
    sse = new EventSource("http://localhost:8080/sse/connect");

    sse.addEventListener('connect',(e)=>{
        const { data: receivedConnectData } = e;
        console.log('connect event data: ',receivedConnectData);
    });

    sse.addEventListener('note', (e) => showNotification(e));
});


function showNotification(e){
    updateAlarm();
    const { data: receivedConnectData } = e;
    alert("메세지가 도착했습니다 <br> "+receivedConnectData);
}

function updateAlarm(){
    var body = {
        receiver_id: $('#user_id').val(),
        read_st: 0
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