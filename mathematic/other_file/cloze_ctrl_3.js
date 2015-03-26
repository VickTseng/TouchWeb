/**
 * @author wei
 */
	var touchLayer = document.getElementById('touchLayer');
	var cre = new create();	//宣告以create之物件
	var o = document.body; 
	var blockMap = new Object(); //用來監控物件狀態
	var blockArray = new Array(); //儲存每個block
	var obj_Array = new Array(); //存放圖像物件
	var answer, answer2; //存放所做之答案
	var question; //存放題目
	var n1,n2,n3,n4,n5,n6,n7,n8,o1,o2,o3,o4,c1,c2,row1_sum,row2_sum;	//存放數字和運算子
	var c1, c2; //第一列空格
	var c3, c4 ,c5;//第二列空格
	var n4=null, n5=null;
	var trans = false;
	var start_conbine1 = false, start_conbine2 = false, start_conbine3 = false;	//判斷是否開始合併數字
	var sum1 = " ",sum2 = " ", sum3 = " "; 	//合併數字初值
	var sym1="",sym2="",sym3="";	//儲存運算子

	for(var i=0, a="block", b="b";i<=47;i++){	//創造物件
		var temp = a + i.toString(), temp2 = b + i.toString();
		if(i==30 || i==31 || i==32){
			continue;
		}
		eval("var block"+i+"=$('#block"+i+"').get("+0+")");
		eval("block"+i+".offset="+"{x:"+0+", y:"+0+"}");
		eval("block"+i+".x="+0);
		eval("block"+i+".y="+0);
		eval("block"+i+".identifier");
		eval("block"+i+".id="+"temp");
		eval("block"+i+".genname="+"temp2");
		eval("block"+i+".text="+i%10);
		eval("block"+i+".obj="+"$('#block"+i+"')");
	}
	
	for(var q=1; q<=3; q++){	//創造合併後數字物件
		var temp = "combine_number"+q.toString(), temp2 = "c"+q.toString();
		eval("var comb"+q+"=$('#combine_number"+q+"').get(0)");
		eval("comb"+q+".offset="+"{x:"+0+", y:"+0+"}");
		eval("comb"+q+".x="+0);
		eval("comb"+q+".y="+0);
		eval("comb"+q+".identifier");
		eval("comb"+q+".id"+"temp");
		eval("comb"+q+".genname="+"temp2");
		eval("comb"+q+".text");
		eval("comb"+q+".obj="+"$('#combine_number"+q+"')");
	}
	
	for(var q=1; q<=3; q++){	//創造運算子物件
		var temp = "Operator_area"+q.toString(), temp2 = "op"+q.toString();
		eval("var opea"+q+"=$('#operator_area"+q+"').get(0)");
		eval("opea"+q+".offset="+"{x:"+0+", y:"+0+"}");
		eval("opea"+q+".x="+0);
		eval("opea"+q+".y="+0);
		eval("opea"+q+".identifier");
		eval("opea"+q+".id"+"temp");
		eval("opea"+q+".genname="+"temp2");
		eval("opea"+q+".text");
		eval("opea"+q+".obj="+"$('#operator_area"+q+"')");
	}
	
/*	for(var k=30;k<=32;k++){	//將合併數字區歸零
		eval("block"+k+".text =''");
	}*/
	
