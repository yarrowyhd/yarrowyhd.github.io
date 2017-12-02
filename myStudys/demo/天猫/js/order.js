
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



var deleteOrder = false;
var deleteOrderid = 0;

$(function(){
    $("a[orderStatus]").click(function(){
        var orderStatus = $(this).attr("orderStatus");
        if('all'==orderStatus){
            $("table[orderStatus]").show();
        }
        else{
            $("table[orderStatus]").hide();
            $("table[orderStatus="+orderStatus+"]").show();
        }

        $("div.orderType div").removeClass("selectedOrderType");
        $(this).parent("div").addClass("selectedOrderType");
    });

    $("a.deleteOrderLink").click(function(){
        deleteOrderid = $(this).attr("oid");
        deleteOrder = false;
        $("#deleteConfirmModal").modal("hide");
    });

    $("button.deleteConfirmButton").click(function(){
        deleteOrder = true;
        $("#deleteConfirmModal").modal('hide');
    });

    $('#deleteConfirmModal').on('hidden.bs.modal', function (e) {
        if(deleteOrder){
            var page="foredeleteOrder";
            if(false)$.post(
                page,
                {"oid":deleteOrderid},
                function(result){
                    if("success"==result){
                        $("table.orderListItemTable[oid="+deleteOrderid+"]").hide();
                    }
                    else{
                        location.href="login.jsp";
                    }
                }
            );

        }
    })

    $(".ask2delivery").click(function(){
        var link = $(this).attr("link");
        $(this).hide();
        page = link;
        $.ajax({
            url: page,
            success: function(result){
                alert("卖家已秒发，刷新当前页面，即可进行确认收货")
            }
        });

    });
});


