export const DisplayBox =({ header, list, emptyMessage }) => {

  return(
    <div >
      <div className="box-title">
        <span>{ header }</span>
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
              <div className="list-display" key={item.id}>{item.title} {item.author ? ` by ${item.author}` : ''}</div>
            ))}
          </div>
        }
      </div>
    </div>
  )
}