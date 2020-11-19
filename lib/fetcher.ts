import useSWR from 'swr'

export const useFetch = (url: string, revalidateOnFocus: boolean = false) => {
  const { data, error } = useSWR(url, async () => {
    const response = await fetch(url)
    const data = await response.json()

    return data
  }, { revalidateOnFocus })

  return { data, error }
}