"use client"

import { useEffect, useState } from "react";
import Head from "next/head";
import Login from "../components/login/login";
import Menu from "../components/menu/menu";
import Cookies from "js-cookie";

export default function Home({config}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        
        var userData = Cookies.get("userData"); // Intenta obtener la cookie "userData"

        if (userData) {
            setIsLoggedIn(true); // Si la cookie existe, actualiza el estado
        }
    }, [Cookies.get("userData")]); // Dependencia para que se ejecute cuando cambie la cookie

    return (
        <div>
            <Head>
                <title>{config.title}</title>
                <meta name="description" content={config.descripcion} />

                <meta name="twitter:site" content="website" />
                <meta name="twitter:title" content={config.title} />
                <meta name="twitter:description" content={config.descripcion} />
                <meta name="twitter:image" content={config.urlPicture} />

                <meta name="title" content={config.title} />  
                <meta name="description" content={config.descripcion} />

                <meta property="og:title" content={config.title} />
                <meta property="og:image" content={config.urlPicture} />
                <meta property="og:description" content={config.descripcion} />
                <meta property="og:type" content="website" />

                {/* <link rel="icon" type="image/png" href="/images/favicon.ico" />
                <link rel="shortcut icon" href="/images/favicon.ico" />
                <link rel="apple-touch-icon" href="/PropiedadesMexico/logo192.svg" /> */}

            </Head>
            {
                isLoggedIn ? 
                    <Menu
                    config={config}/> 
                    : 
                    <Login   
                    config={config}
                    setIsLoggedIn={setIsLoggedIn}/>
            }
        </div>
    );
}

export async function getServerSideProps() {
    const response = await fetch(`https://mini-crm-dev.deno.dev/configuracion`);
    const config = await response.text();
    return {
        props: { config: JSON.parse(config) },
    };
}