"use client";

import React, { useState, useEffect } from "react";
import { Event } from "../../_services/eventServiceApi";
import Button from "./Button";
import Input from "../Input";

export interface EventFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  price: number;
  category: string;
  imageUrl?: string;
  status?: "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";
}

interface FormErrors {
  title?: string;
  description?: string;
  date?: string;
  time?: string;
  location?: string;
  capacity?: string;
  price?: string;
  category?: string;
  imageUrl?: string;
  status?: string;
}

interface EventFormProps {
  event?: Event;
  onSubmit: (data: EventFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  mode: "create" | "edit";
}

const EventForm: React.FC<EventFormProps> = ({
  event,
  onSubmit,
  onCancel,
  isLoading = false,
  mode,
}) => {
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    capacity: 1,
    price: 0,
    category: "",
    imageUrl: undefined,
    status: "UPCOMING",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Initialize form with event data if editing
  useEffect(() => {
    if (event && mode === "edit") {
      setFormData({
        title: event.title,
        description: event.description,
        date: event.date.split("T")[0], // Convert ISO date to YYYY-MM-DD format
        time: event.time,
        location: event.location,
        capacity: event.capacity,
        price: event.price,
        category: event.category,
        imageUrl: event.imageUrl || undefined,
        status: event.status,
      });
    }
  }, [event, mode]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (!formData.time) {
      newErrors.time = "Time is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (formData.capacity < 1) {
      newErrors.capacity = "Capacity must be at least 1";
    }

    if (formData.price < 0) {
      newErrors.price = "Price cannot be negative";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!formData.status) {
      newErrors.status = "Status is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    let processedValue: string | number | undefined = value;
    if (name === "capacity" || name === "price") {
      processedValue = value === "" ? 0 : Number(value);
    } else if (name === "imageUrl") {
      processedValue = value === "" ? undefined : value;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleInputChangeForInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    let processedValue: string | number | undefined = value;
    if (name === "capacity" || name === "price") {
      processedValue = value === "" ? 0 : Number(value);
    } else if (name === "imageUrl") {
      processedValue = value === "" ? undefined : value;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      console.log(formData);
    }
  };

  const categories = [
    "Conference",
    "Workshop",
    "Seminar",
    "Concert",
    "Sports",
    "Networking",
    "Training",
    "Exhibition",
    "Other",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="md:col-span-2">
          <Input
            type="text"
            name="title"
            label="Event Title *"
            value={formData.title}
            onChange={handleInputChangeForInput}
            placeholder="Enter event title"
            isRequired={true}
            error={errors.title}
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-1 ${
                errors.description ? "border-red-1" : "border-gray-300"
              }`}
              placeholder="Enter event description"
            />
            {errors.description && (
              <p className="text-red-1 text-sm mt-1">{errors.description}</p>
            )}
          </div>
        </div>

        {/* Date */}
        <div>
          <Input
            type="date"
            name="date"
            label="Date *"
            value={formData.date}
            onChange={handleInputChangeForInput}
            isRequired={true}
            error={errors.date}
          />
        </div>

        {/* Time */}
        <div>
          <Input
            type="time"
            name="time"
            label="Time *"
            value={formData.time}
            onChange={handleInputChangeForInput}
            isRequired={true}
            error={errors.time}
          />
        </div>

        {/* Location */}
        <div className="md:col-span-2">
          <Input
            type="text"
            name="location"
            label="Location *"
            value={formData.location}
            onChange={handleInputChangeForInput}
            placeholder="Enter event location"
            isRequired={true}
            error={errors.location}
          />
        </div>

        {/* Capacity */}
        <div>
          <Input
            type="number"
            name="capacity"
            label="Capacity *"
            value={formData.capacity.toString()}
            onChange={handleInputChangeForInput}
            placeholder="Enter capacity"
            isRequired={true}
            error={errors.capacity}
          />
        </div>

        {/* Price */}
        <div>
          <Input
            type="number"
            name="price"
            label="Price ($) *"
            value={formData.price.toString()}
            onChange={handleInputChangeForInput}
            placeholder="Enter price"
            isRequired={true}
            error={errors.price}
          />
        </div>

        {/* Category */}
        <div className="md:col-span-2">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-1 ${
                errors.category ? "border-red-1" : "border-gray-300"
              }`}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-1 text-sm mt-1">{errors.category}</p>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="md:col-span-2">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status *
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-1 ${
                errors.status ? "border-red-1" : "border-gray-300"
              }`}
            >
              <option value="UPCOMING">Upcoming</option>
              <option value="ONGOING">Ongoing</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
            {errors.status && (
              <p className="text-red-1 text-sm mt-1">{errors.status}</p>
            )}
          </div>
        </div>

        {/* Image URL */}
        <div className="md:col-span-2">
          <Input
            type="url"
            name="imageUrl"
            label="Image URL (Optional)"
            value={formData.imageUrl || ""}
            onChange={handleInputChangeForInput}
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <Button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-600"
          text="Cancel"
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
          text={
            isLoading
              ? "Saving..."
              : mode === "create"
              ? "Create Event"
              : "Update Event"
          }
        />
      </div>
    </form>
  );
};

export default EventForm;
