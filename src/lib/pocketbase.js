// 123412345 - password
// Christian12@.

import PocketBase from "pocketbase";

// export const pb = new PocketBase("http://127.0.0.1:8090");

export const pb = new PocketBase("https://service-konnect.pockethost.io/");

// checks if a user is logged in
export const isUserLoggedIn = () => {
  return pb.authStore.isValid;
};

// create medical official
export async function create_medofficer(
  email,
  password,
  passwordConfirm,
  firstname,
  lastname,
  role
) {
  const data = {
    email: email,
    emailVisibility: true,
    password: password,
    passwordConfirm: passwordConfirm,
    firstname: firstname,
    lastname: lastname,
    role: role,
  };
  const record = await pb.collection("medofficer").create(data);
  //  await pb
  //   .collection("medofficer")
  //   .authWithPassword(email, password);
  // await pb.collection('medofficer').requestVerification(email);
  return record;
}

// request verification
export async function requestVerification(email) {
  const record = await pb.collection('medofficer').requestVerification(email);
  return record;
}

// request OTP
export async function request_OTP(email) {
  const record = await pb.collection("medofficer").requestOTP(email);
  return record;
}

// login medofficer
export async function login_doctor(email, password) {
  const record = await pb
    .collection("medofficer")
    .authWithPassword(email, password);
  return record;
}

// check verified status
export async function checkVerifyStatus() {  
  if (pb.authStore.isValid) {
    await pb.collection('medofficer').authRefresh();
    return pb.authStore.record?.verified || false;
  }
}

// login medOfficer
export async function login_medOfficer(email, otp) {
  const record = await pb
    .collection("medofficer")
    .authWithOTP(email, otp);
  return record;
}

// view medofficer info
export async function doctor_info() {
  const id = pb.authStore.record.id;
  const record = await pb.collection("medofficer").getOne(id);
  return record;
}

// create patients
// export async function create_Patient(data) {
//   const record = await pb.collection("patients").create(data);
//   return record;
// }

export async function create_Patient(data) {
  if (data instanceof FormData) {
    data.append("creator", pb.authStore.record?.id);
  } else if (typeof data === "object") {
    data.creator = pb.authStore.record?.id;
  }
  const record = await pb.collection("patients").create(data);
  return record;
}

// view patients
export async function patient_info() {
  const userId = pb.authStore.record.id;

  const record = await pb.collection("patients").getFullList({
    filter: `creator = "${userId}"`
  });
  return record;
}

// view patients by id
export async function getSinglePatient(id) {
  const record = await pb.collection("patients").getOne(id);
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
