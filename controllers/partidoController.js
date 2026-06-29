const Partido = require('../models/Partido');

exports.obtenerPartidos = async (req, res) => {
    try {
        const partidos = await Partido.find().limit(20);
        res.status(200).json(partidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerPartidoPorId = async (req, res) => {
    try {
        const partido = await Partido.findById(req.params.id);
        if (!partido) return res.status(404).json({ error: 'Partido no encontrado' });
        res.status(200).json(partido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.crearPartido = async (req, res) => {
    try {
        const nuevoPartido = await Partido.create(req.body);
        res.status(201).json(nuevoPartido);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.actualizarPartido = async (req, res) => {
    try {
        const partido = await Partido.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!partido) return res.status(404).json({ error: 'Partido no encontrado' });
        res.status(200).json(partido);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.eliminarPartido = async (req, res) => {
    try {
        const partido = await Partido.findByIdAndDelete(req.params.id);
        if (!partido) return res.status(404).json({ error: 'Partido no encontrado' });
        res.status(200).json({ mensaje: 'Partido eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.obtenerPorTorneo = async (req, res) => {
    try {
        const partidos = await Partido.find({ tournament: req.params.torneo });
        res.status(200).json(partidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerPorEquipo = async (req, res) => {
    try {
        const { equipo } = req.params;
        // Busca al equipo tanto si jugó de local como de visitante
        const partidos = await Partido.find({
            $or: [{ home_team: equipo }, { away_team: equipo }]
        });
        res.status(200).json(partidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerPorFecha = async (req, res) => {
    try {
        const { fechaInicio, fechaFin } = req.params;
        // Búsqueda por rango (greater than or equal / less than or equal)
        const partidos = await Partido.find({
            date: { $gte: fechaInicio, $lte: fechaFin }
        });
        res.status(200).json(partidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};