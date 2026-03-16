module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        return res.status(500).json({
            error: 'Server is not configured. Missing Telegram environment variables.'
        });
    }

    try {
        const { name, email, message } = req.body || {};

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are required.' });
        }

        const text = [
            'New portfolio contact message:',
            '',
            `Name: ${String(name).trim()}`,
            `Email: ${String(email).trim()}`,
            '',
            'Message:',
            String(message).trim()
        ].join('\n');

        const telegramResponse = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text
                })
            }
        );

        const telegramData = await telegramResponse.json();

        if (!telegramResponse.ok || !telegramData.ok) {
            console.error('Telegram API error:', telegramData);
            return res.status(502).json({ error: 'Failed to forward message to Telegram.' });
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Contact API error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
