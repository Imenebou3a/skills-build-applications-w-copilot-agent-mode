import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export const API_ENDPOINTS = {
  activities: `${API_BASE_URL}/api/activities/`,
  leaderboard: `${API_BASE_URL}/api/leaderboard/`,
  teams: `${API_BASE_URL}/api/teams/`,
  users: `${API_BASE_URL}/api/users/`,
  workouts: `${API_BASE_URL}/api/workouts/`,
}

export function extractItems(payload) {
  if (Array.isArray(payload)) return payload

  if (!payload || typeof payload !== 'object') return []

  for (const key of ['data', 'results', 'items', 'docs']) {
    if (Array.isArray(payload[key])) return payload[key]
  }

  return []
}

export function useApi(resource) {
  const [state, setState] = useState({
    items: [],
    loading: true,
    error: '',
  })

  useEffect(() => {
    const controller = new AbortController()

    const endpoint = API_ENDPOINTS[resource]

    if (!endpoint) {
      setState({
        items: [],
        loading: false,
        error: `Unknown API resource: ${resource}`,
      })
      return () => controller.abort()
    }

    fetch(endpoint, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`)
        }

        return response.json()
      })
      .then((payload) => {
        setState({
          items: extractItems(payload),
          loading: false,
          error: '',
        })
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setState({
            items: [],
            loading: false,
            error: error.message,
          })
        }
      })

    return () => controller.abort()
  }, [resource])

  return state
}

export function displayName(value) {
  return (
    value?.displayName ||
    value?.username ||
    value?.name ||
    'Unknown'
  )
}