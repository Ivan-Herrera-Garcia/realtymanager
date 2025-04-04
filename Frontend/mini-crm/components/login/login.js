import React, { useEffect } from "react";
import Cookies from "js-cookie";

export default function Login({config, setIsLoggedIn}) {

    // const [colorPrincipal, setColorPrincipal] = React.useState(config.primaryColor);
    // const [colorSecundario, setColorSecundario] = React.useState(config.secondaryColor);

    // useEffect(() => {
    //     console.log(config);
    //     setColorPrincipal(config.primaryColor);
    //     setColorSecundario(config.secondaryColor);
    // }, [config]);

    const [username, setUsername] = React.useState(null);
    const [password, setPassword] = React.useState(null);

    async function handleLogin() {
      try {
          const response = await fetch("https://mini-crm-dev.deno.dev/login", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  username,
                  password,
              }),
          });
  
          const data = await response.json();
  
          if (response.ok && data) {
            
            Cookies.set("userData", username, { expires: 10 }); // Guardar en la cookie
            setIsLoggedIn(true); // Actualizar el estado de inicio de sesión
          } else {
              console.error("Error en el login:", data.message);
          }
      } catch (error) {
          console.error(error);
      }
  }

    function showpwd() {
        var passwordField = document.getElementById("password");
        if (passwordField.type === "password") {
            passwordField.type = "text";
        } else {
            passwordField.type = "password";
        }
    }

  
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-100 p-4">
            <div className="w-full max-w-sm bg-white rounded-2xl p-6">
                <h1 className={`text-2xl font-bold text-center text-neutral-800 mb-4`}>Iniciar Sesión</h1>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md mb-3 text-slate-600"
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md mb-3 text-slate-800"
                />
                <label className="text-slate-600 mr-2">Mostrar contraseña</label>
                <input type="checkbox" onClick={showpwd}/>
                <button
                    onClick={handleLogin}
                    className={`w-full bg-slate-600 shadow-lg py-2 hover:opacity-55 rounded-md transition`}
                >
                    Ingresar
                </button>
            </div>
        </div>
    );
}