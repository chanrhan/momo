
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