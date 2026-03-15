import nodeMiler from 'nodemailer'

const transporte = nodeMiler.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASS_MAIL
    }
})

transporte.verify().then(() => {
    console.log('✅ Servidor de correos listo para enviar');
});

export const enviarEmail = async (alumno, disciplina) => {
    try {
        await transporte.sendMail({
            from: '"Coordinación de Deportes UNET" <tu_correo_personal@gmail.com>', 
            to: alumno.correo, 
            subject: `Confirmación de Inscripción: ${disciplina.nombre}`,
            html: `
                <h1>Hola ${alumno.nombres}</h1>
                <p>Tu inscripción en <b>${disciplina.nombre}</b> ha sido procesada.</p>
            `
        })
        console.log("Correo enviado con éxito");
    } catch (error) {
        console.log("Error al enviar:", error);
    }
}