/*	for(var p=33;p<=44;p++){	//設定block30~block44值為空
		eval("block"+p+".text="+null);
	}*/
	

	
	for(var q=33;q<=44;q++){
		eval("block"+q+".text="+"document.getElementById('block"+q+"').textContent");
	}
	
	
	
	
	for(var h=0;h<=47;h++){		//將物件儲存在陣列中
		if(h==30 || h==31 || h==32){
			continue;
		}
		blockArray[h]=eval('block'+h);
	}
	
	for(var a=1; a<=3;a++){
		blockArray[a+47]=eval("comb"+a);
	}

	for(var b=1; b<=3;b++){
		blockArray[b+50]=eval("opea"+b);
	}
	
	function initial(){	//分配數字
		var operator = new Array("+", "-", "*", "/"); //存放運算子
		
		for(var a=1;a<=8;a++){
			eval("var num"+a+"=Math.round(Math.random()*(15-1)+1)");	//亂數跑固定空格數字
		}
		
		for(var i=1; i<=6; i++){	//跑運算子		which4為第二列正確答案
			eval("var which"+i+"=Math.round(Math.random()*3)");
		}
		
		for(var u=45;u<=47;u++){	//重新載入後，合併數字區歸零
			eval("block"+u+".text="+"''");
		}
		
		for(var h=1;h<=3;h++){
			eval("sum"+h+"=''");
		}
		
		row1_sum = eval("Math.round(num1"+operator[which1]+"num2"+operator[which2]+"num3"+operator[which3]+"num4)");	//第一列計算結果
		row2_sum = eval("Math.round(num5"+operator[which4]+"num6"+operator[which5]+"num7"+operator[which6]+"num8)");	//第二列計算結果
			
		$("#cloze1").html(num1), $("#cloze2").html(num2), $("#cloze4").html(num4), $("#cloze5").html(row1_sum), $("#fixed_box1").html(cre.translateOperator(operator[which1])), $("#fixed_box2").html(cre.translateOperator(operator[which2]));//顯示第一列數字
		$("#cloze6").html(num5), $("#cloze7").html(num6), $("#cloze9").html(num8), $("#cloze10").html(row2_sum), $("#fixed_box7").html(cre.translateOperator(operator[which6]));	//顯示第二列數字
		
		n1 = num1, n2 = num2, n3= num3, n4 = num4, o1 = operator[which1], o2 = operator[which2], o3 = operator[which3];
		n5 = num5, n6 = num6, n7 = num7, n8=num8, o4 = operator[which4], o5 = operator[which5], o6 = operator[which6];
		
		for(var i=0; i<blockArray.length; i++){		//將每個數字丟入DOM當中
			if(i==30 || i==31 || i==32 || i==45 || i==46 || i==47){
				continue;
			}
			blockArray[i].obj.html(blockArray[i].text);
		}
		
		console.log("row one cloze:"+num3+" row one cloze:"+o3);
		console.log("row two cloze:"+o4+" row two cloze:"+o5+" row two cloze:"+num7);
	}
	
	function next(){	//跳下一題
		initial();
		$("#cloze3").html(""), $("#fixed_box3").html(""), $("#true_or_false").html(""), $("#true_or_false2").html("");
		$("#combine_number1").html(""), $("#combine_number2").html(""), $("#combine_number3").html("");
		$("#operator_area1").html(""), $("#operator_area2").html(""), $("#operator_area3").html("");
		c1 = null, c2 = null, c3 = null, c4 = null, c5 = null;
	}
	
	function verify(){
		if(c1 != null && c2 !=null){
			answer = eval("n1"+o1+"n2"+o2+"c1"+c2+"n4");
			if(answer == row1_sum){
				$("#true_or_false").html("○"),$("#true_or_false").css("color","green"),$("#true_or_false").css("font-size",80);
			}else{
				$("#true_or_false").html("×"),$("#true_or_false").css("color","red"),$("#true_or_false").css("font-size",80);
			}
			
		}else{
			$("#true_or_false").html("Please drag the object."),$("#true_or_false").css("color","black"),$("#true_or_false").css("font-size",26);
		}
		
		if(c3 !=null && c4 != null && c5!=null){
			answer2 = eval("n5"+c3+"n6"+c4+"c5"+o6+"n8");
			if(answer2 == row2_sum){
				$("#true_or_false2").html("○"),$("#true_or_false2").css("color","green"),$("#true_or_false2").css("font-size",80);
			}else{
				$("#true_or_false2").html("×"),$("#true_or_false2").css("color","red"),$("#true_or_false2").css("font-size",80);
			}
			
		}else{
			$("#true_or_false2").html("Please drag the object."),$("#true_or_false2").css("color","black"),$("#true_or_false2").css("font-size",26);
		}
		
	}
	
	
		
		
	function touchstart(event){
		event.changedTouches= event.targetTouches;
		console.log(["translate(",event.changedTouches[0].pageX,"px, ",event.changedTouches[0].pageY,"px)"].join(""));	//監控座標
		//console.log("cloze2 X:"+$('#cloze2').offset().left+ " cloze2 Y:"+$('#cloze2').offset().top);
		console.log("trans:"+trans);
		if(event.changedTouches.length>0){	
			for(var i=0; i<blockArray.length; i++){	//判斷每個block
				if(i==30 || i==31 || i==32){continue;}
				for(var j=0; j<event.changedTouches.length; j++){	//判斷被哪隻手指觸碰到					
					if(event.changedTouches[j].target.id == blockArray[i].id){	
						
					if(blockArray[i].id == "block45"){	//清除數字功能
							$("#block45").css("font-family","impact"), $("#combine_number2").html(""), $("#operator_area1").html("");
							sum1 = "",sym1="";
						}else if(blockArray[i].id == "block46"){
							$("#block46").css("font-family","impact"),$("#combine_number1").html(""), $("#operator_area2").html("");
							sum2 = "",sym2="";
						}else if(blockArray[i].id == "block47"){
							$("#block47").css("font-family","impact"), $("#combine_number3").html(""), $("#operator_area3").html("");
							sum3 = "",sym3="";
						}
						
						
						
						if(blockArray[i].obj.parent().attr("id") == "number_area"){	//合併數字
							if(cre.isNumber(blockArray[i].text)){
								sum1 += blockArray[i].text;
								$("#combine_number2").html(sum1);
							}else if(cre.isOperator(blockArray[i].text)){
								sym1 = blockArray[i].text;
								$("#operator_area1").html(blockArray[i].text);
							}
						}else if(blockArray[i].obj.parent().attr("id") == "number_area2"){
							if(cre.isNumber(blockArray[i].text)){
								sum2 += blockArray[i].text;
								$("#combine_number1").html(sum2);
							}else if(cre.isOperator(blockArray[i].text)){
								sym2 = blockArray[i].text;
								$("#operator_area2").html(blockArray[i].text);
							}
							
						}else if(blockArray[i].obj.parent().attr("id") == "number_area3"){
							if(cre.isNumber(blockArray[i].text)){
								sum3 += blockArray[i].text;
								$("#combine_number3").html(sum3);
							}else if(cre.isOperator(blockArray[i].text)){
								sym3 = blockArray[i].text;
								$("#operator_area3").html(blockArray[i].text);
							}
							
						}else if(blockArray[i].id == "combine_number2"){
							blockArray[i].text = sum1;	//將合併數字區值丟入
							cre.createDIV(blockArray[i].text, event.changedTouches[j].pageY, event.changedTouches[j].pageX, blockArray[i].genname);
							blockArray[i].identifier = event.changedTouches[j].identifier;			
							blockArray[i].offset.x = blockArray[i].x - event.changedTouches[j].pageX;
							blockArray[i].offset.y = blockArray[i].y - event.changedTouches[j].pageY;
							blockMap[blockArray[i].identifier] = blockArray[i];
							//console.log("Start: " +blockArray[i].identifier);	
						}else if(blockArray[i].id == "combine_number1"){
							blockArray[i].text = sum2;	//將合併數字區值丟入
							cre.createDIV(blockArray[i].text, event.changedTouches[j].pageY, event.changedTouches[j].pageX, blockArray[i].genname);
							blockArray[i].identifier = event.changedTouches[j].identifier;			
							blockArray[i].offset.x = blockArray[i].x - event.changedTouches[j].pageX;
							blockArray[i].offset.y = blockArray[i].y - event.changedTouches[j].pageY;
							blockMap[blockArray[i].identifier] = blockArray[i];
							//console.log("Start: " +blockArray[i].identifier);	
						}else if(blockArray[i].id == "combine_number3"){
							blockArray[i].text = sum3;	//將合併數字區值丟入
							cre.createDIV(blockArray[i].text, event.changedTouches[j].pageY, event.changedTouches[j].pageX, blockArray[i].genname);
							blockArray[i].identifier = event.changedTouches[j].identifier;			
							blockArray[i].offset.x = blockArray[i].x - event.changedTouches[j].pageX;
							blockArray[i].offset.y = blockArray[i].y - event.changedTouches[j].pageY;
							blockMap[blockArray[i].identifier] = blockArray[i];
							//console.log("Start: " +blockArray[i].identifier);	
						}else if(blockArray[i].id == "operator_area1"){
							blockArray[i].text = sym1;	//將合併數字區值丟入
							cre.createDIV(blockArray[i].text, event.changedTouches[j].pageY, event.changedTouches[j].pageX, blockArray[i].genname);
							blockArray[i].identifier = event.changedTouches[j].identifier;			
							blockArray[i].offset.x = blockArray[i].x - event.changedTouches[j].pageX;
							blockArray[i].offset.y = blockArray[i].y - event.changedTouches[j].pageY;
							blockMap[blockArray[i].identifier] = blockArray[i];
							//console.log("Start: " +blockArray[i].identifier);	
						}else if(blockArray[i].id == "operator_area2"){
							blockArray[i].text = sym2;	//將合併數字區值丟入
							cre.createDIV(blockArray[i].text, event.changedTouches[j].pageY, event.changedTouches[j].pageX, blockArray[i].genname);
							blockArray[i].identifier = event.changedTouches[j].identifier;			
							blockArray[i].offset.x = blockArray[i].x - event.changedTouches[j].pageX;
							blockArray[i].offset.y = blockArray[i].y - event.changedTouches[j].pageY;
							blockMap[blockArray[i].identifier] = blockArray[i];
							//console.log("Start: " +blockArray[i].identifier);	
						}else if(blockArray[i].id == "operator_area3"){
							blockArray[i].text = sym3;	//將合併數字區值丟入
							cre.createDIV(blockArray[i].text, event.changedTouches[j].pageY, event.changedTouches[j].pageX, blockArray[i].genname);
							blockArray[i].identifier = event.changedTouches[j].identifier;			
							blockArray[i].offset.x = blockArray[i].x - event.changedTouches[j].pageX;
							blockArray[i].offset.y = blockArray[i].y - event.changedTouches[j].pageY;
							blockMap[blockArray[i].identifier] = blockArray[i];
							//console.log("Start: " +blockArray[i].identifier);	
						}else{
							cre.createDIV(blockArray[i].text, event.changedTouches[j].pageY, event.changedTouches[j].pageX, blockArray[i].genname);
							blockArray[i].identifier = event.changedTouches[j].identifier;			
							blockArray[i].offset.x = blockArray[i].x - event.changedTouches[j].pageX;
							blockArray[i].offset.y = blockArray[i].y - event.changedTouches[j].pageY;
							blockMap[blockArray[i].identifier] = blockArray[i];
						}
												
					}
					
					if(event.changedTouches[j].target.className == "butt"){
						next();
					}else if(event.changedTouches[j].target.className == "butt2"){
						verify();
					}
					
					
					
					if(event.changedTouches[j].target.id == "question_box1"){
						trans=true;
						//$("question_box1").css("-webkit-transform-origin-x",1024+"px");
						//$("question_box1").css("-webkit-transform-origin-y",267+"px");
					}
				
						
				}
				
					
			}
			
		}
			
			event.preventDefault();
	}
	
		
	
	
	function touchmove(event){
		event.changedTouches= event.targetTouches;
		for(var i=0; i<event.changedTouches.length; i++){
			var block = blockMap[event.changedTouches[i].identifier];
			
			if(block){
				block.x = block.offset.x + event.changedTouches[i].pageX;
				block.y = block.offset.y + event.changedTouches[i].pageY;
				if(block.obj.parent().attr("id") == "number_area"){
					$("#"+block.genname).css("-webkit-transform", ["translate3d(",block.x,"px, ",block.y,"px, 0px) "].join(""));
					$("#"+block.genname).css("text-shadow","5px 5px 10px #CC9999");
					$("#"+block.genname).css("font-size",70);
				}else if(block.obj.parent().attr("id") == "number_area2"){
					$("#"+block.genname).css("-webkit-transform", ["translate3d(",block.x,"px, ",block.y,"px, 0px)","rotate(",90,"deg)"].join(""));
					$("#"+block.genname).css("text-shadow","5px 5px 10px #CC9999");
					$("#"+block.genname).css("font-size",70);
				}else if(block.obj.parent().attr("id") == "number_area3"){
					$("#"+block.genname).css("-webkit-transform", ["translate3d(",block.x,"px, ",block.y,"px, 0px)","rotate(",-90,"deg)"].join(""));
					$("#"+block.genname).css("text-shadow","5px 5px 10px #CC9999");
					$("#"+block.genname).css("font-size",70);
				}else{
					if(block.genname == "c1"){
						$("#"+block.genname).css("-webkit-transform", ["translate3d(",block.x,"px, ",block.y,"px, 0px)","rotate(",90,"deg)"].join(""));
						$("#"+block.genname).css("text-shadow","5px 5px 10px #CC9999");
						$("#"+block.genname).css("font-size",70);
					}else if(block.genname == "c2"){
						$("#"+block.genname).css("-webkit-transform", ["translate3d(",block.x,"px, ",block.y,"px, 0px) "].join(""));
						$("#"+block.genname).css("text-shadow","5px 5px 10px #CC9999");
						$("#"+block.genname).css("font-size",70);
					}else if(block.genname == "c3"){
						$("#"+block.genname).css("-webkit-transform", ["translate3d(",block.x,"px, ",block.y,"px, 0px)","rotate(",-90,"deg)"].join(""));
						$("#"+block.genname).css("text-shadow","5px 5px 10px #CC9999");
						$("#"+block.genname).css("font-size",70);
					}else if(block.genname == "op1"){
						$("#"+block.genname).css("-webkit-transform", ["translate3d(",block.x,"px, ",block.y,"px, 0px)","rotate(",-90,"deg)"].join(""));
						$("#"+block.genname).css("text-shadow","5px 5px 10px #CC9999");
						$("#"+block.genname).css("font-size",70);
					}else if(block.genname == "op2"){
						$("#"+block.genname).css("-webkit-transform", ["translate3d(",block.x,"px, ",block.y,"px, 0px)","rotate(",-90,"deg)"].join(""));
						$("#"+block.genname).css("text-shadow","5px 5px 10px #CC9999");
						$("#"+block.genname).css("font-size",70);
					}else if(block.genname == "op3"){
						$("#"+block.genname).css("-webkit-transform", ["translate3d(",block.x,"px, ",block.y,"px, 0px)","rotate(",-90,"deg)"].join(""));
						$("#"+block.genname).css("text-shadow","5px 5px 10px #CC9999");
						$("#"+block.genname).css("font-size",70);
					}
					
				}
				//block.gen_id.css("-webkit-transform", ["translate3d(",block.x,"px, ",block.y,"px, 0px) "].join(""));
				//console.log(block.gen_id);						
			}
			if(trans == true){
				//if(event.changedTouches[i].target.id =="question_box1"){	
					
					var node1 = {x:1024, y:267}, node2 = {x:event.changedTouches[i].pageX, y:event.changedTouches[i].pageY};
					var rotation = cre.ConvertPositionAngel(node2,node1);
   					$("#question_box1").css("-webkit-transform",["translate3d(0px,20px,0px)","rotate(",rotation,"deg)"].join(""));
   					
   					
				//}
				
			}
			
			
		}
		
		
		
		
		event.preventDefault();
	}
	
	
	
	
	function touchend(event){
		event.changedTouches= event.targetTouches;
	//	console.log("End: " +event.changedTouches.length);
		for(var i=0; i<event.changedTouches.length; i++){
			var block =  blockMap[event.changedTouches[i].identifier];	
			if(block){	//當物件存在時跑判斷
				if($('#'+block.genname).length>0){	//當手指離開時消除物件		
					if($('#'+block.genname).offset().left>=$('#cloze3').offset().left-50 && $('#'+block.genname).offset().top>=$('#cloze3').offset().top && $('#'+block.genname).offset().left<=$('#cloze3').offset().left+100 && $('#'+block.genname).offset().top<=$('#cloze3').offset().top+50 && cre.isNumber(block.text)){	//cloze2
						$("#cloze3").html(block.text),$("#cloze3").css("color","#13A");
						c1 = block.text;
						block.x=0, block.y=0;
						$('#'+block.genname).remove();								
					}else if($('#'+block.genname).offset().left>=$('#cloze8').offset().left-50 && $('#'+block.genname).offset().top>=$('#cloze8').offset().top && $('#'+block.genname).offset().left<=$('#cloze8').offset().left+100 && $('#'+block.genname).offset().top<=$('#cloze8').offset().top+100 && cre.isNumber(block.text)){
						$("#cloze8").html(block.text), $("#cloze8").css("color","#13A");
						c5 = block.text;
						block.x=0, block.y=0;
						$('#'+block.genname).remove();	
					}
					else if($('#'+block.genname).offset().left>=$('#fixed_box3').offset().left-50 && $('#'+block.genname).offset().top>=$('#fixed_box3').offset().top-50 && $('#'+block.genname).offset().left<=$('#fixed_box3').offset().left+100 && $('#'+block.genname).offset().top<=$('#fixed_box3').offset().top+100 && cre.isOperator(block.text)){
						$("#fixed_box3").html(block.text), $("#fixed_box3").css("color","#13A");
						c2 = cre.transSymbol(block.text);
						block.x=0, block.y=0;
						$('#'+block.genname).remove();	
					}else if($('#'+block.genname).offset().left>=$('#fixed_box5').offset().left-50 && $('#'+block.genname).offset().top>=$('#fixed_box5').offset().top-50 && $('#'+block.genname).offset().left<=$('#fixed_box5').offset().left+100 && $('#'+block.genname).offset().top<=$('#fixed_box5').offset().top+100 && cre.isOperator(block.text)){
						$("#fixed_box5").html(block.text), $("#fixed_box5").css("color","#13A");
						c3 = cre.transSymbol(block.text);
						block.x=0, block.y=0;
						$('#'+block.genname).remove();	
					}else if($('#'+block.genname).offset().left>=$('#fixed_box6').offset().left-50 && $('#'+block.genname).offset().top>=$('#fixed_box6').offset().top-50 && $('#'+block.genname).offset().left<=$('#fixed_box6').offset().left+100 && $('#'+block.genname).offset().top<=$('#fixed_box6').offset().top+100 && cre.isOperator(block.text)){
						$("#fixed_box6").html(block.text), $("#fixed_box6").css("color","#13A");
						c4 = cre.transSymbol(block.text);
						block.x=0, block.y=0;
						$('#'+block.genname).remove();	
					}else {
						$('#'+block.genname).remove();
						block.x=0, block.y=0;						
					}
					
					
					
				}
				
				
						
				delete blockMap[event.changedTouches[i].identifier];
				
			
			}
			
			
		}trans=false; //手指離開後設定無法轉動
		event.preventDefault();
	}
	
	initial(); //分配題目
	document.addEventListener('touchstart',touchstart, false);	//觸發touchstart事件
	document.addEventListener('touchmove',touchmove, false);		//觸發touchmove事件
	document.addEventListener('touchend',touchend, false);		//觸發touchend事件
		
