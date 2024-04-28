import "./CrudOperations.css";
import "./CrudOperations.css";
import {  useRef, useEffect, useState } from 'react';
import axios from 'axios';

function CrudOperations() {
    const [dataa, setData] = useState('');
    const [fetchData, setFetchData] = useState([]);
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [flag, setFlag] = useState(true);

    const inputRef = useRef(null);

    useEffect(() => {
        handleFetchAllData();
    }, [dataa,fetchData])
    

   
///////////////////////// Insert Data //////////////////////////////////

    const handleInsert = async () => {
        try {
            await axios.post('http://localhost:3000/insertData', { dataa });
            window.alert('Data Inserted Successfully');
            setData('');
        } catch (err) {
            console.error("Error Inserting Data:", err);
        }
    }

///////////////////////// Delete Data //////////////////////////////////

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/deleteData/${id}`);
            window.alert('Data Deleted Successfully');
        } catch (error) {
            console.log('Error Deleting Data:', error);
        }
    };

///////////////////////// Fetch Data //////////////////////////////////

    const handleFetchAllData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/fetchAllData');
           
            setFetchData(response.data);
            if (query === '') {
                setFlag(true); 
                return; 
            }
        } catch (error) {
            console.log("Error In Fetching Data:", error);
        }
    }

///////////////////////// Search Data //////////////////////////////////

    const handleSearchData = async () => {
        try {
            
            const response = await axios.get(`http://localhost:3000/searchData?query=${query}`);
            setFlag(false);
            setSearchResults(response.data)
            
            
        }
        catch (error) {
            console.log('Error In Searching Data', error);
        }
    }

///////////////////////// Update Data //////////////////////////////////

    const handleUpdate = async (data , id) => {

        console.log("data :", data)
        setData(data)


        let buttonCrud = document.querySelector(".button-Crud");

        let btnSub = document.createElement("button");
        btnSub.id = "submitBtn";
        btnSub.innerText = "Submit";

       

        if(buttonCrud.querySelectorAll("#submitBtn").length == 0)
        {
            buttonCrud.appendChild(btnSub);
            document.querySelector(".insertBtn").style.display = "none";

        } 

        const handleBtnSub = async () => {

            const newUpdatedData = inputRef.current.value;

            try {

                console.log("dataa :",dataa)
               
                const response = await axios.put(`http://localhost:3000/updateData/${id}`, { newData: newUpdatedData });
                console.log(response);
            } catch (err) {
                console.error("Error updating data:", err);
            }
        
            document.querySelector(".insertBtn").style.display = "block";
            buttonCrud.removeChild(btnSub);
        };
        
        btnSub.onclick = handleBtnSub;

        

   }




    return (
        <>
            <div className="main-Crud">
                <div className="operation-Crud">
                    <div className="search-Crud">

                        <input type="text" placeholder="Enter Your Data" value={dataa} ref={inputRef} onChange={e => {setData(e.target.value);}} />

                        <input type="text" placeholder="Search Data" value={query} onChange={e => {setQuery(e.target.value); handleSearchData();}}/>

                        <div className="data-Crud">

                        {flag ? (
                            fetchData.map((item) => (
                                <div key={item.id}>
                                    <p><span>Id: {item.id}</span> Data: {item.data}</p>
                                    <button id="deleteBtn" onClick={() => handleDelete(item.id)}>Delete</button>
                                    <button id="updateBtn" onClick={() =>  handleUpdate(item.data, item.id)}>Update</button>
                                </div>
                            ))
                        ) : (
                            searchResults.map((item) => (
                                <div key={item.id}>
                                    <p><span>Id: {item.id}</span> Data: {item.data}</p>
                                </div>
                            ))
                        )}

                        
                        </div>
                    </div>
                    <div className="button-Crud">

                        <button className="insertBtn" onClick={handleInsert}>Insert</button>
                       
                    </div>
                </div>
            </div>
        </>
    );
}

export default CrudOperations;
