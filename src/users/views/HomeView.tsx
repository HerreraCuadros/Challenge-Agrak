import { UserList } from "../components"

import { useInvalidateOnVisibilityChange } from "../../hooks/useInvalidateOnVisibleChange";


export const HomeView = () => {
    useInvalidateOnVisibilityChange();

    return (
        <div>
            <div>
                <UserList />
            </div>
        </div>
    )
}