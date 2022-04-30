import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../utils/api_context";

export const MembersBar = ({club, user}) => {
  const api = useContext(ApiContext);

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const members = api.get(`/club_members/${club.id}`);
    setMembers(members);
  
    setLoading(false);
  }, []);

  const getMemberIcon = (member) => {
    const memberSplit = member.split(' ');

    if (memberSplit.length === 1) {
      return (memberSplit[0][0] + memberSplit[0][1]).toUpperCase();
    }

    else {
      return (memberSplit[0][0] + memberSplit[memberSplit.length - 1][0]).toUpperCase();
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="member-bar">
      <div className="member-title">Members</div>
      <div className="user-icon">{getMemberIcon(user.firstName + ' ' + user.lastName)}</div>
      {members.length > 0 && 
        members.map((member) => (
          <div key={member.id} className="icon member-icon">{getMemberIcon(member.name)}</div>
        ))}
    </div>
  );
}