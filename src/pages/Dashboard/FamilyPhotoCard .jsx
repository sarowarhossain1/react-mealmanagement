import React, { useState } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { unitDropdown } from "./dropdownData";
import { FaRegEdit } from "react-icons/fa";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { productDropdown } from "./productData";
import LotManage from "./LotManage";

const purchaseDefaultValue = {
  selectedProduct: [],
  selectedLots: [],
};

const PurchasePage = () => {
  const [modal, setModal] = useState(false);

  const schemaResolver = yup.object().shape({
    selectedProduct: yup.array().of(
      yup.object().shape({
        units: yup
          .array()
          .of(
            yup.object().shape({
              checked: yup.boolean(),
              quantity: yup.number().when("checked", {
                is: true,
                then: (schema) =>
                  schema.required().min(1, "Min 1 required"),
              }),
            })
          )
          .test(
            "unit-check",
            "At least one unit must be selected",
            (units) => units?.some((u) => u.checked)
          ),
      })
    ),
  });

  const methods = useForm({
    defaultValues: purchaseDefaultValue,
    resolver: yupResolver(schemaResolver),
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

  const { append, remove } = useFieldArray({
    name: "selectedProduct",
    control,
  });

  const handleSelectedProduct = (value) => {
    const findProduct = productDropdown.find(
      (item) => item.value === value
    );
    if (!findProduct) return;

    const units = unitDropdown
      .filter((unit) =>
        Object.keys(findProduct.purchasePrice).includes(unit.value)
      )
      .map((unit) => ({
        value: unit.value,
        label: unit.label,
        purchasePrice: findProduct.purchasePrice[unit.value],
        checked: false,
        quantity: "",
      }));

    append({ ...findProduct, units });
  };

  const onSubmit = (data) => {
    console.log("SUBMIT DATA 👉", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-6">

        {/* 🔽 Product Select */}
        <div className="flex justify-center mb-4">
          <select
            className="border px-4 py-2 rounded w-64"
            onChange={(e) => handleSelectedProduct(e.target.value)}
          >
            {/* <option value="">Select product</option> */}
            {productDropdown
              .filter(
                (p) =>
                  !watchSelectedProduct.some(
                    (sp) => sp.value === p.value
                  )
              )
              .map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
          </select>
        </div>

        {/* 📋 Table */}
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100 text-center">
              <tr>
                <th className="border p-2">Product</th>
                <th className="border p-2 min-w-[200px]">Unit</th>
                <th className="border p-2">Discount</th>
                <th className="border p-2">Tax</th>
                <th className="border p-2">Subtotal</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {watchSelectedProduct.map((product, productIndex) => (
                <React.Fragment key={productIndex}>
                  <tr>
                    {/* Product */}
                    <td className="border p-2 bg-gray-100">
                      {product.label}
                    </td>

                    {/* Unit */}
                    <td className="border p-2">
                      {product.units.map((unit, unitIndex) => (
                        <label
                          key={unit.value}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            checked={unit.checked}
                            onChange={(e) =>
                              setValue(
                                `selectedProduct.${productIndex}.units.${unitIndex}.checked`,
                                e.target.checked
                              )
                            }
                          />
                          {unit.label}
                        </label>
                      ))}
                      {errors?.selectedProduct?.[productIndex]?.units && (
                        <p className="text-red-500 text-xs">
                          {errors.selectedProduct[productIndex].units.message}
                        </p>
                      )}
                    </td>

                    {/* Discount */}
                    <td className="border p-2">
                      <input
                        type="number"
                        className="border px-2 py-1 rounded w-full"
                        {...register(
                          `selectedProduct.${productIndex}.discount`
                        )}
                      />
                    </td>

                    {/* Tax */}
                    <td className="border p-2">
                      <input
                        type="number"
                        className="border px-2 py-1 rounded w-full"
                        {...register(
                          `selectedProduct.${productIndex}.tax`
                        )}
                      />
                    </td>

                    {/* Subtotal */}
                    <td className="border p-2 bg-gray-100 text-center">
                      0
                    </td>

                    {/* Action */}
                    <td className="border p-2 text-center">
                      {product.units.some((u) => u.checked) && (
                        <FaRegEdit
                          className="text-blue-600 cursor-pointer"
                          onClick={() =>
                            setModal({ product, productIndex })
                          }
                        />
                      )}
                    </td>
                  </tr>

                  {/* Unit Quantity Rows */}
                  {product.units.map(
                    (unit, unitIndex) =>
                      unit.checked && (
                        <tr key={unit.value}>
                          <td colSpan={3} className="text-right p-2">
                            {unit.label}
                          </td>
                          <td className="border p-2">
                            <Controller
                              control={control}
                              name={`selectedProduct.${productIndex}.units.${unitIndex}.quantity`}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="number"
                                  className="border px-2 py-1 rounded w-full"
                                />
                              )}
                            />
                            {errors?.selectedProduct?.[productIndex]?.units?.[
                              unitIndex
                            ]?.quantity && (
                              <p className="text-red-500 text-xs">
                                {
                                  errors.selectedProduct[productIndex].units[
                                    unitIndex
                                  ].quantity.message
                                }
                              </p>
                            )}
                          </td>

                          <td colSpan={2} className="border p-2">
                            <input
                              type="number"
                              value={unit.purchasePrice}
                              disabled
                              className="border px-2 py-1 rounded w-full bg-gray-100"
                            />
                          </td>
                        </tr>
                      )
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Submit */}
        {watchSelectedProduct.length > 0 && (
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        )}
      </form>
      <div>
        <LotManage/>
      </div>
    </FormProvider>
  );
};

export default PurchasePage;
