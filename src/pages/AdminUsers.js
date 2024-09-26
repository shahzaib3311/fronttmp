import React, { useState, useEffect, useContext } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import { UserContext } from "../auth/UserContext";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user, loading } = useContext(UserContext);

  if (!loading && user == null) {
    document.location.href = "/login";
  }

  if (!loading && user != null && !user.is_superuser) {
    document.location.href = "/login";
  }

  // Effect hook to fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.dripsaint.com/api/users/`, {
          withCredentials: true,
        });
        console.log(response.data.user);
        setUsers(response.data.user);
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData(); // Call the async function
  }, []);

  return (
    <Layout background="bg-gradient-to-r from-stone-500 to-stone-700">
      <section className="mt-14 w-full p-8">
        <div className="overflow-x-auto">
          <table className="table text-white">
            {/* head */}
            <thead>
              <tr className="text-white text-2xl">
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="hover">
                  <td>{`${user.first_name} ${user.last_name}`}</td>
                  <td>{user.email}</td>
                  <td>{user.is_superuser ? "Admin" : "Customer"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <dialog id="add_user_modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="font-bold text-lg mb-2">User Details</h3>
          <div className="grid grid-col-1 sm:grid-cols-2 gap-2">
            <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
              ID
              <input type="text" className="grow" />
            </label>
            <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
              Name
              <input type="text" className="" />
            </label>
            <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
              Email
              <input type="text" className="" />
            </label>
            <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
              Role
              <input type="text" className="" />
            </label>
          </div>
        </div>
      </dialog>
    </Layout>
  );
};

export default AdminUsers;
