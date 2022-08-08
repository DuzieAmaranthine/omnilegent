import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./auth_context";
import { io } from "socket.io-client";

export const usePost = (bookClub) => {
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [posts, setPosts] = useState([]);
  const postsRef = useRef([]);
  const [socket, setSocket] = useState(null);
  const [authToken] = useContext(AuthContext);

  useEffect(() => {
    setLoadingPosts(true);
    if (bookClub) {
      const socket = io({
        auth : { token : authToken},
        query : {bookClubId : bookClub.id}
      });

      setSocket(socket);
      socket.on('post', (post) => {
        postsRef.current.push(post);
        setPosts([...postsRef.current]);
      });

      socket.on('initial-posts', (posts) => {
        postsRef.current = posts;
        setMessages(posts);
      });

      setLoadingPosts(false);
      return () => {
        socket.off('post');
        socket.off('initial-messages');
        socket.disconnect();
      };
    }
    setLoadingPosts(false);
    return () => {}
  }, [bookClub]);

  const sendPost = (newPost) => {
    socket.emit('post', newPost);
  };

  return [posts, sendPost, loadingPosts];
};