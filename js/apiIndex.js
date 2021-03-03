
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
                $("#catogories").val(objProduct[i].title);
                $("#catogories").append(`
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
            
            for(var  i=0;i<12;i++ ){
                console.log("http://localhost:3980"+objProduct[i].images[0])
                $("#top_product").append(`
                    <div class="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat">
                        <div class="featured__item">
                            <div class="featured__item__pic set-bg" >
                                <img src="http://localhost:3980${objProduct[i].images[0]}" alt="" style="height: 100%;">
                                <ul class="featured__item__pic__hover">
                                    <li><a href="#"><i class="fa fa-heart"></i></a></li>
                                    <li><a href="./shop-details.php?id=${objProduct[i].id}"><i class="fa fa-retweet"></i></a></li>
                                    <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
                                </ul>
                            </div>
                            <div class="featured__item__text">
                                <h6><a href="./shop-details.php?id=${objProduct[i].id}">${objProduct[i].name}</a></h6>
                                <h5>${objProduct[i].price}</h5>
                            </div>
                        </div>
                    </div>
                    
                `); 
            } 
        }
    })
});
