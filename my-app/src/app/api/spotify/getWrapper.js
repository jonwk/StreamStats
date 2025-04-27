import { getSession } from 'next-auth/react'

const getWrapper = async ({ urlEndpoint, url }) => {
  const { accessToken } = await getSession()
  const baseUrl = 'https://api.spotify.com/v1'
  const res = await fetch(url ? url :`${baseUrl}${urlEndpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json())

  return res
}

export default getWrapper