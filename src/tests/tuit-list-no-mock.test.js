import {findAllUsers} from "../services/users-service";
import {render, screen} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import Tuit from "../components/tuits/tuit";
import {findAllTuits} from "../services/tuits-service";
import Tuits from "../components/tuits";

test('user list renders async', async () => {
    const tuits = await findAllTuits();
    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>);
    const linkElement = screen.getByText(/joe rogan/i);
    expect(linkElement).toBeInTheDocument();
});