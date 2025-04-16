import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { InventoryItem } from "@/types/inventory";
import { useInventory } from "@/contexts/InventoryContext";
import { units } from "@/contexts/inventory";

// Validation schema using Yup
const validationSchema = Yup.object({
  id: Yup.string(),
  name: Yup.string()
    .min(2, "Item name must be at least 2 characters")
    .required("Item name is required"),
  categoryId: Yup.string().required("Category is required"),
  quantity: Yup.number()
    .min(0, "Quantity must be a positive number")
    .optional(),
  unit: Yup.string().required("Unit must be specified"),
  batchIds: Yup.array().of(Yup.string()).optional(),
});

export interface ItemFormProps {
  item: InventoryItem | null;
  onClose: () => void;
  onSave: (item: Partial<InventoryItem>) => void;
}

export const ItemForm: React.FC<ItemFormProps> = ({
  item,
  onClose,
  onSave,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { categories, items } = useInventory();

  // Initial form values
  const initialValues = {
    id: item?.id || items?.length,
    name: item?.name || "",
    categoryId: item?.categoryId || "",
    quantity: item?.quantity || 0,
    unit: item?.unit || "",
    batchIds: item?.batchIds || [],
  };

  const handleSubmit = (values) => {
    setIsSubmitting(true);
    console.log(values);
    onSave(values);
    setIsSubmitting(false);
    // onClose();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form className="space-y-8">
          <div className="form-group">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Item Name
            </label>
            <Field
              as={Input}
              id="name"
              name="name"
              placeholder="Enter item name"
              className={errors.name && touched.name ? "border-red-500" : ""}
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <Field
              as={Input}
              id="quantity"
              name="quantity"
              type="number"
              placeholder="Enter quantity"
              disabled={true}
              className={
                errors.quantity && touched.quantity ? "border-red-500" : ""
              }
            />
            <ErrorMessage
              name="quantity"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="categoryId"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <Select
              name="categoryId"
              onValueChange={(value) => setFieldValue("categoryId", value)}
              value={values.categoryId}
            >
              <SelectTrigger
                className={
                  errors.categoryId && touched.categoryId
                    ? "border-red-500"
                    : ""
                }
              >
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ErrorMessage
              name="categoryId"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="unit"
              className="block text-sm font-medium text-gray-700"
            >
              Unit
            </label>
            <Select
              name="unit"
              onValueChange={(value) => setFieldValue("unit", value)}
              value={values.unit}
            >
              <SelectTrigger
                className={errors.unit && touched.unit ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Select a unit" />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem
                    key={unit}
                    value={unit}
                  >
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ErrorMessage
              name="unit"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {item ? "Update Item" : "Add to Inventory"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
