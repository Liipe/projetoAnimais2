<?php
class petService {
    
    public function add($json){
        $db = Connection::getDB();
        $guest = json_decode($json, true);
        $add = $db->guests->insert($guest);
        return $add;
    }
    
    public function remove($id){
        $db = Connection::getDB();
        $guest = $db->guests[$id];
        
        if(!$guest) return;
        
        $guest->delete();
        
    }
    
    public function getList(){
        $db = Connection::getDB();
        $guests = array();
        foreach($db->guests() as $guest) {
           $guests[] = array (
               'id' => $guest['id'],
               'name' => $guest['name'],
               'mytask' => $guest['mytask'],
               
               
           ); 
        }
        
        return $guests;
    }
    
}
?>