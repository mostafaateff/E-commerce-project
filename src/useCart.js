import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast from "react-hot-toast";


export async function addProductToCart(productId) {
  return await axios.post(
    "https://ecommerce.routemisr.com/api/v1/cart",
    { productId },
    { headers: { token: localStorage.getItem("userToken") } }
  );
}

export function useCartCrud(fn) {
  const queryClient = useQueryClient()
  return useMutation(fn, {
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      queryClient.invalidateQueries('getcart');
      queryClient.invalidateQueries('userWishList');
    },
  })
}

export async function getCart() {
  return await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: { token: localStorage.getItem("userToken") },
  }
  );
}

export function useCartGet(key, fun) {
  return useQuery(key, fun);
}

export async function removeItem(id) {
  return await axios.delete(
    `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    { headers: { token: localStorage.getItem("userToken") } }
  );
}

export async function removeWishItem(id) {
  return await axios.delete(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
    { headers: { token: localStorage.getItem("userToken") } }
  );
}

export async function clearCart() {
  return await axios.delete(
    `https://ecommerce.routemisr.com/api/v1/cart/`,
    { headers: { token: localStorage.getItem("userToken") } }
  );
}

export async function updateCount({id,count}) {
  return await axios.put(
    `https://ecommerce.routemisr.com/api/v1/cart/${id}`, {count} ,
    { headers: { token: localStorage.getItem("userToken") } }
  );
}

export async function checkOut({ id, shippingAddress }) {
  return await axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`
    , { shippingAddress } ,
    { headers: { token: localStorage.getItem("userToken") } }
  );
}

export async function addProductToWishList(productId) {
  return await axios.post(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    { productId },
    { headers: { token: localStorage.getItem("userToken") } }
  );
}

export async function getUserWishList() {
  return await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
    headers: { token: localStorage.getItem("userToken") },
  });
}


