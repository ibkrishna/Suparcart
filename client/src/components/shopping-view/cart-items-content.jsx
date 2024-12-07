import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    let getCartItems = cartItems.items || [];

    // Only check stock if trying to increase quantity
    if (typeOfAction === "plus") {
      const indexOfCurrentCartItem = getCartItems.findIndex(
        (item) => item.productId === getCartItem?.productId
      );

      const getCurrentProductIndex = productList.findIndex(
        (product) => product._id === getCartItem?.productId
      );
      const getTotalStock =
        productList[getCurrentProductIndex]?.totalStock || 0;

      if (indexOfCurrentCartItem > 0) {
        const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${
              getTotalStock - getQuantity
            } more quantity can be added for this item`,
            variant: "destructive",
          });
          return;
        }
      }
    } else if (typeOfAction === "minus" && getCartItem?.quantity === 1) {
      // Prevent decreasing quantity below 1
      return;
    }

    // Dispatch the update regardless of the current quantity
    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is updated successfully",
        });
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is deleted successfully",
        });
      }
    });
  }

  return (
    <div className="flex items-center space-x-4 ">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <p className="font-semibold">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <div className="flex items-center gap-2 mt-1 bg-[#D9D9D9] w-24">
          <button
            className="h-8 w-8  flex items-center justify-center"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </button>

          <span className="font-medium">{cartItem?.quantity}</span>

          <button
            className="h-8 w-8  flex items-center justify-center"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;
