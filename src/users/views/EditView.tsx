import { User } from "../../models/user";
import { UserForm } from "../components"
import { useLocation, useParams } from 'react-router-dom';
import { useGetUser, useNavigationPath } from "../hooks";

export const EditView = () => {
    const { goToHome } = useNavigationPath();
    const location = useLocation();
    const locationUser: User = location?.state?.user;
    const { id } = useParams();
    const { data, isError } = useGetUser(id || '', locationUser);

    if (isError) {
        goToHome();
    }

    return (
        <>
            <UserForm user={locationUser || data} ></UserForm>
        </>
    )
}