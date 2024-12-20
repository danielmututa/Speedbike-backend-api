const BikeService = require('../services/bikeService');

// Handler for creating a bike
const createBike = async (req, res) => {
  try {
    const bikeData = req.body;
    
    // Handle image upload if present
    if (req.file) {
      try {
        BikeService.validateImage(req.file);
        bikeData.image = BikeService.processImagePath(req.file.path);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    }

    const newBike = await BikeService.createBike(bikeData);
    if (newBike.image) {
      newBike.image = BikeService.processImagePath(newBike.image);
    }
    res.status(201).json(newBike);
  } catch (error) {
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

    // Handle image upload if present
    if (req.file) {
      try {
        BikeService.validateImage(req.file);
        updateData.image = BikeService.processImagePath(req.file.path);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    }

    const updatedBike = await BikeService.updateBike(bikeId, updateData);
      // Process image path if available
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
    await BikeService.deleteBike(bikeId);
    res.status(200).json({ message: 'Bike deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete bike: ' + error.message });
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

// Handler for getting all images
const getAllImages = async (req, res) => {
  try {
    const directoryPath = path.join(__dirname, '../../src/uploads');
    const files = await fs.promises.readdir(directoryPath);
    
    // Filter for image files
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );
    
    // Process each image path
    const imagePaths = imageFiles.map(file => {
      return processImagePath(file);
    });

    res.status(200).json(imagePaths);
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to fetch images: ' + error.message 
    });
  }
};

module.exports = {
  createBike,
  getBike,
  getBikes,
  getBikesForPurchase,
  updateBike,
  deleteBike,
  searchBikes,
   getAllImages // Exposing the new handler
};