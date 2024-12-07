import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import ProductFilter from "@/components/shopping-view/filter";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { sortOptions, filterOptions } from "@/config";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { Checkbox } from "../../components/ui/checkbox";
import { Separator } from "../../components/ui/separator";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
}

function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("price-lowtohigh"); // Set default sort here
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  const [isSortPopupOpen, setIsSortPopupOpen] = useState(false);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);

  const categorySearchParam = searchParams.get("category");
  const categoryName = categorySearchParam
    ? decodeURIComponent(categorySearchParam)
    : "Products";

  function handleSort(value) {
    setSort(value);
    setIsSortPopupOpen(false);
  }

  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    if (!cpyFilters[getSectionId]) {
      cpyFilters[getSectionId] = [];
    }

    const indexOfCurrentOption =
      cpyFilters[getSectionId].indexOf(getCurrentOption);
    if (indexOfCurrentOption === -1) {
      cpyFilters[getSectionId].push(getCurrentOption);
    } else {
      cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    if (!user) {
      toast({
        title: "You need to be logged in to add items to your cart.",
        variant: "destructive",
      });
      return;
    }

    let getCartItems = cartItems.items || [];
    const indexOfCurrentItem = getCartItems.findIndex(
      (item) => item.productId === getCurrentProductId
    );
    if (indexOfCurrentItem > -1) {
      const getQuantity = getCartItems[indexOfCurrentItem].quantity;
      if (getQuantity + 1 > getTotalStock) {
        toast({
          title: `Only ${
            getTotalStock - getQuantity
          } quantity can be added for this item`,
          variant: "destructive",
        });
        return;
      }
    }

    dispatch(
      addToCart({
        userId: user.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user.id));
        toast({ title: "Product is added to cart" });
      }
    });
  }

  useEffect(() => {
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
    }
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  const filteredProducts = productList.filter((product) => {
    const productName = product.title ? product.title.toLowerCase() : "";
    const matchesSearch = productName.includes(search.toLowerCase());
    const matchesFilters = Object.keys(filters).every((filterKey) => {
      if (!filters[filterKey].length) return true;
      return filters[filterKey].includes(product[filterKey]);
    });
    return matchesSearch && matchesFilters;
  });

  const handleOptionSelect = (keyItem, optionId) => {
    handleFilter(keyItem, optionId);
    setIsFilterPopupOpen(false);
  };

  return (
    <>
      <div
        className="p-4 justify-between bg-[#FFD6D6] hidden md:flex"
        style={{ fontFamily: "Inter", marginTop: "65px" }}
      >
        <h2 className="font-bold text-2xl mx-10">Products</h2>
        <h3 className="font-medium text-lg mx-10">
          HOME / {categoryName.toUpperCase()}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
        <div className="sticky top-0">
          <div className="relative hidden md:block">
            <CiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="rounded-md border-2 h-8 pl-8 w-44"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <ProductFilter filters={filters} handleFilter={handleFilter} />
        </div>

        <div className="bg-background w-full rounded-lg shadow-sm">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-extrabold mt-4 md:mt-0 ">All Products</h2>
            <div className="hidden md:flex items-center gap-3">
              <span className="text-muted-foreground">
                {productList?.length} Products
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <ArrowUpDownIcon className="h-4 w-4" />
                    <span>Sort by</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuRadioGroup
                    value={sort}
                    onValueChange={handleSort}
                  >
                    {sortOptions.map((sortItem) => (
                      <DropdownMenuRadioItem
                        value={sortItem.id}
                        key={sortItem.id}
                      >
                        {sortItem.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center justify-between gap-3 md:hidden bg-[#f1f0f0] p-1 fixed bottom-0 left-0 w-full z-30">
              <div className="flex gap-2 w-full">
                <button
                  size="sm"
                  className="flex items-center gap-1 w-full h-[49px] text-black text-lg"
                  onClick={() => setIsSortPopupOpen(true)}
                >
                  <ArrowUpDownIcon className="h-4 w-4 ml-10" />
                  <span className="text-lg font-medium ">Sort by</span>
                </button>

                <div className="h-[50px] w-[2px] bg-gray-500 mx-2" />

                <button
                  variant="outline"
                  size="md"
                  className="flex items-center gap-1 w-full h-[49px] text-black text-lg"
                  onClick={() => setIsFilterPopupOpen(true)}
                >
                  <span className="text-lg font-medium ml-14">Filters</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((productItem) => (
                <ShoppingProductTile
                  key={productItem.id}
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  handleAddtoCart={handleAddtoCart}
                />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>

        {/* Sort Popup */}
        {isSortPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="absolute inset-0 bg-black opacity-50"
              onClick={() => setIsSortPopupOpen(false)}
            />
            <div className="bg-white p-4 rounded-lg shadow-md z-10 w-64 h-80 overflow-y-auto">
              <div className="flex justify-between">
                <h3 className="font-bold text-lg mb-2">Sort by</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="-mt-2 right-6 font-bold rounded-full bg-gray-300 h-10 w-10"
                  onClick={() => setIsSortPopupOpen(false)}
                >
                  X
                </Button>
              </div>
              <div className="flex flex-col">
                {sortOptions.map((sortItem) => (
                  <Button
                    key={sortItem.id}
                    variant="outline"
                    className="mb-2"
                    onClick={() => {
                      handleSort(sortItem.id);
                      setIsSortPopupOpen(false);
                    }}
                  >
                    {sortItem.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Filter Popup */}
        {isFilterPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black opacity-50"
              onClick={() => setIsFilterPopupOpen(false)}
            />
            <div className="bg-white p-4 rounded-lg shadow-md z-10 w-96 h-96 mx-2 overflow-y-auto">
              <div className="flex justify-between">
                <h3 className="font-bold text-lg mb-2">Filters</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="-mt-2 right-6 font-bold rounded-full bg-gray-300 h-10 w-10"
                  onClick={() => setIsFilterPopupOpen(false)}
                >
                  X
                </Button>
              </div>
              <div className="p-4 space-y-4">
                {Object.keys(filterOptions).map((keyItem) => (
                  <Fragment key={keyItem}>
                    <div>
                      <h3 className="text-base font-bold">{keyItem}</h3>
                      <div className="grid gap-2 mt-2">
                        {filterOptions[keyItem].map((option) => (
                          <label
                            key={option.id}
                            className="flex font-medium items-center gap-2"
                          >
                            <Checkbox
                              checked={
                                filters[keyItem] &&
                                filters[keyItem].includes(option.id)
                              }
                              onCheckedChange={() =>
                                handleOptionSelect(keyItem, option.id)
                              }
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>
                    </div>
                    <Separator />
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        )}

        <ProductDetailsDialog
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          productDetails={productDetails}
        />
      </div>
    </>
  );
}

export default ShoppingListing;
