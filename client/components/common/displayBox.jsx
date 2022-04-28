export const DisplayBox =({  }) => {
  return(
    <div className="box">
      <div className="box-title">TBR List
        <button className="add">+</button>
      </div>
      <div className="sort-box">
        <label for="sorting">Sort by:</label>

        <select>
          <option>Title</option>
          <option>Author</option>
          <option>Genre</option>
          <option>Date Added</option>
          <option>Page Count</option>
        </select>
    </div>

      <div className="box-display">
        <ul>
          <li>Quarry in the Quince</li>
          <li>Revenge in the Roses</li>
          <li>Silenced in the Sunflowers</li>
          <li>Chuck Palahniuk 3rd BOOK!</li>
          <li>Eyes Like Stars</li>
          <li>The Hitchhikers Guide to the Galaxy</li>
          <li>My Gun is Quick</li>
          <li>The Night Circus</li>
          <li>A Midsummer Night's Steampunk</li>
        </ul>
      </div>
    </div>
  )
}