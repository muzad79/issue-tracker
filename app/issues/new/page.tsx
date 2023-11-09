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

type IssueForm = z.infer<typeof createIssueSchema>


const NewIssuePage = () => {
    const [error, setError] = useState("");
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({ resolver: zodResolver(createIssueSchema) });
    const router = useRouter()
    return (
        <div className='max-w-xl'>
            {error && <Callout.Root className='mb-5 ' color='red'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
            }
            <form className=' space-y-3' onSubmit={handleSubmit(async (data) => {
                try {
                    await axios.post('/api/issues', data)
                    router.push('/issues')
                }
                catch (error) {
                    setError("an unexpexted error occured")
                }

            })}>
                <TextField.Root>
                    <TextFieldInput placeholder='Title' {...register("title")} />

                </TextField.Root>
                {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='description' {...field} />}
                />
                {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}



                <Button>Submit issue</Button>
            </form>
        </div>
    )
}

export default NewIssuePage