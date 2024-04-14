import mongoose from "mongoose";

export const connectToDBServer = async (connectionURI: string) => await mongoose.connect(connectionURI);