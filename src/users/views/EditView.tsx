import { User } from "../../models/user";
import { UserForm } from "../components"
import { useLocation, useParams } from 'react-router-dom';
import { useGetUser } from "../hooks";

export const EditView = () => {
    const location = useLocation();
    const locationUser: User = location?.state?.user;
    const { id } = useParams();
    const { data } = useGetUser(id || '');

    return (
        <>
            <UserForm user={locationUser || data} ></UserForm>
        </>
    )
}