asia_cup = angular.module('asia_cup', ['ngRoute', 'ngAnimate']).controller('main', function($rootScope, $scope, $route, $http, $routeParams, $location, $timeout) {
	$scope.winners_list = false;
	$scope.main_frame = true;
	$scope.current_winner = 0;
	$scope.winners = [];
	$scope.winners_to_show = [];
	$scope.winner = $scope.default_winner = {
		phone: '0900***0000',
		score: 0,
		name: '--------'
	};
	$scope.spec = [0,1,2,3,9];
	  $http.get('winners/winners.json')
       .then(function(res){
       		console.log('Data', res.data)
          	$scope.winners = res.data;
        });


	$scope.anim1 = ['bounceIn', 'fadeInUp', 'flipInX', 'slideInUp', 'slideInDown'];
	$scope.anim = ['flip', 'flipInX', 'flipInY'];
	$scope.a = 'bounceIn';
	$scope.step = 0;
	$scope.numbers = [0,1,2,3,4,5,6,7,8,9];
	$scope.header_index = 0;
	$scope.steps = [
		{index: 0, step: 1, numbers: [0], finite: 0, ref: 0, speed: 0},
		{index: 1, step: 1, numbers: [9], finite: 0, ref: 0, speed: 0},
		{index: 2, step: 1, numbers: [0,1,2,3,9], finite: 0, ref: 0, speed: 100},
		{index: 3, step: 1, numbers: $scope.numbers, finite: 0, ref: 0, speed: 150},
		{index: 4, step: 1, numbers: $scope.numbers, finite: 0, ref: 0, speed: 200},
		{index: 5, step: 1, numbers: $scope.numbers, finite: 0, ref: 0, speed: 250},
		{index: 6, step: 1, numbers: $scope.numbers, finite: 0, ref: 0, speed: 300},
		{index: 7, step: 1, numbers: $scope.numbers, finite: 0, ref: 0, speed: 350},
		{index: 8, step: 1, numbers: $scope.numbers, finite: 0, ref: 0, speed: 400},
		{index: 9, step: 1, numbers: $scope.numbers, finite: 0, ref: 0, speed: 450},
		{index: 10, step: 1, numbers: $scope.numbers, finite: 0, ref: 0, speed: 500},
	];
	$scope.time_step = 100;
	$scope.exit = 'animated bounce1 infinite1';
	$scope.enter = 'animated bounce1 infinite1';
	$scope.t = 0;
	$scope.marginTop_step = 78;
	$scope.flag_click = false;

	$scope.show_my_fade = true;

	$scope.showSlider_form = false;
	$scope.showWinners_form = false;
	$scope.showMain_form = true;
	$scope.showWinners_app_form = true;
	$scope.mySwiper = {};

	$scope.showMain = function(){
		$scope.showWinners_app_form = false;
		$scope.showSlider_form = false;
		$scope.showMain_form = true;
	};

	$scope.start = function(){
		if($scope.current_winner > $scope.winners.length - 1)
			return
		$scope.show_my_fade = true;
		$('.digits').removeClass($scope.a)
		$scope.steps.map(s => {
			clearInterval(s.ref)
		});
		$scope.winner = $scope.default_winner;
		$scope.setWinner_anim = false;
		setTimeout(() => {
			$scope.steps.map(s => {
				if((parseInt(s.index) < 4 || parseInt(s.index) > 6) && s.index != 0 && s.index != 1){
					speed = ($scope.steps.length - s.index + 1) * 30 + 10;
					s.ref = setInterval(() => {
							$scope.t = ($scope.t + $scope.marginTop_step) % (s.numbers.length * $scope.marginTop_step);
					        $('.digits_' + s.index + ' p:nth(0)').removeClass($scope.exit).animate({'opacity': 1, marginTop: "-" + $scope.t + "px"}, 50, () => {
					        	$(this).addClass($scope.enter)
					        });
						s.step = (s.step + 1) % s.numbers.length
					}, speed);
				}else{
					$('.digits_' + s.index).addClass('border')
				}
			});
		}, 100)
	}

	$scope.search = function(){
		$scope.start();
	}
	$scope.previos = function(){
		$scope.current_winner = $scope.current_winner - 1;
		console.log('previos:	', $scope.current_winner);
	}

	$scope.select = function(){
		console.log('current_winner', $scope.winners);
		winner = [
			// {index:0, number: 0},
			// {index:1, number: 9},
			{index:2, number: $scope.winners[$scope.current_winner].phone[0]},
			{index:3, number: $scope.winners[$scope.current_winner].phone[1]},
			{index:4, number: '*'},
			{index:5, number: '*'},
			{index:6, number: '*'},
			{index:7, number: $scope.winners[$scope.current_winner].phone[2]},
			{index:8, number: $scope.winners[$scope.current_winner].phone[3]},
			{index:9, number: $scope.winners[$scope.current_winner].phone[4]},
			{index:10, number: $scope.winners[$scope.current_winner].phone[5]},
		];
		$scope.get(winner)
	}

	$scope.setWinner = function(){
			winner = $scope.winners[$scope.current_winner-1];
			$scope.winner = $scope.default_winner;
			$scope.setWinner_anim = true;
			$scope.winner = {
				phone: "09" + winner.phone[0] + winner.phone[1] + "***" + winner.phone[2] + winner.phone[3] + winner.phone[4] + winner.phone[5],
				name: winner.name,
				score: winner.score
			};
			console.log($scope.winner, '$scope.winner');
			$scope.show_my_fade = false;
		};

	$scope.go = function(){
		if($scope.flag_click){
			$scope.select();
			$scope.setWinner();
			$scope.flag_click = !$scope.flag_click;
		}
		else{
			$scope.search();
			$scope.flag_click = !$scope.flag_click;
		}
	};

	$scope.get = 	function(selected){
		if($scope.current_winner > $scope.winners.length)
			return
		$scope.i = 0;
		$('.digits').removeClass($scope.a);
		selected.forEach((v,index) => {
				setTimeout(() => {
					if(index == 0 && v.number == 9)
						var k = 4;
					else
						var k = v.number;

					$('.digits_' + v.index + ' p:nth(0)').removeClass($scope.exit).animate({'opacity': 1, marginTop: "-" + (k * $scope.marginTop_step) + "px"}, 500, () => {
			        	$(this).addClass($scope.enter)
			        });
				}, ($scope.i++ + 1 ) * 50);
			    clearInterval($scope.steps[v.index].ref);
				setTimeout(() => {
					$('.digits_' + v.index).addClass($scope.a)
				}, v.index * 100 + 100)
		})
		$scope.winners_to_show.push($scope.winners[$scope.current_winner]);
	}
	$scope.changeAnimation = function(){
		$scope.a = $scope.anim[Math.floor(Math.random() * 10) % $scope.anim.length]
	}
});