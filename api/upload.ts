import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  // We need to convert the Node request to a standard Request object for @vercel/blob
  const body = request.body as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request, // Note: In some environments, you might need to mock headers here
      onBeforeGenerateToken: async (pathname) => {
        // You can add logic here to check user sessions
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp'],
          tokenPayload: JSON.stringify({ project: 'NivasHub' }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('File uploaded to:', blob.url);
      },
    });

    return response.status(200).json(jsonResponse);
  } catch (error) {
    return response.status(400).json({ error: (error as Error).message });
  }
}
