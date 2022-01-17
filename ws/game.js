module.exports =(socket) => {
    console.log(`game:connect:${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`game:disconnect:${socket.id}`);
    })

}
