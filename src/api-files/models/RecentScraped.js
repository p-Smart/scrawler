const mongoose = require('mongoose')
const { Schema } = mongoose;

const detailConfig = {
    type: String,
    required: true
}

const RecentScrapedModel = new Schema({
    url: detailConfig,
    snapshot: detailConfig,
    page_title: String,
    date_scraped: {
      type: Date,
      default: new Date()
    }
  })

const RecentScraped = mongoose.models.RecentScraped ||  mongoose.model('RecentScraped', RecentScrapedModel)

export default RecentScraped