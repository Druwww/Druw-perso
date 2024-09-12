import { getUserData } from "@/actions/userdata-actions";
import { db } from "@/lib/firebase/config";


export default async function UserInfos() {

    // try{
    //     const data = await getUserData(db);

    //     return (
    //         <>
    //             {data.map((user) => (
    //                 <>
    //                 <div>
    //                 Email : {user?.email}
    //                 </div>
    //                 <div>
    //                     uid : {user?.uid}
    //                 </div>
    //                 <div>
    //                     Created : {user?.createdAt.toString()}
    //                 </div>
    //                 <div>
    //                     Last Login : {user?.lastLogin.toString()}
    //                 </div>
    //                 </>
    //             ))}
                
    //         </>
            
    //     );
    // }catch(e :any){
    //     return (
    //         <div>
    //             Error : {e.message}
    //         </div>
    //     )
    // }

    return (
        <div>
            User infos
        </div>
    )


}