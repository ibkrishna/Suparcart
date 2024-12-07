import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
// import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import "../auth/style.css";
import { IoCartOutline } from "react-icons/io5";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  
  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };


  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">
          <div className="image-container">
            <img
              src={product?.image}
              alt={product?.title}
              className="w-full h-[300px] object-cover rounded-t-lg"
            />
            <div className="add-to-cart">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddtoCart(product?._id, product?.totalStock);
                }}
                className="w-full bg-[#000000] text-white p-2 flex items-center justify-center text-center -mb-2"
              >
                <span className="text-lg" style={{ fontFamily: "Inter" }}>
                  Add to cart
                </span>
                <IoCartOutline className="ml-2 text-2xl" />
              </button>
            </div>
          </div>
          {product?.totalStock === 0 ? (
            <Badge
              className="absolute top-2 left-2 bg-red-500 hover:bg-red-600"
              slant
            >
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge
              className="absolute top-2 left-2 bg-red-500 hover:bg-red-600"
              slant
            >
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge
              className="absolute top-2 left-2 bg-red-500 hover:bg-red-600"
              slant
            >
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
            {capitalizeFirstLetter(product?.category)}
            </span>
            <span className="text-[16px] text-muted-foreground">
              {capitalizeFirstLetter(product?.brand)}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
