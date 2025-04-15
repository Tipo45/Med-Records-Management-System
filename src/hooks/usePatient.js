import { useQuery } from "@tanstack/react-query";
import { patient_info } from "../lib/pocketbase";


export function usePatients() {
  

    return useQuery({
        queryFn: () => patient_info(),
        queryKey: ["patients"],
        networkMode: "always"
    });
}