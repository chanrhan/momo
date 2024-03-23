
const header = $("meta[name='_csrf_header']").attr('content');
const token = $("meta[name='_csrf']").attr('content');

function uploadImage(file){
    var fileList = file[0].files;
    var formData = new FormData();

    formData.append("file", fileList[0]);
    console.log(fileList[0]);

    $.ajax({
        url: '/img/upload/spec',
        type: 'post',
        contentType: false,
        processData: false,
        data: formData,
        beforeSend: function (xhr){
            xhr.setRequestHeader(header, token);
        },
        success: function (result){
            console.log(result);
        }
    })
}