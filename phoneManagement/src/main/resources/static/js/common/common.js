
const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_.]?[0-9a-zA-z])*\.[a-zA-z]{2,3}$/;
const telRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;
const scRegex = /^[^!@#$%^&*(),.?":{}|<>]+$/;
const koreanRegex = /^[^ㄱ-ㅎㅏ-ㅣ가-힣]+$/;

const header = $("meta[name='_csrf_header']").attr('content');
const token = $("meta[name='_csrf']").attr('content');

$(document).ready(function (){
    var div_pwd_toggle = $('.pwd-toggle');
    if(div_pwd_toggle === null){
        return;
    }
    div_pwd_toggle.each(function (idx, div){
        var eye = $(div).find('i');
        var pwd = eye.prev('input');
        eye.on('click',function (){
            pwd.toggleClass('active');
            if(pwd.hasClass('active')){
                $(this).attr('class','fa fa-eye-slash fa-lg')
                    .prev('input').attr('type','text');
            }else{
                $(this).attr('class','fa fa-eye fa-lg')
                    .prev('input').attr('type','password');
            }
        });
    })

});