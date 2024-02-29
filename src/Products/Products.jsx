import { Helmet } from "react-helmet";
import Loading from "../Loading";
import { featuredProducts, useProduct } from "../useProducts";
import { Product } from "../Product";
import { useState } from "react";

export default function Products() {
  let { data, error, isError, isLoading } = useProduct(
    "Product",
    featuredProducts
  );

  let [searchedArr, setSearchedArr] = useState([]);

  function searchProduct(e) {
    let term = e.target.value;
    let newArr = data.filter((ele) =>
      ele.title.toLowerCase().trim().includes(term.toLowerCase().trim())
    );
    setSearchedArr(newArr);
  }

  if (isLoading) return <Loading></Loading>;
  if (isError) return <h2>{error.message}</h2>;

  console.log(data);

  return (
    <div className=" products container py-5 ">
      <Helmet>
        <title>Products Page</title>
      </Helmet>
      <div className="w-75 mx-auto mt-3 mb-5  ">
        <input placeholder="search by title" type="text" className="form-control " onChange={searchProduct} />
      </div>
      <div className="row gy-2">
        {searchedArr.length
          ? searchedArr.map((prod) => (
              <Product key={prod._id} prod={prod}></Product>
            ))
          : data?.map((prod) => <Product key={prod._id} prod={prod}></Product>)}
      </div>
    </div>
  );
}
