
import { Flex, Card, Box } from '@radix-ui/themes'
import React from 'react'
import { Skeleton } from '@/app/components'



const loading = async () => {

    return (

        <Box className='max-w-xl'>
            <Skeleton />
            <Flex gap='3' my="2">
                <Skeleton width='5rem' />
                <Skeleton width='8rem' />

            </Flex>
            <Card className='prose mt-4'>
                <Skeleton />
            </Card>

        </Box>
    )
}

export default loading