package com.skillstorm.project1.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
@Table(name = "Items")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemid;
    private String name;
    private Integer quantity;
    private String category;

    @ManyToOne
    @JoinColumn(name = "warehouseid", nullable = true)
    private Warehouse warehouse;

    public Item() {
    }

    public Item(String name, Integer quantity, String category, Warehouse warehouse) {
        this.name = name;
        this.quantity = quantity;
        this.category = category;
        this.warehouse = warehouse;
    }

    public Long getItemId() {
        return itemid;
    }

    public void setItemId(Long itemId) {
        this.itemid = itemId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Warehouse getWarehouse() {
        return warehouse;
    }

    public void setWarehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
    }
}
