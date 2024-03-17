
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
        // console.log("Connected Room ,frame: "+ frame);
        stompClient.subscribe('/sub/chat/conn',function (res){
            if(res !== 0){
                var header = res.header;
                var body = res.body;
                switch (header){
                    case "CONNECT":
                        connectChat(body.user_id);
                        break;
                    case "DISCONNECT":
                        disconnetChat(body.user_id);
                        break;
                }
            }
        })
        updateChatroom();
        isSubscribe = true;
    });
});


// Connection
function subscribe(roomId){
    stompClient.subscribe('/sub/chat/room/'+roomId, function (msg){
        // console.log("data: "+msg);
        // console.log("data body: "+msg.body);
        if(msg !== 0){
            onChat(msg.body, roomId);
        }
    })
    console.log("Subscribe Room: "+roomId);
}
function onChat(result, roomId){
    // console.log("onchat: "+roomId);
    var res = JSON.parse(result);
    var header = res.header;
    var body = res.body;

    var selectedRoomId = $('#selected_room_id').val();
    // console.log("org: "+roomId+", selected: "+selectedRoomId);
    if(roomId == selectedRoomId){
        console.log("header: "+header);
        switch (header){
            // case 'CONNECT':
            //     loadConectedUsers();
            //     break;
            // case 'DISCONNECT':
            //     loadConectedUsers();
            //     break;
            case 'CHAT': // SEND
                onSend(body);
                break;
            case 'JOIN' || 'INVITE':
                onSend(body);
                loadChatRoomUser();
                break;
            case 'READ': // READ
                updateChatRead(body);
                break;
            case 'EMO': // EMO
                updateChatEmo(body);
                break;
            case 'DEL': // DEL
                updateDeletedChat(body);
                break;
            case 'QUIT': // QUIT
                updateQuit(body);
                break;
        }

    }else{
        if(header === 0){ // header 0 -> "SEND"
            var roomList = $('#list_room');
            if(roomList.find('[name="room_'+ roomId +'"]').length === 0){
                updateChatroom();
            }
            updateChatRoomOnly(res.chat_log[0], roomId);
        }

    }
}
function connectChat(userId){
    console.log("connect "+userId);
    setOnline(userId);
}
function disconnetChat(userId){
    console.log("disconnect "+userId);
    setOffline(userId);
}
function loadConectedUsers(){
    console.log("load connect");
    $.ajax({
        url: '/chat/connected',
        type: 'get',
        success: function (result){
            if(result !== null){
                updateConnectedUsers(result);
            }
        }
    });
}
function updateConnectedUsers(userIdList){
    if(!Array.isArray(userIdList)){
        return;
    }

    userIdList.forEach(function (value){
        setOnline(value);
    })
}
function setOnline(userId){
    $('#room_user_list div[user_id="'+ userId +'"] p[name="user_state"]').addClass('chat-online');
}

function setOffline(userId){
    $('#room_user_list div[user_id="'+ userId +'"] p[name="user_state"]').removeClass('chat-online');
}

