import { useState } from "react";
import { usePost } from "../../utils/use_post";
import { ClipLoader } from "react-spinners";


export const ChatColumn = ({ currentBookClub, user, loading}) => {

  const [contents, setContents] = useState('');
  const [posts, sendPosts, loadingPosts] = usePost(currentBookClub);

  const send = async() => {
    if (contents === '') {
      return;
    }

    sendPosts(contents, user);
    setContents('');
  }

  if (currentBookClub === null) {
    return (
      <div>Insert Book Image</div>
    )
  }

  return (
    
    <div className="col-box"><ClipLoader color="#1a3b2b"></ClipLoader></div>
  )
}