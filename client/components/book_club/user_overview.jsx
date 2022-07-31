import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../utils/api_context";

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
  const [availableClubs, setAvailableClubs] = useState([]);
  const [loadingAvailableClubs, setLoadingAvailableClubs] = useState(true);
  
  useEffect(async () => {
    const { availableClubs } = await api.get('/available_clubs');
    setAvailableClubs(availableClubs);
    setLoadingAvailableClubs(false);
  }, [])
  
  useEffect( async () => {
    if (currentBookClub) {
      setLoadingMembers(true);
      const { members } = await api.get(`/current_members/:${currentBookClub.id}`);
      setMembers(members);
    }

    setLoadingMembers(false);
  }, [currentBookClub]);

  const joinClub = async (club) => {
    const { club } = await api.post(`/join_club/:${club.id}`);
    setCLubList([...clubList, club]);
    setAvailableClubs(availableClubs.filter((clubs) => clubs.id !== club.id));
    setCurrentBookClub(club);
  }

  const leaveClub = async (club) => {
    const { club } = await api.post(`/leave_club/:${club.id}`);
    setCLubList(clubList.filter((clubs) => clubs.id !== club.id));
    setAvailableClubs([...availableClubs, club]);

    if (club.id === currentBookClub.id) {
      setCurrentBookClub(null);
    }
  }

  return (
  <div>Hello from UserOverview</div>
  );
}