package com.skillstorm.project1.services;

import com.skillstorm.project1.models.Item;
import com.skillstorm.project1.repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ItemService {
    private final ItemRepository itemRepository;

    // Autowires the ItemRepository into this service, enabling CRUD operations on Item entities.
    @Autowired
    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    // Retrieves all items from the database.
    public List<Item> findAllItems() {
        return itemRepository.findAll();
    }

    // Finds a single item by its ID. Returns an Optional, which can either contain the found item or be empty.
    public Optional<Item> findItemById(Long id) {
        return itemRepository.findById(id);
    }

    // Saves a given item to the database. This can be a new item or an existing item being updated.
    public Item saveItem(Item item) {
        return itemRepository.save(item);
    }
    
    // Updates an existing item's details. If the item exists, it updates the item and saves it; otherwise, throws an exception.
    public Item updateItem(Long id, Item itemDetails) {
        return itemRepository.findById(id)
                .map(existingItem -> {
                    existingItem.setName(itemDetails.getName());
                    existingItem.setQuantity(itemDetails.getQuantity());
                    existingItem.setCategory(itemDetails.getCategory());
                    existingItem.setWarehouse(itemDetails.getWarehouse()); 
                    return itemRepository.save(existingItem);
                }).orElseThrow(() -> new RuntimeException("Item not found with id " + id));
    }

    // Deletes an item by its ID. If the item exists, it's removed; otherwise, it returns false.
    public boolean deleteItem(Long id) {
        boolean exists = itemRepository.existsById(id);
        if (exists) {
            itemRepository.deleteById(id);
            return true;
        }
        return false;
    }
}


