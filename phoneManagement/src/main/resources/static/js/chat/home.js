
const socket = new SockJS("/ws");
const stompClient = Stomp.over(socket);

let isSubscribe = false;

let selectedInviteUser = "";

$(document).ready(function (){
    // stompClient.disconnect();
    stompClient.connect({},function (frame){
        // stompClient.subscriptions.forEach(id=>{
        //     stompClient.unsubscribe(id);
        // })
        console.log("Connected Room ,frame: "+ frame);
        updateChatroom();
        isSubscribe = true;
    })

});

function subscribe(roomId){
    // stompClient.connect({},function (frame){
    //     console.log("Connected Room: "+roomId + " ,frame: "+ frame);
    //     console.log("sub: "+roomId);
    //     stompClient.subscribe("/sub/chat/"+roomId, function (roomId){
    //         if(roomId !== 0){
    //             onChat(roomId);
    //         }
    //     })
    // })
    stompClient.subscribe('/sub/chat/room/'+roomId, function (msg){
        console.log("data: "+msg);
        console.log("data body: "+msg.body);
        if(msg !== 0){
            onChat(msg.body);
        }
    })
    console.log("Subscribe Room: "+roomId);
}

function onChat(roomId){
    console.log("onchat: "+roomId);
    var selectedRoomId = $('#selected_room_id').val();
    if(roomId === selectedRoomId){
        updateChatLog();
    }else{
        increseStackedChat(roomId);
    }
}

function increseStackedChat(roomId){
    console.log("increase stacked chat");
    var nameToFind = "room_"+roomId;
    var count = $('div[name="'+nameToFind+'"] p[name="stacked_chat"]');
    count.text(count.text()+1);
}

function createChatroom(){
    var body = {
        room_nm: $('#create_room_name').val(),
        user_id: $('#user_id').val()
    }

    $.ajax({
        url: '/chat/room/create',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(body),
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            console.log(result);
            if(result){
                updateChatroom();
            }
        }
    })

    $('#create_room_name').val("");
}

function updateChatroom(){
    var body = {
        user_id: $('#user_id').val()
    }

    $.ajax({
        url: "/chat/room/list",
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(body),
        async: false,
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            // console.log(result);
            var roomList = document.getElementById('list_room');
            roomList.innerHTML = "";
            result.forEach(function (value, index, array){
                if(!isSubscribe){
                    subscribe(value.room_id);
                }
                var addHTML = "";
                addHTML += "<div id='room_" +
                    value.room_id +
                    "' onclick='selectRoom(" +
                    value.room_id +
                    ")' style='border: 1px solid black'>" +
                    "<p>" +
                    value.room_nm +
                    "</p>";

                var lastChat = getLastChatLog(value.room_id);
                addHTML +=
                    "<div>" +
                    lastChat.content + "        | " + lastChat.send_dt +
                    "</div>" +
                    "<p name='stacked_chat'>" +
                    "0" +
                    "</p>" +
                    "</div>";
                roomList.innerHTML += addHTML;
            });
        }
    })
}

function getLastChatLog(roomId){
    var result = null;
    $.ajax({
        url: '/chat/msg/last/'+roomId,
        type: 'get',
        async: false,
        success: function (rst){
            result = rst;
        }
    });
    return result;
}

function selectRoom(roomId){
    $('#selected_room_id').val(roomId);
    $.ajax({
        url: '/chat/room/info/'+roomId,
        type: 'get',
        success: function (result){
            // console.log(result);
            $('#room_name').text(result.room_nm);
            $('#head_count').text(result.room_hc);
        }
    })
    updateInvitableUsers();
    updateChatLog();
}

function sendChat(){
    var roomId = $('#selected_room_id').val();
    var body = {
        user_id: $('#user_id').val(),
        content: $('#content').val(),
        file: '',
        ref: 0
    }

    stompClient.send('/pub/chat/'+roomId,{},JSON.stringify(body));
    $('#content').val("");
}

