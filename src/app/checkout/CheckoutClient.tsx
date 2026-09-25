"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import QRCode from "react-qr-code";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Loader2, ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/providers/CartProvider";
import { useDealerAttribution } from "@/lib/providers/DealerAttributionProvider";
import { Button, Input, Price } from "@/components/atoms";

type CheckoutStep = "info" | "payment" | "success";

export default function CheckoutClient() {
  const { items, cartTotal, clearCart } = useCart();
  const { attribution } = useDealerAttribution();
  const router = useRouter();

  const [step, setStep] = useState<CheckoutStep>("info");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "pending" | "processing" | "completed"
  >("pending");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    salonName: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Protect route
  useEffect(() => {
    if (items.length === 0 && step !== "success") {
      router.push("/shop");
    }
  }, [items.length, step, router]);

  if (items.length === 0 && step !== "success") {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="animate-spin text-brand-gold" size={32} />
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrs = { ...prev };
        delete newErrs[name];
        return newErrs;
      });
    }
  };

  const validateInfo = () => {
    const newErrs: Record<string, string> = {};
    if (!formData.name.trim()) newErrs.name = "Name is required";
    if (!formData.phone.trim()) {
      newErrs.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrs.phone = "Valid 10-digit phone required";
    }
    if (!formData.salonName.trim())
      newErrs.salonName = "Salon name is required";

    setErrors(newErrs);
    return Object.keys(newErrs).length === 0;
  };

  const handleContinueToPayment = () => {
    if (validateInfo()) {
      setStep("payment");
      window.scrollTo(0, 0);
    }
  };

  const handleFinalizeOrder = async () => {
    setIsSubmitting(true);
    setPaymentStatus("processing");

    try {
      const dealerId = attribution?.code || attribution?.slug || "direct";

      const payload = {
        dealerId,
        amount: cartTotal,
        customerName: formData.name,
        customerPhone: formData.phone,
        customerEmail: formData.email,
        salonName: formData.salonName,
        items: items.map((i) => ({
          id: i.id,
          name: i.name,
          quantity: i.quantity,
          price: i.price,
        })),
      };

      const res = await fetch("/api/sale/record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to record sale");
      }

      setPaymentStatus("completed");
      setTimeout(() => {
        clearCart();
        setStep("success");
        window.scrollTo(0, 0);
      }, 1000);
    } catch (err) {
      console.error(err);
      alert(
        "There was an issue finalizing your order. Please contact support.",
      );
      setPaymentStatus("pending");
    } finally {
      setIsSubmitting(false);
    }
  };

  // UPI Setup
  const merchantUpiId = process.env.NEXT_PUBLIC_UPI_ID || "lumiere@ybl";
  const merchantName = process.env.NEXT_PUBLIC_MERCHANT_NAME || "LUMIERE Salon Supplies";
  const note = `Order by ${formData.salonName || formData.name}`;
  // standard UPI Intent URI
  const upiIntent = `upi://pay?pa=${merchantUpiId}&pn=${encodeURIComponent(
    merchantName,
  )}&am=${cartTotal}&cu=INR&tn=${encodeURIComponent(note)}`;

  // SUCCESS STEP
  if (step === "success") {
    return (
      <div className="container-luxury py-20 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 text-green-500 shadow-sm"
        >
          <Check strokeWidth={3} size={40} />
        </motion.div>
        <h1 className="font-serif text-4xl text-brand-dark mb-4">
          Order Confirmed!
        </h1>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          Thank you for choosing LUMIÈRE. Your professional salon supplies are
          being prepared.
          {attribution && (
            <span className="block mt-2 font-medium text-brand-gold">
              Purchased through dealer: {attribution.name}
            </span>
          )}
        </p>
        <Button onClick={() => router.push("/")} variant="primary" size="lg">
          Return to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="container-luxury py-10 pb-20">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Left Column: Flow */}
        <div className="flex-1 order-2 lg:order-1">
          {/* Breadcrumbs / Steps */}
          <div className="flex items-center gap-2 mb-10 text-sm font-semibold uppercase tracking-widest text-gray-400">
            <span className={step === "info" ? "text-brand-dark" : ""}>
              Information
            </span>
            <span>/</span>
            <span className={step === "payment" ? "text-brand-dark" : ""}>
              Payment
            </span>
          </div>

          <AnimatePresence mode="wait">
            {step === "info" && (
              <motion.div
                key="info"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="font-serif text-2xl text-brand-dark mb-6">
                  Customer Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="Enter your name"
                  />
                  <Input
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    placeholder="10-digit mobile number"
                    type="tel"
                  />
                </div>
                <Input
                  label="Email Address (Optional)"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="For order receipts"
                  type="email"
                />
                <Input
                  label="Salon Name"
                  name="salonName"
                  value={formData.salonName}
                  onChange={handleChange}
                  error={errors.salonName}
                  placeholder="Name of your salon/business"
                />

                <div className="pt-8">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full md:w-auto h-14 px-10 rounded-full"
                    onClick={handleContinueToPayment}
                  >
                    Continue to Payment
                  </Button>
                </div>
              </motion.div>
            )}

            {step === "payment" && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <button
                    onClick={() => setStep("info")}
                    className="p-2 -ml-2 text-gray-400 hover:text-brand-dark transition-colors"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <h2 className="font-serif text-2xl text-brand-dark">
                    Payment via UPI
                  </h2>
                </div>

                <div className="bg-white rounded-2xl border border-brand-divider p-8 text-center shadow-sm">
                  <p className="text-gray-500 mb-6">
                    Scan the QR code below with any UPI app (GPay, PhonePe,
                    Paytm) to pay securely.
                  </p>

                  <div className="bg-brand-cream inline-block p-4 rounded-xl border border-brand-divider shadow-inner mb-6">
                    <QRCode
                      value={upiIntent}
                      size={200}
                      bgColor="transparent"
                      fgColor="#1A1A1A"
                      level="Q"
                    />
                  </div>

                  <div className="flex items-center justify-center gap-2 mb-8">
                    <span className="text-brand-charcoal text-xl font-medium">
                      ₹
                    </span>
                    <Price
                      amount={cartTotal}
                      className="text-3xl font-serif text-brand-dark"
                    />
                  </div>

                  <div className="flex flex-col gap-4 max-w-sm mx-auto">
                    {/* Mobile only deep link */}
                    <a
                      href={upiIntent}
                      className="md:hidden w-full flex items-center justify-center gap-2 h-14 rounded-full bg-brand-charcoal text-white font-semibold text-sm uppercase tracking-widest hover:bg-black transition-colors"
                    >
                      Pay via UPI App
                    </a>

                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full h-14 rounded-full"
                      onClick={handleFinalizeOrder}
                      disabled={isSubmitting || paymentStatus === "completed"}
                    >
                      {isSubmitting ? (
                        <Loader2 className="animate-spin mx-auto" />
                      ) : paymentStatus === "completed" ? (
                        <span className="flex items-center gap-2">
                          <Check size={18} /> Payment Verified
                        </span>
                      ) : (
                        "I Have Completed the Payment"
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-[400px] shrink-0 order-1 lg:order-2">
          <div className="bg-white rounded-3xl border border-brand-divider p-6 lg:p-8 sticky top-32 shadow-sm">
            <h3 className="font-serif text-xl text-brand-dark mb-6">
              Order Summary
            </h3>

            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 scrollbar-hide">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-16 h-16 shrink-0 bg-brand-cream rounded-lg overflow-hidden border border-brand-divider">
                    {item.image ? (
                      <Image
                        src={item.image as string}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        IMG
                      </div>
                    )}
                    <div className="absolute -top-2 -right-2 bg-brand-charcoal text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-medium">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="text-sm font-medium text-brand-dark line-clamp-2">
                      {item.name}
                    </h4>
                    <Price
                      amount={item.price * item.quantity}
                      className="text-sm text-gray-500 mt-1"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-brand-divider pt-6 space-y-4">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <Price amount={cartTotal} />
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Taxes & Shipping</span>
                <span>Calculated</span>
              </div>
              <div className="border-t border-brand-divider pt-4 flex justify-between items-center">
                <span className="font-medium text-brand-dark">Total</span>
                <div className="text-right">
                  <span className="text-xs text-gray-400 mr-2">INR</span>
                  <Price
                    amount={cartTotal}
                    className="text-2xl font-serif text-brand-dark"
                  />
                </div>
              </div>
            </div>

            {attribution && (
              <div className="mt-6 bg-brand-cream/50 border border-brand-gold/30 rounded-xl p-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-1">
                  Dealer Linked
                </p>
                <p className="text-sm text-brand-charcoal">
                  {attribution.name}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
