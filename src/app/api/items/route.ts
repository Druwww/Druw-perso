import { LOGIN_ROUTE } from './../../../constants';
import { auth, firestore } from "@/lib/firebase/server";
import { DecodedIdToken } from "firebase-admin/auth";
import { NextRequest, NextResponse } from "next/server";

export enum ItemAccess {
    USER = "USER",
    FRIEND = "FRIEND",
    ADMIN = "ADMIN",
}

export type Item = {
    id: string;
    title: string;
    access: ItemAccess;
};

const defaultItems: Item[] = [
    { id: "item-3", title: "I am a user item", access: ItemAccess.USER },
    { id: "item-4", title: "I am a user item", access: ItemAccess.USER },
    { id: "item-5", title: "I am a friend item", access: ItemAccess.FRIEND },
    { id: "item-6", title: "I am a friend item", access: ItemAccess.FRIEND },
    { id: "item-7", title: "I am a admin item", access: ItemAccess.ADMIN },
];

export async function GET(request: NextRequest) {
    try {
        if (!firestore)
            return new NextResponse("Internal Error : no firebase", {
                status: 500,
            });

        const authToken =
            request.headers.get("authorization")?.split("Bearer ")[1] || null;

        let user: DecodedIdToken | null = null;
        if (auth && authToken)
            try {
                user = await auth.verifyIdToken(authToken);
            } catch (error) {
                // One possible error is the token being expired, return forbidden
                console.log(error);
            }

        const isAdmin = user?.role === "admin";

        let userInfo = null;
        if (user) {
            const userInfoResponse = await fetch(
                `${process.env.API_URL}/api/users/${user.uid}`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            if (userInfoResponse.ok) {
                userInfo = await userInfoResponse.json();
            }
        }

        const isFriend = userInfo?.isFriend;

        const firestoreCall =
            user && !isFriend && !isAdmin
                ? firestore
                    .collection("items")
                    .where("access", "in", [
                        ItemAccess.USER,
                    ])
                    .get()
                : isFriend && !isAdmin
                ? firestore
                    .collection("items")
                    .where("access", "in", [
                        ItemAccess.USER,
                        ItemAccess.FRIEND,
                    ])
                    .get()
                : firestore.collection("items").get() // * its admin


        const response = await firestoreCall;
        const items = response.docs.map((doc) => doc.data());

        if (items.length <= 0) {
            const batch = firestore.batch();
            defaultItems.forEach((item) => {
                const itemRef = firestore?.collection("items").doc();
                if (itemRef) batch.set(itemRef, item);
            });
            batch.commit();
            return NextResponse.json(defaultItems);
        }

        return NextResponse.json(items);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
