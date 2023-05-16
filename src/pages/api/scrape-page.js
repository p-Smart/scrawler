import error from "@/api-files/components/cusomError"
import scrapeData from "@/api-files/components/scrapeData"



const ScrapePage = async ({body, query, ...req}, res) => {
    try{
        if(req.method !== 'POST'){
            error('Only POST Requests', 404)
        }
        const scrapedData = await scrapeData(body.url)

        res.json({
            success: true,
            data: scrapedData
        })
    }   
    catch(err){
        res.status(err.status || 200).json({
            error: {
              message: err.message
            }
        })
    }
}



export default ScrapePage