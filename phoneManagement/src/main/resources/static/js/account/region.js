
function changeState(){
    var state = $('#state').val();
    var list_city = document.getElementById('city');

    var cities = getCity(state);
    if(cities.length > 0){
        list_city.innerHTML = "";
        cities.forEach(function (value, index, array) {
            list_city.innerHTML += "<option value='"+ value +"'>"+value+"</option>"
        });
    }
}

function getCity(state){
    var rst = [];
    $.ajax({
        url: '/account/city?state='+state,
        type: 'get',
        async: false,
        success: function (result){
            rst = result;
        }
    })
    return rst;
}