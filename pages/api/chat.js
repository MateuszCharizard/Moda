export default function handler(req, res) {
  return res.status(503).json({
    error: 'Chat service is currently disabled',
    message: 'The AI chat backend has been removed as part of our infrastructure optimization.'
  });
}
