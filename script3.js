var kurdometers = document.getElementsByClassName('kurdo')[0];
var kurdometersChilds = kurdometers.children;
var start = document.getElementById("start");
var stop = document.getElementById("stop");
var rRhythm = document.getElementById("stop");
var speedInc = document.getElementById("speedInc");
var setSpeed = document.getElementById("setSpeed");
var pattern = getAttr('pattern')
var parsed_pattern = columns = JSON.parse(pattern);
var v = [];
var s = 10;
var xx = 107.2;
var speed = getAttr('speed', 10);
var rhythm = getAttr('rhythm', 'asc');
var except = JSON.parse(getAttr('except'), []);
var maskSymbol = getAttr('mask-symbol', '*');
var s_inc = getAttr('speed_increament', true);
var margintops = [];
var numbers= [];
var animate = ['flip', 'flipInX', 'flipInY', 'slideInUp', 'slideInDown', 'slideInLeft', 'slideInRight', 'bounceInUp', 'bounce'],
	base_animate = 'animated infinite1';
var stop_animate = " " + getAttr('animate', 'flip')
var step = 0;
var max_rotate_speed = 0;
var rotate_speed = [];
var funit = 'px'; //'em'
// var ps = kurdometers.parentNode;
// ps.removeChild(kurdometers);
// ps.innerHTML = "<div id='kurdo'></div>";
function init(){
	for(var i = 0; i < parsed_pattern.length; i++){
		var template = `<p class="pkurdo kurdo${i+1} animated">`;
		rotate_speed.push(0);
		if(Array.isArray(parsed_pattern[i])){
			max_rotate_speed = (max_rotate_speed > parsed_pattern[i].length * step)? max_rotate_speed: parsed_pattern[i].length * step;
			if(parsed_pattern[i].length == 0)
				template += `<span class="digit">${maskSymbol}</span>`;
			else
				for(var j = 0; j < parsed_pattern[i].length; j++)
					template += `<span class="digit">${parsed_pattern[i][j]}</span>`;
		}else{
			template += `<span class="digit">${parsed_pattern[i]}</span>`;
		}
		template += `</p>`;
		kurdometers.innerHTML += template;
		margintops.push([0, 0]);
	}
	step = parseFloat(window.getComputedStyle(document.getElementsByClassName('digit')[0], null).getPropertyValue('font-size'));
}
init()
function startKurdo(){
	for(var indx = 0; indx < parsed_pattern.length; indx++)
		if(except.indexOf(indx) === -1)
			rotateKurdo(indx);
}
function rotateKurdo(index){
	margintops[index][1] = parsed_pattern[index].length * 1 * step;
	var cof = ((rhythm === 'asc')? parsed_pattern.length - index: index);
	rotate_speed[index] = (s_inc == "false")? speed: cof * speed;
	x = setInterval(() => {
	  	if(Math.abs(margintops[index][0]) > margintops[index][1]){
	    	margintops[index][0] = 10;
	  	}else{
	    	margintops[index][0] -= 1;
	  	}
		kurdometersChilds[index].children[0].style.marginTop = `${margintops[index][0]}${funit}`;
	}, rotate_speed[index]);
	v.push(x)
}
function setKurdo(number){
	for(var i =0; i < document.getElementsByClassName('pkurdo').length; i++){
		var item = document.getElementsByClassName('pkurdo')[i];
		item.style.background = 'lightblue'
	}
	nums = 
	number.split('');
	nums.map((n, i) => {
		setTimeout(() => {
			clearInterval(v[i])
			if(except.indexOf(i) === -1){
				kurdometersChilds[i].children[0].style.marginTop = "-" + (parseInt(columns[i].indexOf(+n)) * xx) + funit;
				kurdometersChilds[i].children[columns[i].indexOf(+n)].classList = `digit ${base_animate} ` + animate[7];
			}
		}, i * 55)
	})
	setTimeout(() => {
		nums.map((n, i) => {
			if(except.indexOf(i) === -1){
				kurdometersChilds[i].children[0].style.marginTop = "-" + (parseInt(columns[i].indexOf(+n)) * xx) + funit;
				kurdometersChilds[i].children[columns[i].indexOf(+n)].classList = `digit ${base_animate} ` + animate[1];
			}}
		)	
		for(var i =0; i < document.getElementsByClassName('pkurdo').length; i++){
			var item = document.getElementsByClassName('pkurdo')[i];
			item.classList.value.replace(/stop_animate/g, '')
			item.style.background = 'red';
		}
		v = [];
	}, 1500)
}
function getAttr(attr, def = null){
	var atr = kurdometers.getAttribute(attr);
	if(atr)
		return atr.replace(/ /g, '');
	return def? def: false;
}
function generateRandomCase(){
	return columns.map((col, i) => {
		if(Array.isArray(col)){
			return (col.length == 0)? '*': col[Math.floor(Math.random() * 10) % col.length]
	    }else
			return col;
	}).join('')
}
function changeSpeed(ss){
  speed = (isNaN(ss))? 10: ss;
}
function changeSpeedInc(){
  s_inc = (s_inc == 'true')? 'false': 'true';
}
start.addEventListener("click", function(){
  startKurdo()
});
stop.addEventListener("click", function(){
  setKurdo(generateRandomCase())
});
rRhythm.addEventListener("click", function(){
  rhythm = (rhythm == 'asc')? 'desc': 'asc';
});
speedInc.addEventListener("click", function(){
  changeSpeedInc()
});
setSpeed.addEventListener("click", function(){
  changeSpeed(document.getElementById('speedValue').value)
});