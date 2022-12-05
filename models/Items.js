import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/*
const range = (start, stop, step) =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
*/

const ItemSchema = new Schema({

    objectID:           {
        type: Number,
        required: true,
    },

    name:               {
        type: String,
        required: true,
    },

    preferredMedium:    {
        type: String || Array,
    },

    avgSeedWeight:      {
        type: Number,
    },

    daysGerminate:           {
        type : Number || Array,
    },

    daysGrow:           {
        type: Number || Array,
    },

    daysHarvest:        {
        type: Number || Array,
    },

    nutrition:          {
        type: Array,
    },

});

export const Items = mongoose.model('items', ItemSchema);