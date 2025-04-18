import { useQuery } from "@tanstack/react-query";
import { getSinglePatient, patient_info } from "../lib/pocketbase";


export function usePatients() {
    return useQuery({
        queryFn: () => patient_info(),
        queryKey: ["patients"],
        networkMode: "always"
    });
}

export function useSinglePatient(id) {
    return useQuery({
      queryKey: ["patient", id],
      queryFn: () => getSinglePatient(id),
      enabled: !!id,
      networkMode: "always" 
    });
  }
  