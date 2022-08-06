import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../utils/api_context";
import { FaUsers } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import { MessageBox } from "../common/message_box";

export const UserOverview = ({currentBookClub, setCurrentBookClub, clubList, setCLubList, availableClubs, setAvailableClubs, user, openBookClubModal}) => {

  const api = useContext(ApiContext);

  // Display states
  const [displayClubs, setDisplayClubs] = useState(true);
  const [displayAvailableClubs, setDisplayAvailableClubs] = useState(false);
  const [displayMembers, setDisplayMembers] = useState(false);

  // Member states
  const [members, setMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(true);

  // Available club states
  const [loadingAvailableClubs, setLoadingAvailableClubs] = useState(true);
  
  useEffect( async () => {
    if (currentBookClub) {
      setLoadingMembers(true);
      const { members } = await api.get(`/current_members/:${currentBookClub.id}`);
      setMembers(members);
    }

    setLoadingMembers(false);
  }, [currentBookClub]);

  const joinClub = async (club) => {
    const newClub = await api.post(`/join_club/:${club.id}`);
    setCLubList([...clubList, newClub]);
    setAvailableClubs(availableClubs.filter((clubs) => clubs.id !== club.id));
    setCurrentBookClub(club);
  }

  const leaveClub = async (club) => {
    const newClub = await api.post(`/leave_club/:${club.id}`);
    setCLubList(clubList.filter((clubs) => clubs.id !== club.id));
    setAvailableClubs([...availableClubs, club]);

    if (club.id === currentBookClub.id) {
      setCurrentBookClub(null);
    }
  }

  const showClubs = () => {
    setDisplayClubs(true);
    setDisplayAvailableClubs(false);
    setDisplayMembers(false);
  }

  const showAvailableClubs = () => {
    setDisplayClubs(false);
    setDisplayAvailableClubs(true);
    setDisplayMembers(false);
  }

  const showMembers = () => {
    setDisplayClubs(false);
    setDisplayAvailableClubs(false);
    setDisplayMembers(true);
  }
  
  const banUser = async (user) => {
    const message = await api.post(`/ban_user/${currentBookClub.id}/${user.id}`);
    if (message.success) {
      setMembers(members.filter((member) => member.id !== user.id));
    }

    return;
  }

  return (
  <div className="col-box left-col">
    <div className="row-box"> 
      <AiFillHome 
        className={displayClubs ? "clubs-icons-box clubs-icons-box-active" : "clubs-icons-box"} 
        onClick={() => showClubs()} 
      />
      <FaUsers 
        className={displayMembers ? "clubs-icons-box clubs-icons-box-active" : "clubs-icons-box"}
        onClick={() => showMembers()}
      />
      <BsPlus 
        className={displayAvailableClubs ? "clubs-icons-box clubs-icons-box-active" : "clubs-icons-box"}
        onClick={() => showAvailableClubs()}
      />  
    </div>
    <div>

      {displayClubs && clubList.length > 0 && 
        <div>
          {clubList.map((club) => (
            <ClubBox
              boxKey={club.id}
              boxClub={club}
              leaveClub={leaveClub}
            ></ClubBox>
          ))}
        </div>
      }

      {displayClubs && clubList.length === 0 &&
        <MessageBox
          message={"Join a club!"}
          actionClick={() => showAvailableClubs()}
        ></MessageBox>
      }

      {displayMembers && members.length > 0 &&
        <div>
          {members.map((member) => (
            <MemberBox
              boxKey={member.id}
              boxMember={member}
              banUser={banUser}
            ></MemberBox>
          ))}
        </div>
      }

      <div>
      {displayAvailableClubs && availableClubs.length > 0 &&
        <div>
          <div className="gen-button confirm-button" onClick={() => openBookClubModal()}>Start Club</div>

          {availableClubs.map((club) => (
            <ClubBox
              boxKey={club.id}
              boxClub={club}
              joinClub={joinClub}
            ></ClubBox>
          ))}
        </div>
      }

      {displayAvailableClubs && availableClubs.length === 0 &&
        <MessageBox
          message={"Start A Club!"}
          actionClick={() => openBookClubModal()}
        ></MessageBox>
      }
      </div>
    </div>   
  </div>
  );
}