import React, { useState, useEffect, useContext } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import { UserContext } from "../auth/UserContext";
const AdminPromo = () => {
  const { user, loading } = useContext(UserContext);

  if (!loading && user == null) {
    document.location.href = "/login";
  }

  if (!loading && user != null && !user.is_superuser) {
    document.location.href = "/login";
  }

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [promoData, setPromoData] = useState({
    promo_code: "",
    discount: "",
    type: "",
    uses: "",
    expiry: "",
  });
  // Effect hook to fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.dripsaint.com/api/promo`,
          {
            withCredentials: true,
          }
        );
        setProducts(response.data.products);
        console.log(response.data.products);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        // Handle error response or display error message
      }
    };

    fetchData(); // Call the async function
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert numeric values to numbers if applicable
    const newValue =
      name === "discount" || name === "uses" ? parseInt(value, 10) : value;

    setPromoData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const createPromoCode = async (promoData) => {
    try {
      const response = await axios.post(
        `https://api.dripsaint.com/api/promo/`,
        promoData,
        {
          withCredentials: true, // This will send cookies with the request
        }
      );
      console.log("Promo code created:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error creating promo code:", error.message);
      // Handle error response or display error message
      throw error;
    }
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
            New Promo code
          </button>
        </div>

        <div className="overflow-x-auto ">
          <table className="table text-white ">
            {/* head */}
            <thead>
              <tr className="text-white text-2xl">
                <th>Code</th>
                <th>Name</th>
                <th>Discount</th>
                <th>Type</th>
                <th>Uses</th>
                <th>Expiry</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </section>

      <dialog id="my_modal_10" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form
            method="dialog"
            onSubmit={(e) => {
              e.preventDefault();
              createPromoCode();
              console.log(promoData);
            }}
          >
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>

            <h3 className="font-bold text-lg mb-2">Promo Details</h3>
            <div className="grid grid-col-1 sm:grid-cols-2 gap-2">
              <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
                Code
                <input
                  type="text"
                  name="promo_code"
                  value={promoData.promo_code}
                  onChange={handleChange}
                  className="grow"
                />
              </label>

              <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
                Discount
                <input
                  type="number"
                  name="discount"
                  value={promoData.discount}
                  onChange={handleChange}
                  className=""
                />
              </label>
              <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
                Discount Type
                <input
                  type="text"
                  name="type"
                  value={promoData.type}
                  onChange={handleChange}
                  className=""
                />
              </label>
              <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
                Uses
                <input
                  type="number"
                  name="uses"
                  value={promoData.uses}
                  onChange={handleChange}
                  className="truncate"
                />
              </label>
              <label className="w-2/3 sm:w-full sm:max-w-none input input-bordered flex items-center gap-2">
                Expiry
                <input
                  type="date"
                  name="expiry"
                  value={promoData.expiry}
                  onChange={handleChange}
                  className="truncate"
                />
              </label>
            </div>
            <button type="submit" className="btn mt-4">
              Create Promo Code
            </button>
          </form>
        </div>
      </dialog>

      <dialog id="my_modal_3" className="modal ">
        <div className="modal-box w-11/12 max-w-5xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </dialog>
    </Layout>
  );
};

export default AdminPromo;
