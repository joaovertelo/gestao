package com.gestao.domain;

import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;


/**
 * A PedidoProduto.
 */
@Entity
@Table(name = "pedido_produto")
@Document(indexName = "pedidoproduto")
public class PedidoProduto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantidade")
    private Integer quantidade;

    @Column(name = "preco")
    private Integer preco;

    @ManyToOne
    private Pedido pedido;

    @ManyToOne
    private Produto produto;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public PedidoProduto quantidade(Integer quantidade) {
        this.quantidade = quantidade;
        return this;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public Integer getPreco() {
        return preco;
    }

    public PedidoProduto preco(Integer preco) {
        this.preco = preco;
        return this;
    }

    public void setPreco(Integer preco) {
        this.preco = preco;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public PedidoProduto pedido(Pedido pedido) {
        this.pedido = pedido;
        return this;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }

    public Produto getProduto() {
        return produto;
    }

    public PedidoProduto produto(Produto produto) {
        this.produto = produto;
        return this;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
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
        PedidoProduto pedidoProduto = (PedidoProduto) o;
        if (pedidoProduto.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pedidoProduto.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PedidoProduto{" +
            "id=" + getId() +
            ", quantidade=" + getQuantidade() +
            ", preco=" + getPreco() +
            "}";
    }
}
