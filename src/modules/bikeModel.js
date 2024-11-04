const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, 'Image URL is required'],
    validate: {
      validator: function(v) {
        return /^(https?:\/\/).*\.(jpg|jpeg|png|gif|webp)$/.test(v);
      },
      message: 'Please provide a valid image URL'
    }
  },
  add: {
    type: String,
    default: 'Cart',
    enum: ['Cart', 'Wishlist', 'Compare']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive number']
  },
  type: {
    type: String,
    required: [true, 'Bike type is required'],
    enum: {
      values: ['BMW', 'Yamaha', 'Honda', 'Kawasaki', 'Ducati'],
      message: '{VALUE} is not a supported bike type'
    }
  },
  name: {
    type: String,
    required: [true, 'Bike name is required'],
    trim: true,
    minlength: [2, 'Bike name must be at least 2 characters long'],
    maxlength: [100, 'Bike name cannot exceed 100 characters']
  },
  show: {
    type: String,
    default: 'Show Bike'
  },
  review: {
    type: String,
    default: 'Bike Review'
  },
  details: {
    type: String,
    default: 'Details'
  },
  detail: {
    year: {
      type: Number,
      required: [true, 'Manufacturing year is required'],
      min: [1900, 'Year must be no earlier than 1900'],
      max: [new Date().getFullYear() + 1, 'Year cannot exceed next year']
    },
    model: {
      type: String,
      required: [true, 'Model is required'],
      trim: true,
      minlength: [2, 'Model name must be at least 2 characters long'],
      maxlength: [100, 'Model name cannot exceed 100 characters']
    },
    engine: {
      type: String,
      required: [true, 'Engine specification is required'],
      trim: true
    },
    horsepower: {
      type: Number,
      required: [true, 'Horsepower is required'],
      min: [0, 'Horsepower must be a positive number'],
      max: [500, 'Horsepower cannot exceed 500']
    },
    transmission: {
      type: String,
      required: [true, 'Transmission type is required'],
      enum: {
        values: ['6-speed', '5-speed', 'Automatic', 'Manual'],
        message: '{VALUE} is not a valid transmission type'
      }
    },
    fuelCapacity: {
      type: String,
      required: [true, 'Fuel capacity is required'],
      match: [/^\d+(\.\d+)?\s*(L|gal)$/, 'Fuel capacity must include unit (L or gal)']
    },
    seatHeight: {
      type: String,
      required: [true, 'Seat height is required'],
      match: [/^\d+(\.\d+)?\s*(in|cm)$/, 'Seat height must include unit (in or cm)']
    },
    weight: {
      type: String,
      required: [true, 'Weight is required'],
      match: [/^\d+(\.\d+)?\s*(lbs|kg)$/, 'Weight must include unit (lbs or kg)']
    },
    features: {
      type: [String],
      required: [true, 'Features list is required'],
      validate: [
        {
          validator: function(v) {
            return v.length >= 1 && v.length <= 10;
          },
          message: 'Features must be between 1 and 10'
        },
        {
          validator: function(v) {
            return v.every(feature => feature.trim().length > 0);
          },
          message: 'Features cannot be empty strings'
        }
      ]
    }
  }
}, { 
  timestamps: true 
});

// Create an index for faster queries
bikeSchema.index({ type: 1, name: 1 });

// Unique compound index to prevent duplicates based on name and type
bikeSchema.index({ name: 1, type: 1 }, { unique: true });

// Virtual property for full bike description
bikeSchema.virtual('fullDescription').get(function() {
  return `${this.name} (${this.type}) - ${this.detail.model} (${this.detail.year})`;
});

// Method to format price
bikeSchema.methods.formattedPrice = function() {
  return `$${this.price.toLocaleString()}`;
};

module.exports = mongoose.model('Bike', bikeSchema);
