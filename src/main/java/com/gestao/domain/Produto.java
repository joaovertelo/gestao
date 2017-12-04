package com.gestao.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;


/**
 * A Produto.
 */
@Entity
@Table(name = "produto")
@Document(indexName = "produto")
public class Produto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

    @NotNull
    @Column(name = "preco", nullable = false)
    private Double preco;

    @OneToMany(mappedBy = "produto")
    @JsonIgnore
    private Set<PedidoProduto> pedidoProdutos = new HashSet<>();

    @ManyToOne
    private Categoria categoria;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Produto nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Double getPreco() {
        return preco;
    }

    public Produto preco(Double preco) {
        this.preco = preco;
        return this;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public Set<PedidoProduto> getPedidoProdutos() {
        return pedidoProdutos;
    }

    public Produto pedidoProdutos(Set<PedidoProduto> pedidoProdutos) {
        this.pedidoProdutos = pedidoProdutos;
        return this;
    }

    public Produto addPedidoProduto(PedidoProduto pedidoProduto) {
        this.pedidoProdutos.add(pedidoProduto);
        pedidoProduto.setProduto(this);
        return this;
    }

    public Produto removePedidoProduto(PedidoProduto pedidoProduto) {
        this.pedidoProdutos.remove(pedidoProduto);
        pedidoProduto.setProduto(null);
        return this;
    }

    public void setPedidoProdutos(Set<PedidoProduto> pedidoProdutos) {
        this.pedidoProdutos = pedidoProdutos;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public Produto categoria(Categoria categoria) {
        this.categoria = categoria;
        return this;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Produto produto = (Produto) o;
        if (produto.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), produto.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Produto{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", preco=" + getPreco() +
            "}";
    }
}
