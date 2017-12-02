window.onload = function () {
    /*
        日历
        1、判断年份是闰年还是平年，从而判断2月份是29天还是28天
        2、定义数组1~12月，每月多少天
        3、定位当前月份第一天是星期几
        4、多余部分置空
        5、月份动态加载，点解可动态改变每月对应的日历
        6、年份下拉框，点击那一年，动态改变那一年日历的变化
     */  
    
    //当前日期
    var currentDate = new Date();
    var cyear = currentDate.getFullYear();
    var cmonth = currentDate.getMonth();
    var cdate =  currentDate.getDate();

    //今日日期
    var oDate = new Date();
    var year =  oDate.getFullYear();  // 年
    var month =  oDate.getMonth();  // 月( 0-11 )
    var date =  oDate.getDate();  // 日


    // 获得选择的年份
    var selectYear = document.querySelector('.year select');
    // alert(selectYear.value);
    selectYear.onclick=function () {
        var indexy=selectYear.selectedIndex;
        var yearval=selectYear.options[indexy].text;
        // datas[0].innerHTML=+yearval+"-";
        // alert(yearval);
        console.log(yearval);
        addMonth(yearval);
        addCalendar(yearval,0);

        //记录此刻点击的年份
        currentDate.setYear(yearval);
        currentDate.setMonth(0);
        //把当年年setYear后再addSchedule才起作用
        addSchedule(currentDate);
    }



    
    /**
     * @summary 通过遍历动态生成日历月份主体表格 并 加数据。
     * @desc 生成 6*2 表格，加入DOM树，形成日历月份区域。
     *       通过月份的数值和当前月的比较来 加样式突出显示
     */
    //定义一个数组，里面包含月份的文本信息
    var months = new Array(0,1,2,3,4,5,6,7,8,9,10,11);

    function addMonth(cyear) {
        //获取月份部分Node
        var monthTable = document.getElementById("monthTable");

        while(monthTable.firstChild) {
                monthTable.removeChild(monthTable.firstChild);
        }
        for(var i=0; i<6; i++) {
            var monthTr = document.createElement("tr");//表格的行
            for(var j=0; j<2; j++) {
                //单元格自然序列号
                var tdIndex = i*2+j;
                var monthTd = document.createElement("td");//表格的列
                //填充月份
                // alert(months[tdIndex]);
                monthTd.innerHTML = months[tdIndex] + 1 + "月";
                // monthTr.setAttribute("class","MonthTrClass");
                
                //判断,如果选择的年份不是现在现实生活的年就让1月 加红色
                //如果是现实生活的年份，就判断月份是不是现在的月，是就加颜色
                if(cyear != year) {
                    if(months[tdIndex] == 0) {
                       monthTd.setAttribute("class","todayMonth");
                    }
                    
                } else {
                    if(months[tdIndex] == month) {
                        // alert(month);
                        monthTd.setAttribute("class","todayMonth");
                        monthTd.setAttribute("id","newId");
                    }
                }

                monthTd.onclick = function(ev) {
                    var ev = ev || window.event;
                    //改变事件对象目标
                    var ev = ev.target;
                    var cls = ev.className;
                    // n为获取的月份，形如“1月”“2月”等
                    var n = this.innerHTML;
                    // alert(this);
                    //做判断，如果月份的长度是2，就是形如“1月”“2月”等，截取“第一位”字符传递
                    //如果月份的长度是3，就是形如“10月”“11月”等，截取“前2位”字符传递
                    if(n.length == 2) {
                       var m = n.substring(0,1);
                    } else {
                        m = n.substring(0,2);
                    }
                    // alert(m);
                    //月份是0-11，所以要减一
                    //点击某月，对应某月的日历
                    addCalendar(cyear,m-1);
                    //改变展示区域
                    var yy = document.querySelectorAll("#monthTable td");
                    for(var i=0; i<yy.length;i++) {
                        yy[i].className="";
                    }
                    //让点击的月份变色
                    this.setAttribute("class","todayMonth");
                    
                    //如果点击的月份 和 此时此刻的月份不相等，就给天数 赋值1，在显示信息区域显示为几月1号
                    if(m != month) {
                        currentDate.setDate(1);
                        currentDate.setMonth(m-1);
                        addSchedule(currentDate);
                    }
                    // this.setAttribute("id","monthId");
                    // alert(m);
                }
                monthTr.appendChild(monthTd);
            }
            monthTable.appendChild(monthTr);
        }
    }


    /**
    * @summary 根据日历首位日期，生成日历主体表格
    * @desc 首位日期指：当前年份月份的一号的位置。
    * 生成 5*7 或 6*7表格，加入DOM树，形成日历的主体日期区域。
    * 
    * @param {month} 开始传递现实生活的当前月份，之后点击那月，传递那一月
    */
    function addCalendar(cyear,cmonth) {
        // alert(cyear + "/" + cmonth);
         //获取月份部分Node
        var calendarTable = document.getElementById("calendarTable");
        //若不是第一次生成，则需要把此前生成的日历去掉
        while(calendarTable.firstChild) {
                calendarTable.removeChild(calendarTable.firstChild);
        }
         // 获取当月第1天是星期几
            var firstDay = (new Date(cyear, cmonth, 1)).getDay();
            // alert(firstDay);
            // 判断是否是闰年(29) 平年(28)
            function isLeapYear() {
                if(((cyear % 4)==0) && ((cyear % 100)!=0) || ((cyear % 400)==0)) {
                    return 1;
                } else {
                    return 0;
                }
            }

            // 获取每个月的天数
            var monthDaysArr = [31, 28+isLeapYear(), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            // 计算行数
            var rows =  Math.ceil((monthDaysArr[cmonth] + firstDay) / 7);
            // alert(monthDaysArr[1]);
       
        for(var i=0; i<rows; i++) {
            var calendarTr = document.createElement("tr");//表格的行
            // 表格每行的单元格填充
            for(var j=0; j<7; j++) {
                var calendarTd = document.createElement("td"); //列
                // if(j!=0 && j!=6) {
                //     calendarTd.setAttribute("class","null");
                // } else {
                //     calendarTd.setAttribute("class","date");
                // }

                // 单元格自然序列号
                var tdIndex1 = i*7+j; 

                // 计算日期
                var fillDate = tdIndex1-firstDay+1;
                // fillDate.setAttribute = {"id",calendarId};
                // 过滤无效日期（小于等于零的、大于月总天数的）
                if(fillDate<=0 || fillDate>monthDaysArr[cmonth]) {
                   fillDate=""; 
                } else {
                    fillDate = tdIndex1-firstDay+1; 
                    
                    //如果月份不等于现实的本月 就给 1号加红突出显示 
                    if(cmonth != month) {

                        //如果填充日期==现在的日期，就 加红突出显示
                        if(fillDate == 1) {
                            calendarTd.innerHTML = fillDate + "号";
                            calendarTd.setAttribute("class","todayMonth");
                        } else {
                            calendarTd.innerHTML = fillDate + "号";
                        }
                    } else {

                        //如果填充日期==现在的日期，就 加红突出显示
                        if(fillDate == date) {
                            calendarTd.innerHTML = fillDate + "号";
                            calendarTd.setAttribute("class","todayMonth");
                        } else {
                            calendarTd.innerHTML = fillDate + "号";
                        }
                    }
                    
                }

                 calendarTd.onclick = function(ev) {
                    var ev = ev || window.event;
                    //改变事件对象目标
                    var ev = ev.target;
                    var cls = ev.className;
                    // n为获取的月份，形如“1月”“2月”等
                    // alert(this);
                    // this.className="todayMonth";
                    var cc = document.querySelectorAll("#calendartable td");
                
                    for(var i=0; i<cc.length;i++) {
                    
                            cc[i].className="";
                    }

                    this.className="todayMonth";
                    // alert(cyear+"/"+ cmonth+"/" +fillDate);
                    

                    //点击那天，对应显示那天日期
                    var someday;
                    if(this.innerHTML.length == 2) {
                       someday = this.innerHTML.substring(0,1);
                    } else {
                        someday = this.innerHTML.substring(0,2);
                    }
                    // alert(cmonth+"/"+someday);
                    currentDate.setMonth(cmonth);
                    currentDate.setDate(someday);
                    addSchedule(currentDate);
                }

                calendarTr.appendChild(calendarTd);
            }
            calendarTable.appendChild(calendarTr);
        }
    }


    /**
     * @summary 得到new Date()日期对象，进行展示
     * @desc 先得到初始化对象，然后分别获取 本地日期字符串、星期，和多少号。
     * @param {[oDate}  new Date()日期对象
     */
    function addSchedule(oDate) {
        // alert(oDate);
        var dateInfo = oDate.toLocaleDateString(); //获取YYYY/MM/DD格式的日期
        // alert(dateInfo);
        var dayNum = oDate.getDate(); //获取日期号数
        // alert(dayNum);
        var weekInfo = oDate.getDay(); //获取星期
        var weekArray = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        document.getElementById("dateInfo").innerText = dateInfo; //DOM操作日期
        document.getElementById("dateNum").innerHTML = dayNum.toString(); //DOM操作号数
        document.getElementById("weekInfo").innerText = weekArray[weekInfo];
    }


    //“回到今天”切换按钮
    var backToday = document.getElementById("backToday");
    backToday.onclick=function () {
        addMonth(year);  //让月份颜色回去
        addCalendar(year,month);  //日历动态变回今天
        addSchedule(oDate);  //日程的到今天年 月 日信息
        document.getElementById('selectYear').value =2017; 
        // alert(xx);
    }

    //初始化页面
    addMonth(cyear);
    addCalendar(cyear,cmonth);

    addSchedule(currentDate);
}