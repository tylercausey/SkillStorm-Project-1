import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import { Header, Home} from "./components";

const appElement = document.getElementById("app")

const App = () => { 
    const [warehouses, setWarehouses] = useState([]);
    const [items, setItems] = useState([]);

    // Effect hook to fetch warehouses and items data from the API when the component mounts.
    useEffect(()=> {
        fetchWarehouses();
        fetchItems();
    }, [])

    // Asynchronous function to fetch warehouses data from the backend API.
    async function fetchWarehouses() {
        try {
            const response = await fetch(`http://localhost:8282/api/warehouses`);
            const data = await response.json();
            setWarehouses(data)
        } catch(error) {
            console.log(error)
        }
    }

    // Asynchronous function to fetch items data from the backend API.
    async function fetchItems() {
        try {
            const response = await fetch(`http://localhost:8282/api/items`);
            const data = await response.json();
            setItems(data)
        } catch(error) {
            console.log(error)
        }
    }

    return ( 
        <div> 
            <Header/>
            <Home warehouses={warehouses} items={items} setItems={setItems}/> 
        </div> 
    ) 
}

const root = createRoot(appElement)
root.render(<App />)