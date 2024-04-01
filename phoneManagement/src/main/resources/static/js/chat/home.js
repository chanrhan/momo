
const socket = new SockJS("/ws");
const stompClient = Stomp.over(socket);

// let chatContextMenu = null;
let isSubscribe = false;

let selectedInviteUser = "";

let replyPannel = null;

let onChatContextMenu = false;

$(document).ready(function (){
    // stompClient.disconnect();
    sse.addEventListener('chat/invite',(e)=>{
        const { data: roomId } = e;
        subscribe(roomId);
    })
    stompClient.connect({},function (frame){
        stompClient.subscribe('/sub/chat/conn',function (result){
            if(result !== 0){
                var res = JSON.parse(result.body);
                var header = res.header;
                var body = res.body;
                console.log("conn Header: "+header)
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
        loadChatRoom();
        isSubscribe = true;
    });
    replyPannel = $('#reply_pannel');
});
$(document).on('click',function (element){
    if(!$(element.target).closest('#chat_context_menu').length){
        hideChatContextMenu();
    }
    if(!$(element.target).closest('#chat_emo_menu').length){
        hideChatEmoMenu();
    }
})

// Connection
function subscribe(roomId){
    console.log("subscribe Chat Room: "+roomId);
    stompClient.subscribe('/sub/chat/room/'+roomId, function (msg){
        // console.log("data: "+msg);
        // console.log("data body: "+msg.body);
        if(msg !== 0){
            onChat(msg.body, roomId);
        }
    })
    // console.log("Subscribe Room: "+roomId);
}
function onChat(result, roomId){
    // console.log("onchat: "+roomId);
    var res = JSON.parse(result);
    var header = res.header;
    var body = res.body;

    var selectedRoomId = $('#selected_room_id').val();
    // console.log("org: "+roomId+", selected: "+selectedRoomId);
    if(roomId == selectedRoomId){
        console.log("on Chat: "+header);
        switch (header){
            case 'CHAT': // SEND
                onSend(roomId, body);
                break;
            case 'JOIN':
                onSend(roomId, body);
                loadChatRoomUser();
                updateChatRoomHeadCount();
                break;
            case 'INVITE': // Case 문에서 'JOIN' || 'INVITE' 가 먹히질 않는다... 왜지
                onSend(roomId, body);
                loadChatRoomUser();
                updateChatRoomHeadCount();
                break;
            case 'READ': // READ
                updateChatRead(body);
                loadChatRoom();
                break;
            case 'EMO': // EMO
                onEmo(body.emoji);
                break;
            case 'DELETE': // DEL
                updateDeletedChat(body);
                break;
            case 'NOTE':
                updateNote(body.note);
                break;
            case 'QUIT': // QUIT
                updateQuit(body);
                break;
        }

    }else{
        if(header === 'CHAT'){ // header 0 -> "SEND"
            var roomList = $('#list_room');
            console.log("chat on other room")
            if(roomList.find('#list_room div[room_id="'+ roomId +'"]').length === 0){
                console.log("find room: "+roomId);
                loadChatRoom();
            }
            // updateChatRoomOnly(roomId);
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
    console.log("update Connected Users: "+userIdList);
    if(!Array.isArray(userIdList)){
        return;
    }

    userIdList.forEach(function (value){
        setOnline(value);
    })
}
function setOnline(userId){
    var state = $('#room_user_list div[user_id="'+ userId +'"] p[name="user_state"]');
    if(state !== null && state !== undefined){
        state.addClass('chat-online');
    }

}

function setOffline(userId){
    var state = $('#room_user_list div[user_id="'+ userId +'"] p[name="user_state"]');
    if(state !== null && state !== undefined){
        state.removeClass('chat-online');
    }
}

// Chat Room
function createChatroom(){
    var body = {
        room_nm: $('#create_room_name').val(),
        user_id: $('#user_id').val()
    };

    console.log("create Chat Room: "+body);

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
                loadChatRoom();
                selectRoom(roomId);
            }
        }
    });

    $('#create_room_name').val("");
}
function loadChatRoom(){
    console.log("update Chat Room");
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
            updateChatRoom(result);
        }
    })
}
function updateChatRoom(result){
    var roomList = $('#list_room');
    roomList.empty();
    result.forEach(function (value, index, array){
        if(!isSubscribe){
            subscribe(value.room_id);
        }
        var div_root = $('<div>').addClass('chat-room-item')
            .attr('room_id', value.room_id)
            .on('click',function (){
                selectRoom(value.room_id);
            }).append($('<p>').text(value.room_nm));
        // var addHTML = "";
        // addHTML += "<div room_id='" +
        //     value.room_id +
        //     "' onclick='selectRoom(" +
        //     value.room_id +
        //     ")' style='border: 1px solid black'>" +
        //     "<p>" +
        //     value.room_nm +
        //     "</p>";

        // var lastChat = getLastChatLog(value.room_id);
        var stackedChat = value.stacked_chat;
        div_root.append($('<div>').text(value.last_content + "        | " + value.last_send_dt));
        var p_stacked_chat = $('<p>').addClass('chat-stacked-count')
            .text(((stackedChat != 0) ? stackedChat : ''));
        div_root.append(p_stacked_chat);
        // addHTML +=
        //     "<div>" +
        //      +
        //     "</div>" +
        //     "<p class='chat-stacked-count' name='stacked_chat_" +
        //     value.room_id +
        //     "'>" +
        //      +
        //     "</p>" +
        //     "</div>";
        roomList.append(div_root);
    });
}
function selectRoom(roomId){
    console.log("select Chat Room: "+roomId);
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
            loadNote();
            loadConectedUsers();
        }
    });
}
function updateChatRoomHeadCount(){
    var roomId = $('#selected_room_id').val();
    $.ajax({
        url: '/chat/room/hc/'+roomId,
        type: 'get',
        success: function (result){
            if(result != 0){
                setChatRoomHeadCount(result);
            }
        }
    })
}
function setChatRoomHeadCount(hc){
    $('#head_count').text(hc);
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
    console.log("update Chat Room User: "+result);
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

// Chat Room Invite
function updateInvitableUsers(){
    console.log("update Invitable Users");
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
    console.log("invite User");
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
function isNoted(chatId){
    return false;
}
function noteChat(chat){
    if(!confirm("채팅방 공지는 1건만 등록 가능합니다. 등록하시겠습니까?")){
        return;
    }
    var roomId = $('#selected_room_id').val();
    var body = {
        user_id: $('#user_id').val(),
        chat_id: chat.chat_id,
        content: chat.content,
        file: chat.file
    };
    stompClient.send('/pub/chat/note/'+roomId,{},JSON.stringify(body));
}
function loadNote(){
    var body = {
        room_id: $('#selected_room_id').val(),
        user_id: $('#user_id').val()
    };

    $.ajax({
        url: '/chat/note',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(body),
        beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            if(result !== null){
                updateNote(result);
            }
        }
    })
}
function updateNote(note){
    var note_pannel = $('#note_pannel');
    note_pannel.empty();

    var div_note = $('<div>').addClass('chat-note')
        .attr('note_id',note.note_id)
        .attr('chat_id',note.chat_id);
    div_note.append($('<p>').text(note.user_nm+"님이 공지함"))
        .append($('<p>').text(note.content));
    note_pannel.append(div_note);
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
        reply: $('#reply_chat_id').val()
    };
    console.log("send Chat: "+body);

    stompClient.send('/pub/chat/send/'+roomId,{},JSON.stringify(body));
    $('#content').val('');
}
function onSend(roomId, res){
    console.log("on Send: "+res);
    updateChatLog(res.chat_log); // Load 후 Read 를 해야 정확한 통신이 가능하다!
    if(!res.server_send){
        readChatroom($('#selected_room_id').val());
        // updateChatRoomOnly(roomId);
        // loadChatRoom();
    }
}

