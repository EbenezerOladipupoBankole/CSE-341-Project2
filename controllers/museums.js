const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  try {
    const lists = await mongodb.getDb().db().collection('museums').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res, next) => {
  try {
    const id = new ObjectId(req.params.id);
    const lists = await mongodb.getDb().db().collection('museums').find({ _id: id }).toArray();
    if (lists.length === 0) {
      res.status(404).json({ message: 'Museum not found' });
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createMuseum = async (req, res) => {
  try {
    const museum = {
      name: req.body.name,
      location: req.body.location,
      founded: req.body.founded,
      director: req.body.director,
      website: req.body.website,
      collectionSize: req.body.collectionSize,
      bio: req.body.bio,
      admissionFee: req.body.admissionFee,
    };
    const response = await mongodb.getDb().db().collection('museums').insertOne(museum);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the museum.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateMuseum = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const museum = {
      name: req.body.name,
      location: req.body.location,
      founded: req.body.founded,
      director: req.body.director,
      website: req.body.website,
      collectionSize: req.body.collectionSize,
      bio: req.body.bio,
      admissionFee: req.body.admissionFee,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('museums')
      .replaceOne({ _id: id }, museum);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the museum.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteMuseum = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('museums').deleteOne({ _id: id });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the museum.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createMuseum,
  updateMuseum,
  deleteMuseum,
};
