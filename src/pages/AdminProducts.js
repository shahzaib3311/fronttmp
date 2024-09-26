import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Layout from "../Components/Layout";
import axios from "axios";
import { UserContext } from "../auth/UserContext";

const AdminProducts = () => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  if (!loading && user == null) {
    document.location.href = "/login";
  }

  if (!loading && user != null && !user.is_superuser) {
    document.location.href = "/login";
  }

  const [products, setProducts] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product
  const [editValues, setEditValues] = useState({}); // State to keep track of form field values
  const [newProduct, setNewProduct] = useState({
    product_name: "",
    product_price: "",
    product_type: "",
    product_detail: "",
    discount_price: "",
    thumbnail: null,
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newProductType, setNewProductType] = useState(""); // New state for product type
  const [showProductTypeSuccessModal, setShowProductTypeSuccessModal] = useState(false);
  const [showEditSuccessModal, setShowEditSuccessModal] = useState(false);

  // Effect hook to fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get(
          `https://api.dripsaint.com/api/get_product/`,
          {
            withCredentials: true,
          }
        );
        setProducts(productResponse.data.products);

        const typeResponse = await axios.get(
          `https://api.dripsaint.com/api/product_type/`,
          {
            withCredentials: true,
          }
        );
        setProductTypes(typeResponse.data.product_types);
        console.log(typeResponse.data.product_types)
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        // Handle error response or display error message
      }
    };

    fetchData(); // Call the async function
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setEditValues({
      product_name: product.product_name,
      product_price: product.product_price,
      product_type: product.product_type,
      product_detail: product.product_detail,
      discount_price: product.discount_price,
      thumbnail: null, // Placeholder for file input
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
      thumbnail: e.target.files[0],
    }));
  };
  const handleNewProductTypeChange = (e) => {
    setNewProductType(e.target.value);
  };
  const handleAddProductType = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://api.dripsaint.com/api/product_type/`,
        { product_type: newProductType },
        { withCredentials: true }
      );
      if (response.status === 200) {
        //setProductTypes([...productTypes, response.data]); // Assuming the API returns the newly created product type
        setNewProductType("");
        document.getElementById("add_product_type_modal").close();
        setShowProductTypeSuccessModal(true);
      }
    } catch (error) {
      console.error("Failed to add product type:", error);
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();

    const updatedFields = {};
    for (const key in editValues) {
      if (editValues[key] !== selectedProduct[key]) {
        updatedFields[key] = editValues[key];
      }
    }

    const formData = new FormData();
    for (const key in updatedFields) {
      formData.append(key, updatedFields[key]);
    }

    try {
      const response = await axios.post(
        `https://api.dripsaint.com/api/update_product/${selectedProduct.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.map((prod) =>
            prod.id === selectedProduct.id ? response.data.product : prod
          )
        );
        setSelectedProduct(null);
        document.getElementById("my_modal_3").close();
        setShowEditSuccessModal(true);
      }
    } catch (error) {
      console.error("An error occurred while editing the product:", error);
    }
  };

  const closeEditModal = () => {
    setSelectedProduct(null);
    document.getElementById("my_modal_3").close();
  };

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleNewProductFileChange = (e) => {
    setNewProduct((prevValues) => ({
      ...prevValues,
      thumbnail: e.target.files[0],
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in newProduct) {
      formData.append(key, newProduct[key]);
    }

    try {
      const response = await axios.post(
        `https://api.dripsaint.com/api/add_product/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setProducts((prevProducts) => [...prevProducts, response.data.product]);
        setNewProduct({
          product_name: "",
          product_price: "",
          product_type: "",
          product_detail: "",
          discount_price: "",
          thumbnail: null,
        });
        document.getElementById("my_modal_10").close();
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error("An error occurred while adding the product:", error);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const closeEditSuccessModal = () => {
    setShowEditSuccessModal(false);
  };

  const handleRowClick = (id) => {
    navigate(`/product/${id}`);
  };
  
  const [mediaValues, setMediaValues] = useState({ product_id: "", media: null });
const [showMediaSuccessModal, setShowMediaSuccessModal] = useState(false);

const handleMediaInputChange = (e) => {
  const { name, value } = e.target;
  setMediaValues((prevValues) => ({
    ...prevValues,
    [name]: value,
  }));
};

const handleMediaFileChange = (e) => {
  setMediaValues((prevValues) => ({
    ...prevValues,
    media: e.target.files[0],
  }));
};

const handleAddProductMedia = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("product_id", mediaValues.product_id);
  formData.append("media", mediaValues.media);

  try {
    const response = await axios.post(
      `https://api.dripsaint.com/api/upload_product_images/${mediaValues.product_id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      setMediaValues({ product_id: "", media: null });
      document.getElementById("my_modal_11").close();
      setShowMediaSuccessModal(true);
    }
  } catch (error) {
    console.error("An error occurred while uploading the media:", error);
  }
};

const closeMediaSuccessModal = () => {
  setShowMediaSuccessModal(false);
};


return (
  <Layout background="bg-gradient-to-r from-stone-500 to-stone-700">
    <section className="mt-14 w-full p-8">
      <div className="flex my-4">
        <div className="flex-grow "></div>
        <button
          className="btn btn-success "
          onClick={() => document.getElementById("my_modal_10").showModal()}
        >
          Add product
        </button>
        <button
          className="btn btn-success ml-2"
          onClick={() => document.getElementById("add_product_type_modal").showModal()}
        >
          Add Product Type
        </button>
      </div>

      <div className="overflow-x-auto ">
        <table className="table text-white ">
          {/* head */}
          <thead>
            <tr className="text-white text-2xl">
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Type</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, index) => (
              <tr key={index} className="hover" onClick={() => handleRowClick(prod.id)}>
                <th>{prod.id}</th>
                <td>{prod.product_name}</td>
                <td>
                  {prod.discount_price ? (
                    <div>
                      <span className="line-through">{prod.product_price}</span>{" "}
                      <span className="text-red-500">{prod.discount_price}</span>
                    </div>
                  ) : (
                    prod.product_price
                  )}
                </td>
                <td>{prod.product_type}</td>
                <td>{prod.in_stock}</td>
                <td>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(prod);
                    }}
                    className="text-xs text-sky-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMediaValues({ product_id: prod.id, media: null });
                      document.getElementById("my_modal_11").showModal();
                    }}
                    className="text-xs text-green-400 ml-2"
                  >
                    Add Media
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
    <dialog id="add_product_type_modal" className="modal">
      <div className="modal-box">
        <form onSubmit={handleAddProductType}>
          <h3 className="font-bold text-lg">Add New Product Type</h3>
          <input
            type="text"
            placeholder="Enter product type"
            className="input input-bordered w-full"
            value={newProductType}
            onChange={handleNewProductTypeChange}
            required
          />
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" className="btn" onClick={() => document.getElementById("add_product_type_modal").close()}>Close</button>
          </div>
        </form>
      </div>
    </dialog>
    <dialog id="my_modal_10" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <form onSubmit={handleAddProduct}>
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>

          <h3 className="font-bold text-lg mb-2">Product Details</h3>
          <div className="grid grid-col-1 sm:grid-cols-2 gap-2">
            <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
              Name
              <input
                type="text"
                name="product_name"
                value={newProduct.product_name}
                onChange={handleNewProductChange}
                required
                className="grow"
              />
            </label>
            <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
              Price
              <input
                type="text"
                name="product_price"
                value={newProduct.product_price}
                onChange={handleNewProductChange}
                required
                className="grow"
              />
            </label>
            <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
              Type
              <select
                name="product_type"
                value={newProduct.product_type}
                onChange={handleNewProductChange}
                required
                className="grow"
              >
                <option value="" disabled>
                  Select type
                </option>
                {productTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.product_type}
                  </option>
                ))}
              </select>
            </label>
            <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
              Information
              <input
                type="text"
                name="product_detail"
                value={newProduct.product_detail}
                onChange={handleNewProductChange}
                required
                className="grow truncate"
              />
            </label>
            <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
              Discount Price
              <input
                type="text"
                name="discount_price"
                value={newProduct.discount_price}
                onChange={handleNewProductChange}
                className="grow"
              />
            </label>
          </div>
          <h3 className="font-bold text-lg my-2">Thumbnail</h3>
          <input
            type="file"
            name="thumbnail"
            onChange={handleNewProductFileChange}
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
          {selectedProduct && (
            <>
              <h3 className="font-bold text-lg mb-2">Product Details</h3>
              <div className="grid grid-col-1 sm:grid-cols-2 gap-2">
                <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
                  Name
                  <input
                    type="text"
                    name="product_name"
                    value={editValues.product_name || ""}
                    onChange={handleEditInputChange}
                    className="grow"
                  />
                </label>
                <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
                  Price
                  <input
                    type="text"
                    name="product_price"
                    value={editValues.product_price || ""}
                    onChange={handleEditInputChange}
                    className=""
                  />
                </label>
                <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
                  Type
                  <select
                    name="product_type"
                    value={editValues.product_type || ""}
                    onChange={handleEditInputChange}
                    required
                    className="grow"
                  >
                    <option value="" disabled>
                      Select type
                    </option>
                    {productTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.product_type}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
                  Information
                  <input
                    type="text"
                    name="product_detail"
                    value={editValues.product_detail || ""}
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
              </div>
              <h3 className="font-bold text-lg my-2">Thumbnail</h3>
              <div className="grid grid-col-1 sm:grid-cols-2 gap-2">
                <div className="avatar">
                  <div className="w-32 rounded">
                    <img
                      src={`https://api.dripsaint.com/${selectedProduct.thumbnail}`}
                      alt="Product Thumbnail"
                    />
                  </div>
                </div>
                <input
                  type="file"
                  name="thumbnail"
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
        <form onSubmit={handleAddProductMedia}>
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>

          <h3 className="font-bold text-lg mb-2">Add Product Media</h3>
          <div className="grid grid-col-1 sm:grid-cols-2 gap-2">
            <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
              Product ID
              <input
                type="text"
                name="product_id"
                value={mediaValues.product_id}
                onChange={handleMediaInputChange}
                required
                className="grow"
              />
            </label>
            <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
              Media
              <input
                type="file"
                name="media"
                onChange={handleMediaFileChange}
                required
                className="grow"
              />
            </label>
          </div>
          <button type="submit" className="btn btn-success my-2">
            Upload
          </button>
        </form>
      </div>
    </dialog>

    <dialog id="success_modal" className={`modal ${showSuccessModal ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Success!</h3>
        <p className="py-4">The product was added successfully.</p>
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
        <p className="py-4">The product was edited successfully.</p>
        <div className="modal-action">
          <button className="btn btn-primary" onClick={closeEditSuccessModal}>
            Close
          </button>
        </div>
      </div>
    </dialog>
    <dialog id="product_type_success_modal" className={`modal ${showProductTypeSuccessModal ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Success!</h3>
        <p>The product type was added successfully.</p>
        <div className="modal-action">
          <button className="btn btn-primary" onClick={() => setShowProductTypeSuccessModal(false)}>Close</button>
        </div>
      </div>
    </dialog>
    <dialog id="media_success_modal" className={`modal ${showMediaSuccessModal ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Success!</h3>
        <p className="py-4">The media was uploaded successfully.</p>
        <div className="modal-action">
          <button className="btn btn-primary" onClick={closeMediaSuccessModal}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  </Layout>
);
};



export default AdminProducts;
