import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

import fs from "fs/promises"
import { encode } from "next-auth/jwt"
import { chromium } from "playwright"

// Usage: tsx scripts/screenshot.ts [path] [--viewport mobile|tablet|desktop] [--output screenshots/out.png] [--height N]

const VIEWPORTS = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 800 },
}

const args = process.argv.slice(2)
const outputIndex = args.indexOf("--output")
const output = outputIndex !== -1 ? args[outputIndex + 1] : "screenshots/screenshot.png"
const appPath = args.find((a) => a.startsWith("/")) ?? "/"
const viewportIndex = args.indexOf("--viewport")
const viewportName = viewportIndex !== -1 ? args[viewportIndex + 1] : "desktop"
const viewport = VIEWPORTS[viewportName as keyof typeof VIEWPORTS] ?? VIEWPORTS.desktop
const heightIndex = args.indexOf("--height")
const clipHeight = heightIndex !== -1 ? parseInt(args[heightIndex + 1]) : null

const url = `http://localhost:3000${appPath}`

async function main() {
  await fs.mkdir("screenshots", { recursive: true })
  await fs.rm(output, { force: true })

  const secret = process.env.NEXTAUTH_SECRET!
  if (!secret) throw new Error("NEXTAUTH_SECRET is not set in .env.local")

  const token = await encode({
    token: {
      name: "Dev",
      email: "dev@local.dev",
      sub: "dev-user",
      hasWriteAccess: true,
    },
    secret,
  })

  const browser = await chromium.launch()
  const context = await browser.newContext({ viewport })

  await context.addCookies([
    {
      name: "next-auth.session-token",
      value: token,
      domain: "localhost",
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
    },
  ])

  const page = await context.newPage()
  await page.goto(url, { waitUntil: "networkidle" })
  const screenshotOptions = clipHeight
    ? { path: output, clip: { x: 0, y: 0, width: viewport.width, height: clipHeight } }
    : { path: output, fullPage: true }
  await page.screenshot(screenshotOptions)
  await browser.close()

  console.log(
    `Screenshot of ${url} (${viewportName} ${viewport.width}×${viewport.height}) saved to ${output}`
  )
}

main()
