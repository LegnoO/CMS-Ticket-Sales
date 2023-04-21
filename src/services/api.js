/** @format */

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

export const fetchData = async (collectionName) => {
  const getTicket = await getDocs(collection(db, collectionName));
  const result = getTicket.docs.map((doc) => ({
    data: doc.data(),
    id: doc.id,
  }));

  return result;
};

export const updateDateTicket = async (id, { issuance_date }) => {
  const ticketRef = doc(db, "ticket", id);
  await updateDoc(ticketRef, { issuance_date: issuance_date });
};

export const updatePackageTicket = async (id, data) => {
  const ticketRef = doc(db, "package-ticket", id);
  await updateDoc(ticketRef, {
    event_id: data.event_id,
    name: data.name,
    start_date: new Date(data.start_date.seconds * 1000),
    end_date: new Date(data.end_date.seconds * 1000),
    price: parseInt(data.price),
    amount: parseInt(data.amount),
    combo_price: parseInt(data.combo_price),
    status: data.status,
  });
};

function randomDateInRange(startDate, endDate) {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const randomTime = Math.random() * (end - start) + start;
  const randomDate = new Date(randomTime);
  randomDate.setHours(0, 0, 0);
  return randomDate;
}

const randomStatus = () => {
  const random = Math.floor(Math.random() * 3 + 1);
  switch (random) {
    case 1:
      return "Đã sử dụng";
    case 2:
      return "Chưa sử dụng";
    case 3:
      return "Hết hạn";
    default:
      return "";
  }
};

const randomTicketType = () => {
  const random = Math.floor(Math.random() * 2 + 1);
  switch (random) {
    case 1:
      return "Vé sự kiện";
    case 2:
      return "Vé gia đình";
    default:
      return "";
  }
};

const randomControlStatus = () => {
  const random = Math.floor(Math.random() * 3 + 1);
  switch (random) {
    case 1:
      return "Chưa đối soát";
    case 2:
      return "Đã đối soát";
    default:
      return "";
  }
};

export const addData = async () => {
  await addDoc(collection(db, "ticket"), {
    blocking_code: "ALT20210501",
    date_use: randomDateInRange("2022-01-01", "2023-12-31"),
    event: "Sự kiện khai giảng 2023",
    gate: `Cổng ${Math.round(Math.random() * (5 - 1) + 1)}`,
    gate_type: randomTicketType(),
    issuance_date: randomDateInRange("2022-01-01", "2023-12-31"),
    status: randomStatus(),
    ticket_number: Math.round(
      Math.random() * (1000000000 - 100000000) + 100000000
    ).toString(),
    control_status: randomControlStatus(),
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const addPackage = async (data) => {
  await addDoc(collection(db, "package-ticket"), {
    event_id: data.id,
    name: data.name,
    start_date: data.start_date.$d,
    end_date: data.end_date.$d,
    price: data.price,
    amount: data.amount,
    combo_price: data.combo_price,
    status: data.status,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error.message);
    });
};
