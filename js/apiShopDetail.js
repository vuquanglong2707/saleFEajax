var API_ENDPOINT = 'http://localhost:3980';
var shop_token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjE0MjgxNTkzLCJleHAiOjE2MTQ4ODYzOTN9.b6nHQlOHFe34NO9ZHql2ZSFRdgjtCBeXNTVEemgWnVcBK0lbA_E6WmDKlO14kJ-KJ7L1bd2Ws6P_FcvkLJJrQA';
// var shop_cart = {} ;
// Put the object into storage
// localStorage.setItem('testObject', JSON.stringify(testObject));

// Retrieve the object from storage
// var retrievedObject = localStorage.getItem('testObject');

// console.log('retrievedObject: ', JSON.parse(retrievedObject));


// $("#product_cart").append(`
// 0
// `);
// $("#product_cart").empty()


// if(parseInt(JSON.parse(retrievedObject).data.length)>0){
//     console.log("tesst")

// }
// else{
//     console.log("tesst")
//     $("#product_cart").append(`
//         0
// `);
// }

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
            $("#catogories").append(`
                <li><a href="./shop-grid.php?catogories=${objProduct[i].id}">${objProduct[i].title}</a></li>
            `);
        }

        
    }
})
$(document).ready(function() {
    var params= datas
    console.log(params)
    $.ajax({
        url: API_ENDPOINT+'/api/product/byid?id='+params,
        type: 'GET',
        dataType: 'json',
        headers:{'Authorization':shop_token},
        success: function(data) {
            objProduct = data.data;
           
            // var sl=1;
  
            // console.log(sl)
            $("#name_product").val(objProduct[0].name);
            $("#name_product").append(`${objProduct[0].name}
            `);

            $(".product__details__price").val(objProduct[0].price);
            $(".product__details__price").append(`
            <h5><span style="text-decoration: line-through;">${new Intl.NumberFormat( { style: 'currency', currency: 'VND' }).format(objProduct[0].price)} VND </span> <span style="color:red;"><b>${new Intl.NumberFormat( { style: 'currency', currency: 'VND' }).format(objProduct[0].salePrice)} VND</b></span></h5>
            `);
            $("#quatitySold").val(objProduct[0].quantitySold);
            $("#quatitySold").append(`
            ${objProduct[0].quantitySold} Tấn
            `);
            $("#quatityCurrent").val(objProduct[0].quatityCurrent);
            $("#quatityCurrent").append(`
            ${objProduct[0].quantityCurrent} Tấn
            `);
            $(".descs").append(`${objProduct[0].descs}
            `);
            $("#images").append(`
            <div class="product__details__pic" >
                <div class="product__details__pic__item" >
                    <img class="product__details__pic__item--large" src="${API_ENDPOINT}${objProduct[0].images[0]}" alt="" >
                </div>
                <div class="product__details__pic__slider owl-carousel"  id="product_item" >
                   
                </div>
            </div>`); 
            for(var i=0;i<objProduct[0].images.length;i++){
                $("#product_item").append(`
                 <img data-imgbigurl="${API_ENDPOINT}${objProduct[0].images[i]}" src="${API_ENDPOINT}${objProduct[0].images[i]}" alt="" style=" height:150px; width: 250px;">
                `); 
            }

            if(objProduct[0].quantityCurrent>0){
                $("#status").append(`
                <b>Trạng thái</b> <span>Còn hàng</span>
                `);   
            }
            else{
                $("#status").append(`
                <b>Trạng thái</b> <span>Hết hàng</span>
                `); 
            }
            for(var i=0;i<objProduct[0].dtoVariationList.length;i++){
                $("#variation").val(objProduct[0].dtoVariationList[i].title)
                
                $("#variation").append(`
                    ${objProduct[0].dtoVariationList[i].title}
                        <select name="cars" id="properties">
                        </select>
                    `);
                for(var j=0;j<objProduct[0].dtoVariationList[i].properties.length;j++){
                $("#properties").append(`
                    <option value="volvo">${objProduct[0].dtoVariationList[i].properties[j]}</option>
            `); 
            }
            // console.log($("#variation").val())
            $('#number' && '#properties').on('change', function() {
                
                 var sl=parseInt($('#number').val());
                 console.log("sl", sl)
                 var propertiess=$('#properties').find(":selected").text()
                 var variation=$('#variation').val();
                 console.log(variation)
                 console.log(datas)
                 var input_data={'id':datas,'quatities':sl,'variation':variation,'properties':propertiess}
                 console.log("input_data", input_data)
                 $("#add_product").click(function(){
                    var card =  JSON.parse(localStorage.getItem('shop_cart'))
                    // console.log(card)
                    card.data.push(input_data)
                    localStorage.setItem('shop_cart', JSON.stringify(card));
                    var retrievedObjects = localStorage.getItem('shop_cart');
                    console.log(JSON.parse(retrievedObjects).data.length)
                    alert("Thêm thành công vào giỏ hàng !");
                    $("#product_cart").empty()
                    $("#product_cart").append(`
                    ${JSON.parse(retrievedObjects).data.length}
                `); 
                 })
            });

            var retrievedObject = localStorage.getItem('shop_cart');
            $("#product_cart").append(`
                ${JSON.parse(retrievedObject).data.length}
            `);
            $("#tabs-1").append(`
                <div class="product__details__tab__desc">
                    <h6>Mô tả sản phẩm</h6>
                    ${objProduct[0].content}
                </div>
            `)
            $("#tabs-2").append(`
            <div class="product__details__tab__desc">
                <h6>Thông tin sản phẩm</h6>
                ${objProduct[0].descsDetail}
            </div>
            `)
            $("#tabs-3").append(`
            <div class="product__details__tab__desc">
                <h6>Nhận xét sản phẩm</h6>
               
            </div>
            `)

        }

    /*-----------------------
        Categories Slider
    ------------------------*/
    $(".categories__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 4,
        dots: false,
        nav: true,
        navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {

            0: {
                items: 1,
            },

            480: {
                items: 2,
            },

            768: {
                items: 3,
            },

            992: {
                items: 4,
            }
        }
    });


    /*--------------------------
        Latest Product Slider
    ----------------------------*/
    $(".latest-product__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*-----------------------------
        Product Discount Slider
    -------------------------------*/
    $(".product__discount__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 3,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {

            320: {
                items: 1,
            },

            480: {
                items: 2,
            },

            768: {
                items: 2,
            },

            992: {
                items: 3,
            }
        }
    });

    /*---------------------------------
        Product Details Pic Slider
    ----------------------------------*/
    $(".product__details__pic__slider").owlCarousel({
        loop: true,
        margin: 20,
        items: 4,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*-----------------------
		Price Range Slider
	------------------------ */
    var rangeSlider = $(".price-range"),
        minamount = $("#minamount"),
        maxamount = $("#maxamount"),
        minPrice = rangeSlider.data('min'),
        maxPrice = rangeSlider.data('max');
    rangeSlider.slider({
        range: true,
        min: minPrice,
        max: maxPrice,
        values: [minPrice, maxPrice],
        slide: function (event, ui) {
            minamount.val('$' + ui.values[0]);
            maxamount.val('$' + ui.values[1]);
        }
    });
    minamount.val('$' + rangeSlider.slider("values", 0));
    maxamount.val('$' + rangeSlider.slider("values", 1));

    /*--------------------------
        Select
    ----------------------------*/
    // $("select").niceSelect();

    /*------------------
		Single Product
	--------------------*/
    $('.product__details__pic__slider img').on('click', function () {

        var imgurl = $(this).data('imgbigurl');
        var bigImg = $('.product__details__pic__item--large').attr('src');
        if (imgurl != bigImg) {
            $('.product__details__pic__item--large').attr({
                src: imgurl
            });
        }
    });
        }
    })
});

