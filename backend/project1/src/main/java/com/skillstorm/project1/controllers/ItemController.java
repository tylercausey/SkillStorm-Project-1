package com.skillstorm.project1.controllers;

import com.skillstorm.project1.models.Item;
import com.skillstorm.project1.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/items")
public class ItemController {

    // Automatically injects an instance of ItemService into this controller.
    @Autowired
    private ItemService itemService;

    // Handles GET requests to /api/items and returns a list of all items.
    @GetMapping
    public List<Item> getAllItems() {
        return itemService.findAllItems();
    }

    // Handles GET requests to /api/items/{id} and returns the item with the specified ID.
    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
        return ResponseEntity.of(itemService.findItemById(id));
    }

    // Handles POST requests to /api/items and creates a new item with the provided item data.
    @PostMapping
    public Item createItem(@RequestBody Item item) {
        return itemService.saveItem(item);
    }

    // Handles PUT requests to /api/items/{id} and updates the item with the specified ID with the provided item details.
    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item itemDetails) {
        Item updatedItem = itemService.updateItem(id, itemDetails);
        if(updatedItem == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedItem);
    }

    // Handles DELETE requests to /api/items/{id} and deletes the item with the specified ID.
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        if (itemService.deleteItem(id)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}



