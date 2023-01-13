import { useState } from "react";
import { Button } from "../common/button";

export const ClubModal = ({ addClub, close }) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const newClub = async () => {
    if (title === '' || description === '') {
      return;
    }

    let newClub = {
      title : title,
      description : description,
      isPublic : isPublic,
    }

    addClub(newClub);
    close();
  }

return (
  <div className="dark-back" onClick={close}>
    <div className="centered-modal">
      <div className="modal-container">
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-title">Create a New Book Club</div>
          <div className="bc-form">
            <div className="input-fields">
              <label htmlFor="title">Club Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label htmlFor="description">Club Description:</label>
              <textarea
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div>
                <label htmlFor="isPublic">Public:</label>
                <input
                  type="checkbox"
                  id="isPublic"
                  name="isPublic"
                  value={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                />
              </div>


            </div>

          </div>

          <div className="modal-buttons">
                <Button onClick={close}>Cancel</Button>
                <Button onClick={() => newClub()}>Create</Button>
          </div>

        </div>
      </div>
    </div>
  </div>
)
}