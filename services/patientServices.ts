import { db } from "@/lib/firebase";
import { CreateUserParams, Patient, RegisterUserParams, User } from "@/types";
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const createUser = async (user: CreateUserParams) => {
  const { email } = user;
  try {
    const q = query(collection(db, "patient"), where("email", "==", email));
    const existingUser = await getDocs(q);
    // if (!existingUser.empty) throw new Error("User already exists");
    if (!existingUser.empty) {
      return existingUser.docs[0].data();
    }
    const userRef = await addDoc(collection(db, "patient"), user);
    return userRef;
  } catch (error: any) {
    if (error) {
      console.log(error.message);
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    const q = query(collection(db, "patient"), where("__name__", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].data() as Patient;
  } catch (error) {
    console.log(error);
  }
};

export const getPatient = async (userId: string) => {
  try {
    const q = query(collection(db, "patient"), where("__name__", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].data();
  } catch (error) {
    console.log(error);
  }
};

export const registerPatient = async ({
  userId,
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    const q = query(collection(db, "patient"), where("__name__", "==", userId));
    const querySnapshot = (await getDocs(q)).docs[0].ref;
    await updateDoc(querySnapshot, {
      userId,
      identificationDocument,
      ...patient,
    });
    const updatedPatient = await getUser(userId);
    return updatedPatient;
  } catch (error) {
    console.log(error);
  }
};
