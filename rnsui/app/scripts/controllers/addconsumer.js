'use strict';

/**
 * @ngdoc function
 * @name rnsuiApp.controller:AddconsumerCtrl
 * @description
 * # AddconsumerCtrl
 * Controller of the rnsuiApp
 */
angular.module('rnsuiApp')
  .controller('AddconsumerCtrl', function ($rootScope,$scope,$http) {
    $rootScope.apiUrl="http://localhost:3000/api";
    $scope.consumer={};
    $scope.onSuccessFlag=false;
    $scope.onErrorFlag=false;
    $scope.submitted=false;
    $scope.datePicker={opened:false};
    
    

    $scope.open=function(){
    	console.log("openDatePicker");
    	$scope.datePicker.opened=true;
    }

    $scope.addConsumer=function(isValid){
    	if(isValid){
    		$http({method:"POST",
    				url:$scope.apiUrl+"/consumer/create",
    				data:$scope.consumer
    			}).then(function(data){
    				console.log(data);
                    $scope.consumer={};
                    $scope.submitted=false;
                    $scope.onSuccessFlag=true;
                    $scope.onErrorFlag=false;
    			},function(err){
    				console.log(err);
                    $scope.onSuccessFlag=false;
                    $scope.onErrorFlag=true;
    			});
    	}
    };


    $scope.$watch('consumer.boxno',function(newVal,oldVal,scope){
        if(oldVal && newVal){
            if((newVal.length - oldVal.length)>0 && (scope.consumer.boxno.length===4 || scope.consumer.boxno.length===9)){
                scope.consumer.boxno+='-';
            }
        }
    });
  });
