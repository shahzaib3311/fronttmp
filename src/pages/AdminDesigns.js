import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Layout from "../Components/Layout";
import axios from "axios";
import { UserContext } from "../auth/UserContext";

const AdminDesigns = () => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  if (!loading && user == null) {
    document.location.href = "/login";
  }

  if (!loading && user != null && !user.is_superuser) {
    document.location.href = "/login";
  }

  const [designs, setDesigns] = useState([]);
  const [designTypes, setDesignTypes] = useState([]);
  const [shirtStyles, setShirtStyles] = useState([]); // State for shirt styles
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [newDesign, setNewDesign] = useState({
    design_name: "",
    design_detail: "",
    design_price: "",
    discount_price: "",
    image: null,
    design_type: "",
  });
  const [newShirtStyle, setNewShirtStyle] = useState({
    style: "",
    image: null,
  }); // State for new shirt style
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showEditSuccessModal, setShowEditSuccessModal] = useState(false);
  const [showShirtStyleSuccessModal, setShowShirtStyleSuccessModal] = useState(false); // State for shirt style success modal
  const [newDesignType, setNewDesignType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const designResponse = await axios.get(
          `https://api.dripsaint.com/api/get_design/`,
          {
            withCredentials: true,
          }
        );
        const designTypeResponse = await axios.get(
          `https://api.dripsaint.com/api/design_type/`,
          {
            withCredentials: true,
          }
        );
        const shirtStyleResponse = await axios.get(
          `https://api.dripsaint.com/api/shirt_styles/`,
          {
            withCredentials: true,
          }
        );
        setDesigns(designResponse.data.designs);
        setDesignTypes(designTypeResponse.data.design_types);
        setShirtStyles(shirtStyleResponse.data.shirt_styles); // Set shirt styles
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const openModal = (design) => {
    setSelectedDesign(design);
    setEditValues({
      design_name: design.design_name,
      design_detail: design.design_detail,
      design_price: design.design_price,
      discount_price: design.discount_price,
      image: null,
      design_type: design.design_type || "",
    });
    document.getElementById("my_modal_3").showModal();
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleEditFileChange = (e) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      image: e.target.files[0],
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const updatedFields = {};
    for (const key in editValues) {
      if (editValues[key] !== selectedDesign[key]) {
        updatedFields[key] = editValues[key];
      }
    }

    const formData = new FormData();
    for (const key in updatedFields) {
      formData.append(key, updatedFields[key]);
    }

    try {
      const response = await axios.post(
        `https://api.dripsaint.com/api/update_design/${selectedDesign.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setDesigns((prevDesigns) =>
          prevDesigns.map((des) =>
            des.id === selectedDesign.id ? response.data.design : des
          )
        );
        setSelectedDesign(null);
        document.getElementById("my_modal_3").close();
        setShowEditSuccessModal(true);
      }
    } catch (error) {
      console.error("An error occurred while editing the design:", error);
    }
  };

  const closeEditModal = () => {
    setSelectedDesign(null);
    document.getElementById("my_modal_3").close();
  };

  const handleNewDesignChange = (e) => {
    const { name, value } = e.target;
    setNewDesign((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleNewDesignFileChange = (e) => {
    setNewDesign((prevValues) => ({
      ...prevValues,
      image: e.target.files[0],
    }));
  };

  const handleAddDesign = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in newDesign) {
      formData.append(key, newDesign[key]);
    }

    try {
      const response = await axios.post(
        `https://api.dripsaint.com/api/add_design/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setDesigns((prevDesigns) => [...prevDesigns, response.data.design]);
        setNewDesign({
          design_name: "",
          design_detail: "",
          design_price: "",
          discount_price: "",
          image: null,
          design_type: "",
        });
        document.getElementById("my_modal_10").close();
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error("An error occurred while adding the design:", error);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const closeEditSuccessModal = () => {
    setShowEditSuccessModal(false);
  };

  const closeShirtStyleSuccessModal = () => {
    setShowShirtStyleSuccessModal(false);
  };

  const handleRowClick = (id) => {
    navigate(`/generated/no/${id}`);
  };

  const handleNewShirtStyleChange = (e) => {
    const { name, value } = e.target;
    setNewShirtStyle((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleNewShirtStyleFileChange = (e) => {
    setNewShirtStyle((prevValues) => ({
      ...prevValues,
      image: e.target.files[0],
    }));
  };

  const handleAddShirtStyle = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in newShirtStyle) {
      formData.append(key, newShirtStyle[key]);
    }

    try {
      const response = await axios.post(
        `https://api.dripsaint.com/api/shirt_styles/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setShirtStyles((prevShirtStyles) => [...prevShirtStyles, response.data.shirt_style]);
        setNewShirtStyle({
          style: "",
          image: null,
        });
        document.getElementById("my_modal_11").close();
        setShowShirtStyleSuccessModal(true);
      }
    } catch (error) {
      console.error("An error occurred while adding the shirt style:", error);
    }
  };
  const handleNewDesignTypeChange = (e) => {
    setNewDesignType(e.target.value);
  };

  const handleAddDesignType = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://api.dripsaint.com/api/design_type/`,
        { design_type: newDesignType },
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log(response.data.design_type)
        //setDesignTypes([...designTypes, response.data.design_types]);
        setNewDesignType("");
        document.getElementById("add_design_type_modal").close();
      }
    } catch (error) {
      console.error("Failed to add design type:", error);
    }
  };
  return (
    <Layout background="bg-gradient-to-r from-stone-500 to-stone-700">
      <section className="mt-14 w-full p-8">
        <div className="flex my-4">
          <div className="flex-grow "></div>
          <button
            className="btn btn-success mr-2"
            onClick={() => document.getElementById("my_modal_10").showModal()}
          >
            Add Design
          </button>
          <button
            className="btn btn-success mr-2"
            onClick={() => document.getElementById("my_modal_11").showModal()}
          >
            Add Shirt Style
          </button>
          <button
            className="btn btn-success"
            onClick={() => document.getElementById("add_design_type_modal").showModal()}
          >
            Add Design Type
          </button>
        </div>

        <div className="overflow-x-auto ">
          <table className="table text-white ">
            <thead>
              <tr className="text-white text-2xl">
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {designs.map((des, index) => (
                <tr key={index} className="hover" onClick={() => handleRowClick(des.id)}>
                  <th>{des.id}</th>
                  <td>{des.design_name}</td>
                  <td>
                    {des.discount_price ? (
                      <div>
                        <span className="line-through">{des.design_price}</span>{" "}
                        <span className="text-red-500">{des.discount_price}</span>
                      </div>
                    ) : (
                      des.design_price
                    )}
                  </td>
                  <td>{des.design_detail}</td>
                  <td>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(des);
                      }}
                      className="text-xs text-sky-400"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <dialog id="my_modal_10" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form onSubmit={handleAddDesign}>
            <button 
              type="button" 
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_10").close()}
            >
              ✕
            </button>

            <h3 className="font-bold text-lg mb-2">Design Details</h3>
            <div className="grid grid-col-1 sm:grid-cols-2 gap-2">
              <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
                Name
                <input
                  type="text"
                  name="design_name"
                  value={newDesign.design_name}
                  onChange={handleNewDesignChange}
                  required
                  className="grow"
                />
              </label>
              <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
                Price
                <input
                  type="text"
                  name="design_price"
                  value={newDesign.design_price}
                  onChange={handleNewDesignChange}
                  required
                  className="grow"
                />
              </label>
              <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
                Details
                <input
                  type="text"
                  name="design_detail"
                  value={newDesign.design_detail}
                  onChange={handleNewDesignChange}
                  required
                  className="grow"
                />
              </label>
              <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
                Discount Price
                <input
                  type="text"
                  name="discount_price"
                  value={newDesign.discount_price}
                  onChange={handleNewDesignChange}
                  className="grow"
                />
              </label>
              <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
                Design Type
                <select
                  name="design_type"
                  value={newDesign.design_type}
                  onChange={handleNewDesignChange}
                  required
                  className="grow"
                >
                  <option value="">Select Design Type</option>
                  {designTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.design_type}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <h3 className="font-bold text-lg my-2">Image</h3>
            <input
              type="file"
              name="image"
              onChange={handleNewDesignFileChange}
              required
              className="file-input file-input-bordered w-full max-w-xs"
            />
            <button type="submit" className="btn btn-success my-2">
              Submit
            </button>
          </form>
        </div>
      </dialog>

      <dialog id="my_modal_3" className="modal ">
        <div className="modal-box w-11/12 max-w-5xl">
          <form onSubmit={handleEdit}>
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeEditModal}
            >
              ✕
            </button>
            {selectedDesign && (
              <>
                <h3 className="font-bold text-lg mb-2">Design Details</h3>
                <div className="grid grid-col-1 sm:grid-cols-2 gap-2">
                  <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
                    Name
                    <input
                      type="text"
                      name="design_name"
                      value={editValues.design_name || ""}
                      onChange={handleEditInputChange}
                      className="grow"
                    />
                  </label>
                  <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
                    Price
                    <input
                      type="text"
                      name="design_price"
                      value={editValues.design_price || ""}
                      onChange={handleEditInputChange}
                      className=""
                    />
                  </label>
                  <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
                    Details
                    <input
                      type="text"
                      name="design_detail"
                      value={editValues.design_detail || ""}
                      onChange={handleEditInputChange}
                      className="truncate"
                    />
                  </label>
                  <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
                    Discount Price
                    <input
                      type="text"
                      name="discount_price"
                      value={editValues.discount_price || ""}
                      onChange={handleEditInputChange}
                      className=""
                    />
                  </label>
                  <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
                    Design Type
                    <select
                      name="design_type"
                      value={editValues.design_type || ""}
                      onChange={handleEditInputChange}
                      required
                      className="grow"
                    >
                      <option value="">Select Design Type</option>
                      {designTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.design_type}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <h3 className="font-bold text-lg my-2">Image</h3>
                <div className="grid grid-col-1 sm:grid-cols-2 gap-2">
                  <div className="avatar">
                    <div className="w-32 rounded">
                      <img
                        src={`https://api.dripsaint.com/${selectedDesign.image}`}
                        alt="Design Image"
                      />
                    </div>
                  </div>
                  <input
                    type="file"
                    name="image"
                    onChange={handleEditFileChange}
                    className="file-input-sm sm:file-input-md file-input-bordered w-full max-w-xs"
                  />
                </div>
                <button type="submit" className="btn btn-success my-2">
                  Submit
                </button>
              </>
            )}
          </form>
        </div>
      </dialog>

      <dialog id="my_modal_11" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form onSubmit={handleAddShirtStyle}>
            <button 
              type="button" 
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_11").close()}
            >
              ✕
            </button>

            <h3 className="font-bold text-lg mb-2">Add Shirt Style</h3>
            <div className="grid grid-cols-3 gap-2">
              {shirtStyles.map((style) => (
                <div key={style.id} className="p-2">
                  <img src={`https://api.dripsaint.com/${style.image}`} alt={style.style_name} className="rounded-lg w-24 h-24 object-cover" />
                  <p className="text-center mt-2">{style.style_name}</p>
                </div>
              ))}
            </div>
            <h3 className="font-bold text-lg mb-2 mt-4">New Shirt Style</h3>
            <div className="grid grid-col-1 sm:grid-cols-2 gap-2">
              <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
                Style Name
                <input
                  type="text"
                  name="style"
                  value={newShirtStyle.style}
                  onChange={handleNewShirtStyleChange}
                  required
                  className="grow"
                />
              </label>
              <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
                Image
                <input
                  type="file"
                  name="image"
                  onChange={handleNewShirtStyleFileChange}
                  required
                  className="grow"
                />
              </label>
            </div>
            <button type="submit" className="btn btn-success my-2">
              Submit
            </button>
          </form>
        </div>
      </dialog>
      <dialog id="add_design_type_modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form onSubmit={handleAddDesignType}>
            <h3 className="font-bold text-lg mb-2">Add Design Type</h3>
            <input
              type="text"
              placeholder="Enter design type"
              value={newDesignType}
              onChange={handleNewDesignTypeChange}
              required
              className="input input-bordered w-full max-w-xs"
            />
            <div className="modal-action">
              <button type="submit" className="btn btn-success">Submit</button>
              <button type="button" className="btn" onClick={() => document.getElementById("add_design_type_modal").close()}>Close</button>
            </div>
          </form>
        </div>
      </dialog>
      <dialog id="success_modal" className={`modal ${showSuccessModal ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Success!</h3>
          <p className="py-4">The design was added successfully.</p>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={closeSuccessModal}>
              Close
            </button>
          </div>
        </div>
      </dialog>

      <dialog id="edit_success_modal" className={`modal ${showEditSuccessModal ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Success!</h3>
          <p className="py-4">The design was edited successfully.</p>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={closeEditSuccessModal}>
              Close
            </button>
          </div>
        </div>
      </dialog>

      <dialog id="shirt_style_success_modal" className={`modal ${showShirtStyleSuccessModal ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Success!</h3>
          <p className="py-4">The shirt style was added successfully.</p>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={closeShirtStyleSuccessModal}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </Layout>
  );
};
export default AdminDesigns;