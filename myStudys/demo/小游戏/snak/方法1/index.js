window.onload = function(){
	var snakeBodyArray = [],// 蛇的肢体列表
		parts = [],// 蛇分成的几段
		container = document.getElementById("container");
		// console.log(container);
		moveInterval = 500;// 移动时间间隔（单位：ms）


    //分数的id
    var score = document.getElementById("score");
    //初始化分数为0
    var scoreNum = 0;
    
    
    
	/**
	 * 操作食物模块
	 */
	  var foodModule = (function(){
		var food = document.createElement("div");
		food.className = "food";
		
		// 添加到 body
		container.appendChild(food);
		
		var foodStyle = food.style;
		
		return {
			setFoodPosition: function(x, y){
				foodStyle.left = x;
				foodStyle.top = y;
			},
			showFood: function(show){
				if(show){
					foodStyle.display = "block";
				}else{
					foodStyle.display = "none";
				}
			},
			isShow: function(){
				return foodStyle.display === "block" ? true : false;
			},
			getFood: function(){
				return food;
			}
		};
	})(document, container);
	
	// 初始化蛇身体
	function initSnake(){
		score.innerHTML="";
		// 删掉蛇的肢体
		var snakes = document.getElementsByClassName("snake");
		for(var s=snakes.length-1;s>=0;s--){
			if(snakes[s]){				
				snakes[s].parentNode.removeChild(snakes[s]);	

			}
		}
		snakeBodyArray = [];
		// 删掉蛇的所有段
		parts = [];
		
		// 隐藏食物
		foodModule.showFood(false);
		
		for(var i=0;i<4;i++){
			// 默认 4 节
			var snakeBody = document.createElement("div");
			snakeBody.style.left = "205px";
			snakeBody.style.top = "205px";
			snakeBody.className = "snake";
			container.appendChild(snakeBody);
			snakeBodyArray.push(snakeBody);
			
			// 默认一段，往左走
			parts.push({
				direction: -1,
				length: 4
			});
			// console.log(parts);
			// console.log(snakeBodyArray);
		}

		// 初始化蛇的肢体位置(实现初始时生成的snake的div一次往后排)
		snakeBodyArray.reduce(function(previous, current){
			if(current != snakeBodyArray[0]){
				current.style.left = (previous.offsetLeft + previous.offsetWidth) + "px";
			}else{
				current.style.left = current.offsetLeft + "px";
			}
			return current;
		}, snakeBodyArray[0]);
	}

	initSnake();
	
	// 走起
	setTimeout(function(){
		
		/**
		 * 把最后一段中的一节挪到第一段最前面
		 * 
		 */
		var lastBody = snakeBodyArray.pop(),
			// 删除最后一个病返回该元素
			lastBodyStl = lastBody.style,
			direction = parts[0].direction,
			firstBody = snakeBodyArray[0];
			
		// 根据蛇前进方向设置肢体位置
		if(direction == -1){
			lastBodyStl.left = firstBody.offsetLeft - firstBody.offsetWidth + "px";
			lastBodyStl.top = firstBody.offsetTop + "px";
		}else if(direction == 1){
			lastBodyStl.left = firstBody.offsetLeft + firstBody.offsetWidth + "px";
			lastBodyStl.top = firstBody.offsetTop + "px";
		}else if(direction == -2){
			lastBodyStl.top = firstBody.offsetTop - firstBody.offsetHeight + "px";
			lastBodyStl.left = firstBody.offsetLeft + "px";
		}else if(direction == 2){
			lastBodyStl.top = firstBody.offsetTop + firstBody.offsetHeight + "px";
			lastBodyStl.left = firstBody.offsetLeft + "px";
		}
		
		// 把最后一段中的一节设置为蛇头
		snakeBodyArray.unshift(lastBody);
		
		// 第一段由于蛇尾添加到第一个位置，这段的肢体数量 + 1
		parts[0].length = parts[0].length + 1;
		
		// 判断最后一段长度，若为 0，删除之
		if(parts[parts.length - 1].length == 0){
			parts.pop();
		}
		
		// 是否吃到食物
		if(foodModule.isShow()){			
			if(foodModule.getFood().offsetLeft == lastBody.offsetLeft &&
			   foodModule.getFood().offsetTop == lastBody.offsetTop){
				// 隐藏食物
				foodModule.showFood(false);
				
				// 给蛇新增一节
				var snakeHead = document.createElement("div");
				snakeHead.style.left = "-1000px";
				snakeHead.style.top = "-1200px";
				snakeHead.className = "snake";
				container.appendChild(snakeHead);
				snakeBodyArray.push(snakeHead);
				
				parts[parts.length-1].length += 1;
				 scoreNum += 10;
            //写入到score中
            	score.innerHTML =scoreNum;
			}
		}
		
		// 是否碰壁
		
		//
			if(lastBody.offsetLeft <= 3|| lastBody.offsetLeft + lastBody.offsetWidth >= container.clientWidth-5 ||
			   lastBody.offsetTop <= 3 || lastBody.offsetTop + lastBody.offsetHeight >= container.clientHeight-5){
				if(direction == -1){
					snakeBodyArray[0].style.left=0;
				}else if(direction == 1){
					snakeBodyArray[0].style.left=880;
				}else if(direction == -2){
					snakeBodyArray[0].style.top=0;
				}else if(direction == 2){
					snakeBodyArray[0].style.top=480;
				}
				alert("You're dead! Please restart.");
				initSnake();
			
		}
		// 是否咬到自己
		for(var i=0,len=snakeBodyArray.length;i<len;i++){
			if(i !== 0){
				if(snakeBodyArray[i].offsetLeft == lastBody.offsetLeft && 
				   snakeBodyArray[i].offsetTop == lastBody.offsetTop){
					alert("You're dead!Please restart.");
					initSnake();
				}
			}
		}
		
		setTimeout(arguments.callee, moveInterval);
	}, moveInterval);
	
	/**
	 * 蛇拐弯，添加一段
	 * parts 蛇分成的几段
	 * direction 即将拐弯的方向 -1：左 1：右 -2：上 2：下
	 */
	function addPart(parts, direction){
		var dir = parts[0].direction;
		if(dir != direction && dir != -direction){
			parts.unshift({
				direction: direction,
				length: 0
			});
		}
	}
	
	// 按下方向键
	document.onkeydown = function(event){
		var e = event || window.event || arguments.callee.caller.arguments[0];
		if(e && e.keyCode == 37){ 
			// 向左 
			addPart(parts, -1);
		}else if(e && e.keyCode == 38){ 
			// 向上
			addPart(parts, -2);
		}else if(e && e.keyCode == 39){ 
			// 向右
			addPart(parts, 1);
		}else if(e && e.keyCode == 40){ 
			// 向下 
			addPart(parts, 2);
		}
		
		// 
		moveInterval = moveInterval - 3;
	}
	
	// 松开方向键
	document.onkeyup = function(event){
		moveInterval = 500;
	}
	
	/**
	 * 生成食物的投放位置
	 * snakeBodyArray 蛇肢体列表
	 * .substring(2,4);表示提取字符串中第2个位置开始到第三位的两个数。参数1
	 * 表示开始位置，参数2比结束位置多1
	 * .random；0-1之间的随机数
	 * 
	 */
	function generateFoodPoint(snakeBodyArray){
		var snakeHead = snakeBodyArray[0];
		// 食物的横坐标
		var x = parseInt((Math.random() + "").substring(2, 4));
		if(parseInt((Math.random() + "").substring(2, 3)) >= 5){
			x = -x;
		}
		x = snakeHead.offsetWidth * x + snakeHead.offsetLeft;
		
		// 食物的纵坐标
		var y = parseInt((Math.random() + "").substring(2, 4));
		if(parseInt((Math.random() + "").substring(2, 3)) >= 5){
			y = -y;
		}
		y = snakeHead.offsetHeight * y + snakeHead.offsetTop;
			
		// 不能与蛇接触
		for(var s of snakeBodyArray){
			if(x == s.offsetLeft && y == s.offsetTop){
				return arguments.callee.call(null, snakeBodyArray);
			}
		}
		
		// 不能超出浏览器可视窗口
		if(x < 0 || x + snakeHead.offsetWidth > container.clientWidth || 
		   y < 0 || y + snakeHead.offsetHeight > container.clientHeight){
			return arguments.callee.call(null, snakeBodyArray);
		}
		
		return {
			x: x,
			y: y
		};
	}
	
	// 定时投放食物
	setTimeout(function(){
		if(!foodModule.isShow()){			
			var foodPoint = generateFoodPoint(snakeBodyArray);
			foodModule.setFoodPosition(foodPoint.x + "px", foodPoint.y + "px");
			foodModule.showFood(true);
		}
		setTimeout(arguments.callee, 500);
	}, 500);

	var stop = document.getElementById("stop");
	var reset = document.getElementById("reset");
	stop.onclick=function(){
		
	}
	reset.onclick=function(){
		initSnake();
	}
};
