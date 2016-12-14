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

    echo "<pre>";
    print_r ($usuario);
    echo "</pre>";
    echo  $this->session->logado;
    echo  $this->session->nome;
    echo  $this->session->email;
  }

  public function sair(){
    $this->session->sess_destroy();
    redirect('','refresh');
  }
}

/* End of file Teste.php */
/* Location: ./application/controllers/Teste.php */