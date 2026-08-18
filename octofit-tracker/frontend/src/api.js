import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function extractItems(payload) {
  if (Array.isArray(payload)) return payload

  if (!payload || typeof payload !== 'object') {
    return []
  }

  for (const key of ['data', 'results', 'items', 'docs']) {
    if (Array.isArray(payload[key])) {
      return payload[key]
    }
  }

  return []
}

export function useApi(path) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const url = `${API_BASE_URL}/api/${path}/`

    fetch(url, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`)
        }

        return response.json()
      })
      .then((data) => {
        setItems(extractItems(data))
        setLoading(false)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [path])

  return {
    items,
    loading,
    error,
  }
}

export function displayName(value) {
  return (
    value?.displayName ||
    value?.username ||
    value?.name ||
    'Unknown'
  )
}
