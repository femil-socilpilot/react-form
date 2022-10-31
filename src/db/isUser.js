module.exports = async (req, res, next) => {
    // console.log(req.body);
    try {
        const { email } = req.body
        const users = await fetch('http://localhost:3001/profiles')
        const user = users.data
        console.log('sd', users.data);
        // req.email = await fetch('http://localhost:3001/profiles')
        next();
    } catch (err) {
        res.status(401).json({
            error: "User not Found."
        })
    }
}