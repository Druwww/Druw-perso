import { collection, getDocs } from "@firebase/firestore";

export async function getUserData(db : any) {
    const qsUserData = await getDocs(collection(db, `users`))
    console.log(qsUserData)
    return qsUserData.docs.map((doc) => ({ ...doc.data()}))
  }