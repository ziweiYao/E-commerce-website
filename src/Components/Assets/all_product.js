import p1v1_img from "./product_type1_v1.png";
import p1v2_img from "./product_type1_v2.png";
import p1v3_img from "./product_type1_v3.png";
import p2v1_img from "./product_type2_v1.png";
import p2v2_img from "./product_type2_v2.png";

let all_product = [
  {
    id: 1,
    name: "The description of the product type1",
    category: "product_type1",
    image: p1v1_img,
    new_price: 50000.0,
  },
  {
    id: 2,
    name: "The description of the product type2 first varient",
    category: "product_type1",
    image: p1v2_img,
    new_price: 50000.0,
  },
  {
    id: 3,
    name: "The description of the product type2 second varient",
    category: "product_type2",
    image: p2v2_img,
    new_price: 40000.0,
  },
  {
    id:4,
    name: "Robot type2 second varient",
    image:p2v2_img,
    category: "product_type2",
    new_price:40000.00,
  }
];

export default all_product;
