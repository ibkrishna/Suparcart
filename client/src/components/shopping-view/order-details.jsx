import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);
  const trackingStatus = orderDetails?.trackingStatus;

  return (
    <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[100vh]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li className="flex items-center justify-between">
                      <span>Title: {item.title}</span>
                      <span>Quantity: {item.quantity}</span>
                      <span>Price: ${item.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-4 grid-cols-2">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
          <div className="grid gap-2 mb-4">
            <div className="font-medium">Order Tracking Status</div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center">
                <span
                  className={`flex items-center justify-center h-6 w-6 rounded-full ${
                    trackingStatus === "shippingSoon" ||
                    trackingStatus === "shipped" ||
                    trackingStatus === "outForDelivery" ||
                    trackingStatus === "delivered"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  1
                </span>
                <span className="ml-2">Shipping Soon</span>
              </div>
              <div className="flex items-center">
                <span
                  className={`flex items-center justify-center h-6 w-6 rounded-full ${
                    trackingStatus === "shipped" ||
                    trackingStatus === "outForDelivery" ||
                    trackingStatus === "delivered"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  2
                </span>
                <span className="ml-2">Shipped</span>
              </div>
              <div className="flex items-center">
                <span
                  className={`flex items-center justify-center h-6 w-6 rounded-full ${
                    trackingStatus === "outForDelivery" || trackingStatus === "delivered"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  3
                </span>
                <span className="ml-2">Out for Delivery</span>
              </div>
              <div className="flex items-center">
                <span
                  className={`flex items-center justify-center h-6 w-6 rounded-full ${
                    trackingStatus === "delivered"
                      ? "bg-green-500 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  4
                </span>
                <span className="ml-2">Delivered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
