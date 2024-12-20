const Bike = require('../modules/bikeModel');
const fs = require('fs').promises; // For file operations
const path = require('path');

// Create a new bike with image
const createBike = async (bikeData) => {
  try {
    const bike = new Bike(bikeData);
    await bike.save();
    return bike;
  } catch (error) {
    throw new Error(`Error creating bike: ${error.message}`);
  }
};


const getBike = async (bikeId) => {
  try {
    const bike = await Bike.findById(bikeId);
    if (!bike) {
      throw new Error('Bike not found');
    }

    // Process image path to generate a full URL
    if (bike.image) {
      bike.image = processImagePath(bike.image); // Adjust the image path here
    }

    return bike;
  } catch (error) {
    throw new Error(`Error fetching bike: ${error.message}`);
  }
};



const getBikes = async (userId, filter = {}) => {
  try {
    const query = { userId, ...filter };
    const bikes = await Bike.find(query);

    // Process image paths for all bikes
    bikes.forEach(bike => {
      if (bike.image) {
        bike.image = processImagePath(bike.image); // Adjust the image path here
      }
    });

    return bikes;
  } catch (error) {
    throw new Error(`Error fetching bikes: ${error.message}`);
  }
};




// Get all images in the uploads directory
const getAllImages = async (req, res) => {
  try {
    const directoryPath = path.join(__dirname, '..','..', 'src','uploads');
    const files = await fs.readdir(directoryPath); // Read files in the uploads directory
    
    // Filter only image files (adjust file extensions if necessary)
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
    
    // Process image paths and return them
    const imagePaths = imageFiles.map(file => processImagePath(file));
    res.status(200).json(imagePaths);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch images: ' + error.message });
  }
};





// Get all bikes available for purchase
const getBikesForPurchase = async () => {
  try {
    const bikes = await Bike.find();
    return bikes;
  } catch (error) {
    throw new Error(`Error fetching bikes for purchase: ${error.message}`);
  }
};

// Update bike info including image
const updateBike = async (bikeId, updateData) => {
  try {
    // If updating with new image, delete old image first
    if (updateData.image) {
      const existingBike = await Bike.findById(bikeId);
      if (existingBike && existingBike.image) {
        const oldImagePath = path.join(__dirname, '..', existingBike.image);
        try {
          await fs.unlink(oldImagePath);
        } catch (err) {
          console.log('No old image found to delete');
        }
      }
    }

    const updatedBike = await Bike.findByIdAndUpdate(
      bikeId,
      updateData,
      { new: true }
    );

    if (!updatedBike) {
      throw new Error('Bike not found');
    }

    return updatedBike;
  } catch (error) {
    throw new Error(`Error updating bike: ${error.message}`);
  }
};

// Delete a bike and its image from the database
const deleteBike = async (bikeId) => {
  try {
    const bike = await Bike.findById(bikeId);
    if (!bike) {
      throw new Error('Bike not found');
    }

    // Delete the image file if it exists
    if (bike.image) {
      const imagePath = path.join(__dirname, '..','..','src','uploads', path.basename(bike.image));
      try {
        await fs.unlink(imagePath);
      } catch (err) {
        console.log('Error deleting image file:', err);
        // Continue with bike deletion even if image deletion fails
      }
    }

    await Bike.findByIdAndDelete(bikeId);
    return { message: 'Bike and associated image deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting bike: ${error.message}`);
  }
};

// Helper function to validate image file
const validateImage = (file) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.mimetype)) {
    throw new Error('Invalid file type. Only JPEG, PNG GIF and JPG, are allowed');
  }

  if (file.size > maxSize) {
    throw new Error('File too large. Maximum size is 5MB');
  }

  return true;
};

const processImagePath = (imagePath) => {
  if (!imagePath) return null;

  // If the image path is already a full URL, return it as is
  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  // Get just the filename from the path
  const normalizedPath = path.basename(imagePath);

  // Use environment variable to determine the base URL
  const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://speedbike-backend-api-production.up.railway.app'
    : 'http://localhost:5000';

  return `${baseUrl}/uploads/${normalizedPath}`;
};





// Search bikes by criteria
const searchBikes = async (criteria) => {
  try {
    const query = {};
    
    if (criteria.type) {
      query.type = criteria.type;
    }
    if (criteria.priceRange) {
      query.price = {
        $gte: criteria.priceRange.min,
        $lte: criteria.priceRange.max
      };
    }
    if (criteria.name) {
      query.name = { $regex: criteria.name, $options: 'i' };
    }
    
    const bikes = await Bike.find(query);
    return bikes;
  } catch (error) {
    throw new Error(`Error searching bikes: ${error.message}`);
  }
};

module.exports = {
  createBike,
  getBike,
  getBikes,
  getBikesForPurchase,
  updateBike,
  deleteBike,
  validateImage,
  processImagePath,
  searchBikes,
  getAllImages
};