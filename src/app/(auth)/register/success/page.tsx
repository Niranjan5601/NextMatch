'use client';
import CardWrapper from '@/components/CardWrapper';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaCheckCircle } from 'react-icons/fa';


export default function RegisterSuccess() {

    const router = useRouter();



  return (
    <CardWrapper 
        headerText='You have successfully registered'
        subHeaderText='Please verify your email before logging in'
        action={() => router.push('/login')}
        actionLabel='Go to login'
        headerIcon={FaCheckCircle}
    
    />
  )
}
