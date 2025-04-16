import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddBatchModal = ({ isOpen, onClose, onSave, itemId }) => {
  // Define validation schema with Yup
  const validationSchema = Yup.object({
    batchNumber: Yup.string().required("Batch number is required"),
    expiryDate: Yup.date().required("Expiry date is required"),
    manufacturingDate: Yup.date(),
    supplier: Yup.string(),
    receiptDate: Yup.date().required("Receipt date is required"),
    quantity: Yup.number()
      .required("Quantity is required")
      .integer("Quantity must be a whole number")
      .min(1, "Quantity must be at least 1"),
  });

  // Initial form values
  const initialValues = {
    batchNumber: "",
    expiryDate: "",
    manufacturingDate: "",
    supplier: "",
    receiptDate: new Date().toISOString().split("T")[0],
    quantity: 0,
  };

  // Form submission handler
  const handleSubmit = (values) => {
    onSave({
      batchNumber: values.batchNumber,
      expiryDate: values.expiryDate,
      manufacturingDate: values.manufacturingDate,
      supplier: values.supplier,
      receiptDate: values.receiptDate,
      items: [{ itemId, quantity: values.quantity }],
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Batch</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Batch Number
                </label>
                <Field
                  type="text"
                  name="batchNumber"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                />
                <ErrorMessage
                  name="batchNumber"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <Field
                  type="date"
                  name="expiryDate"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                />
                <ErrorMessage
                  name="expiryDate"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Manufacturing Date
                </label>
                <Field
                  type="date"
                  name="manufacturingDate"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                />
                <ErrorMessage
                  name="manufacturingDate"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Supplier
                </label>
                <Field
                  type="text"
                  name="supplier"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                />
                <ErrorMessage
                  name="supplier"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Receipt Date
                </label>
                <Field
                  type="date"
                  name="receiptDate"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                />
                <ErrorMessage
                  name="receiptDate"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <Field
                  type="number"
                  name="quantity"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                />
                <ErrorMessage
                  name="quantity"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400"
                >
                  Add Batch
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddBatchModal;
