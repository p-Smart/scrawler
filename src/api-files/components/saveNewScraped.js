import RecentScraped from "../models/RecentScraped"



const saveNewScraped = async(url, snapshot, page_title,) => {
    const domain = (new URL(url)).hostname
    
    const duplicate = await RecentScraped.findOne({ url: { $regex: domain, $options: 'i' } })
    if(duplicate){
        return false
    }
    const result = await RecentScraped.create({
        url: url,
        snapshot: snapshot,
        page_title: page_title,
        date_scraped: new Date()
    })
    return result
}


export default saveNewScraped