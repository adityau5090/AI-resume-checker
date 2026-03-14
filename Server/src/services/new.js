
const OpenAI = require("openai")
 
async function openAI() {

    // console.log(process.env.['OPEN_AI_API_KEY'])
    const client = new OpenAI({
    apikey: process.env.OPENAI_API_KEY
    })

    const response = await client.responses.create({
        model: 'gpt-5.2',
        instructions: "You are a coding assistant",
        input: "Are semicolons optionala in javascript?"
    })

    console.log(response.output_text)
}

module.exports = { openAI }