import { expect, test } from 'vitest'
import { addOauthTokenForLichessRequests, cancelFetch, fetchFromEndpoint } from '../src/fetchers/fetch'

test('default use `Accept: application/json` header', async () => {
    expect.hasAssertions()

    await fetchFromEndpoint(`https://lichess.org/debug-headers`)
        .then((response) => response.json())
        .then((data) => {
            expect(data.accept).toBe('application/json')
        })
})

test('adding oauth token to header', async () => {
    expect.hasAssertions()

    addOauthTokenForLichessRequests('abc123')
    await fetchFromEndpoint(`https://lichess.org/debug-headers`)
        .then((response) => response.json())
        .then((data) => {
            expect(data.authorization).toBe('Bearer abc123')
        })
})

test('missing mocked endpoint', async () => {
    await expect(() => fetchFromEndpoint(`https://example.com`)).toThrowError(
        'Missing mocked endpoint: https://example.com'
    )
})

test('cancel fetch', async () => {
    expect.hasAssertions()

    cancelFetch()

    await expect(fetchFromEndpoint(`https://lichess.org/api/games/user/EricRosen`)).rejects.toThrowError(
        'operation was aborted'
    )
})
