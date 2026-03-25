const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  try {
    const lists = await mongodb.getDb().db().collection('artworks').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res, next) => {
  try {
    const id = new ObjectId(req.params.id);
    const lists = await mongodb.getDb().db().collection('artworks').find({ _id: id }).toArray();
    if (lists.length === 0) {
      res.status(404).json({ message: 'Artwork not found' });
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createArtwork = async (req, res) => {
  try {
    const artwork = {
      title: req.body.title,
      artist: req.body.artist,
      medium: req.body.medium,
      year: req.body.year,
      dimensions: req.body.dimensions,
      price: req.body.price,
      availability: req.body.availability,
      imageUrl: req.body.imageUrl,
      museumId: req.body.museumId,
    };
    const response = await mongodb.getDb().db().collection('artworks').insertOne(artwork);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the artwork.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateArtwork = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const artwork = {
      title: req.body.title,
      artist: req.body.artist,
      medium: req.body.medium,
      year: req.body.year,
      dimensions: req.body.dimensions,
      price: req.body.price,
      availability: req.body.availability,
      imageUrl: req.body.imageUrl,
      museumId: req.body.museumId,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('artworks')
      .replaceOne({ _id: id }, artwork);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the artwork.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteArtwork = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('artworks').deleteOne({ _id: id });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the artwork.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createArtwork,
  updateArtwork,
  deleteArtwork,
};
