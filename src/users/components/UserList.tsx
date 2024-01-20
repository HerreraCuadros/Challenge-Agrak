import { User } from "../../models/user";
import { Table, Avatar, ActionIcon, Button, Loader } from '@mantine/core';
import { IconEdit, IconTrash, IconPlus } from '@tabler/icons-react';
import { useNavigationPath, useMutationUser, useUsers } from "../hooks";


export const UserList = () => {

    const users = useUsers();
    const { mutationDeleteInList } = useMutationUser();
    const { goToUserEdit, goToUserCreate  } = useNavigationPath();

    const handleEditClick = (user: User) => {
        goToUserEdit(user);
    };

    const handleCreateClick = () => {
        goToUserCreate();
    }

    const handleDelete = async (userId: string): Promise<void> => {
        mutationDeleteInList.mutate(userId);
    };
  
    if (users.isError) {
      return <p>Error loading users</p>;
    }

    const rows = users.data?.map((user) => (
        <Table.Tr key={user.id}>
            <Table.Td>
                <Avatar src={user.avatar} alt={`${user.first_name} Avatar`} />
            </Table.Td>
            <Table.Td>{user.first_name}</Table.Td>
            <Table.Td>{user.second_name}</Table.Td>
            <Table.Td>{user.email}</Table.Td>
            <Table.Td> 
                <ActionIcon className="mr-2" variant="filled" aria-label="edit" onClick={() => handleEditClick(user)}>
                    <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
                <ActionIcon variant="filled" aria-label="trash" color="red" onClick={() => handleDelete(user.id)}>
                    <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </Table.Td>
        </Table.Tr>
    ))

    return (
        <div className="container mx-auto my-8">
            
            <h1 className="">User List</h1>

            {users.isLoading && 
                <div className="grid justify-center">
                    <Loader color="blue" />   
                </div> 
            }
     
            <div className="grid justify-items-end">
                <Button type="button" onClick={handleCreateClick}>
                    <IconPlus className="mr-1" style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    New User
                </Button>
            </div>
   
            <Table title="User List" striped>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Avatar</Table.Th>
                        <Table.Th>First name</Table.Th>
                        <Table.Th>Second name</Table.Th>
                        <Table.Th>Email</Table.Th>
                        <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </div>
    );
}