import React from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const Issue = () => {
  return (
    
    <Button><Link href='/issues/new'>new issue</Link></Button>
  )
}

export default Issue