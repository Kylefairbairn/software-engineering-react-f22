import {createTuitByUser, deleteTuit, findAllTuits, findTuitById} from '../services/tuits-service'

describe('can create tuit with REST API', () => {

    const gogginsTuit = {
      postedBy: "635fc04570097e412eba2b92",
      tuit: "looking forward to ufc 283"
  };

    beforeAll(() =>{
        return createTuitByUser(gogginsTuit.postedBy,gogginsTuit);
    });

    // not deleting
    afterAll( () => {
        return deleteTuit(gogginsTuit._id.toString());
    });


  test('can retrieve tuit from REST API by primary key', async () => {
      const newTuit = await createTuitByUser(gogginsTuit.postedBy,gogginsTuit)
      expect(newTuit.tuit).toEqual(gogginsTuit.tuit)
      expect(newTuit.uid).toEqual(gogginsTuit.uid)
  });
});


describe('can delete tuit with REST API',  () => {

    let dummyTuit = {
         postedBy:  "635fc04570097e412eba2b92",
         tuit: "please delete!"
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

    afterAll(() => {
        dummyTuit =  deleteTuit(dummyTuit._id);
        newTuit = deleteTuit(newTuit._id);
    });

    test('get tuit by tid', async () => {

        newTuit = await createTuitByUser(dummyTuit.postedBy, dummyTuit);

        expect(newTuit.postedBy).toEqual(dummyTuit.postedBy);
        expect(newTuit.tuit).toEqual(dummyTuit.tuit);

        let findTuit = await findTuitById(newTuit._id);

        expect(findTuit.postedBy._id).toEqual(newTuit.postedBy);
        expect(findTuit.tuit).toEqual(newTuit.tuit);
    })

});

describe('can retrieve all tuits with REST API',  () => {
   let user = {
       id: '636280506fb279cac614c412',
       username: "lex fridman",
       password: '12134',
       email: "lex@gmail.com"
   }
  let dummyTuits = [
      {postedBy:"636280506fb279cac614c412", tuit:'computer science is cool'},
      {postedBy:"636280506fb279cac614c412", tuit:'BJJ rocks!'},
      {postedBy:"636280506fb279cac614c412", tuit:'wrestling is an art'}];


    beforeAll( () => {
        dummyTuits = dummyTuits.map(async eachTuit => {
            eachTuit = await createTuitByUser(eachTuit.postedBy, eachTuit)
        })
        return dummyTuits
    })

  afterAll(()=> {
      dummyTuits.map(tuit =>
        deleteTuit(tuit._id.toString())
      )
  });

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