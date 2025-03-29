"use server";
import { db } from "@/lib/firebase";
import {
  Appointment,
  CreateAppointmentParams,
  UpdateAppointmentParams,
} from "@/types";
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";

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

export const getRecentAppointmentList = async () => {
  try {
    const snapshot = (await getDocs(collection(db, "appointment"))).docs;
    const docs: Appointment[] = [];

    snapshot.forEach((doc) => {
      docs.push({
        id: doc.id,
        ...(doc.data() as Omit<Appointment, "id">),
      });
    });

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = docs.reduce((acc, appointment) => {
      if (appointment.status === "scheduled") acc.scheduledCount += 1;
      if (appointment.status === "pending") acc.pendingCount += 1;
      if (appointment.status === "cancelled") acc.cancelledCount += 1;
      return acc;
    }, initialCounts);

    const data = {
      totalCount: docs.length,
      ...counts,
      docs,
    };
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const q = query(
      collection(db, "appointment"),
      where("__name__", "==", appointmentId)
    );
    const querySnapshot = (await getDocs(q)).docs[0].ref;
    await updateDoc(querySnapshot, {
      userId,
      appointmentId,
      primaryPhysician: appointment.primaryPhysician,
      schedule: appointment.schedule,
      status: appointment.status,
    });
    const updatedAppointment = await getAppointment(appointmentId);
    revalidatePath("/admin");
    return updatedAppointment;
  } catch (error) {
    console.log(error);
  }
};
