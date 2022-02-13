import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import db from "../service/firebase";

export const fetchData = async () => {
    let qry = await getDocs(collection(db,"qr-storage")); 
    return qry.docs.map(doc => doc.data())
}

export const fetchOneData = async (key: string) => {
    let qry = await getDoc(doc(db,"qr-storage",key));
    return qry.data();
}

export const insertData = async (payload:any) => {
    await setDoc(doc(db,"qr-storage", payload.key),{
        key: payload.key,
        qrcode: payload.qrcode,
        amount: payload.balance,
        promptpayid: payload.promptpayid,
    });
    let qry = await getDocs(collection(db,"qr-storage")); 
    return qry.docs.map(doc => doc.data())
}

export const deleteData = async (key: string) => {
    await deleteDoc(doc(db, "qr-storage", key));
    let qry = await getDocs(collection(db,"qr-storage")); 
    return qry.docs.map(doc => doc.data())
}