const BikeService = require('../services/bikeService');

// Handler for creating a bike
// In bikeController.js
const createBike = async (req, res) => {
  try {
      const bikeData = req.body;
      console.log('Received bike data:', bikeData); // Add logging
      
      if (req.file) {
          try {
              console.log('Received file:', req.file); // Add logging
              BikeService.validateImage(req.file);
              bikeData.image = `uploads/${req.file.filename}`;
          } catch (error) {
              console.error('Image validation error:', error); // Add logging
              return res.status(400).json({ message: error.message });
          }
      }

      const newBike = await BikeService.createBike(bikeData);
      console.log('Created bike:', newBike); // Add logging
      
      if (newBike.image) {
          newBike.image = BikeService.processImagePath(newBike.image);
      }
      res.status(201).json(newBike);
  } catch (error) {
      console.error('Error in createBike:', error); // Add logging
      res.status(500).json({ message: 'Failed to create bike: ' + error.message });
  }
};



// Handler for fetching a bike by ID
const getBike = async (req, res) => {
  try {
    const bikeId = req.params.id;
    const bike = await BikeService.getBike(bikeId);
    if (!bike) {
      return res.status(404).json({ message: 'Bike not found' });
    }
    if (bike.image) {
      bike.image = BikeService.processImagePath(bike.image);
    }
    res.status(200).json(bike);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bike: ' + error.message });
  }
};

// Handler for fetching all bikes for a user with optional filters
const getBikes = async (req, res) => {
  try {
    const userId = req.params.userId;
    const filter = req.query; // Get filter criteria from query parameters
    const bikes = await BikeService.getBikes(userId, filter);
      // Process image paths for all bikes
    bikes.forEach(bike => {
      if (bike.image) {
        bike.image = BikeService.processImagePath(bike.image);
      }
    });
    res.status(200).json(bikes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bikes: ' + error.message });
  }
};

// Handler for fetching all bikes available for purchase
const getBikesForPurchase = async (req, res) => {
  try {
    const bikes = await BikeService.getBikesForPurchase();
      // Process image paths for all bikes
      bikes.forEach(bike => {
        if (bike.image) {
          bike.image = BikeService.processImagePath(bike.image);
        }
      });
    res.status(200).json(bikes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bikes for purchase: ' + error.message });
  }
};

// Handler for updating bike info
const updateBike = async (req, res) => {
  try {
    const bikeId = req.params.id;
    const updateData = req.body;

    if (req.file) {
      try {
        BikeService.validateImage(req.file);
        // Store relative path in database
        updateData.image = `uploads/${req.file.filename}`;
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    }

    const updatedBike = await BikeService.updateBike(bikeId, updateData);
    if (updatedBike.image) {
      updatedBike.image = BikeService.processImagePath(updatedBike.image);
    }
    res.status(200).json(updatedBike);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update bike: ' + error.message });
  }
};
// Handler for deleting a bike
const deleteBike = async (req, res) => {
  try {
    const bikeId = req.params.id;
    const result = await BikeService.deleteBike(bikeId);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.message.includes('not found') ? 404 : 500)
       .json({ message: error.message });
  }
};

// Handler for searching bikes
const searchBikes = async (req, res) => {
  try {
    const searchCriteria = {
      type: req.query.type,
      priceRange: req.query.priceRange ? {
        min: parseFloat(req.query.priceRange.min),
        max: parseFloat(req.query.priceRange.max)
      } : undefined,
      name: req.query.name
    };

    const bikes = await BikeService.searchBikes(searchCriteria);
     // Process image paths for all bikes
     bikes.forEach(bike => {
      if (bike.image) {
        bike.image = BikeService.processImagePath(bike.image);
      }
    });
    res.status(200).json(bikes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to search bikes: ' + error.message });
  }
};

module.exports = {
  createBike,
  getBike,
  getBikes,
  getBikesForPurchase,
  updateBike,
  deleteBike,
  searchBikes
};