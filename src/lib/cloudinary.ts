// This is a placeholder for the actual GitHub upload implementation
// You'll need to:
// 1. Create a GitHub repository for your audio files
// 2. Use GitHub's API to upload files
// 3. Get the raw URL for the uploaded file

// GitHub file upload implementation
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO;
const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME;

export const uploadAudio = async (file: File): Promise<string> => {
  try {
    // Validate file type
    if (!file.type.startsWith('audio/')) {
      throw new Error('File must be an audio file');
    }

    // Convert file to base64
    const base64Content = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.readAsDataURL(file);
    });

    // Create the file path with proper extension
    const fileExtension = file.name.split('.').pop();
    const filePath = `audio/${Date.now()}_${file.name}`;

    // Prepare the request body
    const body = {
      message: `Add audio file: ${file.name}`,
      content: base64Content,
      branch: 'main'
    };

    // Upload to GitHub
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('GitHub API error:', errorData);
      throw new Error('Failed to upload to GitHub');
    }

    // Return the raw URL
    const rawUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/main/${filePath}`;
    console.log('Successfully uploaded audio file:', rawUrl);
    return rawUrl;
  } catch (error) {
    console.error('Error uploading audio:', error);
    throw error;
  }
};

// Helper function to generate signature
const generateSignature = async (): Promise<string> => {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const message = `timestamp=${timestamp}EbfE9h3sE4zznUob57vGHbHJQOg`;
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hash = await crypto.subtle.digest('SHA-1', data);
  const signature = Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  return signature;
}; 