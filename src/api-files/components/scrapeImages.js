const removeDuplicatesByPath = (arr) => {
    const pathMap = {};
    return arr.reduce((result, item) => {
      if (!pathMap[item.path]) {
        pathMap[item.path] = true;
        result.push(item);
      }
      return result;
    }, []);
};

const removeInvalidUrls = (urls) => {
    return urls.filter(({path}) => {
      try {
        new URL(path);
        return true;
      } catch (error) {
        return false;
      }
    });
};


const getBackgroundImageUrls = async (page) => {
    return (
        await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('*'));
    
        // Function to get computed background image URL for an element
        const getBackgroundImageUrl = (element) => {
          const styles = window.getComputedStyle(element);
          return styles.getPropertyValue('background-image').replace(/.*url\(['"]?(.*?)['"]?\).*/, '$1');
        };
    
        // Filter elements with non-empty background image URLs
        const backgroundElements = elements.filter((element) => {
          const imageUrl = getBackgroundImageUrl(element);
          return imageUrl !== 'none' && imageUrl !== ''
        });
    
        // Extract the background image URLs
        const backgroundUrls = backgroundElements.map((element) => {
          return getBackgroundImageUrl(element);
        });
    
        return backgroundUrls.map( (url) => ({path: url, descp: ''}));
      }));
}




const scrapeImages = async (page) => {
    const imgSrcs = await page.evaluate( () => {
        const imageElements = Array.from(document.querySelectorAll('img'))
        const imagePaths = imageElements.map( ({src, alt}) => ({
            path: src,
            descp: alt
        }))
        return imagePaths
    } )
    const backgroundImageUrls = await getBackgroundImageUrls(page)
    const allUrls = removeDuplicatesByPath( [...imgSrcs, ...backgroundImageUrls] )
    const cleanImgUrls = removeInvalidUrls( allUrls )
    return cleanImgUrls
}


export default scrapeImages