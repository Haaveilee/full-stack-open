const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Gaia Businaro',
        username: 'gaia',
        password: 'businaro'
      }
    })

    await page.goto('http://localhost:5173')
  })  
  
  describe('Login', () => {
    test('login is shown', async ({ page }) => {
      const loginHeader = await page.getByRole('heading', { name: 'Login' })
      await expect(loginHeader).toBeVisible()  
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByPlaceholder('username').fill('gaiaia')
      await page.getByPlaceholder('password').fill('businaroro')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('wrong credentials')).toBeVisible()
    })

    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByPlaceholder('username').fill('gaia')
      await page.getByPlaceholder('password').fill('businaro')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Gaia Businaro is logged in')).toBeVisible()
    })    
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByPlaceholder('username').fill('gaia')
      await page.getByPlaceholder('password').fill('businaro')
      await page.getByRole('button', { name: 'login' }).click()
    });

    test('new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'New Post' }).click()

      await page.getByPlaceholder('write title here').fill('a new title to test')
      await page.getByPlaceholder('write author here').fill('author')
      await page.getByPlaceholder('write url here').fill('url')
      await page.getByRole('button', { name: 'create' }).click();
      
      await expect(page.getByText('New blog post created')).toBeVisible()
    })

    describe('With existing blog post', () => {
      beforeEach(async ({ page }) => {
        await page.getByPlaceholder('username').fill('gaia')
        await page.getByPlaceholder('password').fill('businaro')
        await page.getByRole('button', { name: 'login' }).click()        
      });

      test('Post can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'show' }).click();
        await page.getByRole('button', { name: 'Like' }).click();
        
        await page.reload();

        await page.getByRole('button', { name: 'show' }).click();

        await expect(page.getByText('likes 1')).toBeVisible()
      })

      test('Post can be removed', async ({ page }) => {
        await page.getByRole('button', { name: 'show' }).click();        

        await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible()
      })
    })
  })
})