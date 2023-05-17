import Layout from '@/layouts/landing-layout'
import { Box, Button, Card, CardContent, CardHeader, CardMedia, Container, Grid, Skeleton, TextField, Tooltip, Typography } from '@/mui'
import Head from 'next/head'
import Image from 'next/image'
import {useRouter} from 'next/router'
import { useEffect, useState } from 'react'
import {AiOutlineClockCircle} from 'react-icons/ai'
import axios from 'axios'
import { useBreakpoints } from '@/mui/mediaQuery'



const dateOptions = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
};



export default function Home() {
  const { xs, sm, md, lg, xl } = useBreakpoints();
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const clientLogos = [
    {
      image: '/assets/icons/react.svg',
      title: 'React.js'
    },
    {
      image: '/assets/icons/next.svg',
      title: 'Next.js'
    },
    {
      image: '/assets/icons/puppeteer.svg',
      title: 'Puppeteer.js'
    },
    {
      image: '/assets/icons/mongodb.svg',
      title: 'MongoDB'
    }]
  const [loading, setLoading] = useState(false)
  const [recentlyScrapedSites, setRecentlyScrapedSites] = useState([])


  const handleSearch = () => {
    router.push(`/crawl?url=${searchQuery}`)
  }

  const handleRecentSearchesClick = (e) => {
    const url = e.target.closest('.MuiPaper-root').ariaLabel
    router.push(`/crawl?url=${url}`)
  }

  useEffect( () => {
    (async () => {
      try{
        setLoading(true)
        const {data} = await axios.get('/api/fetch-recent-scrapes')
        setRecentlyScrapedSites(data.data)
      }
      catch(err){
        console.log(err.message)
      }
      finally{
        setLoading(false)
      }
    })()
  }, [] )

  return (
    <Layout>
      <Head>
        <title>Home | SCrawler</title>
        <meta name="description" content="SCrawler Home page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Box className='homepage'>
        <Box className="home-banner">
          <Box className="main-left">
            <Box className="header">
              <Typography variant='h2' color='neutral.400'>
                <Typography component='span' sx={{display:'block'}} variant='h2' color='secondary'>Search Smarter</Typography> 
                with Our Web Scraping Tools
              </Typography>
            </Box>
            <Tooltip title="Done typing? Tap the Search button" placement='bottom-start'>
            <Box className="search">
              <TextField
              fullWidth
               id="search" 
               label="Enter a URL to Scrape"
               type="search" 
               variant='filled'
               autoFocus
               autoComplete='off'
               onChange={(e) => setSearchQuery(e.target.value)}
               onKeyDown={(e) => (e.key === 'Enter' || e.keyCode === 13) && handleSearch()}
               />
              <Button variant="contained" onClick={handleSearch}>Search</Button>
            </Box>
            </Tooltip>
          </Box>
          <Box className="main-right">
            <Box className="image-wrapper">
              <img src='/assets/images/homepage-image2.png' alt='home-banner-image'/>
            </Box>
          </Box>

          <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            zIndex: 3,
            right: {lg: '10%', md: '2%', sm: '1%'}
          }}
          >
          <Grid container spacing={xs ? 3 : 0}>
          {clientLogos.map( ({image, title}, k) => (
            <Grid item xs={3} key={k}>
            <Box>
              <img
              src={image}
              alt={title} 
              width={xs ? 60 : sm ? 100 : lg ? 150 : 150}
              height={70} 
              />
            </Box>
            </Grid>
          ))}
          </Grid>
          </Box>
          <video autoPlay loop muted>
          <source src="/assets/videos/homebanner-video.mp4" type="video/mp4" />
          </video>
          <Box className="design"></Box>
        </Box>
      <Card 
      className='recent-searches'
      sx={{
        backgroundColor: 'silver.lightest',
        ml: {lg:2},
        mt: {lg:2},
        mr: {lg:2},
        }}
      >
        <CardHeader title={<Typography variant="h5" sx={{ color: 'primary.main' }}>Recent Searches</Typography>} />
        <CardContent >
        {!loading ? (
          <Grid container spacing={5} sx={{justifyContent: 'center'}}>
            {recentlyScrapedSites.map(({page_title, url, snapshot, date_scraped}, k) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={k}>
                <Card 
                sx={{cursor: 'pointer'}}
                aria-label={url} 
                onClick={handleRecentSearchesClick}
                >
                <Box sx={{
                  height: 300, 
                  overflow: 'hidden', 
                  backgroundColor: 'neutral.700',
                  }}
                >
                {
                  !loading ? (
                    <CardMedia 
                    sx={{
                      height: 300,
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.2)'
                      },
                      backgroundSize: 'contain'
                    }}
                    image={snapshot}
                    title='Website Snapshot'
                    />
                  ) : (
                    <Skeleton sx={{width: '100%', height: '100%', bgcolor:'neutral.300'}} />
                  )
                }
                  </Box>
                  <CardContent sx={{backgroundColor: 'secondary.light', display: 'flex', flexDirection: 'column', gap: 1}}>
                    <Typography variant="subtitle1">Title: {page_title}</Typography>
                    <Typography variant="subtitle1">URL: { url }</Typography>
                    <Typography variant="subtitle1" sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                      <Box sx={{color: 'primary.main'}}><AiOutlineClockCircle/></Box>
                      <Box>
                      {
                      (() => {
                        const date = new Date(date_scraped).toLocaleDateString('en-GB', dateOptions).split('at')[0];
                        const time = new Date(date_scraped).toLocaleDateString('en-GB', dateOptions).split('at')[1];
                        return (
                          <>
                            <Box>{date}</Box>
                            <Box>{time}</Box>
                          </>
                        );
                      })()
                    }
                    </Box>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          ) : (
            <Grid container spacing={5} sx={{justifyContent: 'center'}}>
            {[...Array(8)].map((_, k) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={k}>
                <Card sx={{cursor: 'pointer'}}>
                <Box sx={{
                  height: 50, 
                  overflow: 'hidden', 
                  backgroundColor: 'neutral.700',
                  display: 'flex',
                  alignItems: 'center'
                  }}
                >
                    <Skeleton sx={{width: '100%', height: '100%', bgcolor:'neutral.300'}} />
                  </Box>
                  <CardContent sx={{backgroundColor: 'secondary.light', display: 'flex', flexDirection: 'column', gap: 1}}>
                    <Typography variant="subtitle1">Title: <Skeleton /> </Typography>
                    <Typography variant="subtitle1">URL: <Skeleton /> </Typography>
                    <Typography variant="subtitle1" sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                      <Box sx={{color: 'primary.main'}}><AiOutlineClockCircle/></Box>
                      <Skeleton sx={{width: 50}} />
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          )}
        </CardContent>
      </Card>

      </Box>
      </Layout>
  )
}
