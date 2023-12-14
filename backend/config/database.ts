import mongoose from 'mongoose'

// just import this in the server js and call this function to connect to the database
export const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_URL,{
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    }).then((data)=>{
            console.log(`MongoDB connected with server:${data.connection.host}`)
    })
}

// module.exports = connectDatabase
