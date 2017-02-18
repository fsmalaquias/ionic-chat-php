app.controller('ChatController', ChatController);

function ChatController($scope, $timeout, $ionicPlatform, $ionicScrollDelegate, ChatFactory, DeviceFactory){
	$scope.uuid = 'undefined';
	$scope.phoneinfo = '';
	$scope.myInfo = {};
	$scope.messages = [];
	$scope.message = {};
	$scope.message.body = '';
	$scope.message.idDevice = '';
	$scope.scrollControl = 'scrollStop';

	$scope.init = function(){
		console.log('ChatController.init');
		//var device = $cordovaDevice;
        //$scope.uuid = device.getUUID();
		//window.plugins.sim.getSimInfo(getSimInfoSuccess, getSimInfoError);
		DeviceFactory.init('abc')
			.success(function(result){
				$scope.myInfo = result.data;

				getMessagesDeamon();
			})
			.error(function(result){
				console.log('error');
			});
	}

	function getMessagesDeamon(){
		console.log('ChatController.getMessagesDeamon');
		$scope.loadMessages();
		$timeout(getMessagesDeamon, 3000);
	}

	function getSimInfoSuccess(data){
		console.log(JSON.stringify(data));
		$scope.phoneinfo = JSON.stringify(data);
	}

	function getSimInfoError(data){
		console.log(data);
	}

	$scope.loadMessages = function(){
		console.log('ChatController.loadMessages');
		ChatFactory.listMessages()
			.success(function(result){
				$scope.messages = result.data;
				//$scope.$apply();
				//$timeout(function(){
					$ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom();
				//}, 1000);
				
			})
			.error(function(result){
				console.log('error');
			});
	}

	$scope.sendMessage = function(){
		console.log('ChatController.sendMessage');
		if($scope.message.body != ''){
			$scope.message.idDevice = $scope.myInfo.id;
			ChatFactory.sendMessage($scope.message)
				.success(function(result){
					$scope.message = {};
					//$scope.loadMessages();
				})
				.error(function(result){

				});
		}
	}

	$ionicPlatform.ready(function() {
		$scope.init();
	});
	
}