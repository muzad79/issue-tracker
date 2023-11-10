"use client"
import { Button, Callout, TextField, TextFieldInput } from '@radix-ui/themes';
import { useState } from 'react';

import { createIssueSchema } from '@/app/ValidationSchema';
import { Spinner } from '@/app/components';
import ErrorMessage from '@/app/components/ErrorMessage';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
    ssr: false
})

type IssueFormData = z.infer<typeof createIssueSchema>


const IssueForm = ({issue}:{issue:Issue}) => {
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({ resolver: zodResolver(createIssueSchema) });
    const router = useRouter()
    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true)
            await axios.post('/api/issues', data)
            router.push('/issues')
        }
        catch (error) {
            setSubmitting(false)
            setError("an unexpexted error occured")
        }

    })
    return (
        <div className='max-w-xl'>
            {error && <Callout.Root className='mb-5 ' color='red'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
            }
            <form className=' space-y-3' onSubmit={onSubmit}>
                <TextField.Root>
                    <TextFieldInput defaultValue={issue?.title} placeholder='Title' {...register("title")} />

                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    defaultValue={issue?.description}
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='description' {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>



                <Button disabled={submitting}>Submit issue {submitting && <Spinner />}</Button>
            </form>
        </div>
    )
}

export default IssueForm