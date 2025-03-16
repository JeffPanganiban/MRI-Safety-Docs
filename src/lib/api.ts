import { supabase } from "../../supabase/supabase";
import {
  Device,
  Manufacturer,
  Category,
  SearchFilters,
  SafetyStatus,
} from "../types/device";

// Mock devices data for search results
const mockDevices: Device[] = [
  {
    id: 1,
    name: "Neuro Implant X1",
    modelNumber: "NI-X1-2023",
    manufacturerId: 1,
    manufacturer: { id: 1, name: "Medtronic", createdAt: "", updatedAt: "" },
    categoryId: 1,
    category: { id: 1, name: "Neurostimulators", createdAt: "", updatedAt: "" },
    safetyStatus: "MR Conditional",
    conditions: "1.5T and 3T only, specific positioning requirements",
    fieldStrength: "1.5T, 3T",
    additionalInfo: "Patient must be monitored during scan",
    documentationUrl: "https://example.com/docs/neuro-implant-x1",
    imageUrl:
      "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=400&q=80",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: 2,
    name: "NeuroStim 3000",
    modelNumber: "NS-3000",
    manufacturerId: 2,
    manufacturer: {
      id: 2,
      name: "Boston Scientific",
      createdAt: "",
      updatedAt: "",
    },
    categoryId: 1,
    category: { id: 1, name: "Neurostimulators", createdAt: "", updatedAt: "" },
    safetyStatus: "MR Conditional",
    conditions: "3T only, specific positioning requirements",
    fieldStrength: "3T",
    additionalInfo: "Device must be in MRI mode before scan",
    documentationUrl: "https://example.com/docs/neurostim-3000",
    imageUrl:
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&q=80",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: 3,
    name: "CardioRhythm Pacemaker",
    modelNumber: "CR-PM-2023",
    manufacturerId: 1,
    manufacturer: { id: 1, name: "Medtronic", createdAt: "", updatedAt: "" },
    categoryId: 2,
    category: { id: 2, name: "Cardiac Devices", createdAt: "", updatedAt: "" },
    safetyStatus: "MR Conditional",
    conditions: "1.5T only, specific positioning requirements",
    fieldStrength: "1.5T",
    additionalInfo: "Device must be programmed to MRI Safe mode before scan",
    documentationUrl: "https://example.com/docs/cardiorhythm",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: 4,
    name: "InsulinFlow Pump",
    modelNumber: "IF-2022",
    manufacturerId: 3,
    manufacturer: { id: 3, name: "Abbott", createdAt: "", updatedAt: "" },
    categoryId: 3,
    category: { id: 3, name: "Insulin Pumps", createdAt: "", updatedAt: "" },
    safetyStatus: "MR Unsafe",
    conditions: "Must be removed before MRI scan",
    fieldStrength: "N/A",
    additionalInfo: "Device must be removed and stored outside MRI room",
    documentationUrl: "https://example.com/docs/insulinflow",
    imageUrl:
      "https://images.unsplash.com/photo-1631815588090-d1bcbe9a8537?w=400&q=80",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: 5,
    name: "CochlearClear Implant",
    modelNumber: "CC-2023",
    manufacturerId: 4,
    manufacturer: { id: 4, name: "Philips", createdAt: "", updatedAt: "" },
    categoryId: 4,
    category: {
      id: 4,
      name: "Cochlear Implants",
      createdAt: "",
      updatedAt: "",
    },
    safetyStatus: "MR Conditional",
    conditions:
      "External components must be removed, internal magnet considerations",
    fieldStrength: "1.5T",
    additionalInfo: "Special head positioning required",
    documentationUrl: "https://example.com/docs/cochlearclear",
    imageUrl:
      "https://images.unsplash.com/photo-1598885159329-9377168ac375?w=400&q=80",
    createdAt: "",
    updatedAt: "",
  },
];

// Fetch all devices with optional filtering
export async function getDevices(filters?: SearchFilters) {
  let query = supabase.from("devices").select(`
      *,
      manufacturer:manufacturers(*),
      category:device_categories(*)
    `);

  // Apply filters if provided
  if (filters) {
    if (filters.categoryId) {
      query = query.eq("category_id", filters.categoryId);
    }
    if (filters.manufacturerId) {
      query = query.eq("manufacturer_id", filters.manufacturerId);
    }
    if (filters.safetyStatus) {
      query = query.eq("safety_status", filters.safetyStatus);
    }
    if (filters.query) {
      query = query.ilike("name", `%${filters.query}%`);
    }
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching devices:", error);
    throw error;
  }

  return data as unknown as Device[];
}

// Fetch a single device by ID
export async function getDeviceById(id: string | number) {
  const { data, error } = await supabase
    .from("devices")
    .select(
      `
      *,
      manufacturer:manufacturers(*),
      category:device_categories(*)
    `,
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching device with ID ${id}:`, error);
    throw error;
  }

  return data as unknown as Device;
}

// Fetch all categories
export async function getCategories() {
  const { data, error } = await supabase.from("device_categories").select("*");

  if (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }

  return data as Category[];
}

// Fetch a single category by ID
export async function getCategoryById(id: string | number) {
  const { data, error } = await supabase
    .from("device_categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching category with ID ${id}:`, error);
    throw error;
  }

  return data as Category;
}

// Fetch all manufacturers
export async function getManufacturers() {
  const { data, error } = await supabase.from("manufacturers").select("*");

  if (error) {
    console.error("Error fetching manufacturers:", error);
    throw error;
  }

  return data as Manufacturer[];
}

// Fetch a single manufacturer by ID
export async function getManufacturerById(id: string | number) {
  const { data, error } = await supabase
    .from("manufacturers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching manufacturer with ID ${id}:`, error);
    throw error;
  }

  return data as Manufacturer;
}

// Search devices by name or model number
export async function searchDevices(query: string) {
  console.log("Searching for:", query);

  // For development/testing, use mock data instead of actual API call
  return new Promise<Device[]>((resolve) => {
    setTimeout(() => {
      const results = mockDevices.filter((device) => {
        const searchTerms = query.toLowerCase();
        return (
          device.name.toLowerCase().includes(searchTerms) ||
          device.modelNumber?.toLowerCase().includes(searchTerms) ||
          device.manufacturer?.name.toLowerCase().includes(searchTerms) ||
          device.category?.name.toLowerCase().includes(searchTerms) ||
          device.conditions?.toLowerCase().includes(searchTerms)
        );
      });
      console.log("Search results:", results);
      resolve(results);
    }, 500); // Simulate network delay
  });

  // Uncomment this for actual API implementation
  /*
  const { data, error } = await supabase
    .from("devices")
    .select(
      `
      *,
      manufacturer:manufacturers(*),
      category:device_categories(*)
    `,
    )
    .or(`name.ilike.%${query}%,model_number.ilike.%${query}%`);

  if (error) {
    console.error("Error searching devices:", error);
    throw error;
  }

  console.log("Search results from DB:", data);
  return data as unknown as Device[];
  */
}

// Get devices by safety status
export async function getDevicesBySafetyStatus(status: SafetyStatus) {
  const { data, error } = await supabase
    .from("devices")
    .select(
      `
      *,
      manufacturer:manufacturers(*),
      category:device_categories(*)
    `,
    )
    .eq("safety_status", status);

  if (error) {
    console.error(
      `Error fetching devices with safety status ${status}:`,
      error,
    );
    throw error;
  }

  return data as unknown as Device[];
}
