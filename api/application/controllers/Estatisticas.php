<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Estatisticas extends MY_Controller {

    public function __construct()
    {
        // $this->debug = true;
        parent::__construct();
        $this->load->model('Admin_model', 'admin');
    }

    public function totais_get()
    {
        $usuarios = $this->admin->totais('usuarios');
        $inscritos = $this->admin->getUsuariosInscritos();
        $inscritos = round(($inscritos/$usuarios)*100, 2);

        $dados = array(
            'totais' => array(
                'usuarios' => $this->admin->totais('usuarios'),
                'eventos' => $this->admin->totais('eventos'),
                'inscritos' => $inscritos.'%',
            ),
            'tipo' => array(
                'alunos' => $this->admin->getAll_usuarios('ALUNO'),
                'professores' => $this->admin->getAll_usuarios('PROFESSOR'),
                'visitantes' => $this->admin->getAll_usuarios('VISITANTE'),
            ),
            'cursos' => array(
                'civil' => $this->admin->getTotalCurso('ENGENHARIA CIVIL'),
                'producao' => $this->admin->getTotalCurso('ENGENHARIA DE PRODUÇÃO'),
                'eletrica' => $this->admin->getTotalCurso('ENGENHARIA ELÉTRICA'),
                'mecanica' => $this->admin->getTotalCurso('ENGENHARIA MECÂNICA'),
                'ambiental' => $this->admin->getTotalCurso('ENGENHARIA AMBIENTAL'),
            )
        );

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

    public function cursos_get()
    {
        $var = $this->admin->getTotalCurso('ENGENHARIA CIVIL');
        var_dump($var);
    }

}

/* End of file Estatisticas.php */
/* Location: ./application/controllers/Estatisticas.php */
