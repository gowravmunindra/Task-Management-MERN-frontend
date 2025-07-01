import React, { useState, useEffect } from 'react'
import Cards from '../components/Home/Cards';
import { IoIosAddCircle } from "react-icons/io";
import InputData from '../components/Home/InputData';
import axios from 'axios';

const AllTasks = () => {
  const [InputDiv, setInputDiv] = useState("hidden");
  const [Data, setData] = useState();
  const [updatedData, setupdatedData] = useState({
    id: "",
    title: "",
    desc: "",
  });

  const headers = { 
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }

  useEffect(() => {
    const fetch = async () => {
       const response = await axios.get("http://localhost:1000/api/v2/get-all-tasks",{headers});
       setData(response.data.data);
    };
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      fetch();
    }
    
   });

  return (
      <>
          <div>
          <div className='w-full flex justify-end px-4 py-2'>
              <button onClick={() => setInputDiv("fixed")}>
                <IoIosAddCircle className="text-5xl text-gray-500 hover:text-gray-100 transistion-all duration-300"/>
              </button>
          </div>
            {Data && <Cards home = {"true"} setInputDiv = {setInputDiv} data = {Data.tasks} setupdatedData = {setupdatedData}/>}
          </div>
        <InputData InputDiv = {InputDiv} setInputDiv = {setInputDiv} updatedData = {updatedData} setupdatedData = {setupdatedData} />
      </>
  )
}

export default AllTasks;