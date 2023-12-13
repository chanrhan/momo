let header = $("meta[name='_csrf_header']").attr('content');
let token = $("meta[name='_csrf']").attr('content');

function test_ajax_get(){
    $.ajax({
        url: "/test/ajax",
        type: "get",
        success: function (data){
            console.log(data);
        }
    })
}

function test_ajax_post(){
    var vo = {
        strValue: "Hello",
        intValue: 4
    }

    $.ajax({
        url: "/test/ajax",
        data: JSON.stringify(vo),
        type: "post",
        dataType: "json",
        contentType: "application/json",
        beforeSend: function (xhr){
          xhr.setRequestHeader(header, token);
        },
        success: function (data){
            console.log(data);
        }
    })
}

function search(){
    var search_data={
        admin_id: $('#admin_id').val(),
        admin_pwd: $('#pwd').val(),
        admin_email: $('#email').val(),
        admin_nm: $('#name').val(),
        admin_ph_no: $('#ph_no').val(),
        search_column: $('#search_column').val(),
        search_keyword: $('#keyword').val(),
        orderby: $('#orderby').val(),
        offset:$('#offset').val(),
        limit: $('#limit').val(),
    };

    $.ajax({
        url: "/test/search",
        data: JSON.stringify(search_data),
        type: "post",
        dataType: "json",
        contentType: "application/json",
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (data){
            var table = document.getElementById("search_result");
            table.innerHTML = "";
            table.innerHTML += "<table>\n" +
                "                <thead>\n" +
                "                <tr>\n" +
                "                    <th>아이디</th>\n" +
                "                    <th>비밀번호</th>\n" +
                "                    <th>이름</th>\n" +
                "                    <th>이메일</th>\n" +
                "                    <th>전화번호</th>\n" +
                "                </tr>\n" +
                "                </thead>\n" +
                "                <tbody>\n";

            data.forEach(function (result){
                table.innerHTML += "<tr>";
                table.innerHTML += "<td> "+ result.admin_id +"</td>";
                table.innerHTML += "<td> "+ result.admin_pwd +"</td>";
                table.innerHTML += "<td> "+ result.admin_nm +"</td>";
                table.innerHTML += "<td> "+ result.admin_email +"</td>";
                table.innerHTML += "<td> "+ result.admin_ph_no +"</td>";
                table.innerHTML += "</tr><br>";
            });

            table.innerHTML += "</tbody>\n" +
                "            </table>";
        }
    })
}