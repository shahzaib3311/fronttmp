import React, { useEffect, useContext } from "react";
import Layout from "../Components/Layout";
import { UserContext } from "../auth/UserContext";

const Admin = () => {
  const { user, loading } = useContext(UserContext);

  if (!loading && user == null) {
    document.location.href = "/login";
  }

  if (!loading && user != null && !user.is_superuser) {
    document.location.href = "/login";
  }

  return (
    <Layout background="bg-gradient-to-r from-slate-900 to-slate-700">
      <div className="mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 my-28">
        <div className="">
          <a
            href="/admin/products"
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Products
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              A comprehensive products page showcasing all available items,
              providing seamless editing and effortless addition
              functionalities.{" "}
            </p>
          </a>
        </div>
        <div className="">
          <a
            href="/admin/designs"
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Designs
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              A comprehensive Designs page showcasing all available Designs,
              providing seamless editing and effortless addition
              functionalities.{" "}
            </p>
          </a>
        </div>
        <div>
          <a
            href="/admin/users"
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Users
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              The users page offers a comprehensive view of all users,
              empowering seamless management and interaction capabilities.
            </p>
          </a>
        </div>
        <div>
          <a
            href="/admin/cities"
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Available Locations
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              The Location page offers a comprehensive view of all delivery locations/cities,
              empowering seamless management and interaction capabilities.
            </p>
          </a>
        </div>
        <div>
          <a
            href="/admin/orders"
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Orders
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              The orders page presents an overview of all orders, facilitating
              streamlined management and interaction functionalities.
            </p>
          </a>
        </div>
        <div>
          <a
            href="/admin/promo"
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Promo Codes
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Unlock savings with our exclusive promo codes! Find all the latest
              deals and discounts in one convenient place.{" "}
            </p>
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
