import React, { useState, Fragment, useEffect } from "react";
// import { filterOptions } from "@/config";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import axios from "axios";

function ProductFilter({ filters, handleFilter }) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);

  const fetchCategoryandBrand = async () => {
    try {
      const response = await axios.get("https://ecommerce-d1.onrender.com/api/shop/products/get");
      setData(response.data.data);
    } catch (error) {
      console.log('error');
    }
  };

  useEffect(() => {
    fetchCategoryandBrand();
  }, []);

  const uniqueBrands = [...new Set(data.map(dd => dd.brand))];
  const uniqueCategories = [...new Set(data.map(dd => dd.category))];

  const handleOptionSelect = (keyItem, optionId) => {
    handleFilter(keyItem, optionId);
    setIsOpen(false);
  };

  return (
    <>
      <div className="hidden md:block bg-background rounded-lg shadow-sm sticky top-0 z-20">
        <div className="p-4 border-b">
          <h2 className="text-lg font-extrabold">Filters</h2>
        </div>
        <div className="p-4 space-y-4">
          {/* Render Unique Brands */}
          <Fragment>
            <div className="md:h-[250px] overflow-y-auto">
              <h3 className="text-base font-bold">Brands</h3>
              <div className="grid gap-2 mt-2">
                {uniqueBrands.map((brand, index) => (
                  <Label
                    key={index}
                    className="flex font-medium items-center gap-2"
                  >
                    <Checkbox
                      checked={filters && filters.brand && filters.brand.includes(brand)}
                      onCheckedChange={() => handleOptionSelect('brand', brand)}
                    />
                    {brand}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>

          {/* Render Unique Categories */}
          <Fragment>
            <div className="md:h-[250px] overflow-y-auto">
              <h3 className="text-base font-bold">Categories</h3>
              <div className="grid gap-2 mt-2">
                {uniqueCategories.map((category, index) => (
                  <Label
                    key={index}
                    className="flex font-medium items-center gap-2"
                  >
                    <Checkbox
                      checked={filters && filters.category && filters.category.includes(category)}
                      onCheckedChange={() => handleOptionSelect('category', category)}
                    />
                    {category}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>

          {/* Render Existing Filter Options */}
          {/* {Object.keys(filterOptions).map((keyItem) => (
            <Fragment key={keyItem}>
              <div>
                <h3 className="text-base font-bold">{keyItem}</h3>
                <div className="grid gap-2 mt-2">
                  {filterOptions[keyItem].map((option) => (
                    <Label
                      key={option.id}
                      className="flex font-medium items-center gap-2"
                    >
                      <Checkbox
                        checked={
                          filters &&
                          filters[keyItem] &&
                          filters[keyItem].includes(option.id)
                        }
                        onCheckedChange={() =>
                          handleOptionSelect(keyItem, option.id)
                        }
                      />
                      {option.label}
                    </Label>
                  ))}
                </div>
              </div>
              <Separator />
            </Fragment>
          ))} */}
        </div>
      </div>
    </>
  );
}

export default ProductFilter;
