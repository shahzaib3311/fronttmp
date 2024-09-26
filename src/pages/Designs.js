import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import DesignCard from "../Components/DesignCard";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


const Designs = () => {
  const {designId} = useParams()
  const [designs, setDesigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Effect hook to fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.dripsaint.com/api/get_design/`,
          {
            withCredentials: true,
          }
        );
        setIsLoading(true)
        if(designId=="ALL"){

    setDesigns(response.data.designs)
        } else{
          setDesigns(response.data.designs.filter(design=>design.design_type==designId))

        }
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        // Handle error response or display error message
      }
    };

    fetchData(); // Call the async function
  }, []);






  return (
    <Layout background="bg-no-repeat bg-gradient-to-r from-pink-500 to-purple-600 ">
      <div className="h-full">
        <section className="mt-12">
          <div className="flex items-center justify-center">
            <p className="text-white text-7xl sm:text-8xl font-bold">
              Collection
            </p>
          </div>
        </section>
        <section className="p-4 mt-8">
         
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {designs.map((design, id) => (
                <Link to={`/generated/no/${design.id}`} key={id}>
                  <DesignCard
                    name={design.design_name}
                    price={design.design_price}
                    discount={design.discount_price}
                    img={design.image}
                    desc={design.design_detail}
                  />
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Designs;
