import { FC, useEffect, useState } from 'react';
import { TextInput, Button, Group, Box, Avatar, ActionIcon, Modal, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconArrowLeft, IconTrash, IconX, IconDeviceFloppy } from '@tabler/icons-react';
import { User } from '../../models/user';
import { useNavigationPath } from '../hooks';
import { useMutationUser } from '../../api/mutations/useMutationUser';

interface props {
    user?: User;
}

export const UserForm: FC<props> = ({user}) => {

    const [isModalOpen, setModalOpen] = useState(false);
    const { mutationCreate, mutationUpdate, mutationDelete } = useMutationUser();
    const { goToHome } = useNavigationPath();

    const form = useForm<User>({
        initialValues: {
          id: user?.id || '',
          createdAt: new Date(),
          avatar: user?.avatar || '',
          first_name: user?.first_name || '',
          second_name: user?.second_name ||'',
          email: user?.email || ''
        },
    
        validate: {
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
          avatar: (value) => (/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value) ? null : 'Invalid URL'),
          first_name: (value) => (value === " ") ? null : 'Field required',
          second_name: (value) => (value === " ") ? null : 'Field required',
        },
    });

    useEffect(() => {
        form.setValues({
            id: user?.id || '',
            createdAt: new Date(),
            avatar: user?.avatar || '',
            first_name: user?.first_name || '',
            second_name: user?.second_name || '',
            email: user?.email || ''
        });
    }, [user]);
    
      
    const handleGoToHome = () => {
        goToHome();
    };

    const handleDelete = async (userId: string): Promise<void> => {
        mutationDelete.mutate(userId);
    };
  
    const handelFormSubmit = (userForm: User) => {
        user ? mutationUpdate.mutate(userForm) : mutationCreate.mutate(userForm)
    }


    return (
        <Box maw={340} mx="auto">
            
            <ActionIcon variant="subtle" aria-label="Settings" onClick={handleGoToHome}>
                <IconArrowLeft style={{ width: '90%', height: '90%' }} stroke={1.5} />
            </ActionIcon>
            <div className='mb-3'>
            <Title order={2}>{ user ? 'Edit user' : 'Create new user'}</Title>
            </div>
            
            <form onSubmit={form.onSubmit(handelFormSubmit)}>
                <div className="flex justify-center h-40">
                        <Avatar className="ring-2 ring-blue-500 w-40" src={form.getInputProps('avatar').value} alt={`${user?.first_name} Avatar`} size="10rem" variant="outline"></Avatar>
                </div>
                
                <TextInput
                    withAsterisk
                    label="Avatar"
                    placeholder="Image URL"
                    required
                    {...form.getInputProps('avatar')}
                />
                <TextInput
                    withAsterisk
                    label="First Name"
                    placeholder="First name"
                    required
                    {...form.getInputProps('first_name')}
                />
                <TextInput
                    withAsterisk
                    label="Second Name"
                    placeholder="Second name"
                    required
                    {...form.getInputProps('second_name')}
                />
                <TextInput
                    withAsterisk
                    label="Email"
                    placeholder="your@email.com"
                    required
                    {...form.getInputProps('email')}
                />
            
                { user && 
                <Group justify="center" mt="md">
                    <ActionIcon variant="filled" aria-label="Settings" color="red" onClick={() => setModalOpen(true)}>
                        <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </Group> 
                }
                <Group justify="center" mt="md">
                    <Button type="button" color="gray" onClick={handleGoToHome}>
                        <IconX className='mr-1' style={{ width: '50%', height: '50%' }} stroke={1.5} />
                        Cancel
                    </Button>
                    <Button type="submit" >
                        <IconDeviceFloppy className='mr-1' style={{ width: '50%', height: '50%' }} stroke={1.5} />
                        Save
                    </Button>
                </Group>
            </form>
            <Modal
                title="Confirm Deletion"
                opened={isModalOpen}
                onClose={() => setModalOpen(false)}
                centered
            >
                <p>Are you sure to delete the user?</p>
                <Button color="red" onClick={() => handleDelete(user?.id || '')}>yes, delete</Button>
            </Modal>
        </Box>
    )
}