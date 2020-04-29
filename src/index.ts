import * as mongodb from "mongodb";
import assert from "assert";

const PORT = 27017;
const url = `mongodb://localhost:${PORT}`;
const DB_NAME = "my-mongo-db";
const COLLECTION_NAME = 'my-collection';

async function main() {
    let client;
    try {
        // MongoDB 3.5.6
        client = new mongodb.MongoClient(url, { useUnifiedTopology: true });
        await client.connect();
        console.info(`MongoDB connection established on port ${PORT}`);
    } catch (exc) {
        console.error("DB Conncetion could not be established", exc);
    }

    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
    let result;
    let myData;

    ////////////////////
    // Collections
    ////////////////////

    // get list of all collections as array
    const collectionList = await db.listCollections().toArray();

    // check if specific collection exists
    const hasCollection = collectionList.find(item => item.name == COLLECTION_NAME);

    if (hasCollection) {
        // drop collection
        // Mongo throws 'ns not found' if we tried to drop a non-existing collection
        await collection.drop();
        console.log("Collection dropped");
    } else {
        console.log(`Collection ${COLLECTION_NAME} does not exist`);
    }

    ////////////////////
    // Database
    ////////////////////

    // list of all databases
    await db.admin().listDatabases();

    // drop database
    await db.dropDatabase();
    console.log("Database dropped");

    ////////////////////
    // Inserts
    ////////////////////

    // insert many
    myData = [
        { skill: "TypeScript", status: 0 },
        { skill: "TypeScript", status: 1 },
        { skill: "JavaScript", status: 2 },
        { skill: "PHP", status: 0 },
        { skill: "Java", status: 3 },
        { skill: "C#", status: 3 },
    ];
    result = await collection.insertMany(myData);
    assert.equal(result.insertedCount, 6);
    console.log(`Inserted ${result.insertedCount} records`);

    // insert one
    (myData as any) = { skill: "C#", status: 1 };
    result = await collection.insertOne(myData);
    assert.equal(result.insertedCount, 1);
    console.log(`Inserted ${result.insertedCount} record`);

    ////////////////////
    // Deletions
    ////////////////////

    // delete one by id
    result = await collection.deleteOne({ _id: new mongodb.ObjectID(result.insertedId) });
    console.log(`Deleted ${result.deletedCount} record`);

    // delete many
    result = await collection.deleteMany({ skill: "TypeScript" });
    console.log(`Deleted ${result.deletedCount} records`);
    result = await collection.find({ skill: "TypeScript" }).count();
    assert.equal(result, 0);

    ////////////////////
    // Query
    ////////////////////
    let resultCount;

    // get total documents count of a collection
    resultCount = await collection.countDocuments();
    assert.equal(resultCount, 4);
    console.log(`There are ${resultCount} documents in ${COLLECTION_NAME}`);

    // find many by specific field value
    result = collection.find({ skill: "TypeScript" });
    resultCount = await result.count();
    assert.equal(resultCount, 0);
    console.log(`Filtered by skill and found ${resultCount} results`);

    result.forEach(doc => {
        console.log(`${doc.skill} has status ${doc.status}`);
    });

    // limit
    result = collection.find({ skill: "PHP" })
    result = await result.limit(1).toArray();
    resultCount = result.length;
    assert.equal(resultCount, 1);
    console.log(`Filtered by skill and found ${resultCount} results`);

    // find one by id
    const id = result[0]._id;
    result = await collection.findOne(id);
    assert(id, result._id);

    // find one by specific field value
    result = await collection.findOne({ skill: "PHP" });
    assert.equal(result.skill, "PHP");
    assert.equal(result.status, 0);

    ////////////////////
    // Updates
    // Update Operators: https://docs.mongodb.com/manual/reference/operator/update/
    ////////////////////

    // update existing one AND return updated record
    result = await collection.findOneAndUpdate({ _id: result._id }, {
        $set: { skill: "PHP6" },
        $currentDate: { "lastModified": true }
    }, {
        // return updated doc instead of original
        returnOriginal: false,
        // insert updated doc if it didn't exist
        upsert: true
    });
    
    console.log(`Updated skill to ${result.value.skill}`);
    result = await collection.findOne({ skill: "PHP6" });
    assert.equal(result.skill, "PHP6");
    assert.equal(result.status, 0);

    // update existing one and DO NOT return updated record
    result = await collection.updateOne({ _id: result._id }, {
        $set: { skill: "PHP5" },
        $currentDate: { "lastModified": true },
    });

    console.log(`Updated skill and result.ok == ${result.result.ok}`);
    result = await collection.findOne({ skill: "PHP5" });
    assert.equal(result.skill, "PHP5");
    assert.equal(result.status, 0);

    // replace one by filter criteria
    result = await collection.findOneAndReplace({ _id: result._id }, { skill: "PHP7" }, { returnOriginal: false });
    console.log(`Updated skill to ${result.value.skill}`);
    result = await collection.findOne({ skill: "PHP7" });
    assert.equal(result.skill, "PHP7");
    assert.equal(result.status, undefined); // undefined because we don't update, we replace





    client.close();
}



main();