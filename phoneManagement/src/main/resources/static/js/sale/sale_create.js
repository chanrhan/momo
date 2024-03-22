$(document).ready(function (){
    sessionStorage.removeItem("formData");
})

function stepToNext(){
    var createForm = new FormData(document.getElementById('create_form'));

    var file = createForm.get('spec');
    createForm.delete('spec');
    var body = convertFormDataToObject(createForm);

    if(isDupTelInSameMonth(body["shop_id"],body["cust_tel"],body["actv_dt"])){
        var result = confirm("선택한 달에 동일한 전화번호가 존재합니다. 계속 진행하시겠습니까?");
        if(!result){
            return;
        }
    }

    var div_sb = [];
    document.getElementsByName('sup_div').forEach(function (value, key, parent){
        div_sb.push($(value).val());
    })
    var pay_sb = [];
    document.getElementsByName('sup_pay').forEach(function (value, key, parent){
        pay_sb.push($(value).val());
    })

    body['sup_div'] = div_sb;
    body['sup_pay'] = pay_sb;
    body['seller_id'] = $('#user_id').val();

    var formData = new FormData();
    formData.append('spec', file);
    formData.append('sale', new Blob([JSON.stringify(body)],{type: 'application/json'}));

    // sessionStorage.setItem("sale", JSON.stringify(body));
    // sessionStorage.setItem("from", "create");
    // window.location.href = '/sale/msg/rsv';

    if(createSale(formData)){
        if(confirm("판매일보 등록이 완료되었습니다. 이어서 문자 예약을 바로 하시겠습니까?")){
            sessionStorage.setItem("sale", JSON.stringify(body));
            window.location.href = '/sale/msg/rsv';
        }else{
            window.opener.parent.searchSale();
            window.close();
        }
    }
}

function createSale(formData){
    var rst = false;
    $.ajax({
        url: '/sale/create',
        type: 'post',
        contentType: false,
        processData: false,
        data: formData,
        async: false,
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            rst = result;
        }
    })
    return rst;
}

function addSupDiv(){
    var list_sup = document.getElementById('list_sup');
    var innerHTML = '<div>\n' +
        '                지원 구분<select name="sup_div">\n' +
        '                    <option selected value="" disabled>선택 없음</option>\n' +
        '                    <option value="1">카드</option>\n' +
        '                    <option value="2">이체</option>\n' +
        '                    <option value="3">차액 예약</option>\n' +
        '                    <option value="4">일시납 개통(현금 개통)</option>\n' +
        '                    <option value="5">추가지원금(현금 개통)</option>\n' +
        '                    <option value="6">전산 수납(현급 수납)</option>\n' +
        '                    <option value="7">유심(현금 수납)</option>\n' +
        '                    <option value="8">상품권</option>\n' +
        '                    <option value="9">프리미엄 악세서리</option>\n' +
        '                    <option value="10">기타</option>\n' +
        '                </select>' +
        '                지원 금액<input type="text" class="form-control" name="sup_pay">\n' +
        '                <button type="button" class="btn-primary" onclick="subSupDiv($(this).parent())">-</button>\n' +
        '            </div>';
    var newElement = document.createElement('div');
    newElement.innerHTML = innerHTML;
    list_sup.appendChild(newElement);
}

function subSupDiv(_this){
    $(_this).remove();
}

function isDupTelInSameMonth(shop_id, cust_tel, actv_dt){
    var body = {
        shop_id: shop_id,
        cust_tel: cust_tel,
        actv_dt: actv_dt
    }

    var result = false;
    $.ajax({
        url: '/sale/dup/tel',
        type:'post',
        contentType: 'application/json',
        data: JSON.stringify(body),
        async: false,
        beforeSend: function (xhr){
            xhr.setRequestHeader(header,token);
        },
        success: function (rst){
            result = rst;
        }
    });
    return result;
}