import colors from "colors"

export const mensajeconsola = (tipo, mensaje)=>{
    switch (tipo) {
        case "AccesoPuerto":
            console.log(mensaje.bgGreen);
            break;
        case "ErrorPuerto":
        console.log(mensaje.bgRed);
            break;
    }
}
export const mensa = {
    puerto: "Ejecutandose en el Puerto de surprise:",
}


export const Acceso = (req,res, status=200, mensaje="")=>{
    res.status(status).json({
        error: false,
        status: status,
        body: mensaje
    })
}
export const Error1 = (req, res,status=500, mensaje="")=>{
    res.status(status).json({
        error: true,
        status: status,
        body: mensaje
    })
}