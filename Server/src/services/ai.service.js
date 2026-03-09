const { GoogleGenAI } = require('@google/genai')

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
})

async function invokeGeminiAI(){
    const response = await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:"Hello tell me about Taj Mahal ?"
    })  

    console.log(response.text)
}

module.exports = { invokeGeminiAI }