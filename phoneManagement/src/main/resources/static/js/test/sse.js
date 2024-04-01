
const header = $("meta[name='_csrf_header']").attr('content');
const token = $("meta[name='_csrf']").attr('content');

const sse = new EventSource("http://localhost:8080/sse/connect");

sse.addEventListener('connect',(e)=>{
    const { data: receivedConnectData } = e;
    console.log('connect event data: ',receivedConnectData);
})

sse.addEventListener('send',(e)=>{
    const { data: receivedConnectData } = e;
    console.log('send msg: '+receivedConnectData);
})

function send(){
    var msg = $('#msg').val();
    var body = {
        name: 'chan',
        msg: msg
    }

    $.ajax({
        url: '/sse/send',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(body),
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            console.log(result);
        }
    })
}