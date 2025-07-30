// controllers/adminCareerController.js
const Subject = require("../models/Subject");
const Stream = require("../models/Stream");
const CareerOption = require("../models/CareerOption");

// 1. Get all subjects
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({});
    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch subjects" });
  }
};

// 2. Add stream under a subject
exports.addStream = async (req, res) => {
  try {
    const { subjectId, streamName } = req.body;
    const newStream = new Stream({ subject: subjectId, name: streamName });
    await newStream.save();
    res.status(201).json({ message: "Stream added", stream: newStream });
  } catch (err) {
    res.status(500).json({ error: "Failed to add stream" });
  }
};

// 3. Get streams for a subject
exports.getStreamsBySubject = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const streams = await Stream.find({ subject: subjectId });
    res.status(200).json(streams);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch streams" });
  }
};

// 4. Add career option under a stream
exports.addCareerOption = async (req, res) => {
  try {
    const { streamId, name } = req.body;
    const newCareer = new CareerOption({
      stream: streamId,
      name: name,
    });

    await newCareer.save();

    res.status(201).json({ message: "Career option added successfully", career: newCareer });
  } catch (error) {
    console.error("Error adding career option:", error); // show full error
    res.status(500).json({ error: "Failed to add career option" });
  }
};


// 5. Get career options under a stream
exports.getCareersByStream = async (req, res) => {
  try {
    const { streamId } = req.params;
    const careers = await CareerOption.find({ stream: streamId });
    res.status(200).json(careers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch career options" });
  }
};

// 6. Pre-insert 6 fixed subjects (run only once)
exports.insertDefaultSubjects = async (req, res) => {
  try {
    const defaultSubjects = [
      "Maths",
      "Science",
      "Social",
      "Telugu",
      "Hindi",
      "English"
    ];

    let inserted = [];

    for (const sub of defaultSubjects) {
      // Check if subject already exists
      const exists = await Subject.findOne({ name: sub });
      if (!exists) {
        const newSub = new Subject({ name: sub });
        await newSub.save();
        inserted.push(newSub);
      }
    }

    if (inserted.length === 0) {
      return res.status(200).json({ message: "Subjects already exist. Nothing added." });
    }

    res.status(201).json({ message: "Subjects added successfully", inserted });
  } catch (err) {
    console.error("Insert subjects error:", err);
    res.status(500).json({ error: "Failed to insert default subjects" });
  }
};

exports.addSubject = async (req, res) => {
  try {
    const { name } = req.body;
    const existing = await Subject.findOne({ name });

    if (existing) {
      return res.status(400).json({ message: "Subject already exists" });
    }

    const newSubject = new Subject({ name });
    await newSubject.save();

    res.status(201).json({ message: "Subject created", subject: newSubject });
  } catch (err) {
    res.status(500).json({ error: "Error adding subject" });
  }
};

exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json({ error: "Error fetching subjects" });
  }
};
