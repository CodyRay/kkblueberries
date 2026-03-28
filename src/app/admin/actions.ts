'use server'

import yaml from 'js-yaml'
import { getServerSession } from '@/lib/auth'
import { getFileContent, commitFileContent, commitMultipleFiles, type FileCommit } from '@/lib/github'
import type { Session } from 'next-auth'

export type ActionResult = { success: boolean; error?: string }

async function withAuth(fn: (accessToken: string) => Promise<void>): Promise<ActionResult> {
  try {
    const session = await getServerSession()
    const accessToken = (session as Session & { accessToken?: string })?.accessToken
    if (!accessToken) throw new Error('Not authenticated')
    await fn(accessToken)
    return { success: true }
  } catch (e) {
    return { success: false, error: (e as Error).message }
  }
}

async function stageUpload(
  existing: string,
  file: File | null,
  dir: string,
  imageFiles: FileCommit[]
): Promise<string> {
  if (!file || file.size === 0) return existing
  const filename = existing || file.name
  const bytes = await file.arrayBuffer()
  imageFiles.push({
    path: `${dir}/${filename}`,
    content: Buffer.from(bytes).toString('base64'),
    encoding: 'base64',
  })
  return filename
}

async function commitYamlWithImages(
  accessToken: string,
  yamlPath: string,
  content: string,
  sha: string,
  imageFiles: FileCommit[],
  message: string
): Promise<void> {
  if (imageFiles.length > 0) {
    await commitMultipleFiles(
      accessToken,
      [
        ...imageFiles,
        { path: yamlPath, content: Buffer.from(content).toString('base64'), encoding: 'base64' },
      ],
      message
    )
  } else {
    await commitFileContent(accessToken, yamlPath, content, sha, message)
  }
}

export async function savePhotos(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  return withAuth(async (accessToken) => {
    const { sha } = await getFileContent(accessToken, 'data/photos.yaml')
    const count = parseInt(formData.get('count') as string, 10)
    const imageFiles: FileCommit[] = []
    const photos: { file: string; alt: string }[] = []

    for (let i = 0; i < count; i++) {
      const filename = await stageUpload(
        formData.get(`photos[${i}].filename`) as string,
        formData.get(`photos[${i}].file`) as File | null,
        'public/photos',
        imageFiles
      )
      if (filename) photos.push({ file: filename, alt: formData.get(`photos[${i}].alt`) as string })
    }

    await commitYamlWithImages(accessToken, 'data/photos.yaml', yaml.dump({ photos }), sha, imageFiles, 'Update photos')
  })
}

export async function saveFaq(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  return withAuth(async (accessToken) => {
    const { sha } = await getFileContent(accessToken, 'data/faq.yaml')
    const count = parseInt(formData.get('count') as string, 10)
    const items = Array.from({ length: count }, (_, i) => ({
      question: formData.get(`items[${i}].question`) as string,
      answer: formData.get(`items[${i}].answer`) as string,
    }))
    await commitFileContent(accessToken, 'data/faq.yaml', yaml.dump({ items }), sha, 'Update FAQ')
  })
}

export async function saveBanner(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  return withAuth(async (accessToken) => {
    const { sha } = await getFileContent(accessToken, 'data/banner.yaml')
    await commitFileContent(
      accessToken,
      'data/banner.yaml',
      yaml.dump({
        statusEnabled: formData.get('statusEnabled') === 'true',
        status: formData.get('status') as string,
        warningEnabled: formData.get('warningEnabled') === 'true',
        warning: formData.get('warning') as string,
      }),
      sha,
      'Update banner'
    )
  })
}

export async function saveHome(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  return withAuth(async (accessToken) => {
    const { sha } = await getFileContent(accessToken, 'data/home.yaml')
    await commitFileContent(
      accessToken,
      'data/home.yaml',
      yaml.dump({ upickPricePerPound: parseFloat(formData.get('upickPricePerPound') as string) }),
      sha,
      'Update home'
    )
  })
}

export async function saveProducts(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  return withAuth(async (accessToken) => {
    const { sha } = await getFileContent(accessToken, 'data/products.yaml')
    const count = parseInt(formData.get('count') as string, 10)
    const imageFiles: FileCommit[] = []

    const products = await Promise.all(
      Array.from({ length: count }, async (_, i) => ({
        name: formData.get(`products[${i}].name`) as string,
        description: formData.get(`products[${i}].description`) as string,
        price: parseFloat(formData.get(`products[${i}].price`) as string),
        frontImage: await stageUpload(
          formData.get(`products[${i}].frontImage.filename`) as string,
          formData.get(`products[${i}].frontImage.file`) as File | null,
          'public/products',
          imageFiles
        ),
        frontImageAlt: formData.get(`products[${i}].frontImage.alt`) as string,
        ingredientsImage: await stageUpload(
          formData.get(`products[${i}].ingredientsImage.filename`) as string,
          formData.get(`products[${i}].ingredientsImage.file`) as File | null,
          'public/products',
          imageFiles
        ),
        ingredientsImageAlt: formData.get(`products[${i}].ingredientsImage.alt`) as string,
      }))
    )

    await commitYamlWithImages(accessToken, 'data/products.yaml', yaml.dump({ products }), sha, imageFiles, 'Update products')
  })
}
