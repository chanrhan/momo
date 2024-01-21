
document.ready(function (){

})

function createSale(){
    // window.opener.name = "sale_list";
    // document.create_form.target = "sale_list";
    var formData = new FormData(document.getElementById('create_form'));
    console.log(convertFormDataToObject(formData));
    console.log({
        custNm: "chan",
        custTel: "010"
    });
    $.ajax({
        url: '/sale/create',
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


    // self.close();
}