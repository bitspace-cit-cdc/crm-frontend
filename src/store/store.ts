import { create } from 'zustand';

interface CustomerStore {
  customers: any[]; 
  filteredCustomers: any[];
  searchQuery: string;
  currentPage: number;
  totalPages: number;
  setCustomers: (customers: any[]) => void;
  setFilteredCustomers: (customers: any[]) => void;
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
  setTotalPages: (total: number) => void;
  getCurrentPageData: () => any[];
}

export const useCustomerStore = create<CustomerStore>((set, get) => ({
  customers: [],
  filteredCustomers: [],
  searchQuery: '',
  currentPage: 1,
  totalPages: 0,

  setCustomers: (customers) => {
    const totalPages = Math.ceil(customers.length / 10);
    set({ 
      customers, 
      filteredCustomers: customers,
      totalPages 
    });
  },

  setFilteredCustomers: (customers) => {
    const totalPages = Math.ceil(customers.length / 10);
    set({ 
      filteredCustomers: customers,
      totalPages
    });
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    
    const currentCustomers = get().customers;
    
    if (query.trim() === '') {
      set({ 
        filteredCustomers: currentCustomers,
        currentPage: 1,
        totalPages: Math.ceil(currentCustomers.length / 10)
      });
    } else {
      const filtered = currentCustomers.filter((customer) =>
        Object.values(customer).some((val) =>
          val?.toString().toLowerCase().includes(query.toLowerCase())
        )
      );
      
      set({ 
        filteredCustomers: filtered,
        currentPage: 1,
        totalPages: Math.ceil(filtered.length / 10)
      });
    }
  },

  setCurrentPage: (page) => {
    set({ currentPage: page });
  },

  setTotalPages: (total) => set({ totalPages: total }),

  getCurrentPageData: () => {
    const { filteredCustomers, currentPage } = get();
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    return filteredCustomers.slice(startIndex, endIndex);
  },
}));
