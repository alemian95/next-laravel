'use client'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { errorsType, useAuth } from "@/hooks/useAuth"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { isEmpty } from "@/lib/utils"
import Link from "next/link"


export default function Login() {

    const { login } = useAuth({
        middleware: "guest",
        redirectIfAuthenticated: "/dashboard"
    })

    const t = useTranslations()

    const [ errors, setErrors ] = useState<errorsType>({})
    const [ _status, setStatus ] = useState<string | null>(null)
    const [ pending, setPending ] = useState<boolean>(false)

    const formSchema = z.object({
        email: z.string().email(),
        password: z.string(),
        remember: z.boolean()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            remember: false
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setPending(true)
        await login(values.email, values.password, values.remember, setErrors, setStatus)
        if (! isEmpty(errors)) {
            values.password = ""
        }
        setPending(false)
    }

    return (
        <>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 items-center">
                    
                    { errors.email && <span className="text-red-600">{ errors.email }</span> }
                    <FormField control={form.control} name="email" render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder={ t('form.login.email') } {...field} />
                            </FormControl>
                        </FormItem>
                    )} />
                    
                    { errors.password && <span className="text-red-600">{ errors.password }</span> }
                    <FormField control={form.control} name="password" render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input type="password" placeholder={ t('form.login.password') } {...field} />
                            </FormControl>
                        </FormItem>
                    )} />

                    <div className="flex gap-2 items-center">
                        <FormField control={form.control} name="remember" render={({field}) => (
                            <FormItem className="flex items-center gap-2">
                                <FormLabel>{ t('form.login.remember') }</FormLabel>
                                <FormControl>
                                     <Checkbox name={field.name} value={field.name} onCheckedChange={(checked) => {field.onChange(! field.value)}}/>
                                </FormControl>
                            </FormItem>
                        )} />
                    </div>
                    
                    <Button>{ t('form.login.submit') }</Button>
                </form>
            </Form>

            <div className="flex justify-between">
                <Link href="/register">{ t('form.login.not_registered') }</Link>
                <Link href="/forgot-password">{ t('form.login.forgot_password') }</Link>
            </div>

            { pending && "Loading..." }
        </>
    )
}