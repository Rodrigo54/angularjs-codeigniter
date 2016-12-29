<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Teste extends CI_Controller {

  public function index()
  {
    $email = 'rodrigo54mix@gmail.com';
    $senha = '123';

    $this->db->where('email', $email);
    $this->db->where('senha', $senha);
    $usuario = $this->db->get('admin')->first_row();

    $key = $this->config->item('encryption_key');
    $exp = strtotime("+2 hours");
    $iat = strtotime("now");
    $nbf = strtotime("+3 hours");
    $token = $this->jwt->encode(array(
      'id'=>$usuario->id,
      'name'=>$usuario->nome,
      'admin'=>true,
      'iat'=>$iat,
      'exp'=>$exp
    ), $key);
    echo "<pre>";
    echo $token;
    echo "<br><br>";
    echo 'time: '.time();
    echo "<br>";
    echo 'iate: '.$iat;
    echo "<br>";
    echo 'nbf : '.$nbf;
    echo "<br>";
    echo 'exp : '.$exp;
    echo "<br><br>";
    echo "</pre>";

    // if ($iat > time()) {
    //   echo 'Não é possível lidar com token antes de ' . date(DateTime::ISO8601, time());
    //   echo "<br>";
    // }
    if (time() >= $exp) {
      echo "Expired token";
      echo "<br>";
    }


    echo "<pre>";
    print_r ($usuario);
    echo "</pre>";
    echo "<br>";
    var_dump( $this->jwt->decode($token,$key) );
    echo "<br>";
  }

  public function sair(){
    $this->session->sess_destroy();
    redirect('','refresh');
  }
}

/* End of file Teste.php */
/* Location: ./application/controllers/Teste.php */