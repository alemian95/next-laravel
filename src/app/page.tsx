'use client'

import { useTranslations } from "next-intl"

export default function Home() {

  const t = useTranslations()

  return (
    <>
      <h1>Hello world</h1>
      <span>{ t('test') }</span>
    </>
  )
}
