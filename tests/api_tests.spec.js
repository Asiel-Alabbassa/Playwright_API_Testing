import { test, expect } from '@playwright/test'

test('API PUT Request', async ({ request }) => {

    const response = await request.put('https://reqres.in/api/users/2', {
        data:
        {
            "name": "Asiel",
            "job": "QA"
        }

    })

    expect(response.status()).toBe(200)

    const text = await response.text()

    expect(text).toContain('Asiel')

    console.log(await response.json())
})

test('API POST Request', async ({ request }) => {

    const response = await request.post('https://reqres.in/api/users', {
        data:
        {
            "name": "Asiel",
            "job": "QA"
        }

    })

    expect(response.status()).toBe(201)

    const text = await response.text()

    expect(text).toContain('Asiel')

    console.log(await response.json())
})


test('API GET Request', async ({ request }) => {

    const response = await request.get('https://reqres.in/api/users/2')

    expect(response.status()).toBe(200)

    const text = await response.text()

    expect(text).toContain('Janet')

    // to fail the test use a value that doesnt exists in the API response 
    // expect(text).toContain('john')

    console.log(await response.json())
})

test('API DELETE Request', async ({ request }) => {

    const response = await request.delete('https://reqres.in/api/users/2')

    expect(response.status()).toBe(204)

    
})