import { useState, useEffect } from "react";

const Home = (props) => {
    const { warehouses, items } = props;
    const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);
    const [displayItems, setDisplayItems] = useState([]);
    const [displayWarehouses, setDisplayWarehouses] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    //Sets the displayWarehouses whenever warehouses updates
    useEffect(() => {
        setDisplayWarehouses(warehouses);
    }, [warehouses]);
    
    //Filters items based on the selectedWarehouseId
    useEffect(() => {
        if (selectedWarehouseId) {
            let updatedItems = items.filter((item) => item.warehouse.warehouseId === selectedWarehouseId);
            if (searchQuery) {
                updatedItems = updatedItems.filter((item) =>
                    item.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }
            setDisplayItems(updatedItems);
        } else {
            setDisplayItems([]);
        }
    }, [selectedWarehouseId, items, searchQuery]); 

    // Handles changes in the search input field
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }; 

    // Renders the list of warehouses
    const renderWarehouses = () => (
        <div>
            <div id="addWarehouseButtonContainer">
                <button className="addElementOrBackToWarehousesButton" onClick={addWarehouse}>ADD NEW WAREHOUSE</button>
            </div>
            {displayWarehouses.length ? displayWarehouses.map((warehouse) => (
                <div className="warehousesOrInventory" key={warehouse.warehouseId}>
                    <div className="warehouseInfoContainer">
                        <p>{warehouse.city}</p>
                        <p>{warehouse.address}</p>
                        <p>Capacity: {warehouse.maxCapacity}</p>
                    </div>
                    <div className="viewInventoryButtonContainer">
                        <button className="warehouseAndInventoryButtons" onClick={() => setSelectedWarehouseId(warehouse.warehouseId)}>VIEW INVENTORY</button>
                        <button className="warehouseAndInventoryButtons" onClick={() => editWarehouse(warehouse.warehouseId)}>EDIT WAREHOUSE</button>
                        <button className="warehouseAndInventoryButtons" onClick={() => deleteWarehouse(warehouse.warehouseId)}>DELETE WAREHOUSE</button>
                    </div>
                </div>
            )) : "No data available"}
        </div>
    );

    // Renders the inventory items for the selected warehouse
    const renderInventory = () => (
        <div>
            <div id="addItemOrBackToWarehousesButtonContainer">
                <button className="addElementOrBackToWarehousesButton" onClick={() => setSelectedWarehouseId(null)}>BACK TO WAREHOUSES</button>
                <button className="addElementOrBackToWarehousesButton" onClick={addItem}>ADD NEW ITEM</button>
            </div>
            {displayItems.length ? displayItems.map((item) => (
                <div className="warehousesOrInventory" key={item.itemId}>
                    <div className="inventoryContainer">
                        <p>Item Name:<br/>{item.name}</p>
                        <p>Quantity:<br/>{item.quantity}</p>
                        <p>Category:<br/>{item.category}</p>
                        <div className="inventoryButtonContainer">
                            <div className="inventoryButtonContainerContainer">
                                <button className="warehouseAndInventoryButtons" onClick={() => editInventoryItem(item.itemId)}>EDIT ITEM</button>
                                <button className="warehouseAndInventoryButtons" onClick={() => deleteItem(item.itemId)}>DELETE ITEM</button>
                            </div>
                        </div>
                    </div>
                </div>
            )) : "No items found for this warehouse."}
        </div>
    );
    
    // Adds a new warehouse to the database and updates the displayed list of warehouses
    const addWarehouse = async () => {
        const city = prompt("Enter city:");
        const address = prompt("Enter street address:");
        const capacity = prompt("Enter the max capacity:")
        if (city && address && capacity) {
            try {
                const newWarehouse = {
                    city: city,
                    address: address,
                    maxCapacity: capacity
                };
                const response = await fetch('http://localhost:8282/api/warehouses', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newWarehouse),
                });
                if (response.ok) {
                    const addedWarehouse = await response.json();
                    setDisplayWarehouses([...displayWarehouses, addedWarehouse]);
                } else {
                    alert("Failed to add warehouse. Please try again.");
                }
            } catch (error) {
                console.error('Error:', error);
                alert("An error occurred. Please try again.");
            }
        } else {
            alert("Please fill in all fields.");
        }
    };

    // Edits an existing warehouse's details in the database and updates the displayed list of warehouses
    const editWarehouse = async (warehouseId) => {
        const newCity = prompt("Enter new city name:", "");
        const newAddress = prompt("Enter new address:", "");
        const newCapacity = prompt("Enter new max capacity:", "");
        if (newCity && newAddress) {
            try {
                const updatedWarehouse = {
                    city: newCity,
                    address: newAddress,
                    maxCapacity: newCapacity,
                    warehouseid: warehouseId
                };
                const response = await fetch(`http://localhost:8282/api/warehouses/${warehouseId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedWarehouse),
                });
                if (response.ok) {
                    const updatedWarehouseResponse = await response.json();
                    setDisplayWarehouses(displayWarehouses.map(warehouse =>
                        warehouse.warehouseId === warehouseId ? updatedWarehouseResponse : warehouse
                    ));
                    alert("Warehouse successfully updated.");
                } else {
                    alert("Failed to edit warehouse. Please try again.");
                }
            } catch (error) {
                console.error('Error:', error);
                alert("An error occurred. Please try again.");
            }
        }
    };

    // Deletes a warehouse from the database and updates the displayed list of warehouses
    const deleteWarehouse = async (warehouseId) => {
        try {
            const response = await fetch(`http://localhost:8282/api/warehouses/${warehouseId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setDisplayWarehouses(displayWarehouses.filter(warehouse => warehouse.warehouseId !== warehouseId));
                alert("Warehouse successfully deleted.");
            } else {
                alert("Failed to delete warehouse. Please try again.");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred. Please try again.");
        }
    };

    // Adds a new item to the selected warehouse's inventory and updates the displayed list of items
    const addItem = async () => {
        const name = prompt("Enter item name:");
        const quantityInput = prompt("Enter item quantity:");
        const category = prompt("Enter item category:");
        const quantity = parseInt(quantityInput, 10);
        if (name && quantity && category && selectedWarehouseId) {
            // Find the selected warehouse
            const selectedWarehouse = warehouses.find(warehouse => warehouse.warehouseId === selectedWarehouseId);
            if (!selectedWarehouse) {
                alert("Selected warehouse not found.");
                return;
            }
            // Calculate total items' quantity in the warehouse
            const totalQuantityInWarehouse = items
                .filter(item => item.warehouse.warehouseId === selectedWarehouseId)
                .reduce((total, currentItem) => total + currentItem.quantity, 0);
            // Check if adding the new item exceeds the warehouse's capacity
            if (totalQuantityInWarehouse + quantity > selectedWarehouse.maxCapacity) {
                alert("ERROR: Adding this quantity would go over the max capacity of the warehouse. Item has not been added. Please double-check the quantity entered.");
                return;
            }
            // Proceed with adding the item if it doesn't exceed the capacity
            try {
                const newItem = {
                    name,
                    quantity,
                    category,
                    warehouse: {
                        warehouseId: selectedWarehouseId
                    }
                };
                const response = await fetch('http://localhost:8282/api/items', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newItem),
                });
                if (response.ok) {
                    const addedItem = await response.json();
                    setDisplayItems([...displayItems, addedItem]);
                    alert("Item added successfully.");
                } else {
                    alert("Failed to add item. Please try again.");
                }
            } catch (error) {
                console.error('Error:', error);
                alert("An error occurred. Please try again.");
            }
        } else {
            alert("Please fill in all fields.");
        }
    };

    // Edits an existing item's details in the inventory and updates the displayed list of items
    const editInventoryItem = async (itemId) => {
        const newName = prompt("Enter new item name:", "");
        const newQuantityInput = prompt("Enter new item quantity:", "");
        const newCategory = prompt("Enter new item category:", "");
        const newQuantity = parseInt(newQuantityInput, 10);
        if (newName && newQuantity && newCategory) {
            // Find the selected warehouse
            const selectedWarehouse = warehouses.find(warehouse => warehouse.warehouseId === selectedWarehouseId);
            if (!selectedWarehouse) {
                alert("Selected warehouse not found.");
                return;
            }
            // Calculate the total quantity in the warehouse before the edit
            let totalQuantityInWarehouse = items
                .filter(item => item.warehouse.warehouseId === selectedWarehouseId)
                .reduce((total, currentItem) => total + currentItem.quantity, 0);
            // Find the current item being edited and subtract its current quantity
            const currentItem = items.find(item => item.itemId === itemId);
            if (!currentItem) {
                alert("Item not found.");
                return;
            }
            // Adjust the total quantity for the proposed edit
            totalQuantityInWarehouse = totalQuantityInWarehouse - currentItem.quantity + newQuantity;
            // Check if the new total exceeds the warehouse's capacity
            if (totalQuantityInWarehouse > selectedWarehouse.maxCapacity) {
                alert("ERROR: Editing to this quantity would exceed the max capacity of the warehouse.");
                return;
            }
            // Proceed with the edit if it doesn't exceed the capacity
            try {
                const updatedItem = {
                    name: newName,
                    quantity: newQuantity,
                    category: newCategory,
                    warehouse: {
                        warehouseId: selectedWarehouseId
                    }
                };
                const response = await fetch(`http://localhost:8282/api/items/${itemId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedItem),
                });
                if (response.ok) {
                    const updatedItemResponse = await response.json();
                    setDisplayItems(displayItems.map(item => item.itemId === itemId ? updatedItemResponse : item));
                    alert("Item successfully edited.");
                } else {
                    alert("Failed to edit item. Please try again.");
                }
            } catch (error) {
                console.error('Error:', error);
                alert("An error occurred. Please try again.");
            }
        } else {
            alert("Please fill in all fields.");
        }
    };

    // Deletes an item from the inventory and updates the displayed list of items
    const deleteItem = async (itemId) => {
        try {
            const response = await fetch(`http://localhost:8282/api/items/${itemId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setDisplayItems(displayItems.filter(item => item.itemId !== itemId));
                alert("Item successfully deleted.");
            } else {
                alert("Failed to delete item. Please try again.");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div id="home">
            <div id="homeContainer">
                <h1 id="homeHeaderText">Warehouse List</h1>
                <div id="homeContents">
                    <div id="homeContentsSubheader">
                        <div id="homeContentsSubheaderTitles">
                            <span className={selectedWarehouseId == null ? "underlineMe" : ""}>WAREHOUSES</span>
                            <span className={selectedWarehouseId != null ? "underlineMe" : ""}>INVENTORY</span>
                        </div>
                        <input
                            type="search"
                            id="searchBar"
                            placeholder="Search Inventory"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        ></input>
                    </div>
                    <div id="allRows">
                        {selectedWarehouseId ? renderInventory() : renderWarehouses()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;