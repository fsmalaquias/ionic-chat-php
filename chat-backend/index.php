<?
header('Access-Control-Allow-Origin: *');
require_once("db_info.php");

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header("Content-type: application/json; charset=utf-8", true);

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);

$act = $request->type;

switch ($act) {
	case 'init':{
		$query='';
		try{
			$uuid = $request->uuid;
			$query = "insert into device(uuid, creation, last_access) values('$uuid', NOW(), NOW()) ON DUPLICATE KEY UPDATE last_access=NOW()";
			//echo $query;
			dbQuery($query, true);

			$query = "select * from device where uuid='$uuid'";
			$result = dbQuery($query, true);
			echo json_encode(array('return_code'=>0, 'data'=>$result));
		}
		catch(Exception $e){
			echo json_encode(array('return_code'=>1, 'return_message'=>'[init] Erro ao inserir/atualizar device', 'data'=>$query));
		}

		break;
	}
	case 'list':{
		$query='';
		try{
			$deviceId = $request->deviceId;
			$query = "select a.*, b.`gender`, b.`blocked` from chat a inner join device b on b.id = a.id_device order by id asc limit 50";
			//echo $query;
			$result = dbQuery($query, false);
			echo json_encode(array('return_code'=>0, 'data'=>$result));
		}
		catch(Exception $e){
			echo json_encode(array('return_code'=>1, 'return_message'=>'[init] Erro ao inserir/atualizar device', 'data'=>$query));
		}
		break;
	}
	case 'send':{
		$query='';
		try{
			$idDevice = $request->idDevice;
			$message = $request->message;
			$query = "insert into chat(id_device, creation, message) values('$idDevice', NOW(), '$message')";
			//echo $query;
			dbQuery($query, true);
			echo json_encode(array('return_code'=>0, 'data'=>''));
		}
		catch(Exception $e){
			echo json_encode(array('return_code'=>1, 'return_message'=>'[init] Erro ao inserir/atualizar device', 'data'=>$query));
		}
		break;
	}
	default:
		# code...
		break;
}
?>