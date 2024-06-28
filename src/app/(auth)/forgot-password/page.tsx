'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { errorsType, useAuth } from "@/hooks/useAuth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { FormEvent, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export default function ForgotPassword() {

    const { forgotPassword } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard'
    })

    const t = useTranslations()

    const [ errors, setErrors ] = useState<errorsType>({})
    const [ status, setStatus] = useState<string|null>(null)
    const [ pending, setPending ] = useState(false)

    const formSchema = z.object({
        email: z.string().email()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setPending(true)
        try {
            await forgotPassword({email: values.email, setErrors, setStatus})

        }
        catch (e) {
            console.error(e)
        }
        setPending(false)
    }

    return (
        <>
            {
                status
                ?
                <>
                    <span>{status}</span>
                    <div>Click here to return to the home page</div>
                </>
                :
                <Form {...form}>
                    <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField control={form.control} name="email" render={({field}) => (
                            <FormItem>
                                {errors.email && <span className="text-red-600">{ errors.email }</span>}
                                <FormControl>
                                    <Input placeholder={t('form.forgotPassword.email')} {...field} />
                                </FormControl>
                            </FormItem>
                        )}></FormField>
                        <div>
                            <Button>{ t('passwords.forgot_submit_form') }</Button>
                        </div>
                    </form>
                </Form>
            }

            { pending && "Loading..." }
        </>
    )
}