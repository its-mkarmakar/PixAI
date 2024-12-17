import axios from "axios";
import FormData from "form-data";
import userModel from "../models/userModel.js";

export const generateImage = async (req, res) => {

  try {

    const { userId, prompt } = req.body

    const user = await userModel.findById(userId)
    
    if (!user || !prompt) {
      return res.json({ success: false, message: 'Missing Details' })
    }

    if (user.creditBalance === 0 || userModel.creditBalance < 0) {
      return res.json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance })
    }

    const formdata = new FormData()
    formdata.append('prompt', prompt)

    const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formdata, {
      headers: {
        'x-api-key': process.env.CLIPDROP_API,
      },
      responseType: "arraybuffer"
    })

    const base64Image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:image/png;base64,${base64Image}`

    await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 })

    res.json({ success: true, message: "Background Removed", resultImage, creditBalance: user.creditBalance - 1 })

  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}