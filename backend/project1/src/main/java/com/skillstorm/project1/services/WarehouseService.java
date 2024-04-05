package com.skillstorm.project1.services;

import com.skillstorm.project1.models.Warehouse;
import com.skillstorm.project1.repositories.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class WarehouseService {
    private final WarehouseRepository warehouseRepository;

    // Automatically wires the WarehouseRepository into this service upon instantiation.
    @Autowired
    public WarehouseService(WarehouseRepository warehouseRepository) {
        this.warehouseRepository = warehouseRepository;
    }

    // Retrieves all warehouses from the database.
    public List<Warehouse> findAllWarehouses() {
        return warehouseRepository.findAll();
    }

    // Finds a single warehouse by its ID. Returns an Optional that may be empty if no warehouse is found.
    public Optional<Warehouse> findWarehouseById(Long id) {
        return warehouseRepository.findById(id);
    }

    // Saves a new warehouse to the database or updates an existing one if the warehouse ID already exists.
    public Warehouse saveWarehouse(Warehouse warehouse) {
        return warehouseRepository.save(warehouse);
    }

    // Updates an existing warehouse's information based on the provided details. Throws a runtime exception if the warehouse isn't found.
    public Warehouse updateWarehouse(Long id, Warehouse warehouseDetails) {
        return warehouseRepository.findById(id)
                .map(existingWarehouse -> {
                    existingWarehouse.setCity(warehouseDetails.getCity());
                    existingWarehouse.setAddress(warehouseDetails.getAddress());
                    existingWarehouse.setMaxCapacity(warehouseDetails.getMaxCapacity());
                    return warehouseRepository.save(existingWarehouse);
                }).orElseThrow(() -> new RuntimeException("Warehouse not found with id " + id));
    }

    // Deletes a warehouse by its ID. Returns true if the operation is successful, false if the warehouse does not exist.
    public boolean deleteWarehouse(Long id) {
        boolean exists = warehouseRepository.existsById(id);
        if (exists) {
            warehouseRepository.deleteById(id);
            return true;
        }
        return false;
    }
}



