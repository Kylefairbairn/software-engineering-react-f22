import {createTuitByUser, deleteTuit, findAllTuits, findTuitById} from '../services/tuits-service'
import * as Console from "console";

describe('can create tuit with REST API', () => {

    // mock tuit
    const gogginsTuit = {
      postedBy: "635fc04570097e412eba2b92",
      tuit: "looking forward to ufc 283"
  };
    // create before test
    beforeAll(() =>{
        return createTuitByUser(gogginsTuit.postedBy,gogginsTuit);
    });
    // deletes test test
    afterAll( () => {
        return deleteTuit(gogginsTuit._id.toString());
    });


  test('can retrieve tuit from REST API by primary key', async () => {
      // checks tuit created with a get request and compares the two objects
      const newTuit = await createTuitByUser(gogginsTuit.postedBy,gogginsTuit)
      expect(newTuit.tuit).toEqual(gogginsTuit.tuit)
      expect(newTuit.uid).toEqual(gogginsTuit.uid)
  });
});


describe('can delete tuit with REST API',  () => {

    let dummyTuit = {
         postedBy:  "635fc04570097e412eba2b92",
         tuit: "Tuit AAA"
     };

     beforeAll(async () => {
         // create a tuit so I can delete it
        dummyTuit = await createTuitByUser(dummyTuit.postedBy, dummyTuit);
        return(dummyTuit)
     });

     afterAll(() => {
          //delete by using the PK of the tuit
        return deleteTuit(dummyTuit._id);
     });

     test('deleteTuit',  async () => {
         // tests deleting the tuit
         const status = await deleteTuit(dummyTuit._id);
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
     });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
     let dummyTuit = {
        postedBy:  "635fc04570097e412eba2b92",
        tuit: "please get!"
    }

    let newTuit = ""

    // deletes tuits if they already exist
    afterAll(() => {
        dummyTuit =  deleteTuit(dummyTuit._id);
        newTuit = deleteTuit(newTuit._id);
    });

    test('get tuit by tid', async () => {
        // creates tuit to test retrieving
        newTuit = await createTuitByUser(dummyTuit.postedBy, dummyTuit);

        // ensures create tuit works
        expect(newTuit.postedBy).toEqual(dummyTuit.postedBy);
        expect(newTuit.tuit).toEqual(dummyTuit.tuit);

        // finds the tuit
        let findTuit = await findTuitById(newTuit._id);

        // tests the data again
        expect(findTuit._id).toEqual(newTuit._id);
        expect(findTuit.tuit).toEqual(newTuit.tuit);
    })

});
// retireves all tuits
describe('can retrieve all tuits with REST API',  () => {
   let user = {
       id: '636280506fb279cac614c412',
       username: "lex fridman",
       password: '12134',
       email: "lex@gmail.com"
   }
  let dummyTuits = [
      {postedBy:"636280506fb279cac614c412", tuit:'Test 111'},
      {postedBy:"636280506fb279cac614c412", tuit:'BJJ rocks!'},
      {postedBy:"636280506fb279cac614c412", tuit:'wrestling is an art'}];
   let actualTuits = []

    // creates each tuit
    beforeAll( () => {
        dummyTuits = dummyTuits.map(async eachTuit => {
            const actualTuit = await createTuitByUser(eachTuit.postedBy, eachTuit)
            actualTuits.push(actualTuit)
        })
        return dummyTuits
    })

    // deletes tuit at the end
  afterAll( ()=> {
       const qwe = actualTuits.map( async (tuit) =>
       {
           let status
           try {
               status = await deleteTuit(tuit._id)
           } catch (e) {
               console.log(e)
           }
           return status
       }
      )
      return qwe
  });

   // checks the difference of all tuits versus mocked tuits
  test('find all tuits', async () => {

      const allTuits = await findAllTuits();

      expect(allTuits.length).toBeGreaterThanOrEqual(dummyTuits.length);

      const tuitsWeInserted = allTuits.filter(
          eachTuit => dummyTuits.indexOf(eachTuit.tuit) >= 0);

      tuitsWeInserted.forEach(eachTuit => {
          const dummyTuit = dummyTuits.find(dummyTuit => dummyTuit === eachTuit.tuit);
          expect(eachTuit.tuit).toEqual(dummyTuit.tuit);
          expect(eachTuit.postedBy).toEqual(dummyTuit.postedBy);

  });
  });
});