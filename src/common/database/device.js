import realm from './initSchema';

/**
 *
 *
 * @param {*} data
 * @returns
 */

export const saveDevice = (data) => {
  try {
    let objDevice = realm.write(() => {
      realm.create('Device', data, true);
    });
    return {status: true, message: objDevice};
  } catch (err) {
    return {status: false, message: 'err'};
  }
};

/**
 *
 *
 * @param {*} data
 * @returns
 */

export const getDevice = (data) => {
  try {
    // let objDevice = realm.objects('Device').filtered(`ID_User = "${userId}"`);
    let objDevice = realm.objects('Device').filtered('ID = "123"');
    return objDevice;
  } catch (err) {
    return {status: false, message: 'err'};
  }
};
