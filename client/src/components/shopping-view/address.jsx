import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();

  function handleManageAddress(event) {
    event.preventDefault();
    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: "You can add max 3 addresses",
        variant: "destructive",
      });
      return;
    }

    currentEditedId !== null
      ? dispatch(
          editaAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast({
              title: "Address updated successfully",
            });
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setFormData(initialAddressFormData);
            toast({
              title: "Address added successfully",
            });
          }
        });
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast({
          title: "Address deleted successfully",
        });
      }
    });
  }

  function handleEditAddress(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  return (
    <Card className="p-4 rounded-md">
      <div className="mb-5 p-3 grid grid-cols-1 md:grid-cols-2 gap-4">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                key={singleAddressItem._id}
                selectedId={selectedId}
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={singleAddressItem}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          : null}
      </div>
      <CardHeader className='bg-[#F5F5F5] rounded-md'>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 bg-[#F5F5F5] rounded-b-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addressFormControls.map((control) => (
            <div key={control.name} className={control.name === "notes" ? "col-span-1 md:col-span-2" : "col-span-1"}>
              <label className="block text-sm font-medium text-gray-700">
                {control.label}
              </label>
              {control.name === "notes" ? (
                <textarea
                  name={control.name}
                  placeholder={control.placeholder}
                  value={formData[control.name]}
                  onChange={(e) => setFormData({ ...formData, [control.name]: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-4"
                  required={control.required}
                />
              ) : (
                <input
                  type={control.type}
                  name={control.name}
                  placeholder={control.placeholder}
                  value={formData[control.name]}
                  onChange={(e) => setFormData({ ...formData, [control.name]: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required={control.required}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Button
            onClick={handleManageAddress}
            disabled={!isFormValid()}
            className="btn btn-primary bg-black cursor-pointer"
          >
            {currentEditedId !== null ? "Edit" : "Add"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Address;
