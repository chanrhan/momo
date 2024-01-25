
function stepToMessageReserve(){
    var formData = new FormData(document.getElementById('detail_form'));
    var body = convertFormDataToObject(formData);

    sessionStorage.setItem("formData", JSON.stringify(body));
    sessionStorage.setItem("from", "update");
    window.location.href = '/sale/msg/rsv';
}

function updateSale(){
    var formData = new FormData(document.getElementById('detail_form'));

    $.ajax({
        url: '/sale/update',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(convertFormDataToObject(formData)),
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            if(result){
                window.opener.parent.searchSale();
                window.close();
            }
        }
    })
}

function deleteSale(){
    $.ajax({
        url: '/sale/delete/'+$('#saleNo').val(),
        type: 'get',
        success: function (result){
            if(result){
                window.opener.parent.searchSale();
                window.close();
            }
        }
    })
}