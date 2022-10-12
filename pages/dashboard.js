import {useSession, signIn, signOut} from 'next-auth/react';
import {useState} from 'react';
import homeStyles from '../styles/Home.module.css';
import Link from 'next/link';
import useSWR from 'swr'

export default function Dashboard() {
    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data, error } = useSWR('/api/userdata', fetcher)
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    return(
        <>
        <div className='container'>
            
        </div>
        <Link href="/">home</Link>
        </>

    );
  }

