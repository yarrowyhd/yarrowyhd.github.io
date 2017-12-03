var Data = [
  /*
  * top 节点数据只有 title, children
  * bottom 节点数据有 title, href
  */

  /*
  * HTML+CSS 学习
  */
  {
    title: "HTML+CSS 学习",
    children: [
      {
        title: "九牧网页",
        href: "pracitise/HTML+CSS/九牧网页/index.html"
      },
      {
        title: "小米首页",
        href: "pracitise/HTML+CSS/小米首页/index.html"
      },
       {
        title: "图片翻转",
        href: "pracitise/HTML+CSS/图片翻转/index.html"
      },
       {
        title: "太阳系",
        href: "pracitise/HTML+CSS/太阳系/index.html"
      },
       {
        title: "跳动的心",
        href: "pracitise/HTML+CSS/跳动的心/index.html"
      },
      {
        title: "立体导航栏",
        href: "pracitise/HTML+CSS/立体导航栏/index.html"
      },
      {
        title: "立方体",
        href: "pracitise/HTML+CSS/立方体/index.html"
      },
      {
        title: "钟表",
        href: "pracitise/HTML+CSS/钟表/index.html"
      }
      
    ],
  },
  /*
  * javascript学习
  */
  {
    title: "javascript 学习",
    children: [
      {
        title: "手风琴效果",
        href: "pracitise/javascript/手风琴效果/index.html"
      },
      {
        title: "放大镜",
        href: "pracitise/javascript/放大镜/index.html"
      },
      {
        title: "旋转轮播图",
        href: "pracitise/javascript/旋转轮播图/index.html"
      },
      {
        title: "歌曲管理",
        href: "pracitise/javascript/歌曲管理/index.html"
      },
      {
        title: "祝愿墙",
        href: "pracitise/javascript/祝愿墙/index.html"
      },
      {
        title: "突出显示",
        href: "pracitise/javascript/突出显示/index.html"
      },
      {
        title: "tab栏切换",
        href: "pracitise/javascript/tab栏切换/index.html"
      }
      
    ],
  },
  /* 
  * mobile 学习
  */
  {
    title: "mobile 学习",
    children: [
      {
        title: "仿京东移动站",
        href: "pracitise/mobile/仿京东移动站/index.html"
      },
      {
        title: "bootstrap网页",
        href: "pracitise/mobile/用bootstrap仿网页/index.html"
      }
    ],
  },
  /* 
  * ajax 学习
  */
  {
    title: "ajax 学习",
    children: [
      {
        title: "加载图片",
        href: "pracitise/ajax/加载图片/index.html"
      },
      {
        title: "瀑布流",
        href: "pracitise/ajax/瀑布流/index.html"
      }
    ],
  },
  /*
  * Deom
  */
  {
    title: "Deom",
    children: [
      {
        title: "仿天猫商城",
        href: "demo/天猫/index.html"
      },
      {
        title: "五子棋",
        href: "demo/小游戏/fiveChess/index.html"
      },
      {
        title: "飞翔的小鸟",
        href: "demo/小游戏/FlayBirds/index.html"
      },
      {
        title: "鼠标移动炫彩小球",
        href: "demo/小游戏/globule/index.html"
      },
      {
        title: "贪吃蛇",
        href: "demo/小游戏/snak/2/index.html"
      },
      {
        title: "日历",
        href: "demo/小游戏/TimeNew/index.html"
      },
      {
        title: "仿豆瓣一刻APP",
        href: "demo/Yike/index.html"
        
      }
    ],
  }
];


function show(ev, self) {
  ev.stopPropagation();
  var isShow = self.getAttribute('data-show'),
      bottom = self.parentNode.nextElementSibling,
      children = self.parentNode.parentNode.children[1];
  if (children.length == 0) {
    return false;
  }

  if (isShow == "true") {
    self.setAttribute("data-show", false);
    // self.className = "t-icon l";
    bottom.style.display = "none";
  } else {
    self.setAttribute("data-show", true);
    // self.className = "t-icon t";
    bottom.style.display = "block";
  }
  
}

(function() {
  window.onload = function() {
    var topTitLength = Data.length,
        topUl = document.querySelector('#list .top');

    for (var i = 0; i < topTitLength; i++) {
      var str = '';
      if (Data[i].children.length == 0) {
        topUl.innerHTML = topUl.innerHTML + '<li class="t-li">' +
            '<div class="t-box clearfix">' +
                // '<i class="t-icon l" data-show="false" onclick="show(event, this)"></i>' +
                '<span class="t-title" data-show="false" onclick="show(event, this)">HTML+CSS 学习</span>' +
            '</div>' +
        '</li>';
      } else {

        for (var j = 0; j < Data[i].children.length; j++) {
          str = str + '<li><a href="' + Data[i].children[j].href + '">' + Data[i].children[j].title + '</a></li>';
        }

        topUl.innerHTML = topUl.innerHTML + '<li class="t-li">' +
            '<div class="t-box clearfix">' +
                // '<i class="t-icon l" data-show="false" onclick="show(event, this)"></i>' +
                '<span class="t-title" data-show="false" onclick="show(event, this)">' + Data[i].title + '</span>' +
            '</div>' + 
            '<ul class="bottom">' +
            str +
            '</ul>' +
        '</li>';
      } 
    }
  }
})()
