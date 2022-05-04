export const DisplayBox =({ header, list, emptyMessage }) => {

  return(
    <div>
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
              <div key={item.id} className="list-display">
                <div>{item.title}</div>
                <div 
                   
                  >{item.thumbnail ? <img src={item.thumbnail} alt={item.title} /> : ''}{item.author ? ` by ${item.author}` : ''}</div>
                
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  )
}