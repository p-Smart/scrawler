


const getPageTitle = async (page) => {
    const pageTitle = await page.title();
    return pageTitle;
};

export default getPageTitle