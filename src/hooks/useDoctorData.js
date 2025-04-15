import { useQuery } from "@tanstack/react-query";
import { doctor_info, pb } from "../lib/pocketbase";

export function useDoctorData() {
    const id = pb.authStore.record.id;
    return useQuery({
        queryFn: () => doctor_info(),
        queryKey: ["doc_info", id],
        networkMode: "always"
    });
}