


const KeepAppAlive = (_, res) => {
    res.status(200).json({
        success: true,
        message: 'active'
    })
}


export default KeepAppAlive