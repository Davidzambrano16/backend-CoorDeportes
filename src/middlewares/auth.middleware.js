export const esAdmin = (req, res, next) => {
    const { rol } = req.usuario; 

    if (rol !== 'admin') {
        return res.status(403).json({ 
            message: "Acceso denegado. Se requieren permisos de administrador." 
        });
    }

    next();
};