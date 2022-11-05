import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";
//import Tuit from "../components/tuits/tuit";
//import Tuits from "../components/tuits/index.js"

import Index from "../components/tuits"
import Tuits from "../components/tuits";

jest.mock('axios');


const MOCKED = [
    {
        _id: "000000000000000000000000",
        postedBy:  {
            username: "bob",
            password: "12345",
            email: "gmail.com",
            _id:"111111111111111111111111"
        },
        tuit: "alice's tuit"
    },
    {
        _id: "222222222222222222222222",
        postedBy:  {
            username: "alice",
            password: "123456",
            email: "gmail.com",
            _id: "333333333333333333333333"
        },
        tuit: "bob's tuit"
    },
    {
        _id: "44444444444444444444444",
        postedBy:  {
            username: "charlie",
            password: "1234567",
            email: "gmail.com",
            _id: "55555555555555555555555"
        },
        tuit: "charlie's tuit"
    }]


test('tuit list renders static tuit array', () => {
    render(
        <HashRouter>
            <Tuits tuits={MOCKED}/>
        </HashRouter>);

    MOCKED.map(tuit => {
        let username = tuit.postedBy.username
        const elementCheck = screen.getAllByText(`${username}@${username} -`)
        elementCheck.forEach(
            username => expect(username).toBeInTheDocument()
        )
    })
});


test('tuit list renders mocked', async () => {
    //
    axios.get.mockImplementation(() =>
        Promise.resolve({data: {tuits: MOCKED}}));
    const response = await findAllTuits();
    const tuits = response.tuits;

    render(
        <HashRouter>
            <Tuits tuits={tuits} deleteTuit={function () {
            }}/>
        </HashRouter>);

    const tuit = screen.getByText(/alice's tuit/i);
    expect(tuit).toBeInTheDocument();
});
