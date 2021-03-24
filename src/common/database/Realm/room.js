import realm from './initSchema';

export const getRoom = () => {
  try {
    let objRoom = realm.objects('Room');
    return objRoom;
  } catch (err) {
    return {status: false, message: 'err'};
  }
};

export const setRoom = (objInput) => {
  try {
    realm.write(() => {
      realm.create('Room', objInput);
    });
    return true;
  } catch (err) {
    console.log(err);
    return {status: false, message: err};
  }
};
