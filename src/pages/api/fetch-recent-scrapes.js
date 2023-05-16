import connectToDB from "@/api-files/config/dbConnect"
import RecentScraped from "@/api-files/models/RecentScraped"




const FetchRecentScrapes = async (req, res) => {
    try{
        if(req.method !== 'GET'){
            error('Only POST Requests', 404)
        }
        await connectToDB()
        const recentlyScraped = await RecentScraped.find({}).sort({ date_scraped: -1 }).limit(8)
        res.json({
            success: true,
            data: recentlyScraped
        })
    }   
    catch(err){
        res.status(err.status || 500).json({
            error: {
              message: err.message
            }
        })
    }

}



export default FetchRecentScrapes