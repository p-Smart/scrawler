import {MdHome} from 'react-icons/md'
import {FaSpider} from 'react-icons/fa'
import {BiLinkAlt} from 'react-icons/bi'
import {MdPages} from 'react-icons/md'
import {AiOutlineLogin} from 'react-icons/ai'

export const nav = [
    {
        title: 'Home',
        route: '/',
        Icon: MdHome
    },
    {
        title: 'Crawl',
        route: '/crawl',
        Icon: FaSpider
    },
    {
        title: 'Links',
        route: '#',
        Icon: BiLinkAlt
    },
    {
        title: 'Pages',
        route: '#',
        Icon: MdPages
    },
]


export const nav1 = [
    {
        title: 'Login', 
        route: '#', 
        Icon: AiOutlineLogin
    }, 
    {
        title: 'Register', 
        route: '#', 
        Icon: AiOutlineLogin
    }
]