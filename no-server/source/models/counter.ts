import mongoose, { Schema } from "mongoose";
const counterSchema: Schema = new Schema(
    {
        _id: { type: String, required: true },
        seq: { type: Number, default: 0 }
    }
);

counterSchema.index({ _id: 1, seq: 1 }, { unique: true })

const counterModel = mongoose.model('counter', counterSchema);

const autoIncrementModelID = function (modelName: any, doc: any, next: any) {
    counterModel.findByIdAndUpdate(        // ** Method call begins **
        modelName,                           // The ID to find for in counters model
        { $inc: { seq: 1 } },                // The update
        { new: true, upsert: true },         // The options
        function (error, counter: any) {          // The callback
            if (error) return next(error);
            doc.id = counter.seq;
            next();
        }
    );                                     // ** Method call ends **
}

export default autoIncrementModelID;
