import nodeMiler from 'nodemailer'

const transporte = nodeMiler.createTransport({
    host: "smtp.gmail.com",
    port: 587, // Cambiado de 465 a 587 (más compatible con Render)
    secure: false, // false para puerto 587
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASS_MAIL
    },
    tls: {
        rejectUnauthorized: false // Ayuda a evitar problemas de certificados en entornos de desarrollo
    }
})

// MEJORA CRÍTICA: Manejar el error para que NO se caiga el servidor
transporte.verify()
    .then(() => {
        console.log('✅ Servidor de correos listo para enviar');
    })
    .catch((err) => {
        console.error('❌ Error de conexión SMTP (Nodemailer):', err.message);
        console.log('El servidor seguirá funcionando, pero no se enviarán correos.');
    });

export const enviarEmail = async (alumno, disciplina) => {
    // Validar que tengamos los datos antes de intentar enviar
    if (!alumno?.correo || !disciplina?.nombre) {
        console.log("Faltan datos para enviar el correo");
        return;
    }

    try {
        await transporte.sendMail({
            from: '"Coordinación de Deportes UNET" <' + process.env.MAIL + '>', 
            to: alumno.correo, 
            subject: `Confirmación de Inscripción: ${disciplina.nombre}`,
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; border: 1px solid #eee; padding: 20px;">
                    <h2 style="color: #00236f;">Hola, ${alumno.nombres}</h2>
                    <p>Te informamos que tu inscripción en la disciplina de <strong>${disciplina.nombre}</strong> ha sido procesada exitosamente.</p>
                    <hr style="border: 0; border-top: 1px solid #eee;" />
                    <p style="font-size: 12px; color: #777;">
                        Este es un mensaje automático de la Coordinación de Deportes UNET. Por favor no respondas a este correo.
                    </p>
                </div>
            `
        })
        console.log(`📧 Correo enviado con éxito a: ${alumno.correo}`);
    } catch (error) {
        console.error("❌ Error al enviar el correo:", error.message);
    }
}