-- Warehouses
INSERT INTO Warehouses (City, Address, MaxCapacity) VALUES ('Baton Rouge', '123 Boudreaux Ln', 5000);
INSERT INTO Warehouses (City, Address, MaxCapacity) VALUES ('New Orleans', '456 Thibodeaux Dr', 7000);

-- Items 
-- Casual Shirts
INSERT INTO Items (Name, Quantity, Category, WarehouseId) VALUES ('Cotton Shirt', 150, 'Casual Shirts', 1);
INSERT INTO Items (Name, Quantity, Category, WarehouseId) VALUES ('Linen Shirt', 100, 'Casual Shirts', 1);
INSERT INTO Items (Name, Quantity, Category, WarehouseId) VALUES ('Checked Casual Shirt', 120, 'Casual Shirts', 2);
INSERT INTO Items (Name, Quantity, Category, WarehouseId) VALUES ('Denim Shirt', 80, 'Casual Shirts', 2);

-- Dress Shirts
INSERT INTO Items (Name, Quantity, Category, WarehouseId) VALUES ('Slim Shirt', 100, 'Dress Shirts', 1);
INSERT INTO Items (Name, Quantity, Category, WarehouseId) VALUES ('White Shirt', 60, 'Dress Shirts', 1);
INSERT INTO Items (Name, Quantity, Category, WarehouseId) VALUES ('Silk Dress Shirt', 70, 'Dress Shirts', 2);

-- T-Shirts
INSERT INTO Items (Name, Quantity, Category, WarehouseId) VALUES ('Band Shirt', 200, 'T-Shirts', 1);
INSERT INTO Items (Name, Quantity, Category, WarehouseId) VALUES ('Sports Shirt', 150, 'T-Shirts', 1);
INSERT INTO Items (Name, Quantity, Category, WarehouseId) VALUES ('Long Sleeve T-Shirt', 180, 'T-Shirts', 2);
INSERT INTO Items (Name, Quantity, Category, WarehouseId) VALUES ('Graphic T-Shirt', 220, 'T-Shirts', 2);

-- Polo Shirts
INSERT INTO Items (Name, Quantity, Category, WarehouseId) VALUES ('Striped Shirt', 160, 'Polo Shirts', 1);
INSERT INTO Items (Name, Quantity, Category, WarehouseId) VALUES ('Performance Polo Shirt', 140, 'Polo Shirts', 2);
INSERT INTO Items (Name, Quantity, Category, WarehouseId) VALUES ('Classic Shirt', 120, 'Polo Shirts', 1);
