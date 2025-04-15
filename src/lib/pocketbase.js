// 123412345 - password

import PocketBase from "pocketbase";

// export const pb = new PocketBase("http://127.0.0.1:8090");

export const pb = new PocketBase("https://service-konnect.pockethost.io/");

// checks if a user is logged in
export const isUserLoggedIn = () => {
  return pb.authStore.isValid;
};

// create medical official
export async function create_medofficer(
  password,
  passwordConfirm,
  email,
  firstname,
  lastname,
  role
) {
  const data = {
    password: password,
    passwordConfirm: passwordConfirm,
    email: email,
    emailVisibility: true,
    firstname: firstname,
    lastname: lastname,
    role: role,
  };
  await pb.collection("medofficer").create(data);
  const record = await pb
    .collection("medofficer")
    .authWithPassword(email, password);
  return record;
}

// login medofficer
export async function login_doctor(email, password) {
  const record = await pb
    .collection("medofficer")
    .authWithPassword(email, password);
  return record;
}

// view medofficer info
export async function doctor_info() {
  const id = pb.authStore.record.id;
  const record = await pb.collection("medofficer").getOne(id);
  return record;
}

// create patients
export async function create_Patient(
  fullname,
  age,
  gender,
  phone,
  email,
  address
) {
  const data = {
    fullname: fullname,
    age: age,
    gender: gender,
    phone: phone,
    email: email,
    address: address,
    creator: pb.authStore.record.id,
  };

  const record = await pb.collection("patients").create(data);
  return record;
}

// view patients
export async function patient_info() {
  const userId = pb.authStore.record.id;

  const record = await pb.collection("patients").getFullList({
    filter: `creator = "${userId}"`,
  });
  return record;
}

// logout
export function logout() {
  pb.authStore.clear();
}

// delete account
export async function deleteAccount() {
  const id = pb.authStore.record.id;
  const record = await pb.collection("medofficer").delete(id);
  return record;
}
