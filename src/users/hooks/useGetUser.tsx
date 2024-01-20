import { useQuery } from "@tanstack/react-query";
import { User } from "../../models/user";
import { fetchUserById } from "../../api/userApi";

export const useGetUser = (userId: string) => {

    const userQuery = useQuery<User>({
        queryKey: ['user', userId],
        queryFn: () => fetchUserById(userId),
        staleTime: 1000 * 60 * 5, //1000 * 60 * 5,
    });

    return userQuery;

}