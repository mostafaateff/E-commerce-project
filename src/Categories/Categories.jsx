import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import Loading from "../Loading";

export default function Categories() {
  async function getCategories() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data, error, isError, isLoading } = useQuery(
    "categories",
    getCategories,
    { select: (data) => data?.data?.data }
  );
  console.log(data);

  const [categoryId, setCategoryId] = useState();

  // *****************************************************
  // const subId = data.map((ele) => ele._id);
  const handleCategoryClick = async (categoryId) => {
    setCategoryId(categoryId);
    await refetch(); // This will trigger the refetch of subcategories for the selected category
  };

  async function subCategories() {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
    );
  }

  let { data: subData, refetch } = useQuery("subCategories", subCategories, {
    enabled: false,
  });

  console.log(subData);

  // *****************************************************

  if (isLoading) return <Loading />;

  if (isError) return <h2>{error.message}</h2>;

  return (
    <div className=" categories my-4">
      <Helmet>
        <title>Categories Page</title>
      </Helmet>
      <div className="container">
        <div className="row">
          {data.map((ele) => (
            <div className="col-md-4 g-4 ">
              <div
                onClick={() => handleCategoryClick(ele._id)}
                className=" category-item border  border-1 rounded-2 "
              >
                <img
                  src={ele.image}
                  className="w-100 "
                  style={{ height: "350px" }}
                  alt=""
                />
                <h3 className=" text-center  py-3  fw-bold text-main">
                  {ele.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container my-5 ">
        <div className="row g-3 ">
          {subData?.data?.data.map((ele) => (
            <div className="col-4  ">
              <div className="border border-2 rounded-3 p-3  text-center ">
                <h2>{ele.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
