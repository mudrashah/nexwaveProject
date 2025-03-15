import List from "./List";
const ListContainer = ({listNumber, lists}) => {
  return (
    <div style={{ width: "max-content" }}>
      <div
        className="card shadow-sm p-3 rounded" id={listNumber}
        style={{
          // minHeight: "50vh",
          minHeight:"70vh",
          maxHeight: "70vh",
          overflowY: "auto",
          backgroundColor: "#edf5ff",
          margin: "5px",
          minWidth:"270px"
        }}
      >
        <div className="d-flex align-items-center mb-3">
          <input type="checkbox" id={listNumber} className="me-2 listCheckBox" />
          <h5 className="fw-bold mb-0">List {listNumber} <span className="elementCount hide">({lists.length-1})</span></h5>
        </div>
        {lists.slice(1).map((list) => (
          <List key={list.id} list={list}  listNumber={listNumber} index={list.id}/>
        ))}
      </div>
    </div>
  );
};

export default ListContainer;
