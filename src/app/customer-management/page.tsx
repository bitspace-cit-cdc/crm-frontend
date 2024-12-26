import { CustomersTable } from "@/components"; 

const CustomerManagementPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Customer Management</h1>
      <CustomersTable /> 
    </div>
  );
};

export default CustomerManagementPage;

