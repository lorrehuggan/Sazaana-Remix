import { useFetcher } from '@remix-run/react'
import { fetchData } from '@remix-run/react/dist/data'
import React, { useEffect } from 'react'
import useUserStore from '~/utils/appStore/userStore'
import { UserActionData } from '../user'

const Index = () => {
  const { submit, data: fetcherData, type } = useFetcher<UserActionData>()
  const {
    setUser,
    setExpiresIn,
    setAccessToken,
    setRefreshToken,
    setUserFavorites,
  } = useUserStore()

  useEffect(() => {
    if (fetcherData?.data) {
      setUserFavorites(fetcherData.data.userTopArtists)
      
      return
    }

    const access_token = localStorage.getItem('access_token')
    const expires_in = localStorage.getItem('expires_in')
    const refresh_token = localStorage.getItem('refresh_token')

    if (!access_token && !expires_in && !refresh_token) {
      return
    }

    if (type !== 'init') {
      return
    }

    submit(
      {
        access_token: access_token ? access_token : '',
        expires_in: expires_in ? expires_in : '',
        refresh_token: refresh_token ? refresh_token : '',
      },
      {
        method: 'post',
        action: '/user',
      }
    )
  }, [fetcherData, submit, type])

  if (fetcherData?.data) {
    return <div>{fetcherData.data.user.email}</div>
  }

  return <div>Hello</div>
}

export default Index
