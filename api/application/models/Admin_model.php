<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin_model extends CI_Model {

    public function totais($tabela)
    {
        return $this->db->count_all($tabela);
    }

    public function getAll_usuarios($tipo)
    {
        $this->db->select('*');
        $this->db->from('usuarios');
        $this->db->join('tipo_usuario', 'tipo_usuario.id = usuarios.id_tipo');
        $this->db->where('tipo_usuario.descricao',$tipo);
        return $this->db->count_all_results();
    }

    public function getUsuariosInscritos()
    {
        $this->db->select('DISTINCT(`id_usuario`)');
        $this->db->from('eventos_usuario');
        return $this->db->get()->num_rows();
    }

    public function getEventos()
    {
        $this->db->select('DISTINCT(e.id), e.descricao, e.vagas, e.inscritos, e.palestrante, e.sala, e.titulo, a.descricao as area, h.descricao as horario, d.descricao as data, t.descricao as tipo, c.descricao as campus');
        $this->db->from('eventos e');
        $this->db->join('areas a', 'a.id = e.id_area', 'inner');
        $this->db->join('horario h', 'h.id = e.id_horario', 'inner');
        $this->db->join('dia d', 'd.id = e.id_data', 'inner');
        $this->db->join('tipo_evento t', 't.id = e.id_tipo', 'inner');
        $this->db->join('campus c', 'c.id = e.id_unidade', 'inner');
        return $this->db->get('eventos')->result();

    }

    public function getTotalCurso($curso)
    {
        $this->db->select('DISTINCT(u.id)');
        $this->db->from('usuarios u');
        $this->db->join('cursos c', 'c.id = u.id_curso', 'inner');
        $this->db->where('c.descricao', $curso);
        return $this->db->count_all_results();
    }
}

/* End of file Admin_model.php */
/* Location: ./application/models/Admin_model.php */
