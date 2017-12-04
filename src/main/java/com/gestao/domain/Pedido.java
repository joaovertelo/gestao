package com.gestao.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;


/**
 * A Pedido.
 */
@Entity
@Table(name = "pedido")
@Document(indexName = "pedido")
public class Pedido implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data")
    private ZonedDateTime data;

    @ManyToOne
    private Cliente cliente;

    @OneToMany(mappedBy = "pedido")
    @JsonIgnore
    private Set<PedidoProduto> pedidoProdutos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getData() {
        return data;
    }

    public Pedido data(ZonedDateTime data) {
        this.data = data;
        return this;
    }

    public void setData(ZonedDateTime data) {
        this.data = data;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public Pedido cliente(Cliente cliente) {
        this.cliente = cliente;
        return this;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Set<PedidoProduto> getPedidoProdutos() {
        return pedidoProdutos;
    }

    public Pedido pedidoProdutos(Set<PedidoProduto> pedidoProdutos) {
        this.pedidoProdutos = pedidoProdutos;
        return this;
    }

    public Pedido addPedidoProduto(PedidoProduto pedidoProduto) {
        this.pedidoProdutos.add(pedidoProduto);
        pedidoProduto.setPedido(this);
        return this;
    }

    public Pedido removePedidoProduto(PedidoProduto pedidoProduto) {
        this.pedidoProdutos.remove(pedidoProduto);
        pedidoProduto.setPedido(null);
        return this;
    }

    public void setPedidoProdutos(Set<PedidoProduto> pedidoProdutos) {
        this.pedidoProdutos = pedidoProdutos;
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
        Pedido pedido = (Pedido) o;
        if (pedido.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pedido.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Pedido{" +
            "id=" + getId() +
            ", data='" + getData() + "'" +
            "}";
    }
}
