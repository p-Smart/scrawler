import Layout from "@/layouts/landing-layout"
import { Box, Button, CardHeader, CircularProgress, IconButton, InputAdornment, TextField, Tooltip } from "@/mui"
import { Typography, Card, CardContent, CardMedia, Grid, Skeleton } from '@/mui';
import {FcSearch} from 'react-icons/fc'
import Image from 'next/image'
import { useEffect, useState } from "react";
import axios from 'axios'
import {useRouter} from 'next/router'



function validateURL(url) {
    let formattedURL = url.trim();
  
    if (!formattedURL.startsWith('http://') && !formattedURL.startsWith('https://')) {
      formattedURL = 'http://' + formattedURL;
    }
  
    try {
      const urlObj = new URL(formattedURL);
      if (urlObj.hostname.includes('.')) {
        return formattedURL;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
}
  


const Page = () => {
    const {query} = useRouter()
    const {url} = query

    let typingTimeout
    const [isTyping, setIsTyping] = useState(false);

    const [inputVal, setInputVal] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [pageTitle, setPageTitle] = useState('')
    const [pageSnapshots, setSnapShots] = useState([])
    const [pageLinks, setPageLinks] = useState([])
    const [pageImages, setPageImages] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingMessage, setLoadingMessage] = useState('Searching')
    const [errorMessage, setErrorMessage] = useState('')
    const [error, setError] = useState(false)

    const setTextFieldError = (message) => {
        setError(true)
        setErrorMessage(message)
    }
    const removeTextFieldError = () => {
        setError(false)
        setErrorMessage('')
    }
    let timeout1
    let timeout2
    let timeout3
    let timeout4


    useEffect(() => {
        if(loading){
            timeout1 = setTimeout(() => {
                setLoadingMessage('Please wait, we are gathering the data...')
              }, 3000)
          
            timeout2 = setTimeout(() => {
                setLoadingMessage('Please wait, scraping a website takes time')
              }, 6000)
            timeout3 = setTimeout(() => {
                setLoadingMessage('Scraping in progress, sit tight and enjoy the wait');
            }, 9000)

            timeout4 = setTimeout(() => {
                setLoadingMessage('Hang on tight, we are almost there')
            }, 12000)
        }
        else{
            clearTimeout(timeout1)
            clearTimeout(timeout2)
            clearTimeout(timeout3)
            clearTimeout(timeout4)
            setLoadingMessage('Searching')
        }
    
        return () => {
          clearTimeout(timeout1)
          clearTimeout(timeout2)
          clearTimeout(timeout3)
          clearTimeout(timeout4)
          setLoadingMessage('Searching')
        };
      }, [loading]);



    useEffect(() => {
        typingTimeout = setTimeout(() => {
            setIsTyping(false);
        }, 3000);

        return () => {
          clearTimeout(typingTimeout);
        };
      }, [isTyping]);

    useEffect( () => {
        if(url){
            setInputVal(url)
            setSearchQuery(url)
        }
    }, [] )

    const handleChange = (e) => {
        setIsTyping(true)
        setInputVal(e.target.value)
        // removeTextFieldError()
    }

    const handleClick = () => {
        setSearchQuery(inputVal)
    }

    const handlePageLinkClick = (link) => {
        removeTextFieldError()
        setInputVal(link)
        setSearchQuery(link)
    }


    useEffect( () => {
        searchQuery && !loading && (async() => {
            try{
                const url = validateURL(searchQuery)
                if(url){
                    removeTextFieldError()
                    setLoading(true)
                    const formData = new URLSearchParams({url: url}).toString()
                    const {data} = await axios.post(`/api/scrape-page`, formData)
                    if(data.success){
                        setPageTitle(data.data.title)
                        setPageLinks(data.data.links)
                        setPageImages(data.data.images)
                        setSnapShots(data.data.snapshots)
                    }
                    else{
                        throw new Error(data.error.message)
                    }
                }
                else{
                    throw new Error('Invalid URL')
                }
            }
            catch(err){
                console.error(err.message)
                setTextFieldError(err.message)
            }
            finally{
                setLoading(false)
            }
        })()
    }, [searchQuery])
    return(
        <Layout>
            <Tooltip title="Done typing? Tap the Search Icon or hit ENTER" open={isTyping}>
            <Box sx={{my: 3, mx: {lg: 12, md: 8, xs: 3}}}>
              <TextField
               fullWidth
               error={error}
               helperText={errorMessage}
               onChange={handleChange}
               onKeyDown={(e) => (e.key === 'Enter' || e.keyCode === 13) && handleClick()}
               id="search" 
               label="Crawl On The Go!"
               type="search" 
               variant='filled'
               autoFocus
               autoComplete='off'
               value={inputVal}
            //    onFocus={removeTextFieldError}
               InputProps={{
                  endAdornment:
                    (<Button onClick={handleClick}><InputAdornment sx={{fontSize: {lg: 32, md: 28, xs: 26}}} position="end">
                      <FcSearch />
                    </InputAdornment></Button>)
                  }}
               />
            </Box>
            </Tooltip>

            {
            searchQuery && !error && (
                <>
            <Card sx={{ marginBottom: 2 }}>
                <CardHeader title={
                <Typography variant="h5">
                {!loading ? 
                'Search Result' : 
                (<> {loadingMessage}&nbsp;&nbsp;<CircularProgress size={25}/></>)}
                </Typography>} />
                <CardContent>

                    <Typography variant="h5" sx={{ mb: 2, textAlign: {xs: 'center', md: 'left'} }}>
                        Page Title: 
                        <Typography sx={{fontWeight: 'bold', color: 'primary.main', fontSize: '.9em'}} component='span'>
                            {loading ? <Skeleton /> :` ${pageTitle}`}
                        </Typography>
                    </Typography>


                    <Card sx={{my: 5}}>
                        <CardHeader sx={{backgroundColor: 'neutral.800', mb: 3}} title={<Typography variant="h5" sx={{color: 'neutral.200' }}>
                            Page Links: &nbsp;&nbsp;&nbsp; 
                            <Typography component='span'>Total ({!loading ? pageLinks.length : '...'})</Typography>
                        </Typography>} />
                        <CardContent>
                        <Grid container spacing={2} sx={{ mb: 2, justifyContent: 'center' }}>
                        { !loading ? (
                            pageLinks.map((link, index) => (
                            <Grid item key={index}>
                                <Button variant="outlined" onClick={() => handlePageLinkClick(link)}>{link}</Button>
                            </Grid>
                            ))
                        ) : (
                            [...Array(4)].map((_, index) => (
                            <Grid item key={index}>
                                <Button variant="outlined">
                                <Skeleton sx={{width: 100}}/>
                                </Button>
                            </Grid>
                            ))
                        )}
                        </Grid>
                        </CardContent>
                    </Card>



                    <Card sx={{backgroundColor: 'neutral.800'}}>
                        <CardHeader title={<Typography variant='h5' color='neutral.200'>
                        Page Snapshots &nbsp;&nbsp;&nbsp;
                        <Typography component='span'>Total ({!loading ? pageSnapshots.length : '...'})</Typography>
                        </Typography>} />
                        <Grid container spacing={2} sx={{justifyContent: 'center', pb: 3, px: 3}}>
                        {
                            !loading ? (
                            pageSnapshots.map( (snapshot, k) => (

                                <Grid key={k} item xs={12} sm={6} md={4} lg={3}>
                                <Card>
                                <Box
                                sx={{
                                height: 300, 
                                overflow: 'hidden', 
                                backgroundColor: 'neutral.200',
                                }}
                                >
                                <CardMedia
                                component="img"
                                src={snapshot}
                                alt="Page Snapshot"
                                sx={{
                                    borderRadius: 2,
                                    boxShadow: 1,
                                    width: 300,
                                    height: 300,
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                    transform: 'scale(1.2)'
                                    },
                                    objectFit: 'contain'
                                }}
                                />
                                </Box>
                                </Card>
                                </Grid>
                            ) )
                            ) : (
                                [...Array(4)].map((_, k) => (
                                    <Grid key={k} item xs={12} sm={6} md={4} lg={3}>
                                    <Skeleton sx={{minWidth: 300, height: 50, bgcolor: 'neutral.300'}}/>
                                </Grid>
                                ))
                            )
                        }
                        </Grid>
                    </Card>



                    <Card sx={{my: 5}}>
                        <CardHeader
                        sx={{backgroundColor: 'neutral.100'}}
                        title={
                        <Typography variant='h5'>
                        Page Images &nbsp;&nbsp;&nbsp;
                        <Typography component='span'>Total ({!loading ? pageImages.length : '...'})</Typography>
                        </Typography>} 
                        />
                        <CardContent sx={{backgroundColor: 'neutral.800'}}>
                        <Grid container spacing={2} sx={{justifyContent: 'center', pb: 3, px: 3}}>
                        {
                            !loading ? (
                                pageImages.map(({path, descp}, index) => (
                                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                                <Box
                                    sx={{
                                    marginBottom: 2,
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    boxShadow: 2,
                                    }}
                                >
                                <Image src={path} alt={descp || 'image'} width={300} height={300} style={{objectFit: 'cover'}}/>
                                </Box>
                                </Grid>
                                ))
                            ) : (
                                [...Array(4)].map((_, k) => (
                                    <Grid key={k} item xs={12} sm={6} md={4} lg={3}>
                                    <Skeleton sx={{width: 300, height: 50, bgcolor: 'neutral.300'}}/>
                                </Grid>
                                ))
                            )
                        }
                        </Grid>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
                </>
            )
          }
        </Layout>
    )

}

export default Page