$(document).ready(function (){
    sessionStorage.removeItem("formData");
})

function stepToNext(){
    var formData = new FormData(document.getElementById('create_form'));
    var body = convertFormDataToObject(formData);

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

    sessionStorage.setItem("formData", JSON.stringify(body));
    sessionStorage.setItem("from", "create");
    window.location.href = '/sale/msg/rsv';
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