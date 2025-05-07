// 123412345 - password
// Christian12@.

import PocketBase from "pocketbase";
import sendEmail from "./sendEMail";

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
  await pb.collection("medofficer").requestVerification(email);
  return record;
}

// request verification
export async function request_Verification(email) {
  const record = await pb.collection("medofficer").requestVerification(email);
  return record;
}

// OTP Request Function
export const requestOTP = async (email, otp, content) => {
  try {
    email = email.trim().toLowerCase();

    let user;
    try {
      console.log("Searching for user with email:", `"${email}"`);
      user = await pb
        .collection("medofficer")
        .getFirstListItem(`email="${email}"`);
    } catch (error) {
      if (error.status === 404) {
        const result = await pb.collection("medofficer").getList(1, 1, {
          filter: `email = "${email}"`,
        });
        if (result.items.length === 0) {
          throw new Error("No account found with this email");
        }
        user = result.items[0];
      } else {
        throw error;
      }
    }

    console.log("[OTP] Found user:", user.id, user.email); // Debug log

    // const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("[OTP] Generated OTP:", otp); // Debug log

    try {
      await pb.collection("otp_tokens").create({
        user_id: user.id,
        token: otp,
        expires_at: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
        used: false,
      });
    } catch (dbError) {
      console.error("[OTP] Database error:", dbError);
      throw new Error("Failed to generate OTP");
    }

    sendEmail(email, content)

    return {
      success: true,
    };
  } catch (err) {
    console.error("[OTP] Full error stack:", {
      message: err.message,
      status: err.status,
      data: err.data,
      stack: err.stack,
    });

    // Return user-friendly error messages
    const errorMap = {
      "No account found": "No account found with this email",
      "Failed to generate": "System error - please try again",
      "invalid email": "Please enter a valid email address",
    };

    throw new Error(errorMap[err.message] || "OTP request failed");
  }
};

// OTP Verification Function
export const verifyOTP = async (email, otp) => {
  try {
    const token = await pb
      .collection("otp_tokens")
      .getFirstListItem(
        `token="${otp}" && user_id.email="${email}" && used=false`,
      );

    await pb.collection("otp_tokens").update(token.id, { used: true });

    return true;
  } catch (err) {
    console.error("OTP verification error:", err);
    throw new Error("Invalid OTP");
  }
};

// login with OTP and password
export const loginWithOTP = async (email, password, otp) => {

  await verifyOTP(email, otp);

  const record = await pb
    .collection("medofficer")
    .authWithPassword(email, password);
  return record;
};

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
    await pb.collection("medofficer").authRefresh();
    return pb.authStore.record?.verified || false;
  }
}

// login medOfficer
export async function login_medOfficer(email, otp) {
  const record = await pb.collection("medofficer").authWithOTP(email, otp);
  return record;
}

// view medofficer info
export async function doctor_info() {
  const id = pb.authStore.record.id;
  const record = await pb.collection("medofficer").getOne(id);
  return record;
}

// create patients
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
    filter: `creator = "${userId}"`,
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



