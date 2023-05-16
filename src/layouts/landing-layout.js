import Link from 'next/link'
import Image from 'next/image'
import {BsChevronDown} from 'react-icons/bs'
import TemporaryDrawer from '@/components/MobileDrawer'
import { useRef, useState } from 'react'
import {AiOutlineMenuUnfold} from 'react-icons/ai'
import Box from '@mui/material/Box'
import { Button, Container, Typography } from '@/mui'
import {useRouter} from 'next/router'
import { dfaj } from '@/styles/styles'
import { nav } from '@/datas/nav'

const Layout = ({children}) => {
    const router = useRouter()
    const [openMobileDrawer, setOpenMobileDrawer] = useState(false)
    const footerHeight = useRef(null)
    return(
        <Box className='lp-layout' sx={{
            minHeight: '100vh', 
            position: 'relative', 
            pb: '112px'
            }}>
            <TemporaryDrawer open={openMobileDrawer} setOpen={setOpenMobileDrawer}/>
            <header>
                <Box sx={{...dfaj}} className='logo-nav'>
                    <Box className="logo">
                        <img src='/scrawler-logo.png'/>
                    </Box>
                    <Box className="mobile-drawer-icon" sx={{cursor: 'pointer', color:'neutral.900'}}>
                        <AiOutlineMenuUnfold  size={24} onClick={() => setOpenMobileDrawer(true)}/>
                    </Box>
                    <nav>
                        {
                            nav.map( ({title, route}, k) => (
                            <Link href={route} key={k}>
                                <Button sx={{display: 'flex', gap: 1, color: router.pathname===route ? '' : 'neutral.500'}}>
                                    {title}{router.pathname===route && <BsChevronDown />}
                                </Button>
                            </Link>
                            ) )
                        }
                    </nav>
                </Box>
                <Box sx={{...dfaj}}>
                    <Link href='#'>
                        <Box className="icon"></Box>
                        <Button>LOGIN</Button>
                    </Link>
                    <Link href='#'>
                        <Box className="icon"></Box>
                        <Button variant='contained' size='small'>SIGN UP</Button>
                    </Link>
                </Box>
            </header>
            <main>
            {children}
            </main>
            <Box 
            component='footer' 
            sx={{ 
                backgroundColor: 'neutral.800', 
                color: 'neutral.100', 
                py: 4, 
                position: 'absolute',
                bottom: 0,
                width: '100%'
            }}
            ref={footerHeight}
            >
                <Container maxWidth="lg">
                    <Typography variant="h6" align="center" gutterBottom>
                    Designed by pSmart
                    </Typography>
                    <Typography variant="body2" align="center">
                    © {new Date().getFullYear()} SCraper. All rights reserved.
                    </Typography>
                </Container>
            </Box>
        </Box>
    )
}



export default Layout