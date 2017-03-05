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

    if ($usuario) {
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
      $this->set_response($message, REST_Controller::HTTP_ACCEPTED);
    }
    else
    {
      // Set the response and exit
      $this->response([
          'status' => FALSE,
          'message' => 'Usuario ou senha errados'
      ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
    }
  }

  public function sair_get()
  {
    try {
      $key = $this->config->item('encryption_key');
      $token = $this->input->get_request_header('Authorization');
      $token = str_replace('Bearer ','',$token);
      $token = $this->jwt->decode($token, $key);
    } catch (Exception $e) {
      $token = FALSE;
      $erro = 'Erro: '.$e->getMessage();
    }
    if ($token == FALSE) {
      $this->response([
       'status' => FALSE,
       'message' => $erro
      ], REST_Controller::HTTP_UNAUTHORIZED);
    }
    else{
      $this->set_response([
        'status' => TRUE,
        'message' => $token->nome.' saiu com sucesso'], REST_Controller::HTTP_OK);
    }

  }
}

/* End of file Autenticador.php */
/* Location: ./application/controllers/Autenticador.php */
