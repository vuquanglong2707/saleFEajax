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
                    <li><a href="./findproduct.php?name=${objProduct[i].id}">${objProduct[i].title}</a></li>
                `);
            }
        }
    })
});

$(document).ready(function() {
    // var page=datas;
    // var size=20;
    var name=datas
    $.ajax({
        url: API_ENDPOINT + '/api/catogories/getAllProductByCato',
        type: 'GET',
        dataType: 'json',
        headers:{'Authorization':shop_token},
        success: function(data) {
            objProduct = data.data;
            for(var  i=0;i<objProduct.length;i++ ){
                
                    if(objProduct[i].id==name){
                        for(var  j=0;j<objProduct[i].dtoProducts.length;j++ ){
                            $("#products").append(`
                            <div class="col-lg-4 col-md-6 col-sm-6">
                                <div class="product__item">
                                    <div class="product__item__pic set-bg" >
                                        <img src="http://localhost:3980${objProduct[i].dtoProducts[j].images[0]}" alt="">
                                        <ul class="product__item__pic__hover">
                                            <li><a href="#"><i class="fa fa-heart"></i></a></li>
                                            <li><a href="#"><i class="fa fa-retweet"></i></a></li>
                                            <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
                                        </ul>
                                    </div>
                                    <div class="product__item__text">
                                        <h6><a href="shop-details.php">Thịt tươi sống</a></h6>
                                        <h5>$30.00</h5>
                                    </div>
                                </div>
                            </div>`)
                        }
                        var number= Math.floor(objProduct[i].dtoProducts.length/20)+1;
                        console.log(number)
                        for(var i=1;i<number+1;i++){
                            if(page==i){
                                $(".product__pagination").append(`
                                <a href="./shop-grid.php?page=${i}" style="color:white;background:green;">${i}
                                </a>
                            `)}
                            else{
                                $(".product__pagination").append(`
                                <a href="./shop-grid.php?page=${i}">${i}</a>
                            `);
                            }
                        }
                        $(".product__pagination").append(`
                            <a href="./shop-grid.php"><i class="fa fa-long-arrow-right"></i></a>
                        `);
                    }
                
                }
            
            
        }
    })
});
