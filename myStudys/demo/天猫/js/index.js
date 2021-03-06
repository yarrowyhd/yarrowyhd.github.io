window.onload=function () {
    function formatMoney(num){
        num = num.toString().replace(/\$|\,/g,'');
        if(isNaN(num))
            num = "0";
        sign = (num == (num = Math.abs(num)));
        num = Math.floor(num*100+0.50000000001);
        cents = num%100;
        num = Math.floor(num/100).toString();
        if(cents<10)
            cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
            num = num.substring(0,num.length-(4*i+3))+','+
                num.substring(num.length-(4*i+3));
        return (((sign)?'':'-') + num + '.' + cents);
    }
    function checkEmpty(id, name){
        var value = $("#"+id).val();
        if(value.length==0){

            $("#"+id)[0].focus();
            return false;
        }
        return true;
    }

    $(function(){

        $("a.productDetailTopReviewLink").click(function(){
            $("div.productReviewDiv").show();
            $("div.productDetailDiv").hide();
        });
        $("a.productReviewTopPartSelectedLink").click(function(){
            $("div.productReviewDiv").hide();
            $("div.productDetailDiv").show();
        });

        $("span.leaveMessageTextareaSpan").hide();
        $("img.leaveMessageImg").click(function(){

            $(this).hide();
            $("span.leaveMessageTextareaSpan").show();
            $("div.orderItemSumDiv").css("height","100px");
        });

        $("div#footer a[href$=#nowhere]").click(function(){
            alert("模仿天猫的连接，并没有跳转到实际的页面");
        });

        $("a.wangwanglink").click(function(){
            alert("模仿旺旺的图标，并不会打开旺旺");
        });
        $("a.notImplementLink").click(function(){
            alert("这个功能没做，蛤蛤~");
        });

    });
}

$(function(){
    $("div.eachCategory").mouseenter(function(){
        var cid = $(this).attr("cid");
        $("div.productsAsideCategorys[cid="+cid+"]").show();
    });
    $("div.eachCategory").mouseleave(function(){
        var cid = $(this).attr("cid");
        $("div.productsAsideCategorys[cid="+cid+"]").hide();

    });

    $("div.productsAsideCategorys").mouseenter(function(){
        $(this).show();
    });

    $("div.productsAsideCategorys").mouseleave(function(){
        $(this).hide();
    });

    $("div.rightMenu span").mouseenter(function(){
        var left = $(this).position().left;
        var top = $(this).position().top;
        var width = $(this).css("width");
        var destLeft = parseInt(left) + parseInt(width)/2;
        $("img#catear").css("left",destLeft);
        $("img#catear").css("top",top-20);
        $("img#catear").fadeIn(500);

    });
    $("div.rightMenu span").mouseleave(function(){
        $("img#catear").hide();
    });

    var left = $("div#carousel-of-product").offset().left;
    $("div.categoryMenu").css("left",left-20);
    $("div.categoryWithCarousel div.head").css("margin-left",left);
    $("div.productsAsideCategorys").css("left",left-20);

});


$(function(){
    $("div.productsAsideCategorys div.row a").each(function(){
        var v = Math.round(Math.random() *6);
        if(v == 1)
            $(this).css("color","#87CEFA");
    });
});