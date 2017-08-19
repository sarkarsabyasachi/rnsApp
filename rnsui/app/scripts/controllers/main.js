'use strict';

/**
 * @ngdoc function
 * @name rnsuiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rnsuiApp
 */
angular.module('rnsuiApp')
  .controller('MainCtrl', function ($scope,$http) {
    $scope.apiUrl="http://localhost:3000/api";
    $scope.consumers=[];
    $scope.deleteData={};
    $scope.consumer={};
    $scope.submitted=false;
    $scope.showOKBtnFlag=false;
    $scope.showNOKBtnFlag=false;
    $scope.onSuccessFlag=false;
    $scope.onErrorFlag=false;
    $scope.datePicker={opened:false};
    $scope.open=function(){
    	console.log("openDatePicker");
    	$scope.datePicker.opened=true;
    };

    $scope.json={array:[0,1,2,3]};
    $scope.json.array[0]=5;
    console.log($scope.json);



    $scope.showAllConsumers=function(){
    	$http({
    		method:'GET',
    		url:$scope.apiUrl+"/consumer/showallconsumers"    		   		
    		}).then(function(data){
    			console.log(data);
    			$scope.consumers=data.data;
    		},function(err){
    			console.log(err);
    		});
    };

    $scope.loadModalDelete=function(deleteData){
    	$scope.deleteData=deleteData;
    	console.log($scope.deleteData);
    };

    $scope.loadModalEdit=function(editData){
    	$scope.editData=editData;
    	console.log($scope.editData);
    };

    $scope.getHeader=function(){
        return ['Customer Name','Box No.'];
    };

    $scope.getArray=function(){
        var datas=[];
        var array=[];
        if(checkList.length>0){
            array=checkList;
        }
        else{
            array=$scope.consumers;
        }
        if(array.length>0){
            for(var i =0;i<array.length;i++){
                datas.push({cname:array[i].fname+' '+array[i].lname,
                            boxno:array[i].boxno});
            }
            return datas;
        }
    };


    var checkList=[];
    $scope.prepareListToExport=function(consumer,isChecked){
        if(consumer.isChecked){
            checkList.push(consumer);
        }
        else{
            checkList.splice(checkList.indexOf(consumer),1);
        }
    };



    $scope.deleteConsumer=function(){
    	$http({
    		method:'POST',
    		url:$scope.apiUrl+"/consumer/delete",
    		data:$scope.deleteData
    	}).then(function(data){
    		console.log(data);
            $scope.showAllConsumers();
            $scope.onSuccessFlag=true;
            $scope.onErrorFlag=false;
    	},function(err){
    		console.log(err);
            $scope.onSuccessFlag=false;
            $scope.onErrorFlag=true;
    	});
    };

    

    $scope.showConsumer=function(consumer){
    	$scope.showOKBtnFlag=false;
        $scope.showNOKBtnFlag=false;
        $http({
    		method:'GET',
    		url:$scope.apiUrl+'/consumer/showConsumer/'+consumer._id,

    	}).then(function(data){
    		console.log(data);
    		$scope.consumer=data.data;
    		$scope.consumer.doc=new Date(data.data.doc);
    	},function(err){
    		console.log(err);
    	});
    };

    $scope.updateConsumer=function(isValid){
    	if(isValid){
    		$http({
	    		method:'POST',
	    		url:$scope.apiUrl+'/consumer/updateConsumer',
	    		data:$scope.consumer

	    	}).then(function(data){
	    		console.log(data);
	    		//$scope.consumer={};
	    		$scope.submitted=false;
                $scope.showOKBtnFlag=true;
                $scope.showNOKBtnFlag=false;
	    		$scope.showAllConsumers();
	    	},function(err){
	    		console.log(err);
                $scope.showNOKBtnFlag=true;
                $scope.showOKBtnFlag=false;
	    	});
    	}
    };
    
    $scope.showAllConsumers();
  





  });

///////////////////////CONTROLLER ENDS HERE/////////////////////////////////////////////

























// headers: {
//             'Content-type' : 'application/json',
//             'Accept' : 'application/json'
            
//         }