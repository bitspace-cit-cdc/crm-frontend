"use client";

import React, { useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useCustomerStore } from "@store/store";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const CustomersTable = () => {
  const {
    customers,
    filteredCustomers,
    searchQuery,
    currentPage,
    totalPages,
    setCustomers,
    setFilteredCustomers,
    setSearchQuery,
    setCurrentPage,
  } = useCustomerStore();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:6969/api/v1/customers");
        const customersData = response.data.data;
        setCustomers(customersData);
        setFilteredCustomers(customersData);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter((customer) =>
        Object.values(customer).some((val) =>
          String(val).toLowerCase().includes(query.toLowerCase())
        )
      );
      setFilteredCustomers(filtered);
    }
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = filteredCustomers.slice(startIndex, endIndex);

  return (
    <div className="p-4">
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search customers..."
            value={searchQuery}
            onChange={handleSearch}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500" />
        </div>
        <Button variant="outline" size="icon" className="h-10 w-10">
          <Search className="h-8 w-8" />
        </Button>
      </div>

      {currentPageData.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse bg-white shadow-sm rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border p-3 text-left">Name</th>
                  <th className="border p-3 text-left">Email</th>
                  <th className="border p-3 text-left">Phone</th>
                  <th className="border p-3 text-left">Address</th>
                  <th className="border p-3 text-left">Gender</th>
                </tr>
              </thead>
              <tbody>
                {currentPageData.map((customer, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border p-3">
                      <Link href={`/customer-management/${customer["customer_id"]}`} className="text-blue-500 hover:underline">
                        {customer.name}
                      </Link>
                    </td>
                    <td className="border p-3">{customer.email}</td>
                    <td className="border p-3">{customer.phone}</td>
                    <td className="border p-3">{customer.address}</td>
                    <td className="border p-3">
                      {customer.gender ? "Male" : "Female"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No customers found matching your search.
        </div>
      )}
    </div>
  );
};

export default CustomersTable;

