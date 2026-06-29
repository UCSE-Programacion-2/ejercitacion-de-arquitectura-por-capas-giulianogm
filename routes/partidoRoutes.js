const express = require('express');
const router = express.Router();
const partidoController = require('../controllers/partidoController');

router.get('/torneo/:torneo', partidoController.obtenerPorTorneo);
router.get('/equipo/:equipo', partidoController.obtenerPorEquipo);
router.get('/fecha/:fechaInicio-:fechaFin', partidoController.obtenerPorFecha);

router.get('/', partidoController.obtenerPartidos);
router.post('/', partidoController.crearPartido);
router.get('/:id', partidoController.obtenerPartidoPorId);
router.put('/:id', partidoController.actualizarPartido);
router.delete('/:id', partidoController.eliminarPartido);

module.exports = router;