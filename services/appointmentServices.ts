import { db } from "@/lib/firebase";
import { CreateAppointmentParams } from "@/types";
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const createAppointment = async (
  appointmentData: CreateAppointmentParams
) => {
  try {
    const appointmentRef = await addDoc(
      collection(db, "appointment"),
      appointmentData
    );
    return appointmentRef;
  } catch (error) {
    console.log(error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const q = query(
      collection(db, "appointment"),
      where("__name__", "==", appointmentId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].data();
  } catch (error) {
    console.log(error);
  }
};