function updateChatLog(){
    // console.log("update chat log");
    var roomId = $('#selected_room_id').val();
    if(roomId === null || roomId === '0'){
        return;
    }

    var userId = $('#user_id').val();

    var body = {
        room_id: roomId,
        user_id: userId
    };

    // console.log(body);

    $.ajax({
        url: '/chat/msg/log',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(body),
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            // console.log(result);
            var chatLog = document.getElementById('chat_log');
            chatLog.innerHTML = "";
            result.forEach(function (value, index, array){
                var content = value.content;
                if(value.deleted != null){
                    content = "삭제된 메시지입니다.";
                }
                // console.log("org: "+userId+" , chat: "+value.user_id)
                var className = "chat ";
                className += (userId === value.user_id) ? "mine" : "other";
                // console.log(className);

                var addHTML = "";
                addHTML += "<div class='" +
                    className +
                    "' chat_id='" +
                    value.chat_id +
                    "' user_id='" +
                    value.user_id +
                    "'>" +
                    "<p>" +
                    value.user_nm +
                    "</p>" +
                    "<div class='chat-content";

                if(userId === value.user_id){
                    // console.log("match!");
                    addHTML += " chat-self"
                }

                addHTML +=
                    "'>" +
                    "<p>" +
                    content +
                    "</p>";
                if(value.emo_bits !== null){
                    addHTML +=
                        "<p>" +
                        value.emo_bits +
                        "</p>"
                }

                addHTML +=
                    "</div>" +
                    "<p class='chat-date'>" +
                    value.send_dt +
                    "</p>";

                if(value.non_read !== null && value.non_read !== 0){
                    addHTML += value.non_read;
                }

                addHTML += "</div>";
                // console.log(addHTML);
                chatLog.innerHTML += addHTML;
            })
            chatLog.scrollTop = chatLog.scrollHeight;
        }
    });
    updateChatroom();
}

function updateInvitableUsers(){
    var keyword = $('#invite_keyword').val();
    var body = {
        search:{
            user_nm: keyword,
            shop_nm: keyword,
            corp_nm: keyword
        }
    };

    console.log("invitable update: "+ body);

    $.ajax({
        url: '/account/list/chat/invitable',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(body),
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            console.log(result);
            var invitableList = document.getElementById('invitable_users');
            invitableList.innerHTML = "";
            result.forEach(function (value){
                var role = (value.role === "REPS") ? "대표" : "직원";
                var from = "";
                if(value.shop_nm !== null && value.shop_nm !== ""){
                    from = value.shop_nm;
                }else if(value.corp_nm !== null && value.corp_nm !== ""){
                    from = value.corp_nm;
                }
               invitableList.innerHTML += "<div class='' name='invitable_pannel' user_id='" +
                   value.user_id +
                   "' onclick='selectInviteUser($(this))'>" +
                   value.user_nm + " | " + role + " | " + from +
                   "</div>";

            });
        }
    })
}

function emo(){

}

function selectInviteUser(user){
    selectedInviteUser = $(user).attr('user_id');
    console.log("selected: "+selectedInviteUser);
    if(!$(user).hasClass('chat-invite-selected')){
        $(user).addClass('chat-invite-selected');
    }else{
        $(user).toggleClass('chat-invite-selected');
    }
    document.getElementsByName('invitable_pannel')
        .forEach(
            function (value, key, parent){
                $(value).toggleClass('chat-invite-selected',false);
            }
        )
}

function invite(){
    if(selectedInviteUser === null || selectedInviteUser === ""){
        alert("초대할 멤버를 선택해야 합니다!");
        return;
    }

    var body = {
        room_id: $('#selected_room_id').val(),
        user_id: selectedInviteUser
    }

    $.ajax({
        url: '/chat/room/invite',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(body),
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            console.log(result);
            if(result){
                alert("초대되었습니다.");
            }
        }
    })
}

function quit(){

}

function deleteChat(){

}

function noteToRoom(){

}

function foldNote(){

}