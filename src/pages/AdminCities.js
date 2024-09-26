import React, { useState, useEffect, useContext } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import { UserContext } from "../auth/UserContext";

const AdminCities = () => {
  const { user, loading } = useContext(UserContext);


  if (!loading && user == null) {
    document.location.href = "/login";
  }

  if (!loading && user != null && !user.is_superuser) {
    document.location.href = "/login";
  }

  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCity, setCurrentCity] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const fetchCities = async () => {
    try {
      const response = await axios.get(`https://api.dripsaint.com/api/city/`, {
        withCredentials: true,
      });
      setCities(response.data.cities || []);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
      setIsLoading(false);
    }
  };

  // Fetch cities when component mounts
  useEffect(() => {
    fetchCities();
  }, []);

  const handleAddOrUpdateCity = async (event) => {
    event.preventDefault();
    const form = event.target;
    const cityData = {
      city: form.city.value,
      shipping_charges: form.shipping_charges.value,
      is_active: form.is_active.checked,
    };

    try {
      const url = currentCity ? `https://api.dripsaint.com/api/update_city/${currentCity.id}` : `https://api.dripsaint.com/api/city/`;
      const response = await axios.post(url, cityData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        console.log(response.data)
        setShowSuccessModal(true);
        setCurrentCity(null);
        fetchCities();
        document.getElementById("add_city_modal").close();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEditCity = (city) => {
    setCurrentCity(city);
    const modal = document.getElementById("add_city_modal");
    modal.showModal();
  };

  const handleUpdateCity = async (event) => {
    event.preventDefault();
    const form = event.target;
    const cityData = {};

    if (form.shipping_charges.value !== currentCity.shipping_charges.toString()) {
      cityData.shipping_charges = form.shipping_charges.value;
    }

    if (form.is_active.checked !== currentCity.is_active) {
      cityData.is_active = form.is_active.checked;
    }

    try {
      const response = await axios.post(`https://api.dripsaint.com/api/update_city/${currentCity.id}/`, cityData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setShowSuccessModal(true);
        setCurrentCity(null);
        fetchCities();
        document.getElementById("add_city_modal").close();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDeleteCity = async (cityId) => {
    try {
      const response = await axios.post(`https://api.dripsaint.com/api/delete_city/${cityId}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        fetchCities();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCloseModal = () => {
    setCurrentCity(null);
    const modal = document.getElementById("add_city_modal");
    modal.close();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout background="bg-gradient-to-r from-stone-500 to-stone-700">
      <section className="mt-14 w-full p-8">
        <div className="overflow-x-auto">
          <button
            onClick={() => document.getElementById("add_city_modal").showModal()}
            className="btn btn-primary mt-4"
          >
            Add City
          </button>
          <table className="table text-white">
            <thead>
              <tr className="text-white text-2xl">
                <th>ID</th>
                <th>City</th>
                <th>Shipping Charges</th>
                <th>Is Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city, index) => (
                <tr key={index} className="hover">
                  <th>{city.id}</th>
                  <td>{city.city}</td>
                  <td>{city.shipping_charges}</td>
                  <td>{city.is_active ? "Yes" : "No"}</td>
                  <td>
                    <button onClick={() => handleEditCity(city)} className="btn btn-sm btn-primary">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteCity(city.id)} className="btn btn-sm btn-danger ml-2">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <dialog id="add_city_modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form onSubmit={currentCity ? handleUpdateCity : handleAddOrUpdateCity}>
            <button type="button" onClick={handleCloseModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <h3 className="font-bold text-lg mb-2">{currentCity ? "Edit City" : "Add City"}</h3>
            <div className="grid grid-col-1 sm:grid-cols-2 gap-2">
              <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
                City
                <input type="text" name="city" defaultValue={currentCity ? currentCity.city : ""} className="grow" required disabled={!!currentCity} />
              </label>
              <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
                Shipping Charges
                <input type="number" name="shipping_charges" defaultValue={currentCity ? currentCity.shipping_charges : 0} className="grow" required />
              </label>
              <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
                Is Active
                <input type="checkbox" name="is_active" defaultChecked={currentCity ? currentCity.is_active : true} />
              </label>
            </div>
            <button type="submit" className="btn btn-primary mt-4">
              {currentCity ? "Update" : "Add"} City
            </button>
          </form>
        </div>
      </dialog>

      {showSuccessModal && (
        <dialog open className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg mb-2">Success</h3>
            <p>City has been successfully {currentCity ? "updated" : "added"}.</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="btn btn-primary mt-4"
            >
              OK
            </button>
          </div>
        </dialog>
      )}
    </Layout>
  );
};

export default AdminCities;
