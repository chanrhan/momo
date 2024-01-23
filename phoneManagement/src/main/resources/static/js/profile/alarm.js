
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