package com.skillstorm.project1.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Warehouses")
public class Warehouse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long warehouseid;
    private String city;
    private String address;

    @Column(name = "maxcapacity")
    private Integer maxCapacity;
    
    public Warehouse() {
    }

    public Warehouse(String city, String address, Integer maxCapacity) {
        this.city = city;
        this.address = address;
        this.maxCapacity = maxCapacity; 
    }

    public Long getWarehouseId() {
        return warehouseid;
    }

    public void setWarehouseId(Long warehouseId) {
        this.warehouseid = warehouseId;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getMaxCapacity() {
        return maxCapacity;
    }

    public void setMaxCapacity(Integer maxCapacity) {
        this.maxCapacity = maxCapacity;
    }
}

