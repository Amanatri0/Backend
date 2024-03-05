import {asyncHandler} from "../utilities/asynceHandler.js"

const registerUser = asyncHandler( async (req, res) => {
    res.status(200).json({
        message: "Succes... in registertraion under user.controler"
    })
} )

export {registerUser}