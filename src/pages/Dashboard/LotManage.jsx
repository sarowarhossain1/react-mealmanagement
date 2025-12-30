import React, { useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { productDropdown } from "./productData";
import { unitDropdown } from "./dropdownData";

const purchaseDefaultValue = {
  selectedProduct: [],
  selectedLots: [],
};

const LotManage = () => {
  const [modal, setModal] = useState(false);

  const methods = useForm({
    defaultValues: purchaseDefaultValue,
  });

  const {
    handleSubmit,
    register,
    watch,
    control,
    setValue,
    formState: { errors },
  } = methods;

  const watchSelectedProduct = watch("selectedProduct");

  const { append } = useFieldArray({
    name: "selectedProduct",
    control,
  });

  const handleSelectProduct = (value) => {
    const findProduct = productDropdown.find((item) => item.value === value);
    if (!findProduct) return;
    const units = unitDropdown
      .filter((unit) =>
        Object.keys(findProduct.purchasePrice).includes(unit.value)
      )
      .map((unit) => ({
        value: unit.value,
        label: unit.label,
        purchasePrice: findProduct.purchasePrice[unit.value],
      }));
    append({ ...findProduct, units });
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onClick={handleSubmit(onsubmit)}>
          <div>
            <select
              name=""
              id=""
              onChange={(e) => handleSelectProduct(e.target.value)}
            >
              {/* <option value="">Select Product</option> */}
              {
                productDropdown.filter(
                  (p)=> !watchSelectedProduct.some((sp)=> sp.value === p.value) 
                ).map((p)=>(
                    <option key={p.value} value={p.value}>
                        {p.label}
                    </option>
                ))
              }
            </select>
          </div>
          
        </form>
      </FormProvider>
    </div>
  );
};

export default LotManage;
