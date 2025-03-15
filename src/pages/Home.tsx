import React, { useEffect, useState,useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ListContainer from "./ListContainer";
import { ListContext } from "../context/ListContext";
const ListComponent = () => {
  const context = useContext(ListContext);
  const { listData, sampleListData, setListData, setSampleListData } = context;
  const [lists, setLists] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // const [selectedLists, setSelectedLists] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://apis.ccbp.in/list-creation/lists"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        setLists(responseData.lists || []);
        setIsLoading(false);
        setListData(groupByListNumberArray(responseData.lists));
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
   console.log("");
   
  }, [listData]);

const handleLayoutForCreateList=(index,secondIndex)=>{
  document.querySelector(".updateListBtn").classList.remove("hide")
  document.querySelector(".createBtn").classList.add("hide")
  document.querySelectorAll(".listCheckBox").forEach((checkbox) => {
    (checkbox as HTMLInputElement).checked = false; // Uncheck checkbox
    checkbox.classList.add("hide"); // Add 'hide' class
  });
  document.querySelectorAll(".elementCount").forEach((element) => {
    element.classList.remove("hide"); // Add 'hide' class
  });
  arrangeArrows(index,secondIndex)
}

const handleLayoutAfterCompletion=()=>{
  document.querySelector(".updateListBtn").classList.add("hide")
  document.querySelector(".createBtn").classList.remove("hide")
  document.querySelectorAll(".listCheckBox").forEach((checkbox) => {
    checkbox.classList.remove("hide"); // Add 'hide' class
  });
  document.querySelectorAll(".elementCount").forEach((element) => {
    element.classList.add("hide"); // Add 'hide' class
  });
  document.querySelectorAll(".arrow").forEach((element) => {
    element.classList.add("hide"); // Add 'hide' class
    element.classList.remove("rotate");
  });
}


const arrangeArrows=(index,secondIndex)=>{
  let listcontainer1= document.getElementById(index)
  let listcontainer2= document.getElementById(secondIndex)
  listcontainer1.querySelectorAll(".arrow").forEach((element) => {
    element.classList.remove("hide"); // Add 'hide' class
  });
  listcontainer2.querySelectorAll(".arrow").forEach((element) => {
    element.classList.remove("hide"); // Add 'hide' class
    element.classList.add("rotate");
  });
}


  const groupByListNumberArray = (array) => {
    let grouped = array.reduce((acc, obj) => {
      let key = obj.list_number;
      if (!acc[key]) acc[key] = [];
      if (!acc[key].some(item => item === key)) {
        acc[key].push(key);
      }
      acc[key].push(obj);
      return acc;
    }, {});

    return Object.values(grouped); // Convert to array of arrays
  };


  function insertArrayBetween(data, newArray, index1) {
    if (index1 < 0) {
      console.error("Invalid indexes");
      return data;
    }
    // Insert the new array between index1 and index2
    const updatedData = [...data.slice(0, index1+1), newArray, ...data.slice(index1+1)];
    return updatedData;
  }

  // Function to handle click and fetch checked checkboxes
  const handleCreateClick = () => {
    const checkedIds: number[] = [];
    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    setSampleListData(listData);
    checkboxes.forEach((checkbox) => {
      checkedIds.push(parseInt((checkbox as HTMLInputElement).id));
    });
    let index, secondIndex;
    if (checkedIds.length == 2) {
      index=listData.findIndex(subArray => subArray[0] === checkedIds[0])
      secondIndex=listData.findIndex(subArray => subArray[0] === checkedIds[1])
      setListData(
        insertArrayBetween(listData, [listData.length+1], index)
      );
      setTimeout(() => {
        handleLayoutForCreateList(checkedIds[0],checkedIds[1])
      }, 1);
    } else {
      alert("You should select exactly 2 lists to create a new list");
    }
  };

  const handleCancelClick=()=>{
    handleLayoutAfterCompletion()
    setListData(sampleListData)
  }
  const handleUpdateClick=()=>{
    handleLayoutAfterCompletion()
    setSampleListData(listData)
  }

  return (
    <div className="container-fluid py-5">
      <h1 className="text-center mb-4 fw-bold">List Creation</h1>
      <div className="text-center mb-4">
        <button onClick={handleCreateClick} className="createBtn btn btn-primary px-4 py-2">
          Create a new list
        </button>
      </div>

      {isLoading && <div className="text-center">Loading...</div>}
      {error && (
        <div className="text-center">
          <p className="text-danger">Failed to load data. Try again.</p>
          <button
            className="btn btn-danger"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <div
          className="listContainer row d-flex justify-content-start"
          style={{ flexWrap: "wrap" }}
        >
          {listData.map((list, index) => (
            <ListContainer key={index} listNumber={list[0]} lists={list} />
          ))}
        </div>
      )}
      <div className="updateListBtn text-center mt-4 hide">
      <button className="btn btn-outline-secondary px-4 py-2 me-2 cancelBtn" onClick={handleCancelClick}>Cancel</button>
      <button className="btn btn-primary px-4 py-2 updateBtn" onClick={handleUpdateClick}>Update</button>
      </div>
    </div>
  );
};

export default ListComponent;
