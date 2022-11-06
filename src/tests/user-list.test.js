import {UserList} from "../components/profile/user-list";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllUsers} from "../services/users-service";
import axios from "axios";


// tests rendered mock users
const MOCKED_USERS = [
  {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
  {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
]

jest.mock('axios');

describe("static array", () => {

  beforeAll(() => {
    jest.mock('axios');
  })

  afterAll(() => {
    jest.unmock('axios');
  })

  test('user list renders static user array', () => {
    render(
        <HashRouter>
          <UserList users={MOCKED_USERS}/>
        </HashRouter>);
    const linkElement = screen.getByText(/ellen_ripley/i);
    expect(linkElement).toBeInTheDocument();
  });
});



// tests async mocked users and ensures that they get rendered
describe("user list renders mocked ", () => {

  test('user list renders mocked', async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: {users: MOCKED_USERS} }));
    const response = await findAllUsers();
    const users = response.users;

    render(
      <HashRouter>
        <UserList users={users}/>
      </HashRouter>);

    const user = screen.getByText(/ellen_ripley/i);
    expect(user).toBeInTheDocument();
  });
});