// Chat Room
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
        success: function (roomId){
            // console.log(roomId);
            if(roomId !== 0){
                subscribe(roomId);
                updateChatroom();
                selectRoom(roomId);
            }
        }
    });

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
            if(result === null) return;
            // console.log("updateChatRoom: "+result);
            var roomList = document.getElementById('list_room');
            roomList.innerHTML = "";
            result.forEach(function (value, index, array){
                if(!isSubscribe){
                    subscribe(value.room_id);
                }
                var addHTML = "";
                addHTML += "<div name='room_" +
                    value.room_id +
                    "' onclick='selectRoom(" +
                    value.room_id +
                    ")' style='border: 1px solid black'>" +
                    "<p>" +
                    value.room_nm +
                    "</p>";

                var lastChat = getLastChatLog(value.room_id);
                var stackedChat = getStackedChat(value.room_id);
                addHTML +=
                    "<div>" +
                    lastChat.content + "        | " + lastChat.send_dt +
                    "</div>" +
                    "<p class='chat-stacked-count' name='stacked_chat_" +
                    value.room_id +
                    "'>" +
                    stackedChat +
                    "</p>" +
                    "</div>";
                roomList.innerHTML += addHTML;
            });
        }
    })
}
function updateChatRoomOnly(chat, roomId){
    var room = $('div[name="room_' + roomId + '"]');
    if(room === null || room.length === 0) return;

    var content = room.children('div').first();
    var stackedChat = room.find('[name="stacked_chat_'+roomId+'"]').first();

    var lastChat = getLastChatLog(roomId);
    if(lastChat !== null){
        $(content).text(lastChat.content + "        | " + lastChat.send_dt);
    }

    var stackedChatCount = getStackedChat(roomId);
    if(stackedChatCount !== null){
        $(stackedChat).text(stackedChatCount)
    }
}
function selectRoom(roomId){
    $('#selected_room_id').val(roomId);
    $.ajax({
        url: '/chat/room/info/'+roomId,
        type: 'get',
        success: function (res){
            // console.log(result);
            $('#room_name').text(res.room_nm);
            $('#head_count').text(res.room_hc);
            updateInvitableUsers();
            loadAllChat(true);
            loadChatRoomUser();
            loadConectedUsers();
        }
    });
}
function loadChatRoomUser(){
    var roomId = $('#selected_room_id').val();
    $.ajax({
        url: '/chat/room/user/'+roomId,
        type: 'get',
        success: function (result){
            updateChatRoomUser(result, true);
            loadConectedUsers();
        }
    });
}
function updateChatRoomUser(result, refresh = false){
    var roomUserList = document.getElementById('room_user_list');
    if(refresh){
        roomUserList.innerHTML = "";
    }
    result.forEach(function (value){
        roomUserList.innerHTML += "<div class='chat-room-user-item' user_id='" +
            value.user_id +
            "'>" +
            value.user_nm +
            "<br>" +
            value.role +
            // "<img src='|/img/pfp/" +
            // value.user_id +
            // "|' width='300px'/>" +
            "<p class='chat-room-user-state' name='user_state'>" +
            "o" +
            "</p>" +
            "</div>";
    });
}
function getStackedChat(roomId){
    var rst = null;
    var body = {
        user_id: $('#user_id').val(),
        room_id: roomId
    }
    $.ajax({
        url: '/chat/msg/stacked',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(body),
        async: false,
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            rst = result;
        }
    });
    return rst;
}

// Chat Room Invite
function updateInvitableUsers(){
    var invitableList = document.getElementById('invitable_users');
    var keyword = $('#invite_keyword').val();
    // console.log(invitableList);
    // console.log(keyword);
    if(invitableList.innerHTML.trim() !== "" && keyword === "") {
        return;
    }
    selectedInviteUser = "";
    var body = {
        search:{
            user_nm: keyword,
            shop_nm: keyword,
            corp_nm: keyword
        }
    };

    // console.log("invitable update: "+ body);

    $.ajax({
        url: '/account/list/chat/invitable',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(body),
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            // console.log(result);
            invitableList.innerHTML = "";
            result.forEach(function (value){
                if(value.user_id === $('#user_id').val()){
                    return;
                }
                var role = (value.role === "REPS") ? "대표" : "직원";
                var from = "";
                if(value.shop_nm !== null && value.shop_nm !== ""){
                    from = value.shop_nm;
                }else if(value.corp_nm !== null && value.corp_nm !== ""){
                    from = value.corp_nm;
                }
                invitableList.innerHTML += "<div class='chat-invitable-user' name='invitable_pannel' user_id='" +
                    value.user_id +
                    "' onclick='selectInviteUser($(this))'>" +
                    value.user_nm + " | " + role + " | " + from +
                    "</div>";

            });
        }
    })
}
function selectInviteUser(user){
    selectedInviteUser = $(user).attr('user_id');

    document.getElementsByName('invitable_pannel')
        .forEach(
            function (value, key, parent){
                $(value).toggleClass('chat-invite-selected',false);
            }
        )
    $(user).toggleClass('chat-invite-selected');
}
function inviteUser(){
    if(selectedInviteUser === null || selectedInviteUser === ""){
        alert("초대할 멤버를 선택해야 합니다!");
        return;
    }

    stompClient.send("/pub/chat/room/invite/"+$('#selected_room_id').val(),{},
        selectedInviteUser);

    // $.ajax({
    //     url: '/chat/room/invite',
    //     type: 'post',
    //     contentType: 'application/json',
    //     data: JSON.stringify(body),
    //     beforeSend: function (xhr){
    //         xhr.setRequestHeader(header, token);
    //     },
    //     success: function (result){
    //         console.log(result);
    //         if(result){
    //             alert("초대되었습니다.");
    //         }
    //     }
    // })
}

// Chat Room Note
function noteToRoom(){

}
function foldNote(){

}

