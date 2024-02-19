const header = $("meta[name='_csrf_header']").attr('content');
const token = $("meta[name='_csrf']").attr('content');

function sendEmail(){
    var email = $('#email').val();

    $.ajax({
        url: '/mail/invite?email='+email,
        type:'get',
        success: function (result){
            console.log(result);
        }
    })
}

function dupTel(tel){
    var body = {
        shop_id: $('#shop_id').val(),
        cust_tel: tel
    }

    $.ajax({
        url: '/sale/count/tel',
        type: 'post',
        contentType:'application/json',
        data: JSON.stringify(body),
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            console.log(result);
        }
    })
}

function dupTelOnDate(tel, date){
    var body = {
        shop_id: $('#shop_id').val(),
        cust_tel: tel,
        actv_dt: date
    }

    $.ajax({
        url: '/sale/dup/date',
        type: 'post',
        contentType:'application/json',
        data: JSON.stringify(body),
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            console.log(result);
        }
    })
}

function trTest(){
    $.ajax({
        url: '/test/tr',
        type: 'get',
        success: function (result){
            console.log(result);
        }
    })
}

function post(side){
    var data = {
        name: 'Hee Chan'
    };
    var rst = "";

    $.ajax({
        async: false,
        url: '/test/post',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(data),
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
            console.log("before: "+rst);
        },
        success: function (result){
            rst = result;
            console.log("success: "+rst);
        },
        error: function (error){
            console.log(error);
        },
        complete: function (ret){
            console.log("complete: "+rst);
        }
    });
    console.log("final: "+rst);
}

function get(side){
    var rst = "";

    $.ajax({
        async: (side === 'true'),
        url: '/test/get?name=Chan',
        type: 'get',
        success: function (result){
            rst = result;
            console.log("success: "+rst);
        },
        error: function (error){
            console.log(error);
        }
    });
    console.log("final: "+rst);
}

function getMAP(){
    var body = {
        sale_id: 4
    }

    $.ajax({
        url: '/test/map',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(body),
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            console.log(result);
        }
    });
}