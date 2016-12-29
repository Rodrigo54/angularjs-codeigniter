<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . '/libraries/REST_Controller.php';

class MY_Controller extends REST_Controller {

    /*
    | verificação se existe um token
    | no header de Authorization
    | caso não exita ou não seja valido
    | emite erro unautorizado
    */
    public function early_checks()
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
    }

}

/* End of file MY_Controller.php */
/* Location: ./application/core/MY_Controller.php */