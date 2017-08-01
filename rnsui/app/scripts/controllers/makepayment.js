'use strict';

/**
 * @ngdoc function
 * @name rnsuiApp.controller:MakepaymentCtrl
 * @description
 * # MakepaymentCtrl
 * Controller of the rnsuiApp
 */
angular.module('rnsuiApp')
  .controller('MakepaymentCtrl', function ($scope,$routeParams,$http) {
    $scope.consumer={};
    $scope.payment={};
    $scope.apiUrl="http://localhost:3000";
    console.log($routeParams.id);
    $scope.datePicker={opened:false};
    $scope.open=function(){
    	console.log("openDatePicker");
    	$scope.datePicker.opened=true;
    };

    
    $scope.showConsumer=function(){
    	$http({
    		method:'GET',
    		url:$scope.apiUrl+'/consumer/showConsumer/'+$routeParams.id
    	}).then(function(data){
    		console.log(data);
    		$scope.consumer=angular.copy(data.data);
    	},function(err){
    		console.log(err);
    	});
    };

    $scope.submit=function(isValid){
    	if(isValid){
    		$http({
	    		method:'POST',
	    		url:$scope.apiUrl+'/payment/update/',
	    		data: {	_id:$scope.consumer._id,
	    				dop:$scope.payment.dop,
	    				amount:$scope.payment.amount}
	    	}).then(function(data){
	    		console.log(data);
	    	},function(err){
	    		console.log(err);
	    	});
    	}
    };

    $scope.showConsumer();
  });
