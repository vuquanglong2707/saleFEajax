var API_ENDPOINT = 'http://localhost:3980';
var shop_token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjE0MjgxNTkzLCJleHAiOjE2MTQ4ODYzOTN9.b6nHQlOHFe34NO9ZHql2ZSFRdgjtCBeXNTVEemgWnVcBK0lbA_E6WmDKlO14kJ-KJ7L1bd2Ws6P_FcvkLJJrQA';

var Password = {
 
    _pattern : /[a-zA-Z0-9_\-\+\.]/,
    
    
    _getRandomByte : function()
    {
      // http://caniuse.com/#feat=getrandomvalues
      if(window.crypto && window.crypto.getRandomValues) 
      {
        var result = new Uint8Array(1);
        window.crypto.getRandomValues(result);
        return result[0];
      }
      else if(window.msCrypto && window.msCrypto.getRandomValues) 
      {
        var result = new Uint8Array(1);
        window.msCrypto.getRandomValues(result);
        return result[0];
      }
      else
      {
        return Math.floor(Math.random() * 256);
      }
    },
    
    generate : function(length)
    {
      return Array.apply(null, {'length': length})
        .map(function()
        {
          var result;
          while(true) 
          {
            result = String.fromCharCode(this._getRandomByte());
            if(this._pattern.test(result))
            {
              return result;
            }
          }        
        }, this)
        .join('');  
    }    
      
  };
var retrievedObject = localStorage.getItem('shop_cart');
var data_cart=JSON.parse(retrievedObject).data;
console.log("data cart",data_cart)
let cart= {data: [{'productId': 0,
    'property': "",
    'quantity': 0,
    'variation': ""
   }],}
$(document).ready(function() {
    $.ajax({
        url: API_ENDPOINT + '/api/product/getmax',
        type: 'GET',
        dataType: 'json',
        headers:{'Authorization':shop_token},
        success: function(data) {
            objProduct = data.data;
            var total_product=0;
            var total_quantity=0;
        
            for(var i=0;i<objProduct.length;i++){
                // console.log(objProduct[i].id)
                for(var j=0;j<data_cart.length;j++){ 
                    
                    if(objProduct[i].id==data_cart[j].id){
                        var input_data={'quantity':data_cart[j].quatities,'productId':data_cart[j].id,'variation':data_cart[j].variation,'property':data_cart[j].properties}   
                        cart.data.push(input_data)
                        console.log(objProduct[i].name)
                        total_quantity=total_quantity+1;
                        total_product=total_product+parseInt(objProduct[i].salePrice)*parseInt(data_cart[j].quatities)
                    }
                }
            }
            // console.log("order detail :",cart.data)
            // console.log("order detail :",cart.data.length)
            localStorage.setItem('cart', JSON.stringify(cart));
           
            $("#total_quantity").val(total_quantity)
            $("#total_quantity").append(`
                ${total_quantity} 
            `);
            $("#total_product").val(total_product)
            $("#total_product").append(`
                ${total_product} VND
            `);
            $("#total_money").val(total_product+50000)
            $("#total_money").append(`
            ${total_product+50000} VND
        `);
        }
    })
});

var dataRece = JSON.parse(localStorage.getItem('cart')).data;
if(dataRece.length>1){
    dataRece = dataRece.filter(person => person.productId != 0);
    console.log("lọc data:",dataRece)
}

$('.submit_customer').on('click', function() {
    var invoice = {      
        "cash_money": 0,
        "discount_money": 0,
        "discount_percent": 0,
        "codeOrder":$('#codeOrders').val(),
        "paid_money": $('#total_quantity').val(),
        "total_money":$('#total_quantity').val(),
        "address":  $('#address').val(),
        "district_id":  $('#district').val(),
        "province_id":$('#province').val(),
        "ward_id":$('#ward').val(),
        "order_status":1,
        "createdBy": "long",
        "createdDate": "2021-02-02T09:41:53.000+0000",
        "modified_by": "thuy",
        "modifiedDate": "2021-02-02T09:42:00.000+0000",
        "customer_name": $('#nameCustomer').val(),
        "customer_phone": $('#phoneCustomer').val(),
        "dtoOrderDetails": dataRece
    }
    $.ajax({
      url: API_ENDPOINT +'/api/orders/ins',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(invoice),
      headers:{'Authorization':shop_token},
      success: function(data) {
          console.log(data);
          location.reload();
          alert("Đăng ký mua hàng thành công !");
        
      },
      error: function(error) {
          console.log(error);
          alert("Bạn cần nhập đủ thông tin !");
      }
    });
    localStorage.removeItem("shop_cart");
    localStorage.removeItem("cart");
  })