import { Link } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin";
import NavbarAdmin from "./NavbarAdmin";

export default function Tracks() {
    return(
        <div>
                     <NavbarAdmin />
            {/* Main content */}
            <div className="flex flex-1">
                {/* Sidebar */}
           <SidebarAdmin />

                {/* Main content */}
                <main className="flex-1 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-semibold">Genre</h1>
                        <Link to="/createGenre" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Create Genre</Link>
                    </div>

                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search genre..."
                            className="p-2 border border-gray-300 rounded w-full"
                        />
                    </div>

                    <table className="min-w-full bg-white border border-gray-300 rounded">
                        <thead>
                            <tr>
                                <th className="p-2 border-b">ID</th>
                                <th className="p-2 border-b">Title</th>
                                <th className="p-2 border-b">Duration</th>
                                <th className="p-2 border-b">Song Url</th>
                                <th className="p-2 border-b">image Url</th>
                                <th className="p-2 border-b">album</th>
                                <th className="p-2 border-b">genre</th>
                                <th className="p-2 border-b">artist</th>
                                <th className="p-2 border-b" colSpan="2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {artist.map(g => ( */}
                                <tr >
                                    <td className="p-2 border-b">bnn</td>
                                    <td className="p-2 border-b">hhb</td>
                                    <td className="p-2 border-b">
                                        {/* <Link to={`/editGenre/${g.id}`} className="text-blue-500 hover:underline">Edit</Link> */}
                                    </td>
                                    <td className="p-2 border-b">
                                        {/* <button onClick={() => handleDelete(g.id)} className="text-red-500 hover:underline">Delete</button> */}
                                    </td>
                                </tr>
                            {/* ) */}
                            {/* )} */}
                            
                        </tbody>
                    </table>
                </main>
            </div>

        </div>
        
    )
}