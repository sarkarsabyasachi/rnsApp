'use strict';

/**
 * @ngdoc function
 * @name rnsuiApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the rnsuiApp
 */
angular.module('rnsuiApp')
  .controller('ProfileCtrl', function ($scope,$http,$routeParams,$rootScope) {
    $scope.consumer={};
    $scope.payment={};
    $scope.paymentList={};
    $scope.showOKBtnFlag=false;
    $scope.showNOKBtnFlag=false;
    $scope.submitted=false;
    $scope.apiUrl="http://localhost:3000/api";
    console.log($routeParams.id);
    
    $scope.showConsumer=function(){
    	$http({
    		method:'GET',
    		url:$scope.apiUrl+'/consumer/showConsumer/'+$routeParams.id
    	}).then(function(data){
    		console.log(data);
    		$scope.consumer=angular.copy(data.data);
    		$scope.showPaymentForYear($scope.consumer._id);
    	},function(err){
    		console.log(err);
    	});
    };

    // $scope.showPaymentForYear=function(id){console.log(id);
    // 	$http({
    // 		method:'POST',
    // 		url:$scope.apiUrl+'/consumer/showPaymentForYear',
    // 		data:{_id:id,year:new Date().getFullYear()}
    // 	}).then(function(data){
    // 		console.log(data);
    // 		if(data.data.payments){
    // 			$scope.paymentList=angular.copy(data.data.payments);
    // 		}
    // 	},function(err){
    // 		console.log(err);
    // 	});
    // };


    $scope.showPaymentForYear=function(id){console.log(id);
    	$http.post($scope.apiUrl+'/consumer/showPaymentForYear',{_id:id,year:new Date().getFullYear()})
    	.then(function(data){
    		console.log(data);
    		if(data.data.payments){
    			$scope.paymentList=angular.copy(data.data.payments);
    		}
    	},function(err){
    		console.log(err);
    	});
    };


    $scope.datePicker={opened:false};
    $scope.open=function(){
    	console.log("openDatePicker");
    	$scope.datePicker.opened=true;
    };

    $scope.clkMakePayment=function(){
    	$scope.showOKBtnFlag=false;
    	$scope.showNOKBtnFlag=false;

    };

    // $scope.openEditPayment=function(year,amt,month){
    // 	console.log(amt);
    // 	$scope.showOKBtnFlag=false;
    // 	$scope.showNOKBtnFlag=false;
    // 	if(!year){
    // 		event.stopPropagation();
    // 	}
    // 	switch(month){
    // 		case 1:
    // 		$scope.payment={dop:new Date("1/1/"+ new Date().getFullYear().toString()),
    // 						amount:amt};
    // 		break;
    // 		case 2:
    // 		$scope.payment={dop:new Date("2/1/"+ new Date().getFullYear().toString()),
    // 						amount:amt};
    // 		break;
    // 		case 3:
    // 		$scope.payment={dop:new Date("3/1/"+ new Date().getFullYear().toString()),
    // 						amount:amt};
    // 		break;
    // 		case 4:
    // 		$scope.payment={dop:new Date("4/1/"+ new Date().getFullYear().toString()),
    // 						amount:amt};
    // 		break;
    // 		case 5:
    // 		$scope.payment={dop:new Date("5/1/"+ new Date().getFullYear().toString()),
    // 						amount:amt};
    // 		break;
    // 		case 6:
    // 		$scope.payment={dop:new Date("6/1/"+ new Date().getFullYear().toString()),
    // 						amount:amt};
    // 		break;
    // 		case 7:
    // 		$scope.payment={dop:new Date("7/1/"+ new Date().getFullYear().toString()),
    // 						amount:amt};
    // 		break;
    // 		case 8:
    // 		$scope.payment={dop:new Date("8/1/"+ new Date().getFullYear().toString()),
    // 						amount:amt};
    // 		break;
    // 		case 9:
    // 		$scope.payment={dop:new Date("9/1/"+ new Date().getFullYear().toString()),
    // 						amount:amt};
    // 		break;
    // 		case 10:
    // 		$scope.payment={dop:new Date("10/1/"+ new Date().getFullYear().toString()),
    // 						amount:amt};
    // 		break;
    // 		case 11:
    // 		$scope.payment={dop:new Date("11/1/"+ new Date().getFullYear().toString()),
    // 						amount:amt};
    // 		break;
    // 		case 12:
    // 		$scope.payment={dop:new Date("12/1/"+ new Date().getFullYear().toString()),
    // 						amount:amt};
    // 		break;
    // 	}
    // };

    $scope.submit=function(isValid){
    	if(isValid){
    		$http({
	    		method:'POST',
	    		url:$scope.apiUrl+'/payment/update',
	    		data: {	_id:$scope.consumer._id,
	    				dop:$scope.payment.dop,
	    				amount:$scope.payment.amount}
	    	}).then(function(data){
	    		console.log(data);
	    		$scope.showPaymentForYear($scope.consumer._id);
	    		$scope.showOKBtnFlag=true;
    			$scope.showNOKBtnFlag=false;
    			$scope.payment={};
    			$scope.submitted=false;
	    	},function(err){
	    		console.log(err);
	    		$scope.showOKBtnFlag=false;
    			$scope.showNOKBtnFlag=true;
	    	});
    	}
    };




    $scope.showConsumer();
  });
