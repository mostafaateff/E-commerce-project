import axios from "axios";
import { useQuery } from "react-query";

 export async function featuredProducts() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
}

export function useProduct(key,fun) {
 return useQuery( key , fun ,
        {
            select: (data) => data.data.data,
        }
    );

}