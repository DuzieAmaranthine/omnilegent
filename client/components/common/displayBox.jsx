export const DisplayBox =({ header, list, emptyMessage }) => {


  return(
    <div className="box">
      <div className="box-title">
        <span>{ header }</span>
        <button className="add">+</button>
      </div>
      <div className="sort-box">
        <label htmlFor={`sorting-${header}`}>Sort by:</label>

        <select id={`sorting-${header}`}>
          <option>Title</option>
          <option>Author</option>
          <option>Genre</option>
          <option>Date Added</option>
          <option>Page Count</option>
        </select>
      </div>
      
      <div className="box-display">
        {list.length === 0 && 
          <div>
            {emptyMessage}
          </div>
        }

        {list.length > 0 &&
          <div>
            {list.map((item) => (
              <div key={item.id}>{item.title}</div>
            ))}
          </div>
        }
      </div>
    </div>
  )
}