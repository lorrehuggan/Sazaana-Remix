import { LoaderFunction, redirect } from '@remix-run/node'
import React from 'react'

export const loader: LoaderFunction = async () => {
  return redirect('/search')
}
