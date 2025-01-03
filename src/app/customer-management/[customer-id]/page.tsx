"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { PhoneCall, Mail, ShoppingCart, FileText, User } from "lucide-react";

const CustomerProfilePage = () => {
  const pathname = usePathname(); // Get the current pathname
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (pathname) {
      const parts = pathname.split("/"); // Split the pathname by "/"
      const id = parts[parts.length - 1]; // Extract the last part, which is the customer-id
      setCustomerId(id); // Set the customerId state
    }
  }, [pathname]);

  useEffect(() => {
    if (customerId) {
      const fetchCustomer = async () => {
        try {
          setLoading(true);
          console.log("Fetching customer with ID:", customerId); // Debugging log
          const response = await axios.get(
            `http://localhost:6969/api/v1/customers/${customerId}`
          );
          console.log("Customer data fetched:", response.data); // Debugging log
          setCustomer(response.data.data[0]); // Access the first item in the data array
        } catch (err) {
          console.error("Error fetching customer:", err);
          setError(true);
        } finally {
          setLoading(false);
        }
      };

      fetchCustomer();
    }
  }, [customerId]);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  if (error || !customer) {
    return <div className="text-center py-10 text-red-500">Customer not found.</div>;
  }

  const handleCall = () => {
    if (customer.phone) {
      window.location.href = `tel:${customer.phone}`;
    } else {
      alert("Phone number not available.");
    }
  };

  const handleMail = () => {
    if (customer.email) {
      window.location.href = `mailto:${customer.email}`;
    } else {
      alert("Email address not available.");
    }
  };

  const redirectTo = (path: string) => {
    router.push(path);
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <div className="p-4 text-xl">
      <div className="border rounded-lg shadow-lg p-6 bg-white">
        <div className="flex items-center space-x-6 justify-center">
          <div className="w-36 h-36 rounded-full bg-gray-200"></div>
          <div>
            <h2 className="text-2xl font-bold text-center">{customer.name}</h2>
            <p className="text-gray-500 text-center">{customer.email}</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 text-center">
          <div>
            <h3 className="font-semibold">Basic Info</h3>
            <p>Gender: {customer.gender ? "Male" : "Female"}</p>
            <p>DOB: {customer.created_at || "Not provided"}</p>
            <p>Age: {customer.created_at ? calculateAge(customer.created_at) : "Not provided"}</p>
          </div>
          <div>
            <h3 className="font-semibold">Contact Info</h3>
            <p>Phone: {customer.phone}</p>
            <p>Address: {customer.address}</p>
          </div>
        </div>
      <div className="mt-8 grid grid-cols-2 gap-4 text-center">
        <div>
          <h3 className="font-semibold">Account Status</h3>
          <p>Status: Active</p> {/* Dummy data for account status */}
          <p>Created on: {customer.created_at || "Not provided"}</p>
        </div>
        <div>
          <h3 className="font-semibold">Customer Status</h3>
          <p>Status: Verified</p> {/* Dummy data for customer status */}
          <p>Verified on: 2024-12-19</p> {/* Dummy data for verification date */}
        </div>
      </div>
      </div>


      {/* Action Buttons */}
      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={handleCall}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-blue-600 text-lg"
        >
          <PhoneCall className="h-6 w-6" />
          <span>Call</span>
        </button>
        <button
          onClick={handleMail}
          className="bg-green-500 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-green-600 text-lg"
        >
          <Mail className="h-6 w-6" />
          <span>Mail</span>
        </button>
      </div>

      {/* Redirect Buttons */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center justify-center">
        <button
          onClick={() => redirectTo(`/order-history/${customerId}`)}
          className="w-full bg-gray-500 px-6 py-3 rounded-lg text-xl text-white hover:bg-gray-400 flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="h-6 w-6" />
          <span>Order History</span>
        </button>
        <button
          onClick={() => redirectTo(`/ticket-history/${customerId}`)}
          className="w-full bg-gray-500 px-6 py-3 rounded-lg text-xl text-white hover:bg-gray-400 flex items-center justify-center space-x-2"
        >
          <FileText className="h-6 w-6" />
          <span>Ticket History</span>
        </button>
        <button
          onClick={() => redirectTo(`/contact-history/${customerId}`)}
          className="w-full bg-gray-500 px-6 py-3 rounded-lg text-xl text-white hover:bg-gray-400 flex items-center justify-center space-x-2"
        >
          <User className="h-6 w-6" />
          <span>Contact History</span>
        </button>
        <button
          onClick={() => redirectTo(`/analytics/${customerId}`)}
          className="w-full bg-gray-500 px-6 py-3 rounded-lg text-xl text-white hover:bg-gray-400 flex items-center justify-center space-x-2"
        >
          <User className="h-6 w-6" />
          <span>Analytics</span>
        </button>
      </div>
    </div>
  );
};

export default CustomerProfilePage;

