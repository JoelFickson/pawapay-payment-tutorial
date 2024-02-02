"use client";
import Image from "next/image";
import {useState} from "react";

interface PurchaseState {
    isLoading: boolean;
}

export default function Home() {
    const [purchaseState, setIsLoading] = useState<PurchaseState>({ isLoading: false });

    const handlePurchase = async () => {
        const fakePaymentData = {
            depositId: "6a13259e-ff31-452f-844c-e4ce6e9d25db",
            amount: "40000",
        };
        setIsLoading({ isLoading: true });
        const response = await fetch("http://localhost:9000/payments/initiate", { //TODO:: Add this in your env secrets
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(fakePaymentData),
        });

        if (response.ok) {
            setIsLoading({ isLoading: false });

            const paymentResponse = await response.json();
            window.location.href = paymentResponse.redirectUrl;
        } else {
            setIsLoading({ isLoading: false });
            alert("Payment Failed");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="gap-4 text-white md:w-2/4 p-4 rounded  flex-col flex items-center">
                <h4 className="text-slate-700 text-2xl">Pawapay Payment Gateway Tutorial</h4>
                <p className="text-slate-700"> Buy This Art</p>

                <Image
                    src="https://images.unsplash.com/photo-1599124140547-b4d1e8c39548?q=80&w=4074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    height={500}
                    width={500}
                    alt="Image of a painting"
                />
                <button disabled={purchaseState.isLoading} onClick={handlePurchase} className="bg-orange-500 w-32 rounded p-2 hover:bg-orange-200 hover:text-orange-500">
                    {purchaseState.isLoading ? <span>Processing</span> : <span>Buy Me</span>}
                </button>
            </div>
        </div>
    );
}



