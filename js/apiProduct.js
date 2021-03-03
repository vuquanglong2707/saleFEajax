var API_ENDPOINT = 'http://localhost:3980';
var shop_token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjE0MjgxNTkzLCJleHAiOjE2MTQ4ODYzOTN9.b6nHQlOHFe34NO9ZHql2ZSFRdgjtCBeXNTVEemgWnVcBK0lbA_E6WmDKlO14kJ-KJ7L1bd2Ws6P_FcvkLJJrQA';
// localStorage.setItem('cart', 0)
// localStorage.setItem('cart', 0)



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
var page=1;
var size=20;
var catogories=data_catos;

function change_page(pages) {
    $.ajax({
        url: API_ENDPOINT + '/api/product?page='+pages+'&size='+size,
        type: 'GET',
        dataType: 'json',
        headers:{'Authorization':shop_token},
        success: function(data) {
            objProduct = data.data;
            $('#products').empty()
            var length_findall=0;
            var length_catogories=0;
            for(var  i=0;i<objProduct.length;i++ ){
                if(catogories=="all"){
                    $("#products").append(`
                    <div class="col-lg-4 col-md-6 col-sm-6">
                        <div class="product__item">
                            <div class="product__item__pic set-bg" >
                                <img src="http://localhost:3980${objProduct[i].images[0]}" alt="" style="height: 100%;">
                                <ul class="product__item__pic__hover">
                                    <li><a href="./shop-details.php?id=${objProduct[i].id}"><i class="fa fa-heart"></i></a></li>
                                    <li><a href="./shop-details.php?id=${objProduct[i].id}"><i class="fa fa-retweet"></i></a></li>
                                    <li><a href="./shop-details.php?id=${objProduct[i].id}"><i class="fa fa-shopping-cart"></i></a></li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6><a href="shop-details.php?id=${objProduct[i].id}">${objProduct[i].name}</a></h6>
                                <h5 style="text-align: center;"><span style="text-decoration: line-through;">${new Intl.NumberFormat({ style: 'currency', currency: 'VND' }).format(objProduct[i].price)} VND </span> <span style="color:red;"><b>${new Intl.NumberFormat( { style: 'currency', currency: 'VND' }).format(objProduct[i].salePrice)} VND</b></span></h5>
                            </div>
                        </div>
                    </div>
                `)
                length_findall=length_findall+1
            }
                else{
                    if(objProduct[i].productCategoriesId==catogories){
                        // $('#products').empty()
                        $("#products").append(`
                            <div class="col-lg-4 col-md-6 col-sm-6">
                                <div class="product__item">
                                    <div class="product__item__pic set-bg" >
                                        <img src="http://localhost:3980${objProduct[i].images[0]}" alt="" style="height: 100%;">
                                        <ul class="product__item__pic__hover">
                                            <li><a href="./shop-details.php?id=${objProduct[i].id}"><i class="fa fa-heart"></i></a></li>
                                            <li><a href="./shop-details.php?id=${objProduct[i].id}"><i class="fa fa-retweet"></i></a></li>
                                            <li><a href="./shop-details.php?id=${objProduct[i].id}"><i class="fa fa-shopping-cart"></i></a></li>
                                        </ul>
                                    </div>
                                    <div class="product__item__text">
                                        <h6><a href="shop-details.php?id=${objProduct[i].id}">${objProduct[i].name}</a></h6>
                                        <h5 style="text-align: center;"><span style="text-decoration: line-through;">${new Intl.NumberFormat({ style: 'currency', currency: 'VND' }).format(objProduct[i].price)} VND </span> <span style="color:red;"><b>${new Intl.NumberFormat( { style: 'currency', currency: 'VND' }).format(objProduct[i].salePrice)} VND</b></span></h5>
                                    </div>
                                </div>
                            </div>
                        `)
                        length_catogories=length_catogories+1
    
                    }
                    
                }
    
            
            }
            if(length_findall==0&length_catogories==0){
                $("#products").append(`
                Không có dữ liệu
            `)
            }
        }
    })
    
    
}   

$.ajax({
    url: API_ENDPOINT + '/api/product?page='+page+'&size='+size,
    type: 'GET',
    dataType: 'json',
    headers:{'Authorization':shop_token},
    success: function(data) {
        objProduct = data.data;
        pagination=data.metaData;
        var number= Math.floor(pagination.total/pagination.size)+1;
        for(var i=1;i<number+1;i++){
            $(".product__pagination").append(`
            <button onclick="change_page(${i})" class="active${i}">${i}</button>
                `)
            
        }

        $(".product__pagination").append(`
            <span <i class="fa fa-long-arrow-right"></i></span>
        `);
        // console.log('number:',number)
        $('#products').empty()
        var length_findall=0;
        var length_catogories=0;
        for(var  i=0;i<objProduct.length;i++ ){
            if(catogories=="all"){
               
                $("#products").append(`
                <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="product__item">
                        <div class="product__item__pic set-bg" >
                            <img src="http://localhost:3980${objProduct[i].images[0]}" alt="" style="height: 100%;">
                            <ul class="product__item__pic__hover">
                                <li><a href="./shop-details.php?id=${objProduct[i].id}"><i class="fa fa-heart"></i></a></li>
                                <li><a href="./shop-details.php?id=${objProduct[i].id}"><i class="fa fa-retweet"></i></a></li>
                                <li><a href="./shop-details.php?id=${objProduct[i].id}"><i class="fa fa-shopping-cart"></i></a></li>
                            </ul>
                        </div>
                        <div class="product__item__text">
                            <h6><a href="shop-details.php?id=${objProduct[i].id}">${objProduct[i].name}</a></h6>
                            <h5 style="text-align: center;"><span style="text-decoration: line-through;">${new Intl.NumberFormat({ style: 'currency', currency: 'VND' }).format(objProduct[i].price)} VND </span> <span style="color:red;"><b>${new Intl.NumberFormat( { style: 'currency', currency: 'VND' }).format(objProduct[i].salePrice)} VND</b></span></h5>
                        </div>
                    </div>
                </div>
                `)
                length_findall=length_findall+1
            }
            else{
                if(objProduct[i].productCategoriesId==catogories){
                    $("#products").append(`
                        <div class="col-lg-4 col-md-6 col-sm-6">
                            <div class="product__item">
                                <div class="product__item__pic set-bg" >
                                    <img src="http://localhost:3980${objProduct[i].images[0]}" alt="" style="height: 100%;">
                                    <ul class="product__item__pic__hover">
                                        <li><a href="#"><i class="fa fa-heart"></i></a></li>
                                        <li><a href="./shop-details.php?id=${objProduct[i].id}"><i class="fa fa-retweet"></i></a></li>
                                        <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
                                    </ul>
                                </div>
                                <div class="product__item__text">
                                    <h6><a href="shop-details.php?id=${objProduct[i].id}">${objProduct[i].name}</a></h6>
                                   <a href="./shop-details.php?id=${objProduct[i].id}"><h5 style="text-align: center;"><span style="text-decoration: line-through;">${new Intl.NumberFormat({ style: 'currency', currency: 'VND' }).format(objProduct[i].price)} VND </span> <span style="color:red;"><b>${new Intl.NumberFormat( { style: 'currency', currency: 'VND' }).format(objProduct[i].salePrice)} VND</b></span></h5></a> 
                                </div>
                            </div>
                        </div>
                    `)
                    length_catogories=length_catogories+1;
                }

            }
        }
        if(length_catogories==0 & length_findall==0 ){
            $("#products").append(`
                Không có dữ liệu
            `)
        }
        // console.log(length_catogories)  
        // console.log(length_findall)     
    }
})



