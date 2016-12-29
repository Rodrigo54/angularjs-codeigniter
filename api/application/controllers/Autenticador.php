<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . '/libraries/REST_Controller.php';

class Autenticador extends REST_Controller {

  public function index_post()
  {
    $email = $this->post('email');
    $senha = $this->post('senha');

    $this->db->where('email', $email);
    $this->db->where('senha', $senha);
    $usuario = $this->db->get('admin')->first_row();

    $key = $this->config->item('encryption_key');
    $token = $this->jwt->encode(array(
      'id'=>$usuario->id,
      'nome'=>$usuario->nome,
      'email'=>$usuario->email,
      'admin'=>TRUE,
      'iat'=> strtotime("now"),
      'exp'=> strtotime("+2 hours")
    ), $key);

    $message = ['token' => $token];

    if ($usuario) {
      $this->set_response($message, REST_Controller::HTTP_OK);
    }
    else
    {
      // Set the response and exit
      $this->response([
          'status' => FALSE,
          'message' => 'usuario não encontrado'
      ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
    }
  }

  public function sair_get()
  {
    $this->set_response('saida com sucesso', REST_Controller::HTTP_OK);
  }
}

/* End of file Autenticador.php */
/* Location: ./application/controllers/Autenticador.php */