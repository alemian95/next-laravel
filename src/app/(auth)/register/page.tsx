'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { errorsType, useAuth } from "@/hooks/useAuth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { FormEvent, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export default function Register() {

    const { register } = useAuth({
        middleware: "guest",
        redirectIfAuthenticated: "/dashboard"
    })

    const t = useTranslations()

    const [ errors, setErrors ] = useState<errorsType>({})
    const [ pending, setPending ] = useState<boolean>(false)
    
    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ passwordConfirmation, setPasswordConfirmation ] = useState("")

    const formSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
        passwordConfirmation: z.string()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passwordConfirmation: ""
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setPending(true)
        await register(values.name, values.email, values.password, values.passwordConfirmation, setErrors)
        if (Object.keys(errors).length > 0) {
            values.password = ""
            values.passwordConfirmation = ""
        }
        setPending(false)
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 items-center">

                    { errors.name && <span className="text-red-600">{ errors.name }</span> }
                    <FormField control={form.control} name="name" render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder={t('form.register.name')} {...field} />
                            </FormControl>
                        </FormItem>
                    )} />
                    
                    { errors.email && <span className="text-red-600">{ errors.email }</span> }
                    <FormField control={form.control} name="email" render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder={t('form.register.email')} {...field} />
                            </FormControl>
                        </FormItem>
                    )} />
                    
                    { errors.password && <span className="text-red-600">{ errors.password }</span> }
                    <FormField control={form.control} name="password" render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input type="password" placeholder={t('form.register.password')} {...field} />
                            </FormControl>
                        </FormItem>
                    )} />
                    
                    { errors.passwordConfirmation && <span className="text-red-600">{ errors.passwordConfirmation }</span> }
                    <FormField control={form.control} name="passwordConfirmation" render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input type="password" placeholder={t('form.register.password_confirmation')} {...field} />
                            </FormControl>
                        </FormItem>
                    )} />
                    
                    <Button>{ t('form.register.submit') }</Button>
                </form>
            </Form>

            <div className="flex justify-between">
                <Link href="/login">{t('form.register.already_registered')} </Link>
            </div>

            { pending && "Loading..." }
        </>
    )
}