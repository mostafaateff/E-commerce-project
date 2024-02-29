import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function CategorySlider() {

      let settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
    };
    
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setCategories(data.data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container my-4 ">
      <h3>Shop Popular Categories</h3>
      <Slider {...settings}>
        {categories.map((cat) => (
          <div className="item px-1">
            <img src={cat.image} height={"200 px"} className="w-100" alt="" />
            <p>{cat.name}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}
