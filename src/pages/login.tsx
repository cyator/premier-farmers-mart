// components/Login.js
import { useEffect } from "react";
import { Authenticator, useAuthenticator, View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useRouter } from "next/router";

export default function Login() {
    const { route } = useAuthenticator((context) => [context.route]);
    const router = useRouter();
    let from = router.query?.from || "/";

    useEffect(() => {
        if (route === "authenticated") {
            //@ts-ignore
            router.replace(from);
        }
    }, [route, router, from]);

    return (
        <View className="flex justify-center mt-32">
            <Authenticator />
        </View>
    );
}