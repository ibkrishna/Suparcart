import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { clearCart } from "@/store/shop/cart-slice"; // Import clearCart action
import { Navigate, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  function handleInitiateRazorpayPayment() {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "razorpay",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        const { razorpayOrderId, orderId } = data.payload;
        setIsPaymentStart(true);

        const options = {
          key: "rzp_test_N2JZTugUiv8bEs",
          amount: totalCartAmount * 100,
          currency: "USD",
          description: "Test Transaction",
          order_id: razorpayOrderId,
          prefill: {
            name: user?.name,
            email: user?.email,
            contact: currentSelectedAddress?.phone,
          },
          theme: {
            color: "#3399cc",
          },
          handler: function (response) {
            setIsPaymentStart(false);

            const {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            } = response;

            fetch(
              `https://ecommerce-d1.onrender.com/api/shop/order/capture/${orderId}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  razorpay_payment_id,
                  razorpay_order_id,
                  razorpay_signature,
                }),
              }
            )
              .then((res) => res.json())
              .then((data) => {
                if (data.success) {
                  dispatch(clearCart());
                  navigate("/shop/payment-success");
                } else {
                  toast({
                    title: "Payment verification failed",
                    description: data.message,
                    variant: "destructive",
                  });
                }
              })
              .catch((error) => {
                console.error("Error verifying payment:", error);
              });
          },

          modal: {
            ondismiss: function () {
              setIsPaymentStart(false);
              toast({
                title: "Payment was not completed",
                variant: "destructive",
              });
            },
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        setIsPaymentStart(false);
      }
    });
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid md:grid-cols-2 gap-10 mt-5 p-5 ">
        <div className="md:ml-20">
          <Address
            selectedId={currentSelectedAddress}
            setCurrentSelectedAddress={setCurrentSelectedAddress}
          />
        </div>
        <div className="flex flex-col gap-4 bg-[#F5F5F5] p-4 max-w-lg overflow-y-auto shadow-md rounded-md md:ml-[120px] h-[450px]">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent key={item.productId} cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <hr className="border text-[#B5B5B5]" />
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleInitiateRazorpayPayment} className="w-full">
              {isPaymentStart ? "Processing Payment..." : "Place Order"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
