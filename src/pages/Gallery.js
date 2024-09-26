import React, {useEffect, useState} from "react";
import Layout from "../Components/Layout";
import ProductCard from "../Components/ProductCard";
import axios from "axios";
import { Link } from "react-router-dom";

const Gallery = () => {
  /*
  const products = [
    {
      id: 1,
      name: "Blue Graphic Tee",
      pricePKR: 1200,
      description: "Blue T-shirt with a cool graphic design",
      imgLink:
        "https://i.pinimg.com/236x/53/f2/8d/53f28d35d2d536a7bce0050c5729d859.jpg",
    },
    {
      id: 2,
      name: "Black V-neck Shirt",
      pricePKR: 1500,
      description: "Black V-neck T-shirt made from soft cotton",
      imgLink:
        "https://i.pinimg.com/236x/9a/9d/2a/9a9d2a1edaa1bc971bb953f8b8f8c8c2.jpg",
    },
    {
      id: 3,
      name: "Striped Polo Shirt",
      pricePKR: 1800,
      description: "White and blue striped polo shirt with a collar",
      imgLink:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbdV_VYH7mkVGvOesUCzo1TXnAA5oTpp30gg&s",
    },
    {
      id: 4,
      name: "Red Graphic Tee",
      pricePKR: 1300,
      description: "Red T-shirt with an artistic graphic print",
      imgLink:
        "https://ghantee.com/wp-content/uploads/2024/04/happy-hanuman-jayanti.jpg",
    },
    {
      id: 5,
      name: "Plain White Tee",
      pricePKR: 1000,
      description: "Classic white T-shirt made from premium cotton",
      imgLink:
        "https://assets.theplace.com/image/upload/t_pdp_img_m,f_auto,q_auto/v1/ecom/assets/products/tcp/3046010/3046010_01-1.png",
    },
    {
      id: 6,
      name: "Yellow Polo Shirt",
      pricePKR: 1700,
      description: "Bright yellow polo shirt perfect for casual outings",
      imgLink:
        "https://images-platform.99static.com//7EfIQXzAevIYGqiH23QuBmc513E=/80x82:880x883/fit-in/500x500/projects-files/174/17483/1748390/b4b252df-b3ca-45d9-be54-1d29766f83ae.jpg",
    },
  ];
  */

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Effect hook to fetch data when component mounts
  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get('https://api.dripsaint.com/api/get_product/', {
                  withCredentials: true
              });
              setProducts(response.data.products);
              console.log(response.data.products)
              setIsLoading(false);
          } catch (error) {
              console.log(error.message);
              // Handle error response or display error message
          }
      };

      fetchData(); // Call the async function
  }, []);

  return (
    <Layout background="bg-no-repeat  bg-gradient-to-r from-pink-500 to-purple-600 ">
            <div className="h-full mx-1 md:mx-10 lg:mx-16">
                <section className="mt-12">
                    <div className="flex items-center justify-center">
                        <p className="text-white text-6xl sm:text-8xl font-bold">PRODUCTS</p>
                    </div>
                </section>
                <section className="p-4 mt-8">
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-2">
                            {products.map((product,id) => (
                                <Link className="" to={`/product/${product.id}`}>
                                <ProductCard
                                    key={id}
                                    name={product.product_name}
                                    price={product.product_price}
                                    img={product.thumbnail}
                                    desc={product.product_detail}
                                    discount={product.discount_price}
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

export default Gallery;
