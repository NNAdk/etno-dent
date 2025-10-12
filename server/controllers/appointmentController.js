import * as appointmentRepo from '../repo/appointmentRepo.js';

export const createRecordController = async (req, res) => {
    try {
        const record = await appointmentRepo.createRecord(req.body);
        res.status(201).json(record);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

export const getRecordsController = async (req, res) => {
    try {
        const records = await appointmentRepo.getRecords();
        res.json(records);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

// admin panel ----------------------------------------------


export const updateStatusController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { status } = req.body;
        const update = await appointmentRepo.updateStatus(id, status);
        res.status(201).json(update);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}