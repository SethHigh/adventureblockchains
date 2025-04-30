
import axios from 'axios';

//gets pinata key
const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY;

export async function POST(req) {
  try {
    const { walletAddress } = await req.json();

    // Example user data
    const userData = { points: 0 };

    const blob = new Blob([JSON.stringify(userData)], { type: 'application/json' });
    const file = new File([blob], `${walletAddress}.json`);
    //creates the file
    const formData = new FormData();
    formData.append('file', file);

    const pinataResponse = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_KEY,
      },
    });

    const cid = pinataResponse.data.IpfsHash;
    return new Response(JSON.stringify({ cid }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create CID' }), { status: 500 });
  }
}