// Chat Send
function sendChat(){
    var roomId = $('#selected_room_id').val();
    var body = {
        user_id: $('#user_id').val(),
        content: $('#content').val(),
        file: '',
        ref: 0
    }

    stompClient.send('/pub/chat/send/'+roomId,{},JSON.stringify(body));
    $('#content').val("");
}
function onSend(res){
    console.log("on send");
    updateChatLog(res.chat_log); // Load 후 Read 를 해야 정확한 통신이 가능하다!
    if(!res.server_send){
        readChatroom($('#selected_room_id').val());
    }
}

// Chat Read
function updateChatRead(res){
    console.log(res);
    var chat_log = res.chat_log;
    console.log(chat_log);
    if(chat_log === null || chat_log.length === 0) return;

    chat_log.forEach(function (value) {
        console.log("for each: "+value.chat_id);
        var chat_non_read = $('#chat_log div[chat_id='+value.chat_id+'] .chat-non-read');
        console.log("on Read: "+$(chat_non_read).text());
        $(chat_non_read).text(value.non_read);
    })
}
function readChatroom(roomId){
    console.log("read");
    stompClient.send('/pub/chat/read/'+roomId,{},
        $('#user_id').val());

    // $.ajax({
    //     url: '/chat/room/read',
    //     type: 'post',
    //     contentType: 'application/json',
    //     data: JSON.stringify(body),
    //     async: false,
    //     beforeSend: function (xhr) {
    //         xhr.setRequestHeader(header, token);
    //     },
    //     success: function (result){
    //
    //     }
    // })
}

// Chat Log
function getLastChatLog(roomId){
    var result = null;
    var body = {
        room_id: roomId,
        user_id: $('#user_id').val()
    }

    $.ajax({
        url: '/chat/msg/last',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(body),
        async: false,
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (rst){
            result = rst;
        }
    });
    return result;
}
function loadChat(){
    var roomId = $('#selected_room_id').val();
    if(roomId === null || roomId === '0'){
        alert("잘못된 요청입니다.");
        return;
    }

    var userId = $('#user_id').val();

    var body = {
        room_id: roomId,
        user_id: userId
    };

    $.ajax({
        url: '/chat/msg/load',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(body),
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            if(result !== null && result.length > 0){
                updateChatLog(result);
                readChatroom(roomId);
            }
        }
    });
}
function loadAllChat(refresh = false){
    var roomId = $('#selected_room_id').val();
    if(roomId === null || roomId === '0'){
        alert("잘못된 요청입니다.");
        return;
    }

    var userId = $('#user_id').val();

    var body = {
        room_id: roomId,
        user_id: userId
    };

    $.ajax({
        url: '/chat/msg/load/all',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(body),
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            updateChatLog(result, refresh);
            readChatroom(roomId);
        }
    });
}
function updateChatLog(result, refresh = false){
    var chatLog = null;
    if(refresh){
        chatLog = document.getElementById('chat_log');
        chatLog.innerHTML = "";
    }
    if(result === null || result.length === 0) return;
    chatLog = document.getElementById('chat_log');
    var roomId = $('#selected_room_id').val();

    var userId = $('#user_id').val();
    // console.log("refresh: "+refresh);

    result.forEach(function (value, index, array){
        var content = value.content;
        // console.log("org: "+userId+" , chat: "+value.user_id)
        var className = "chat ";
        var addHTML = "";
        if(value.server_send){
            className += "chat-server";
            addHTML += "<div name='chat_" +
                value.chat_id +
                "' class='" +
                className +
                "'>" +
                value.content +
                "</div>";
        }else{
            className += (userId === value.user_id) ? "mine" : "other";
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
            if(value.emo_bits !== null && value.emo_bits !== undefined){
                addHTML +=
                    "<p>" +
                    value.emo_bits +
                    "</p>"
            }

            var non_read = value.non_read;
            addHTML +=
                "</div>" +
                "<p class='chat-date'>" +
                value.send_dt +
                "</p>" +
                "<p class='chat-non-read''>" +
                ((non_read != 0) ? non_read : "") +
                "</p>" +
                "</div>";
        }
        chatLog.innerHTML += addHTML;
    })
    chatLog.scrollTop = chatLog.scrollHeight;
    updateChatRoomOnly(roomId);
}

// Chat Emo
function sendChatEmo(){

}
function updateChatEmo(result){

}

// Chat Delete
function deleteChat(){

}
function updateDeletedChat(result){

}

// Chat Quit / Kick
function quit(){

}
function updateQuit(result){

}
function kick(){

}