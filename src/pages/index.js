import Layout from '@/layouts/landing-layout'
import { Box, Button, Card, CardContent, CardHeader, CardMedia, Container, Grid, TextField, Tooltip, Typography } from '@/mui'
import Head from 'next/head'
import Image from 'next/image'
import {useRouter} from 'next/router'
import { useState } from 'react'
import {AiOutlineClockCircle} from 'react-icons/ai'
export default function Home() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const clientLogos = [{image: '/assets/images/slack.png'},{image: '/assets/images/amazon.png'},{image: '/assets/images/spotify.png'},{image: '/assets/images/air-bnb.png'}]
  const recentSearches = [
    {
      snapshot: '/assets/images/pSmart-website.png',
      title: 'pSmart Website',
      url: 'https://smartfigures.vercel.app',
      timestamp: '2023-05-20T10:30:00.000Z',
    },
    {
      snapshot: '/assets/images/pSmart-website.png',
      title: 'pSmart Website',
      url: 'https://smartfigures.vercel.app',
      timestamp: '2023-05-20T10:30:00.000Z',
    },
    {
      snapshot: '/assets/images/pSmart-website.png',
      title: 'pSmart Website',
      url: 'https://smartfigures.vercel.app',
      timestamp: '2023-05-20T10:30:00.000Z',
    },
    {
      snapshot: '/assets/images/pSmart-website.png',
      title: 'pSmart Website',
      url: 'https://smartfigures.vercel.app',
      timestamp: '2023-05-20T10:30:00.000Z',
    },
    {
      snapshot: '/assets/images/pSmart-website.png',
      title: 'pSmart Website',
      url: 'https://smartfigures.vercel.app',
      timestamp: '2023-05-20T10:30:00.000Z',
    },
    {
      snapshot: '/assets/images/pSmart-website.png',
      title: 'pSmart Website',
      url: 'https://smartfigures.vercel.app',
      timestamp: '2023-05-20T10:30:00.000Z',
    },
    {
      snapshot: '/assets/images/pSmart-website.png',
      title: 'pSmart Website',
      url: 'https://smartfigures.vercel.app',
      timestamp: '2023-05-20T10:30:00.000Z',
    },
    {
      snapshot: '/assets/images/pSmart-website.png',
      title: 'pSmart Website',
      url: 'https://smartfigures.vercel.app',
      timestamp: '2023-05-20T10:30:00.000Z',
    },
  ];
  const dateOptions = {weekday: 'long',day: 'numeric',month: 'long',year: 'numeric',}


  const handleSearch = () => {
    router.push(`/crawl?url=${searchQuery}`)
  }

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

          <Box className="client-logos">
          <Grid container>
          {clientLogos.map( ({image}, k) => (
            <Grid item xs={6} sm={3} md={3} key={k}>
            <Box className="image-wrapper">
              <img src={image} alt='clients logo' />
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
        {recentSearches.length > 0 ? (
          <Grid container spacing={5}>
            {recentSearches.map((search, k) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={k}>
                <Card sx={{cursor: 'pointer'}}>
                <Box sx={{height: 300, overflow: 'hidden'}}>
                  <CardMedia 
                  sx={{
                    height: 'inherit',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.2)'
                    },
                  }}
                   image={search.snapshot} 
                   title='Website Snapshot'
                   />
                   </Box>
                  <CardContent sx={{backgroundColor: 'secondary.light', display: 'flex', flexDirection: 'column', gap: 1}}>
                    <Typography variant="subtitle1">Title: {search.title}</Typography>
                    <Typography variant="subtitle1">URL: {search.url}</Typography>
                    <Typography variant="subtitle1" sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                      <Box sx={{color: 'primary.main'}}><AiOutlineClockCircle/></Box>
                      {new Date(search.timestamp).toLocaleDateString('en-GB', dateOptions)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          ) : (
            <Typography variant="body1">No recent searches found.</Typography>
          )}
        </CardContent>
      </Card>

      </Box>
      </Layout>
  )
}
