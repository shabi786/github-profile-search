import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client"
import '/styles.css'

const API_URL = "https://api.github.com/search/users?q=";

const getUserInfo = async (query) => {
    const data = await fetch(API_URL + query);
    const res = await data.json()
    console.log(res.items);
    return res.items || []

}

function App() {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const userInfo = await getUserInfo(search);
        setResults(userInfo);
    }
    return (
        <div className="container">
            <h1>Github User Search</h1>
            <div className="input-container">
                <input type="text" name="search"
                    id="search"
                    placeholder="Enter username"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="result-container">
                <h3>Results</h3>
                {results.map((user) => {
                    return (
                        <div className="user" key={user.id}>
                            <img src={user.avatar_url} alt="Profile" width="50" height="50" />
                            <a href={user.url} target="_blank" rel="noopener noreferrer">
                                {user.login}
                            </a>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default App;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)