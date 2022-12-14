import createMollieClient from '@mollie/api-client';

const API_KEY = 'test_3zANg8a2rfkhPuK7GnN7QrewHxRmRd';
const mollieClient = createMollieClient({ apiKey: API_KEY });

export async function createPayment(){
    await mollieClient.payments.create({
        amount: {
            value: '5.00',
            currency: 'EUR'
        },
        method: ['ideal', 'paypal'],
        description: 'Parking fees',
        redirectUrl: '/',
        webhookUrl: '/'
    }).then((payment) => {
        console.log(payment.getCheckoutUrl());
    }).catch((error) => {
        console.log(error);
    });

}