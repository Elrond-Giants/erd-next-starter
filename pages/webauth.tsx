import {NextPage} from "next";
import {useRouter} from "next/router";
import {useEffect} from "react";
import AuthConnector from "../auth/AuthConnector";
import * as config from "../config";
import {useAuth} from "../auth/useAccount";


const WebAuth: NextPage = () => {
    const router = useRouter();
    const {setConnector, setAddress} = useAuth();
    useEffect(() => {
        if (!router.isReady) {
            return;
        }
        const {address} = router.query;
        const webConnector = AuthConnector.buildWebConnector(config);
        webConnector.setAddress(address as string);

        (async () => {
            await webConnector.refreshAccount();
            setConnector(webConnector);
            setAddress(address as string);
        })();


    }, [router.isReady, router.asPath])
    return (
        <>
            <div>Loading</div>
        </>
    );
}

export default WebAuth
