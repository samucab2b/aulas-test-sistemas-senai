package com.App_Service_Back.Categoria;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.transaction.TestTransaction;
import org.springframework.test.web.servlet.MockMvc;

import com.App_Service_Back.categoria.Categoria;
import com.App_Service_Back.categoria.CategoriaDTO;
import com.App_Service_Back.categoria.CategoriaService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.transaction.Transactional;

import org.springframework.http.MediaType;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;


@SpringBootTest
@AutoConfigureMockMvc
public class CategoriaTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("Verificando Rota de Listagem de Categorias")
    void index() throws Exception{
        mockMvc.perform(get("/categoria")
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());

        //isNotFound
    }
    
    @Test
    @DisplayName("Deve inserir um categoria")
    @Transactional
    @Rollback
    void create() throws Exception{
        Categoria categoriaExemplo = new Categoria();
        categoriaExemplo.setCategoria_nome("Nome");
        categoriaExemplo.setCategoria_descricao("Descrição");
        String jsonRequest = objectMapper.writeValueAsString(categoriaExemplo);
         
        mockMvc.perform(post("/categoria")
        .contentType(MediaType.APPLICATION_JSON)
        .content(jsonRequest)).andExpect(status().isCreated());

        TestTransaction.end();
    }


    @Test
    @DisplayName("Deve alterar uma categoria recem criada")
    @Transactional
    @Rollback
    void update() throws Exception{
        Categoria categoriaExemplo = new Categoria();
        categoriaExemplo.setCategoria_nome("Nome");
        categoriaExemplo.setCategoria_descricao("Descrição");
        String jsonRequest = objectMapper.writeValueAsString(categoriaExemplo);

        String responseContent = mockMvc.perform(post("/categoria")
        .contentType(MediaType.APPLICATION_JSON)
        .content(jsonRequest)).andExpect(status().isCreated())
        .andReturn()
        .getResponse()
        .getContentAsString();

        System.out.println(responseContent);

        JsonNode jsonNode = objectMapper.readTree(responseContent);
        Long id = jsonNode.get("categoria_id").asLong();

        Categoria categoriaAtualizacao = new Categoria();
        categoriaAtualizacao.setCategoria_id(id);
        categoriaAtualizacao.setCategoria_nome("Nome atualizado");
        categoriaAtualizacao.setCategoria_descricao("Descrição atualizado");

        String jsonRequestAtualizacao = objectMapper.writeValueAsString(categoriaAtualizacao);

        mockMvc.perform(put("/categoria/" + id)
        .contentType(MediaType.APPLICATION_JSON)
        .content(jsonRequestAtualizacao))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.categoria_nome").value("Nome atualizado"));

        TestTransaction.end();
    }
}
