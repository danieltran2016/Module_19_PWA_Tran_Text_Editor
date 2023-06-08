import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

//Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
//make connection to DB and which version we wnat to use 
const jateDb = await openDB('jate',1);

//make a new transaction and specify the database's abilities
const tx = jateDb.transaction('jate', 'readwrite');

//opening the object store
const store = tx.objectStore('jate');

//use the put method to add content
const request = store.put({id:1, value:content});

//confirm the request
const result = await request;
console.log('data saved to database', result);
};



//Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');

  //create connnection from database and choose which version we want to use
  const jateDB = await openDB('jate',1);

  //create a new transaction and specify data abilities 
  const tx = jateDB.transaction('jate','readonly');

  //open the object store
  const store = tx.objectStore('jate');

  //use getAll method to get everything from database
  const request = store.getAll();

  //get confirmation of request
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
