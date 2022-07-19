const fakeDelayRequestListener = pid => (req, res) => {
    for (let i = 1e7; i > 0; i--) {}

    console.log(`Handling request from ${pid}`);

    res.end(`Hello from ${pid}`)
}

module.exports = {
    fakeDelayRequestListener
}
