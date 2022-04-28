export const DisplayBox =({ header, list, emptyMessage }) => {


  return(
    <div className="box">
      <div className="box-title">{ header }</div>
      <div className="box-display">
        {list.length === 0 && 
          <div>
            {emptyMessage}
          </div>
        }

        {list.length > 0 &&
          <div>
            {list.map((item) => (
              <div>{item.title}</div>
            ))}
          </div>
        }
      </div>
    </div>
  )
}