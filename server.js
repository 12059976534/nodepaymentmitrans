const http=require("http")
const db=require("./models/")
const app=require("./app")


const server=http.createServer(app)

const port=process.env.PORT || 3001
// server.listen(port);
server.listen(port,async() => {
    try {
        await db.sequelize.sync();
    } catch (error) {
        console.log(error)
    }
})