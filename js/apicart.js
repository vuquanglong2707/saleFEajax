var API_ENDPOINT = 'http://localhost:3980';
var shop_token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjE0MjgxNTkzLCJleHAiOjE2MTQ4ODYzOTN9.b6nHQlOHFe34NO9ZHql2ZSFRdgjtCBeXNTVEemgWnVcBK0lbA_E6WmDKlO14kJ-KJ7L1bd2Ws6P_FcvkLJJrQA';

$(document).ready(function() {
    $.ajax({
        url: API_ENDPOINT + '/api/catogories/getAll',
        type: 'GET',
        dataType: 'json',
        headers:{'Authorization':shop_token},
        success: function(data) {
            objProduct = data.data;
            var AllCategoriess = objProduct[0].title;
            console.log(AllCategoriess)
            for(var  i=0;i<objProduct.length;i++ ){
                console.log(objProduct[i].title)
                $(".catogories").append(`
                <li><a href="./shop-grid.php?catogories=${objProduct[i].id}">${objProduct[i].title}</a></li>
                `);
            }
        }
    })
});
$(document).ready(function() {
    $.ajax({
        url: API_ENDPOINT + '/api/product/getmax',
        type: 'GET',
        dataType: 'json',
        headers:{'Authorization':shop_token},
        success: function(data) {
            objProduct = data.data;
            var total_money=0;
            for(var i=0;i<objProduct.length;i++){
                // console.log(objProduct[i].id)
                for(var j=0;j<data_cart.length;j++){ 
                    // console.log(data_cart[j].id)
                    
                    if(objProduct[i].id==data_cart[j].id){
                        
                        $("#carts").append(`
                            <tr >
                                <th scope="row"> <img src="http://localhost:3980${objProduct[i].images[0]}" alt="" style="width:100px;height:100px;">
                                <h5> ${objProduct[i].name}</h5></th>
                                <td>${data_cart[j].variation}</td>
                                <td>${data_cart[j].properties}</td>
                                <td>${objProduct[i].salePrice}</td>
                                <td>  ${data_cart[j].quatities}</td>
                                <td> ${parseInt(objProduct[i].salePrice)*parseInt(data_cart[j].quatities)}</td>
                                <td >
                                <button class="btn btn-danger"><span onclick="remove(${data_cart[j].id})">Xóa</span></button> 
                                </td>
                            </tr>
                        `);
                        console.log(objProduct[i].name)
                    total_money=total_money+parseInt(objProduct[i].salePrice)*parseInt(data_cart[j].quatities)
                    }
                    // else{
                    //     console.log("Khong tim thay,", data_cart[j].id)
                    // }
                }
            }
            console.log(total_money)
            $("#total_money").append(`
                ${total_money}
            `);
            $("#total_money_ship").append(`
            ${total_money+50000}
        `);
        }
    })
});
function remove(id){
    var retrievedObjects = localStorage.getItem('shop_cart');
    // console.log(JSON.parse(retrievedObjects).data)
    var someArray = JSON.parse(retrievedObjects).data
    someArray = someArray.filter(person => person.id != id);
    // console.log(someArray)
    var last_change = {data:someArray}
    // console.log("last change : ",last_change)
    localStorage.setItem('shop_cart', JSON.stringify(last_change));

}