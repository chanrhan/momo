
$(document).ready(function (){
    var list_unread = document.getElementsByName('unread');
    if(list_unread != null){
        var list_msg = [];
        list_unread.forEach(function (value, key, parent) {
            var alarmId = $(value).attr('alarm_id');
            list_msg.push(alarmId);
        });

        $.ajax({
            url: '/alarm/read/all',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(list_msg),
            beforeSend: function (xhr){
                xhr.setRequestHeader(header, token);
            },
            success: function (result){

            }
        })
    }
});

function approve(_this){
    var user_id = $(_this).attr('user_id');
    var alarm_id = $(_this).attr('alarm_id');

    $.ajax({
        url: '/account/approve?user_id='+user_id+'&alarm_id='+alarm_id,
        type: 'get',
        success: function (result){
            if(result){
                $(_this).attr('disabled',true);
                $(_this).text('승인 완료');
            }
        }
    });
}