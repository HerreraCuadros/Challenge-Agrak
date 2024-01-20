import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "../../models/user";
import { createUser, deleteUser, updateUser } from "../../api/userApi";
import { useNavigationPath } from ".";
import {toast} from 'react-hot-toast';


export const useMutationUser = () => {

    const queryClient = useQueryClient();
    const { goToHome } = useNavigationPath();


    const mutationCreate = useMutation({
        mutationFn: (user: User) => createUser(user),
        onSuccess: (newUser) => {
            queryClient.setQueryData<User[]>(
                ['users'],
                (previous) => {
                    if (!previous) return [newUser];

                    return [...previous, newUser];
                }
            )
            toast.success('Successfully created'); 
            goToHome();
        }
    });

    const mutationUpdate = useMutation({
        mutationFn: (user: User) => updateUser(user.id, user),
        onSuccess: (userUpdated) => {
            queryClient.setQueryData<User[]>(
                ['users'],
                (previous) => {
                    if (!previous) return [userUpdated];
                    const index = previous.findIndex( user => user.id === userUpdated.id);
                    if (index === -1) return [...previous];
                    previous[index] = userUpdated;
                    return [...previous];
                }
            )

            queryClient.setQueryData<User>(['user', userUpdated.id], userUpdated);
            toast.success('Successfully updated'); 
            goToHome();
        }
    });

    const mutationDelete = useMutation({
        mutationFn: (userId: string) => deleteUser(userId),
        onSuccess: (_, userId) =>{
            deleteUserQueryCache(userId);
            toast.success('Successfully removed');
            goToHome();
        }
    })

    const mutationDeleteInList = useMutation({
        mutationFn: (userId: string) => deleteUser(userId),
        onSuccess: (_, userId) =>{
            toast.success('Successfully removed');
            deleteUserQueryCache(userId);
            // queryClient.invalidateQueries({ queryKey: ['users']});
        }
    })

    const deleteUserQueryCache = (userId: string) => {
        queryClient.setQueryData<User[]>(
            ['users'],
            (previous) => {
                if (!previous) return [];
                return previous.filter((user) => user.id !== userId);
            }
        )
        queryClient.setQueryData<User>(['user', userId], undefined);
    }

    return {
        mutationCreate,
        mutationUpdate,
        mutationDelete,
        mutationDeleteInList
    };
}