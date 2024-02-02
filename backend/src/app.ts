import express from 'express';
import axios from "axios";
import cors from 'cors';

const server = express();
server.use(express.json({limit: '50mb'}));

server.use(cors());

server.get('/', (_req, res) => {
    res.json({
        message: 'Welcome to  Payment API 🚀',
        error: false,
    });
}).post('/payments/initiate', async (req, res) => {
    const {depositId, amount} = req.body;//TODO:: Add validation here

    if (!depositId || !amount) {
        return res.status(400).json({
            error: true,
            message: 'Invalid request. depositId and amount are required',
        });
    }



    const response = await axios.post(
        'https://api.sandbox.pawapay.cloud/v1/widget/sessions',
        {
            depositId,
            amount,
            returnUrl: 'https://merchant.com/paymentProcessed', //TODO:: Replace with your own return URL
        },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    'Bearer JWT_TOKEN_HERE',
            },
        },
    );

    const { redirectUrl } = response.data;

    return res.status(200).json({
        error: false,
        redirectUrl,
    });

})


server.listen(9000, () => {
    console.log('Server is running on port 9000');
});