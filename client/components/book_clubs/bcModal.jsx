import { useState } from 'react';
import { Button } from '../common/button';

export const BcModal = ({ addClub, closeModal }) => {
  const [clubTitle, setClubTitle] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [clubTopic, setClubTopic] = useState('');
  const [clubDesc, setClubDesc] = useState('');

  const add = async () => {
    if (clubTitle === '') {
      return;
    }

    let newClub = {
      title : clubTitle,
      meetingTime : meetingTime,
      description : clubDesc,
      currentTopic : clubTopic
    }

    addClub(newClub);

    setClubTitle('');
    setMeetingTime('');
    setClubTopic('');
    setClubDesc('');

    return;
  }

  return (
    <>
      <div className='dark-back' onClick={closeModal}>
        <div className="centered-modal">
          <div className="bc-modal-container">
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-title">Create a New Book Club</div>

              <div className="bc-form">
                <form>
                  <div className="input-fields">
                    <label htmlFor="ctitle">Club Name:</label>
                    <input 
                      type="text" 
                      id="ctitle" 
                      name="ctitle"
                      value={clubTitle}
                      onChange={(e) => setClubTitle(e.target.value)} 
                    />

                    <label htmlFor="meet">Meeting Time:</label>
                    <input 
                      type="text" 
                      id="meet" 
                      name="meet" 
                      value={meetingTime}
                      onChange={(e) => setMeetingTime(e.target.value)}
                    />
                      

                    <label htmlFor="bgenre">Current Topic:</label>
                    <input 
                      type="text" 
                      id="topic" 
                      name="topic"
                      value={clubTopic}
                      onChange={(e) => setClubTopic(e.target.value)}

                    />
                  
                    <label htmlFor="cdescription">Description:</label>
                    <textarea 
                      type="text" 
                      id="cdescription" 
                      name="cdescription" 
                      className="bdisc"
                      value={clubDesc}
                      onChange={(e) => setClubDesc(e.target.value)}

                    />
                  </div>
                </form>
              </div>
              
              <div className="modal-buttons">
                <Button onClick={closeModal}>Cancel</Button>
                <Button onClick={() => add()}>Create</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};