//PRODUÇÃO
var BASE_URL = 'http://www.dev4brothers.com.br/jean/index.php';

//TESTES
//var BASE_URL = 'http://www.dev4brothers.com.br/banheiro-dese/index.php';

app.factory('ChatFactory',ChatFactory);

function ChatFactory($http){
	console.log('MarkerFactory.BASE_URL: '+BASE_URL);

	return {
		listMessages: function(){
			return $http.post(BASE_URL, {
                type : 'list'
            },
            {
            	headers:{'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
            });
		},

		sendMessage: function(message){
			return $http.post(BASE_URL, {
                type : 'send',
                idDevice: message.idDevice,
                message: message.body
            },
            {
            	headers:{'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
            });
		}
	}
}

app.factory('DeviceFactory',DeviceFactory);

function DeviceFactory($http){

	return {
		init: function(uuid){
			console.log('DeviceFactory.init');
			return $http.post(BASE_URL, {
                type : 'init',
                uuid: uuid
            },
            {
            	headers:{'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
            });
		}
	}
}