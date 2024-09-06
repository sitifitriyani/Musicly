import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import SidebarAdmin from "./SidebarAdmin";
import { Pencil, Trash } from "lucide-react";

const HistoryUser = () => {
  const [users, setUsers] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Tambahkan state untuk pencarian
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data:", error);
      });
  }, []);

  //   // Toggle menu sidebar
  //   const handleMenuClick = () => {
  //     setShowMenu(!showMenu);
  //   };

  // Handle delete user
  function handleDelete(id) {
    if (window.confirm("Apakah kamu yakin ingin menghapus pengguna ini?")) {
      axios
        .delete(`http://localhost:8080/users/${id}`,{
          withCredentials: true
        })
        .then((response) => {
          if (response.status === 200) {
            setUsers(users.filter((user) => user.id !== id));
            setAlertMessage("Pengguna berhasil dihapus!");
          } else {
            setAlertMessage("Gagal menghapus pengguna.");
          }
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          setAlertMessage("Gagal menghapus pengguna.");
        });
    }
  }

  // Handle edit user
  function handleEdit(user) {
    navigate("/editUser", { state: { user } });
  }

  // Filter users berdasarkan input pencarian
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      {alertMessage && <div className="alert alert-info">{alertMessage}</div>}
      <NavbarAdmin />
      <main className="bg-gray-900 min-h-screen p-5 flex gap-5">
        <div className="w-60 h-max bg-gray-800 rounded-lg">
          <SidebarAdmin />
        </div>
        <div className="flex-1 bg-gray-800 rounded-lg">
          <div className="flex justify-between p-3 items-center">
            <h1 className="text-4xl font-bold text-purple-500">History</h1>
            {/* <Link
              to="/createGenre"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Create Genre
            </Link> */}
          </div>
          <div className="p-3">
            <input
              type="text"
              placeholder="Search user..."
              className="p-2 bg-gray-700 rounded w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <table className="w-full p-5 bg-gray-700 text-white rounded ">
          <thead>
                <tr className=" text-white">
                  <th className="py-3 px-4 text-left border border-gray-300">
                    No
                  </th>
                  <th className="py-3 px-4 text-left border border-gray-300">
                    Nama Lengkap
                  </th>
                  <th className="py-3 px-4 text-left border border-gray-300">
                    Email
                  </th>
                  <th className="py-3 px-4 text-left border border-gray-300">
                    Role
                  </th>
                  <th className="py-3 px-4 text-left border border-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers
                  .filter((user) => user.role === "user" || user.role === "admin")
                  .map((user, index) => (
                    <tr
                      key={user.id}
                      className="bg-gray-800"
                    >
                      <td className="py-2 px-4 text-white border border-gray-300">
                        {index + 1}
                      </td>
                      <td className="py-2 px-4 text-white border border-gray-300">
                        {user.username}
                      </td>
                      <td className="py-2 px-4 text-white border border-gray-300">
                        {user.email}
                      </td>
                      <td className="py-2 px-4 text-white border border-gray-300">
                        {user.role}
                      </td>
                      <td className="flex justify-evenly p-2 border">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-blue-500 hover:underline flex items-center gap-2"
                        >
                          <Pencil className="w-4 h-4" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-500 hover:underline flex items-center gap-2"
                        >
                          <Trash className="w-4 h-4" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
      </main>
    </div>
  );
};

export default HistoryUser;
