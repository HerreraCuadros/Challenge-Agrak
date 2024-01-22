import { useQuery } from "@tanstack/react-query";
import { User } from "../../models/user";
import { fetchUserById } from "../userApi";

export const useGetUser = (userId: string, user: User) => {

    const GetUser = (user: User) => {
        return user
    }

    const userQuery = useQuery<User>({
        queryKey: ['user', userId],
        queryFn: user ? () => GetUser(user) : () => fetchUserById(userId),
        staleTime: 1000 * 60 * 5,
        retry: false,  
    });
    return userQuery;

}