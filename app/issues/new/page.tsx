"use client"
import { Button, Callout, Text, TextField, TextFieldInput } from '@radix-ui/themes'
import React, { cache, useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/ValidationSchema';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

type IssueForm = z.infer<typeof createIssueSchema>


const NewIssuePage = () => {
    const [error, setError] = useState("");
    const [submitting,setSubmitting] = useState(false);
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({ resolver: zodResolver(createIssueSchema) });
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
                    <TextFieldInput placeholder='Title' {...register("title")} />

                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='description' {...field} />}
                />
                 <ErrorMessage>{errors.description?.message}</ErrorMessage>



                <Button disabled={submitting}>Submit issue {submitting && <Spinner/>}</Button>
            </form>
        </div>
    )
}

export default NewIssuePage