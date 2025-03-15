import arrow from "../images/arrow.png";
import { ListContext } from "../context/ListContext";
import { useContext } from "react";
const List = ({ list, listNumber, index }) => {
  const context = useContext(ListContext);
  const { listData, setListData} = context;
  const handleArrowClick=(index,listNumber)=>{
    let idx=listData.findIndex(subArray => subArray[0] === listNumber)
    let didx=listData.findIndex(subArray => subArray[0] === listData.length)
    listData[idx].forEach((element,i) => {
      if(element.id===index){ 
        element.list_number=listData.length;
        listData[didx].push(element);
        listData[idx].splice(i,1)
        setListData(listData)
      }
    });
  }
  return (
    <div className="p-3 mb-3 rounded shadow-sm bg-white" id={listNumber}>
      <strong className="d-block">{list.name}</strong>
      <small className="text-muted">{list.description}</small>
      <img className="arrow hide" id={index} src={arrow} onClick={()=>handleArrowClick(index,listNumber)}></img>
    </div>
  );
};

export default List;
