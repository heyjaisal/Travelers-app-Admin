import React, { useState } from "react";
import axios from "axios";

const AdminCreate = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    personalEmail: "",
    mobile: "",
    password: "",
    position: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const validateForm = () => {
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return "Invalid work email format";
    if (!/^\S+@\S+\.\S+$/.test(formData.personalEmail)) return "Invalid personal email format";
    if (!/^\d{10}$/.test(formData.mobile)) return "Mobile number must be 10 digits";
    if (formData.password.length < 8) return "Password must be at least 8 characters long";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    const validationError = validateForm();
    if (validationError) return setError(validationError);

    setIsSubmitting(true);
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    if (image) form.append("image", image);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post("http://localhost:5000/api/create-admin", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(response.data.message);
      setFormData({
        name: "",
        email: "",
        personalEmail: "",
        mobile: "",
        password: "",
        position: "",
      });
      setImage(null);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "Server error occurred.");
      } else {
        setError("Network error. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Create Admin
        </h1>
        {message && <p className="text-green-600 text-center">{message}</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Work Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="email"
            name="personalEmail"
            placeholder="Personal Email"
            value={formData.personalEmail}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={formData.position}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {image && <p className="text-sm text-gray-600">Selected file: {image.name}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 rounded ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
          >
            {isSubmitting ? "Submitting..." : "Create Admin"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminCreate;
