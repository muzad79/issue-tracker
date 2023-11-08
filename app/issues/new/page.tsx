"use client"
import { Button, TextField, TextFieldInput } from '@radix-ui/themes'
import React from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";


const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3'>
        <TextField.Root>
            <TextFieldInput placeholder='Title'/>

        </TextField.Root>
        <SimpleMDE/>
        <Button>Submit issue</Button>
    </div>
  )
}

export default NewIssuePage