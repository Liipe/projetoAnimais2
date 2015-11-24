<?php
require 'vendor/autoload.php';
require 'pets/petService.php';
require 'database/Connection.php';

$app = new \Slim\Slim();

$crud = new petService;

$app->post('/guests', function() use ($app, $crud) {
    $json = $app->request()->getBody();
    $added = $crud->add($json);
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($added);
});

$app->delete('/guests/:id', function($id) use ($app, $crud) {
    $crud->remove($id);
});

$app->get('/guests', function() use ($app, $crud) {
    $list = $crud->getList();
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($list);
});
$app->run();
?>