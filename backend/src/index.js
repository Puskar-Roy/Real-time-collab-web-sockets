const express = require("express");
const { Server } = require("socket.io");
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

const port = 5000;





app.get("/", (req, res) => {
  res.json({ sucess: true });
});

const server = app.listen(port, () => {
  console.log(`Server Starting In Port ${port}`);
});


const io = new Server(server, {
  cors: {
    // origin: "https://real-time-code-puskar.vercel.app",
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", socket=>{
    console.log(`User Connected - ${socket.id}`);

    socket.on("send_message",data=>{
        console.log(data);
        socket.broadcast.emit("received_message",data)
    })

})

module.exports = { app }