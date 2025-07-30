const express = require("express");
const router = express.Router();
const adminCareerController = require("../controllers/adminCareerController");

// Add default subjects (for dev testing)
router.get("/add-subjects", adminCareerController.insertDefaultSubjects);

// Add a new subject
router.post("/subject", adminCareerController.addSubject);

// Get all subjects
router.get("/subjects", adminCareerController.getAllSubjects);

// Add a stream to a subject
router.post("/stream", adminCareerController.addStream);

// Get streams by subjectId
router.get("/streams/:subjectId", adminCareerController.getStreamsBySubject);

// Add a career option to a stream
router.post("/add-career", adminCareerController.addCareerOption);

// Get careers by streamId
router.get("/careers/:streamId", adminCareerController.getCareersByStream);

module.exports = router;
