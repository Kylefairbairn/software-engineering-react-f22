import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";
//import Tuit from "../components/tuits/tuit";
//import Tuits from "../components/tuits/index.js"

import Index from "../components/tuits"
import Tuits from "../components/tuits";

jest.mock('axios');

const MOCKED_USERS = [
    "alice", "bob", "charlie"
];

const MOCKED_TUITS = [
    "alice's tuit", "bob's tuit", "charlie's tuit"
];

const MOCKED_USER_OBJECTS = [
    {username: 'alice', password: '1234', email: 'a@gmail.com', _id: "123"},
    {username: 'bob', password: 'illbeback', email: 'b@gmail.com', _id: "234"},
    {username: 'charlie', password: '1234', email: 'c@gmail.com', _id: "567"}
]

const MOCKED_TUITS_OBJECTS = [
    {_id: "123", postedBy: {username: "alice"}, tuit: "alice's tuit"},
    {_id: "456", postedBy: {username: "bob"}, tuit: "bob's tuit"},
    {_id: "789", postedBy: {username: "charlie"}, tuit: "charlie's tuit"}
]

const MOCKED = [
    {
        id: "635991a776ebe910513a6366",
        postedBy:  {
            username: "bob",
            password: "1234",
            email: "gmail.com",
            _id:"635991a776eee910513a6366"
        },
        tuit: "alice's tuit"
    },
    {
        id: "635991a776eee910513a6377",
        postedBy:  {
            username: "alice",
            password: "1234",
            email: "gmail.com",
            _id: "635991a776eee910513a6265"
        },
        tuit: "bob's tuit"
    },
    {
        id: "635991a776eee910513a63e4",
        postedBy:  {
            username: "charlie",
            password: "1234",
            email: "gmail.com",
            _id: "635991a776eee910513b6366"
        },
        tuit: "charlie's tuit"
    }
]

const MOCK =
    {
        id: "123456",
        postedBy:  {
            username: "alice",
            password: "1234",
            email: "gmail.com",
            _id: "897"
        },
        tuit: "hello"
    }


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

    //  render(
    //         <HashRouter>
    //             <Tuit tuit={MOCK}/>
    //         </HashRouter>);
    //const linkElement = screen.getByText(/alice/i);
    // const linkElement2 = screen.getByText(/alice's tuit"/i);
    // expect(linkElement2).toBeInTheDocument();
    // expect(linkElement).toBeInTheDocument();
});

test('tuit list renders async', async () => {
    // TODO: implement this

})


test('tuit list renders mocked', async () => {
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



