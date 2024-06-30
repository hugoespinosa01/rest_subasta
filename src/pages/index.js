import { Inter } from "next/font/google";
import { SubastaForm } from "@/components/component/subasta-form";
import services from "@/services";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  
  const [maxPuja, setMaxPuja] = useState(null);
  
  // Call a service method to fetch data
  const fetchData = async () => {
    try {
      const response = await services.getMaxPuja('http://localhost:3000/api/subasta/maxPuja/1'); // Replace "fetchData" with the actual method name
      // Process the response data
      setMaxPuja(response);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };  

  // Call the fetchData function when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <SubastaForm
        nombreMaxPuja={maxPuja?.name || "N/A"}
        maxPuja={maxPuja?.puja || "No existe puja"}
        setMaxPuja={setMaxPuja}
      />
    </main>
  );
}