$(document).ready(function() {
    $.ajax({
        url: API_ENDPOINT + '/api/product/getmax',
        type: 'GET',
        dataType: 'json',
        headers:{'Authoriz  ation':shop_token},
        success: function(data) {
            objProduct = data.data;
            for(var  i=0;i<4;i++ ){
                $("#product_reference").append(`
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="product__item">
                            <div class="product__item__pic set-bg" >
                                <img src="http://localhost:3980${objProduct[i].images[0]}" alt="" style="height: 100%;">
                                <ul class="product__item__pic__hover">
                                    <li><a href="#"><i class="fa fa-heart"></i></a></li>
                                    <li><a href="#"><i class="fa fa-retweet"></i></a></li>
                                    <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6><a href="./shop-details.php?id=${objProduct[i].id}">${objProduct[i].name}</a></h6>
                                <h5 style="text-align: center;"><span style="text-decoration: line-through;">${new Intl.NumberFormat({ style: 'currency', currency: 'VND' }).format(objProduct[i].price)} VND </span> <span style="color:red;"><b>${new Intl.NumberFormat( { style: 'currency', currency: 'VND' }).format(objProduct[i].salePrice)} VND</b></span></h5>
                                <h5>
                                </h5>
                            </div>
                        </div>
                    </div>
                `)
            
            }
            
        }
    })
});


