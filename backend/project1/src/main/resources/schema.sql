drop table if exists Items;
drop table if exists Warehouses;

CREATE TABLE Warehouses (
    WarehouseId SERIAL PRIMARY KEY,
    City VARCHAR(255) NOT NULL,
    Address TEXT NOT NULL,
    MaxCapacity INTEGER NOT NULL CHECK (MaxCapacity > 0)
);

CREATE TABLE Items (
    ItemId SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Quantity INTEGER NOT NULL CHECK (Quantity >= 0),
    Category VARCHAR(255) NOT NULL,
    WarehouseId INTEGER REFERENCES Warehouses(WarehouseId)
        ON DELETE SET NULL
);

