import {findAllUsers} from "../services/users-service";
import {render, screen} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {UserList} from "../components/profile/user-list";

describe("user list renders async", () => {


    test('user list renders async', async () => {
        const users = await findAllUsers();
        render(
            <HashRouter>
                <UserList users={users}/>
            </HashRouter>);
        const linkElement = screen.getByText(/joe rogan/i);
        expect(linkElement).toBeInTheDocument();
    });

})