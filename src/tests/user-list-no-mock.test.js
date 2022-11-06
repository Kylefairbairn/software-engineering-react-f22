import {findAllUsers} from "../services/users-service";
import {render, screen} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {UserList} from "../components/profile/user-list";

// integration test which tests the API get all users CRUD operation
// tests to see if users gets rendered
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