// Chat Read
function updateChatRead(res){
    console.log("update Chat Read");
    var chat_log = res.chat_log;
    // console.log(chat_log);
    if(chat_log === null || chat_log.length === 0) return;

    chat_log.forEach(function (value) {
        // console.log("for each: "+value.chat_id);
        var chat_non_read = $('#chat_log div[chat_id='+value.chat_id+'] .chat-non-read');
        // console.log("on Read: "+$(chat_non_read).text());
        var non_read = value.non_read;
        $(chat_non_read).text(((non_read != 0) ? non_read : ""));
    })
}
function readChatroom(roomId){
    console.log("read Chat Room: "+roomId);
    stompClient.send('/pub/chat/read/'+roomId,{},
        $('#user_id').val());
}

// Chat Log
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
                // updateChatRoomOnly(roomId);
                loadChatRoom();
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

    console.log("load All Chat: "+body);

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
            // updateChatRoomOnly(roomId);
            // loadChatRoom();
        }
    });
}
function updateChatLog(result, refresh = false){
    console.log("update Chat Log, refresh: "+refresh);

    var chatLog = $('#chat_log');
    if(refresh){
        chatLog.empty();
    }
    if(result === null || result.length === 0) return;

    var roomId = $('#selected_room_id').val();
    // console.log("refresh: "+refresh);

    result.forEach(function (value, index, array){
        chatLog.append(generateChatLogElement(value));
    })
    chatLog.scrollTop = chatLog.scrollHeight;
}
function generateChatLogElement(value){
    var userId = $('#user_id').val();
    var isSelf = (userId === value.user_id);

    var div_chat = $('<div>').addClass('chat')
        .attr('chat_id',value.chat_id)
        .attr('user_id',value.user_id);

    if(value.server_send){
        // 서버 메시지
        div_chat.addClass('chat-server')
            .text(value.content);
    }else{
        // 유저 메시지
        div_chat.addClass((isSelf) ? 'mine' : 'other')
            .append($('<p>').addClass('chat-user-name').text(value.user_nm));
        var div_chat_content = $('<p>').addClass('chat-content');

        if(isSelf){
            div_chat_content.addClass('chat-self');
        }
        if(value.reply != 0){
            console.log("reply: "+value.reply);
            // 아래 예외는 일단 제외
            // 1번 채팅이 있고, 1번에 답장한 8번 채팅이 있다. 근데 그 사이에 유저가 들어왔다면,
            // 해당 답장 내용을 어떻게 표시할 것인가?
            var reply_chat = $('#chat_log div[chat_id="'+ value.reply +'"]');
            var reply_user_id = reply_chat.attr('user_id');
            var reply_user_name = reply_chat.children('.chat-user-name').text();
            var reply_content = reply_chat.find('p[name="chat_text"]').text();
            console.log("reply content: "+reply_content);
            var div_reply = $('<div>').addClass('chat-reply')
                .append($('<p>').text(((reply_user_id === userId) ? '나': reply_user_name) + '에게 답장'))
                .append($('<p>').text(reply_content))
                .append('->').on('click',function (){
                    moveToReply(value.reply);
                });
            div_chat_content.append(div_reply);
        }
        div_chat_content.append($('<p>').attr('name','chat_text').text(value.content));

        if(!value.deleted){
            div_chat_content.on('contextmenu',function (e){
                e.preventDefault();
                showChatContextMenu(e, value);
            });
            // 마우스 호버링 이벤트
            div_chat_content.hover(
                function (){
                    if(!onChatContextMenu){
                        showChatEmoMenu(div_chat_content, value.chat_id);
                    }
                }
            );
            div_chat_content.on('mouseout', function (e){
                if(e.relatedTarget.id !== 'chat_emo_menu'){
                    hideChatEmoMenu();
                }
            })
        }

        div_chat.append(div_chat_content);
        var p_emo = $('<p>').addClass('chat-emo');

        if(value.emo_list !== null && value.emo_list !== undefined){
            var emojis = value.emo_list.split(',');
            // console.log(emojis);
            emojis.forEach(function (cnt, emoId){
                // console.log("cnt: "+cnt+", emoId: "+emoId);
                if(Number(cnt) > 0){
                    p_emo.append(getEmoIcon(value.chat_id, emoId + 1, cnt));
                }
            })
        }
        div_chat.append(p_emo);

        var p_chat_date = $('<p>').addClass('chat-date')
            .text(value.send_dt);
        div_chat.append(p_chat_date);

        var non_read = value.non_read;
        var p_chat_non_read = $('<p>').addClass('chat-non-read')
            .text(((non_read != 0) ? non_read : ""));
        div_chat.append(p_chat_non_read);
    }
    return div_chat;
}
function showChatContextMenu(e, chat){
    // console.log("show context menu: "+chat);
    let chatContextMenu = $('<div>').prop({
        id: 'chat_context_menu'
    }).addClass('chat-context-menu')
        .append(renderChatContextMenu(chat))
        .css({
            left: e.pageX + 'px',
            top: e.pageY + 'px'
        });

    // const prevContextMenu = $('#chat_context_menu');
    // if(prevContextMenu.length){
    //     prevContextMenu.remove();
    // }
    hideChatContextMenu();

    $('body').append(chatContextMenu);
    onChatContextMenu = true;
}
function renderChatContextMenu(chat){
    var ul_menu = $('<ul>');

    var p_note = $('<p>').text("공지로 등록").on('click', function (){
        noteChat(chat);
        hideChatContextMenu();
    });
    if(isNoted(chat.chat_id)){
        p_note.prop('disabled',true);
    }
    ul_menu.append(p_note);
    // 나중에 공지로 이미 등록된 채팅은 이거 안뜨도록
    // var p_emo = $('<p>').text("공감").on('click', function (){
    //     closeChatContextMenu();
    // });
    
    var p_copy = $('<p>').text("복사").on('click', function (){
        copyChat(chat.content);
        hideChatContextMenu();
    });
    ul_menu.append(p_copy);
    if(chat.user_id === $('#user_id').val()){
        var p_delete = $('<p>').text("삭제").on('click', function (){
            deleteChat(chat.chat_id);
            hideChatContextMenu();
        });
        ul_menu.append(p_delete);
    }

    var p_reply = $('<p>').text("답장").on('click', function (){
        showReplyPannel(chat);
        hideChatContextMenu();
    });
    ul_menu.append(p_reply);
    var p_forward = $('<p>').text("전달").on('click', function (){
        forwardChat(chat);
        hideChatContextMenu();
    });
    ul_menu.append(p_forward);
    var p_forward_self = $('<p>').text("나에게 전달").on('click', function (){
        forwardSelf(chat);
        hideChatContextMenu();
    });
    ul_menu.append(p_forward_self);
    // console.log($(ul_menu));
    return ul_menu;
}
function hideChatContextMenu(){
    var chatContextMenu = $('#chat_context_menu');
    if(chatContextMenu.length && chatContextMenu.is(":visible")){
        chatContextMenu.remove();
        onChatContextMenu = false;
    }
}

