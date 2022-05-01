import { useEffect, useState } from "react";

export const Library = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);
  const roles = useContext(RolesContext);

  const navigate = useNavigate();

  const [library, setLibrary] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const res = await api.get('/users/me');
    const libList = await api.get('/books_read')
  }, [])



  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div>Library</div>
  )
}