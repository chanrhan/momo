
var stompClient = null;

function connect(){
    var socket = new SockJS("/ws");
    stompClient = Stomp.over(socket);
    stompClient.connect({},function (frame){
        console.log("Connected"+ frame);
        stompClient.subscribe("/sub/greeting",function (msg){
            console.log("msg: "+msg);
        })
        stompClient.subscribe("/sub/test/pub",function (msg){
            onSend(msg);
        })
    })
}

function send(){
    var msg = $('#msg').val();

    stompClient.send('/pub/hello',{}, msg);
}

function sendAjax(){
    var msg = $('#msg').val();

    $.ajax({
        url: '/pub/hello',
        data: msg,
        success: function (result){
            console.log(result);
        }
    })
}

function sendTo(){
    $.ajax({
        url: '/test/server/pub',
        type: 'get',
        success: function (result){
            console.log(result);
        }
    })
}

function onSend(msg){
    console.log(msg);
}