"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./authProvider";
import { Website } from "@/types";



interface DataContextType {
  data: Website[];
  loading: boolean;
  error: string | null;
}

const DataContext = createContext<DataContextType>({
  data: [],
  loading: true,
  error: null,
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

const {isAuthenticated,user}=useAuth()

  const fetchData = async (id:string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/getAllSite?userid=${id}`
      ); 
      //console.log(response.data?.data?.data?.[0].monitor)
      setData(response.data?.data?.data?.[0].monitor);
    } catch (err: any) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      if(isAuthenticated){
        fetchData(user?.id!);

    }
  }, [isAuthenticated && user]);

  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
