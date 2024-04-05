package com.skillstorm.project1.controllers;

import com.skillstorm.project1.models.Warehouse;
import com.skillstorm.project1.services.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/warehouses")
public class WarehouseController {

    // Injects the WarehouseService into this controller.
    @Autowired
    private WarehouseService warehouseService;

    // Handles HTTP GET requests and returns a list of all warehouses.
    @GetMapping
    public List<Warehouse> getAllWarehouses() {
        return warehouseService.findAllWarehouses();
    }

    // Handles HTTP GET requests with a warehouse ID and returns the warehouse with the given ID.
    @GetMapping("/{id}")
    public ResponseEntity<Warehouse> getWarehouseById(@PathVariable Long id) {
        return ResponseEntity.of(warehouseService.findWarehouseById(id));
    }

    // Handles HTTP POST requests and creates a new warehouse with the provided details.
    @PostMapping
    public Warehouse createWarehouse(@RequestBody Warehouse warehouse) {
        return warehouseService.saveWarehouse(warehouse);
    }

    // Handles HTTP PUT requests with a warehouse ID and updates the warehouse with the given ID with the provided details.
    @PutMapping("/{id}")
    public ResponseEntity<Warehouse> updateWarehouse(@PathVariable Long id, @RequestBody Warehouse warehouseDetails) {
        Warehouse updatedWarehouse = warehouseService.updateWarehouse(id, warehouseDetails);
        if(updatedWarehouse == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedWarehouse);
    }

    // Handles HTTP DELETE requests with a warehouse ID and deletes the warehouse with the given ID.
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWarehouse(@PathVariable Long id) {
        if (warehouseService.deleteWarehouse(id)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}


