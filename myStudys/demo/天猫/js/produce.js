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
    var stock = 66;
    $(".productNumberSetting").keyup(function(){
        var num= $(".productNumberSetting").val();
        num = parseInt(num);
        if(isNaN(num))
            num= 1;
        if(num<=0)
            num = 1;
        if(num>stock)
            num = stock;
        $(".productNumberSetting").val(num);
    });

    $(".increaseNumber").click(function(){
        var num= $(".productNumberSetting").val();
        num++;
        if(num>stock)
            num = stock;
        $(".productNumberSetting").val(num);
    });
    $(".decreaseNumber").click(function(){
        var num= $(".productNumberSetting").val();
        --num;
        if(num<=0)
            num=1;
        $(".productNumberSetting").val(num);
    });

    $(".addCartLink").click(function(){
        var page = "forecheckLogin";
        if(false)$.get(
            page,
            function(result){
                if("success"==result){
                    var pid = 819;
                    var num= $(".productNumberSetting").val();
                    var addCartpage = "foreaddCart";
                    if(false)$.get(
                        addCartpage,
                        {"pid":pid,"num":num},
                        function(result){
                            if("success"==result){
                                $(".addCartButton").html("已加入购物车");
                                $(".addCartButton").attr("disabled","disabled");
                                $(".addCartButton").css("background-color","lightgray")
                                $(".addCartButton").css("border-color","lightgray")
                                $(".addCartButton").css("color","black")

                            }
                            else{

                            }
                        }
                    );
                }
                else{
                    $("#loginModal").modal('hide');
                }
            }
        );
        return false;
    });
    $(".buyLink").click(function(){
        var page = "forecheckLogin";
        if(false)$.get(
            page,
            function(result){
                if("success"==result){
                    var num = $(".productNumberSetting").val();
                    location.href= $(".buyLink").attr("href")+"&num="+num;
                }
                else{
                    $("#loginModal").modal('hide');
                }
            }
        );
        return false;
    });

    $("button.loginSubmitButton").click(function(){
        var name = $("#name").val();
        var password = $("#password").val();

        if(0==name.length||0==password.length){
            $("span.errorMessage").html("请输入账号密码");
            $("div.loginErrorMessageDiv").show();
            return false;
        }

        var page = "foreloginAjax";
        if(false)$.get(
            page,
            {"name":name,"password":password},
            function(result){
                if("success"==result){
                    location.reload();
                }
                else{
                    $("span.errorMessage").html("账号密码错误");
                    $("div.loginErrorMessageDiv").show();
                }
            }
        );

        return true;
    });

    $("img.smallImage").mouseenter(function(){
        var bigImageURL = $(this).attr("bigImageURL");
        $("img.bigImg").attr("src",bigImageURL);
    });

    $("img.bigImg").load(
        function(){
            $("img.smallImage").each(function(){
                var bigImageURL = $(this).attr("bigImageURL");
                img = new Image();
                img.src = bigImageURL;

                img.onload = function(){
                    console.log(bigImageURL);
                    $("div.img4load").append($(img));
                };
            });
        }
    );
});