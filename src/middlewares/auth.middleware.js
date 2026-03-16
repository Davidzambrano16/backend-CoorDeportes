import jwt from 'jsonwebtoken';
import { Usuario } from '../models/index.js';

export const autenticarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Formato de token inválido' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'super_secret', (err, payload) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        req.usuario = payload;
        next();
    });
};

export const esAdmin = async (req, res, next) => {
    const {cedula} = req.params
    if (!cedula) {
        return res.status(401).json({ message: 'No autenticado' });
    }

    const usuario = await Usuario.findByPk(cedula)
    if (usuario.rol !== 'admin') {
        return res.status(403).json({
            message: 'Acceso denegado. Se requieren permisos de administrador.'
        });
    }

    next();
};