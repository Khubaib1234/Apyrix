import Stripe from "stripe"

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST() {
    try {
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "IT Services Payment",
                        },
                        unit_amount: 5000,
                    },
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
        });
        return Response.json({url: session.url});
    }
    catch(err){
        return Response.json({error: err.message}, {status: 500})
    }
}