// Chat Emo
function showChatEmoMenu(parent, chatId){
    let chatEmoMenu = $('<div>').prop({
        id: 'chat_emo_menu'
    }).addClass('chat-emo-menu').css({
        position: 'absolute',
        left: parent.offset().left + 'px',
        top: (parent.offset().top + 38) + 'px'
    })
        .append(renderChatEmoMenu(chatId))
        .on('mouseout',function (e){
            // console.log("leave: "+e.target.id);
            if(e.relatedTarget.id == 'chat_emo_menu'){
                // $('#chat_emo_menu').fadeOut(600);
                hideChatEmoMenu();
            }
        });

    hideChatEmoMenu();

    $('body').append(chatEmoMenu);
}
function hideChatEmoMenu(){
    var chatEmoMenu = $('#chat_emo_menu');
    if(chatEmoMenu.length && chatEmoMenu.is(":visible")){
        chatEmoMenu.remove();
    }
}
function renderChatEmoMenu(chatId){
    var ul_menu = $('<ul>')
        .append($('<i>').addClass('chat-emo-icon bi bi-heart-fill').on('click', function (){
            sendChatEmo(chatId, 1)
        }))
        .append($('<i>').addClass('chat-emo-icon bi bi-hand-thumbs-up-fill').on('click',function (){
            sendChatEmo(chatId, 2)
        }))
        .append($('<i>').addClass('chat-emo-icon bi bi-check-lg').on('click', function () {
            sendChatEmo(chatId, 3)
        }))
        .append($('<i>').addClass('chat-emo-icon bi bi-emoji-laughing-fill').on('click',function (){
            sendChatEmo(chatId, 4)
        }))
        .append($('<i>').addClass('chat-emo-icon bi bi-emoji-surprise-fill').on('click',function (){
            sendChatEmo(chatId, 5)
        }))
        .append($('<i>').addClass('chat-emo-icon bi bi-emoji-tear-fill').on('click',function (){
            sendChatEmo(chatId, 6)
        }));

    return ul_menu;
}
function sendChatEmo(chatId, emo){
    console.log("emo: "+emo);
    var roomId = $('#selected_room_id').val();
    var body = {
        user_id: $('#user_id').val(),
        chat_id: chatId,
        emo: emo
    };
    stompClient.send('/pub/chat/emo/'+roomId, {}, JSON.stringify(body));
    hideChatEmoMenu();
}
function onEmo(emoji){
    var chat_emo = $('#chat_log div[chat_id="'+ emoji.chat_id +'"] .chat-emo');
    if(chat_emo !== undefined){
        var emojis = emoji.emo_list.split(',');
        emojis.forEach(function (cnt, emoId){
            var i_emo = chat_emo.children('.emo'+(emoId+1));
            if(i_emo.length !== 0){
                if(Number(cnt) <= 0){
                    i_emo.remove();
                }else{
                    i_emo.text(cnt);
                }
            }else{
                if(Number(cnt) > 0){
                    chat_emo.append(getEmoIcon(emoji.chat_id, emoId+1, cnt));
                }
            }
        })


    }
}
function getEmoIcon(chatId, emoId, cnt){
    if(emoId > 6){
        return $('<i>');
    }
    var icon_class = "";
    switch (emoId){
        case 1:
            icon_class = 'bi bi-heart-fill';
            break;
        case 2:
            icon_class = 'bi bi-hand-thumbs-up-fill';
            break;
        case 3:
            icon_class = 'bi bi-check-lg';
            break;
        case 4:
            icon_class = 'bi bi-emoji-laughing-fill';
            break;
        case 5:
            icon_class = 'bi bi-emoji-surprise-fill';
            break;
        case 6:
            icon_class = 'bi bi-emoji-tear-fill';
            break;
    }
    return $('<i>').addClass('emo'+emoId).addClass(icon_class).text(cnt).on('click', function (){
        sendChatEmo(chatId, emoId)
    })
}
function updateChatEmo(result){

}

// Chat Delete
function deleteChat(chatId){

}
function updateDeletedChat(result){

}

// Chat Reply
function showReplyPannel(chat){
    replyPannel.show();
    replyPannel.children('#reply_chat_id').val(chat.chat_id);

    replyPannel.children('.chat-reply-user')
        .text(((chat.user_id === $('#user_id').val()) ? '나' : chat.user_nm)+'에게 답장');
    replyPannel.children('.chat-reply-content').text(chat.content);
}
function hideReplyPannel(){
    replyPannel.children('#reply_chat_id').val("0");
    replyPannel.children('.chat-reply-user').text("");
    replyPannel.children('.chat-reply-content').text("");
    replyPannel.hide();
}
function moveToReply(chatId){
    var reply = $('#chat_log div[chat_id="'+ chatId+'"]');


    $('#chat_log').scrollTop(reply.offset().top + 150);
}

// Chat Forward
function forwardChat(chat){
    
}
function forwardSelf(chat){

}

// Chat Copy & Download
function copyChat(content){
    
}
function downloadChatFile(){
    
}

// Chat Quit / Kick
function quit(){

}
function updateQuit(result){

}
function kick(){

}