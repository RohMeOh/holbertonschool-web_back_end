import signUpUser from './4-user-promise.js';
import uploadPhoto from './5-photo-reject.js';

export default function handleProfileSignup(firstName, lastName, fileName) {
  const promises = [
    signUpUser(firstName, lastName),
    uploadPhoto(fileName),
  ];

  return Promise.all(
    promises.map((promise) => promise
      .then((value) => ({
        status: 'fulfilled',
        value,
      }))
      .catch((error) => ({
        status: 'rejected',
        value: error,
      }))),
  );
}
