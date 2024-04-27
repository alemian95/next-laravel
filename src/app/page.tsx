'use client'

import { useState } from "react"

export default function Home() {

  const [ errors, setErrors ] = useState<Array<{}>>([])
  const [ status, setStatus ] = useState<string|null>(null)

  return (
    <>
      <h1>Hello world</h1>
    </>
  )
}
