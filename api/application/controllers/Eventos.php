<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Eventos extends MY_Controller {

  public function index_get()
  {
    // $this->db->where('titulo', 'oi');
    $dados = $this->db->get('eventos');

    if ($dados->result())
    {
      $this->response($dados->result(), REST_Controller::HTTP_OK);
    }
    else
    {
      // Set the response and exit
      $this->response([
       'status' => FALSE,
       'message' => 'Nada encontrado'
      ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
    }
  }
}

/* End of file Eventos.php */
/* Location: ./application/controllers/Eventos.php */