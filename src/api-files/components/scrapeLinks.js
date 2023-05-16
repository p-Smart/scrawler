


// const scrapeLinks = async (page) => {
//     return (await page.evaluate( () => {
//         const anchorTags = Array.from(document.querySelectorAll('a'))
//         const linkUrls = anchorTags.map( ({href}) => href )
//         return linkUrls
//     } ))
// }
const scrapeLinks = async (page) => {
    return await page.evaluate(() => {
      const linkSet = new Set(); // Use a Set to store unique links
      
      // Scrape links from anchor tags
      const anchorTags = Array.from(document.querySelectorAll('a'));
      anchorTags.forEach((anchorTag) => {
        const href = anchorTag.href;
        if (href) {
          linkSet.add(href); // Add unique links to the Set
        }
      });
  
      // Scrape links from other elements
      const elementsWithUrls = Array.from(document.querySelectorAll('[href], [data-href], [xlink\\:href]'));
      elementsWithUrls.forEach((element) => {
        const url = element.href || element.getAttribute('data-href') || element.getAttribute('xlink:href');
        if (url) {
          linkSet.add(url);
        }
      });
  
      return Array.from(linkSet);
    });
  };
  





export default scrapeLinks