
// 우편번호로 주소 조회
function getAddressList(){
    var srchwrd = $('#srchwrd').val();

    var result = getAddressArea(srchwrd, 1);
    if(result !== null){
        var list = document.getElementById("addr_list");
        list.innerHTML = "";
        result.newAddressListAreaCdSearchAll.forEach(function (data){
            list.innerHTML += "<p onclick='selectAddress("+data.zipNo+", \""+data.lnmAdres+"\")'>"+ data.lnmAdres +"<br>" +
                data.rnAdres +
                "</p>"
        });
    }
}

// 주소 선택 후 창 닫고 우편번호와 상세 주소 넘겨주기
function selectAddress(zipcode, addr){
    window.opener.document.getElementById("zipcode").value = zipcode;
    window.opener.document.getElementById("shopAddr").value = addr;
    self.close();
}
