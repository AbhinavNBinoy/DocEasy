import mongoose from "mongoose"

const appointmentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    docId: { type: String, required: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    userData: { type: Object, required: true },
    docData: { type: Object, required: true },
    amount: { type: Number, required: true },
    date: { type: Number, required: true },
    cancelled: { type: Boolean, default: false },
    payment: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
    prescription: {
        fileUrl: { type: String },
        fileName: { type: String },
        fileType: { type: String },
        uploadedAt: { type: Date },
        uploadedBy: { type: String, enum: ['doctor', 'patient'] }
    },
    textPrescription: {
        content: { type: String },
        createdAt: { type: Date },
        updatedAt: { type: Date }
    }
})

const appointmentModel = mongoose.models.appointment || mongoose.model("appointment", appointmentSchema)
export default appointmentModel