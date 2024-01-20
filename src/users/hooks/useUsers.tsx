import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../api/userApi";
import { User } from "../../models/user";



export const useUsers = () => {

    const usersQuery = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: fetchUsers,
        staleTime: 1000 * 60 * 5, //1000 * 60 * 5,
    });

    return usersQuery;

}