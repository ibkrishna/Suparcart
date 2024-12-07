import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  return (
    <div
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer rounded-md p-4 border md:w-[350px] max-w-md h-80 ${
        selectedId?._id === addressInfo?._id
          ? "bg-[#D9D9D9] border-[2px]"
          : "border-black"
      }`}
    >
        <div className="grid gap-2 text-lg text-justify cursor-pointer">
        <label><span className="font-medium">Address : </span>{addressInfo?.address}</label>
        <label><span className="font-medium">City : </span> {addressInfo?.city}</label>
        <label><span className="font-medium">Pincode :</span> {addressInfo?.pincode}</label>
        <label><span className="font-medium">Phone :</span> {addressInfo?.phone}</label>
        <label><span className="font-medium">Notes :</span> {addressInfo?.notes}</label>
      </div>
      <div className="flex justify-around mt-6">
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
      </div>

    </div>
  );
}

export default AddressCard;
