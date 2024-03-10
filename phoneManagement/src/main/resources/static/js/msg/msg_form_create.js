
function createForm(){
    var title = $('#title').val();
    var content = decodeContent(document.getElementById('content'));
    var rsvDay = $('#rsv_day').val();


}

function decodeContent(content){
    $()
}

function addParam(param){
    var content = document.getElementById('content');
    var name = convertName(param);
    content.innerHTML += "<button name='" +
        param +
        "' class='btn-primary' disabled contenteditable='false'>" +
         + name +
        "</button>";
}

function convertName(param){
    var displayName = 'null';
    switch (param){
        case '#{seller_nm}':
            displayName = '판매자 이름';
            break;
        case '#{cust_nm}':
            displayName = '고객 이름';
            break;
        case '#{shop_nm}':
            displayName = '매장명';
            break;
        case '#{service_nm}':
            displayName = '서비스 이름';
            break;
        case '#{description}':
            displayName = '서비스 설명';
            break;
    }
    return displayName;
}