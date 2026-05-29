import React, { useState, useEffect } from "react";
import {
  User,
  Phone,
  Building,
  Truck,
  Star,
  Settings2,
  ChevronDown,
  ChevronUp,
  Mail,
  Lock,
} from "lucide-react";

export default function CustomerProfile({ userInfo, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    shippingAddress: "",
    password: "",
  });
  const [defaultAddressType, setDefaultAddressType] = useState("shipping");
  const [showSecurity, setShowSecurity] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name || "",
        phone: userInfo.phone || "",
        email: userInfo.email || "",
        address: userInfo.address || "",
        shippingAddress: userInfo.shippingAddress || "",
        password: "",
      });
      setDefaultAddressType("shipping");
      setShowSecurity(false);
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert(`อัปเดตข้อมูลสำเร็จ! (Default Address: ${defaultAddressType})`);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
            <User size={12} /> Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border-2 border-gray-200 rounded-lg p-2.5 text-sm font-medium text-[#242424] focus:border-[#242424] focus:outline-none transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
            <Phone size={12} /> Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border-2 border-gray-200 rounded-lg p-2.5 text-sm font-medium text-[#242424] focus:border-[#242424] focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-100 flex flex-col gap-4 relative">
        <p className="absolute -top-3 left-4 bg-gray-50 px-2 text-[10px] font-black tracking-wider text-gray-400 uppercase">
          Address Management
        </p>

        {/* Main Address */}
        <div
          className={`p-3 rounded-xl border-2 transition-all ${defaultAddressType === "billing" ? "border-[#e4002b] bg-white shadow-sm" : "border-gray-200 bg-transparent"}`}
        >
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-gray-700 uppercase flex items-center gap-1">
              <Building
                size={14}
                className={
                  defaultAddressType === "billing"
                    ? "text-[#e4002b]"
                    : "text-gray-400"
                }
              />{" "}
              Home / Main Address
            </label>
            <button
              type="button"
              onClick={() => setDefaultAddressType("billing")}
              className={`text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 cursor-pointer transition-colors ${defaultAddressType === "billing" ? "bg-[#e4002b] text-white" : "bg-gray-200 text-gray-500 hover:bg-gray-300"}`}
            >
              <Star
                size={10}
                className={defaultAddressType === "billing" ? "fill-white" : ""}
              />{" "}
              {defaultAddressType === "billing" ? "DEFAULT" : "SET DEFAULT"}
            </button>
          </div>
          <textarea
            rows="2"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border-2 border-gray-200 rounded-lg p-2.5 text-sm font-medium text-[#242424] focus:border-[#242424] focus:outline-none transition-colors resize-none"
          ></textarea>
        </div>

        {/* Shipping Address */}
        <div
          className={`p-3 rounded-xl border-2 transition-all ${defaultAddressType === "shipping" ? "border-[#e4002b] bg-white shadow-sm" : "border-gray-200 bg-transparent"}`}
        >
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-gray-700 uppercase flex items-center gap-1">
              <Truck
                size={14}
                className={
                  defaultAddressType === "shipping"
                    ? "text-[#e4002b]"
                    : "text-gray-400"
                }
              />{" "}
              Delivery Address
            </label>
            <button
              type="button"
              onClick={() => setDefaultAddressType("shipping")}
              className={`text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 cursor-pointer transition-colors ${defaultAddressType === "shipping" ? "bg-[#e4002b] text-white" : "bg-gray-200 text-gray-500 hover:bg-gray-300"}`}
            >
              <Star
                size={10}
                className={
                  defaultAddressType === "shipping" ? "fill-white" : ""
                }
              />{" "}
              {defaultAddressType === "shipping" ? "DEFAULT" : "SET DEFAULT"}
            </button>
          </div>
          <textarea
            rows="2"
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleChange}
            className="w-full border-2 border-gray-200 rounded-lg p-2.5 text-sm font-medium text-[#242424] focus:border-[#242424] focus:outline-none transition-colors resize-none"
          ></textarea>
        </div>
      </div>

      <div className="mt-1 border-2 border-gray-100 rounded-xl overflow-hidden">
        <button
          type="button"
          onClick={() => setShowSecurity(!showSecurity)}
          className="w-full bg-gray-50 hover:bg-gray-100 px-4 py-3 flex justify-between items-center transition-colors cursor-pointer"
        >
          <span className="text-sm font-bold text-[#242424] flex items-center gap-2">
            <Settings2 size={16} className="text-[#e4002b]" /> Account &
            Security
          </span>
          {showSecurity ? (
            <ChevronUp size={18} className="text-gray-500" />
          ) : (
            <ChevronDown size={18} className="text-gray-500" />
          )}
        </button>
        {showSecurity && (
          <div className="p-4 bg-white flex flex-col gap-4 border-t-2 border-gray-100">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
                <Mail size={12} /> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border-2 border-gray-200 rounded-lg p-2.5 text-sm font-medium text-[#242424] focus:border-[#242424] focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
                <Lock size={12} /> Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Leave blank to keep current password"
                className="w-full border-2 border-gray-200 rounded-lg p-2.5 text-sm font-medium text-[#242424] focus:border-[#e4002b] focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`mt-3 w-full font-bold py-3.5 rounded-xl transition-colors border-2 border-transparent flex items-center justify-center gap-2 ${isLoading ? "bg-gray-400 text-white cursor-wait" : "bg-[#242424] hover:bg-[#e4002b] text-white hover:border-[#242424] cursor-pointer shadow-[4px_4px_0_#242424] active:translate-y-1 active:shadow-none"}`}
      >
        {isLoading ? "SAVING..." : "SAVE CHANGES"}
      </button>
    </form>
  );
}
