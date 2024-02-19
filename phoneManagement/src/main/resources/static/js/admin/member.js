
let order = "regi_dt";
let asc = "asc";

let selected_columns = [
    "user_st",
    "role",
    "id",
    "name",
    "tel",
    "email",
    "shop_nm"
];

function changeUserList(){
    // $('#keyword').val("");

    order = "regi_dt";
    asc = "asc";
    searchUser();
}

function orderUser(th){
    order = $(th).attr('value');
    asc = $(th).hasClass('desc') ? 'desc' : 'asc';
    $(th).toggleClass('desc');

    searchUser();
}

function searchUser(){
    var searchMap = {};
    var selectMap = {};

    selectMap["corp_id"] = $('#filter_corp').val();
    selectMap["role"] = $('#filter_role').val();
    selectMap["user_st"] = $('#filter_user_st').val();
    var keyword = $('#keyword').val();
    if(keyword !== ""){
        searchMap = createMultiMap(keyword, selected_columns);
    }

    var body = {
        select: selectMap,
        search: searchMap,
        order: order,
        asc: asc
    };

    $.ajax({
        url: '/admin/member/list',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(body),
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            // console.log(result.records);
            updateUserList(result);
        }
    });
}

function updateUserList(list){
    // console.log(list);
    var list_msg = document.getElementById('list_user');
    list_msg.innerHTML = "";
    list.forEach(function (value, index, array) {
        var st = "정상";
        if(value.user_st === 0){
            st = "탈퇴";
        }else if(value.user_st === 2){
            st = "장기 미로그인";
        }
        var role = "역할없음";
        if(value.role === "ADMIN"){
            role = "관리자";
        }else if(value.role === "REPS"){
            role = "대표";
        }else if(value.role === "MANAGER"){
            role = "직원";
        }
        list_msg.innerHTML += "<tr>" +
            "<td>" +
            st +
            "</td>" +
            "<td>" +
            role +
            "</td>" +
            "<td>" +
            value.id +
            "</td>" +
            "<td>" +
            value.name +
            "</td>" +
            "<td>" +
            value.tel +
            "</td>" +
            "<td>" +
            value.email +
            "</td>" +
            "<td>" +
            value.shop_nm +
            "</td>" +
            "<td>" +
            value.regi_dt +
            "</td>" +
            "</tr>";
    })
}