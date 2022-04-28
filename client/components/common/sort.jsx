export const Sort =({ }) => {
  return(
    <div>
      <label for="sorting">Sort by:</label>

      <select>
        <option>Title</option>
        <option>Author</option>
        <option>Genre</option>
        <option>Date Added</option>
        <option>Page Count</option>
      </select>
    </div>
  )
}