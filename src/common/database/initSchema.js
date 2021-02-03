import Realm from 'realm';

class Room extends Realm.Object {}
Room.schema = {
  name: 'Room',
  primaryKey: 'ID',
  properties: {
    ID: 'string',
    image: 'string',
    name: 'string',
    times: 'bool',
  },
};

class Device extends Realm.Object {}
Device.schema = {
  name: 'Device',
  primaryKey: 'ID',
  properties: {
    ID: 'string',
    icon: 'string',
    name: 'string',
    type: 'string',
    status: 'bool',
  },
};

let key = new Int8Array(64);
const config = {
  schema: [Room.schema, Device.schema],
  path: 'application.realm',
  encryptionKey: key,
  deleteRealmIfMigrationNeeded: true,
};

const realmInstance = new Realm(config);

export default realmInstance;
