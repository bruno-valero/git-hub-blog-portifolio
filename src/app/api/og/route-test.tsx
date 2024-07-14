// import { ImageResponse } from 'next/og'

// import { OpenGraphMainHeader } from '@/components/open-graph/open-graph-main-header'

// // Route segment config
// export const runtime = 'edge'

// // Image metadata
// export const alt = 'About Acme'
// export const size = {
//   width: 1200,
//   height: 630,
// }

// export const contentType = 'image/png'

// // Image generation
// export async function GET() {
//   // Font

//   const data = {
//     imageUrl: 'https://github.com/bruno-valero.png',
//     name: 'Bruno Fernandes Valero',
//     description:
//       'Web Developer | JavaScript | TypeScript | NodeJS | NextJS | React | Python',
//     followers: 6,
//   }

//   return new ImageResponse(
//     (
//       // ImageResponse JSX element
//       <OpenGraphMainHeader {...data} />
//     ),
//     // ImageResponse options
//     {
//       // For convenience, we can re-use the exported opengraph-image
//       // size config to also set the ImageResponse's width and height.
//       ...size,
//     },
//   )
// }
