<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Eventos extends MY_Controller {

    public function __construct()
    {
        // $this->debug = true;
        parent::__construct();
        $this->load->model('Admin_model', 'admin');
    }

  public function index_get($id = null)
  {
    // $this->db->where('e.titulo', 'oi');
     if ($id){
        $dados = $this->admin->getEventos($id);
        $dados ? $dados->alunosInscritos = $this->admin->lista_usuarios_evento($id) : null ;
     } else {
        $dados = $this->admin->getEventos();
     }

    // sleep(5);
    if ($dados)
    {
      $this->response($dados, REST_Controller::HTTP_OK);
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
