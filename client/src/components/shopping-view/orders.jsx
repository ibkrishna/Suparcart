import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch, user]);

  useEffect(() => {
    if (selectedOrderId) {
      dispatch(getOrderDetails(selectedOrderId));
    }
  }, [selectedOrderId, dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  const handleOpenDetailsDialog = (orderId) => {
    setSelectedOrderId(orderId);
    setOpenDetailsDialog(true);
  };

  const sortedOrderList = orderList?.slice().sort((a, b) => {
    return new Date(b.orderDate) - new Date(a.orderDate);
  });


  // console.log(orderList)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
  {sortedOrderList && sortedOrderList.length > 0
    ? sortedOrderList.map((orderItem) => (
        <TableRow key={orderItem?._id}>
          <TableCell>{orderItem?._id}</TableCell>
          <TableCell>
            {orderItem?.orderDate
              ? orderItem.orderDate.split("T")[0] // Only split if orderDate exists
              : "N/A"} 
          </TableCell>
          <TableCell>
            <Badge
              className={`py-1 px-3 ${
                orderItem?.orderStatus === "confirmed"
                  ? "bg-green-500"
                  : orderItem?.orderStatus === "rejected"
                  ? "bg-red-600"
                  : "bg-black"
              }`}
            >
              {orderItem?.orderStatus}
            </Badge>
          </TableCell>
          <TableCell>${orderItem?.totalAmount}</TableCell>
          <TableCell>
            <Button onClick={() => handleOpenDetailsDialog(orderItem?._id)}>
              View Details
            </Button>
          </TableCell>
        </TableRow>
      ))
    : null}
</TableBody>
        </Table>
      </CardContent>

      <Dialog
        open={openDetailsDialog}
        onOpenChange={() => {
          setOpenDetailsDialog(false);
          setSelectedOrderId(null);
          dispatch(resetOrderDetails());
        }}
      >
        <ShoppingOrderDetailsView orderDetails={orderDetails} />
      </Dialog>
    </Card>
  );
}

export default ShoppingOrders;
