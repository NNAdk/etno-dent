import { Router } from 'express';

import * as appointmentController from '../controllers/appointmentController.js';

const router = new Router();

router.post('/appointment', appointmentController.createRecordController);

router.get('/appointment', appointmentController.getRecordsController);

router.patch('/appointment/:id/status', appointmentController.updateStatusController);

export default router;