"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import QRCode from "react-qr-code";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Loader2, ArrowLeft, ShieldCheck, CreditCard, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/providers/CartProvider";
import { useDealerAttribution } from "@/lib/providers/DealerAttributionProvider";
import { Button, Input, Price, SanityImage } from "@/components/atoms";

type CheckoutStep = "info" | "payment" | "success";

export default function CheckoutClient() {
  const { items, cartTotal, clearCart, isHydrated } = useCart();
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

  useEffect(() => {
    if (isHydrated && items.length === 0 && step !== "success") {
      router.push("/shop");
    }
  }, [isHydrated, items.length, step, router]);

  if (!isHydrated || (isHydrated && items.length === 0 && step !== "success")) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="animate-spin text-brand-gold" size={40} strokeWidth={1.5} />
        <p className="text-gray-400 font-light tracking-wide uppercase text-sm">Preparing checkout...</p>
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleFinalizeOrder = async () => {
    setIsSubmitting(true);
    setPaymentStatus("processing");

    try {
      const payload = {
        dealer: attribution
          ? {
              slug: attribution.slug,
              code: attribution.code,
              name: attribution.name,
            }
          : null,
        amount: cartTotal,
        customerName: formData.name,
        customerPhone: formData.phone,
        customerEmail: formData.email,
        salonName: formData.salonName,
        items: items.map((i) => ({
          productId: i.id,
          productName: i.name,
          productSlug: i.id,
          quantity: i.quantity,
          unitPrice: i.price,
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
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 1000);
    } catch (err) {
      console.error(err);
      alert(
        "There was an issue finalizing your order. Please contact support."
      );
      setPaymentStatus("pending");
    } finally {
      setIsSubmitting(false);
    }
  };

  const merchantUpiId = process.env.NEXT_PUBLIC_UPI_ID || "lumiere@ybl";
  const merchantName = process.env.NEXT_PUBLIC_MERCHANT_NAME || "LUMIERE Salon Supplies";
  const note = `Order by ${formData.salonName || formData.name}`;
  const upiIntent = `upi://pay?pa=${merchantUpiId}&pn=${encodeURIComponent(merchantName)}&am=${cartTotal}&cu=INR&tn=${encodeURIComponent(note)}`;

  if (step === "success") {
    return (
      <div className="container-luxury py-20 min-h-[75vh] flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="relative mb-8"
        >
          <div className="absolute inset-0 bg-green-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="relative w-28 h-28 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-full flex items-center justify-center text-white shadow-xl">
            <Check strokeWidth={3} size={50} />
          </div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="font-serif text-5xl text-brand-dark mb-4"
        >
          Order Confirmed
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-gray-500 max-w-lg mx-auto mb-10 text-lg leading-relaxed"
        >
          <p>Thank you for choosing LUMIÈRE. Your professional salon supplies are being prepared for dispatch.</p>
          {attribution && (
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full text-brand-gold font-medium text-sm">
              <ShieldCheck size={16} /> Linked to Dealer: {attribution.name}
            </div>
          )}
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Button onClick={() => router.push("/")} variant="outline" size="lg" className="h-14 px-10 rounded-full uppercase tracking-widest text-xs font-bold border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white">
            Return to Home
          </Button>
        </motion.div>
      </div>
    );
  }

  const stepOptions = [
    { id: "info", label: "Details" },
    { id: "payment", label: "Payment" },
  ];

  return (
    <div className="min-h-screen bg-brand-cream pb-24 pt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Elegant Stepper */}
        <div className="flex items-center justify-center mb-16">
          {stepOptions.map((s, i) => {
            const isActive = step === s.id;
            const isPast = step === "payment" && s.id === "info";
            return (
              <React.Fragment key={s.id}>
                <div className="flex flex-col items-center relative z-10">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-serif text-lg transition-all duration-500 shadow-sm ${isActive ? "bg-brand-charcoal text-white ring-4 ring-brand-charcoal/10" : isPast ? "bg-brand-gold text-white" : "bg-white text-gray-300 border border-gray-200"}`}>
                    {isPast ? <Check size={20} /> : (i + 1)}
                  </div>
                  <span className={`absolute top-16 whitespace-nowrap text-[10px] uppercase tracking-widest font-bold transition-colors ${isActive ? "text-brand-charcoal" : isPast ? "text-brand-gold" : "text-gray-400"}`}>
                    {s.label}
                  </span>
                </div>
                {i < stepOptions.length - 1 && (
                  <div className="w-24 md:w-48 h-px mx-4 -mt-8 relative">
                    <div className="absolute inset-0 bg-gray-200" />
                    <div className={`absolute inset-y-0 left-0 bg-brand-gold transition-all duration-700 ease-in-out ${step === "payment" ? "w-full" : "w-0"}`} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start mt-20">
          {/* Left Column: Flow */}
          <div className="flex-1 w-full order-2 lg:order-1">
            <AnimatePresence mode="wait">
              {step === "info" && (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }}
                  className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-brand-divider"
                >
                  <div className="mb-10">
                    <h2 className="font-serif text-3xl text-brand-dark mb-3">Client Information</h2>
                    <p className="text-gray-500 font-light">Please provide your professional details for this order.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        placeholder="Enter your name"
                        size="lg"
                        className="bg-gray-50/50"
                      />
                      <Input
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                        placeholder="10-digit mobile number"
                        type="tel"
                        size="lg"
                        className="bg-gray-50/50"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Salon Name"
                        name="salonName"
                        value={formData.salonName}
                        onChange={handleChange}
                        error={errors.salonName}
                        placeholder="Name of your salon/business"
                        size="lg"
                        className="bg-gray-50/50"
                      />
                      <Input
                        label="Email Address (Optional)"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="For order receipts"
                        type="email"
                        size="lg"
                        className="bg-gray-50/50"
                      />
                    </div>

                    <div className="pt-10">
                      <Button
                        variant="primary"
                        size="lg"
                        className="w-full md:w-auto h-14 px-12 rounded-full shadow-lg shadow-brand-charcoal/10"
                        onClick={handleContinueToPayment}
                      >
                        Proceed to Payment <ArrowRight size={18} className="ml-2" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === "payment" && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }}
                  className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-brand-divider"
                >
                  <div className="flex items-center gap-4 mb-10">
                    <button
                      onClick={() => setStep("info")}
                      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-brand-dark hover:border-brand-charcoal transition-colors"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <div>
                      <h2 className="font-serif text-3xl text-brand-dark">Secure Payment</h2>
                    </div>
                  </div>

                  <div className="bg-gray-50/50 rounded-3xl border border-gray-100 p-8 md:p-10 text-center max-w-lg mx-auto">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-gold/10 text-brand-gold rounded-full mb-6">
                      <CreditCard size={24} strokeWidth={1.5} />
                    </div>
                    
                    <p className="text-gray-600 mb-8">
                      Scan the secure QR code using <span className="font-semibold text-brand-dark">GPay, PhonePe, or Paytm</span> to complete your purchase.
                    </p>

                    {/* Premium QR Code Frame */}
                    <div className="relative inline-block p-6 bg-white rounded-2xl shadow-xl shadow-brand-charcoal/5 border border-gray-100 mb-10 group">
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-brand-gold rounded-tl-xl transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1" />
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-brand-gold rounded-tr-xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-brand-gold rounded-bl-xl transition-transform group-hover:-translate-x-1 group-hover:translate-y-1" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-brand-gold rounded-br-xl transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
                      <div className="p-2 bg-white">
                        <QRCode value={upiIntent} size={180} bgColor="#ffffff" fgColor="#1a1a1a" level="Q" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 max-w-sm mx-auto">
                      {/* Mobile only deep link */}
                      <a
                        href={upiIntent}
                        className="md:hidden w-full flex items-center justify-center gap-2 h-14 rounded-full bg-brand-gold/10 text-brand-gold font-bold text-[10px] uppercase tracking-widest border border-brand-gold/20 hover:bg-brand-gold hover:text-white transition-all"
                      >
                        Pay on Mobile App
                      </a>

                      <Button
                        variant="primary"
                        size="lg"
                        className="w-full h-14 rounded-full shadow-lg shadow-brand-charcoal/10 uppercase tracking-widest text-[10px] font-bold"
                        onClick={handleFinalizeOrder}
                        disabled={isSubmitting || paymentStatus === "completed"}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2"><Loader2 className="animate-spin" size={18} /> Verifying...</span>
                        ) : paymentStatus === "completed" ? (
                          <span className="flex items-center gap-2"><Check size={18} /> Payment Verified</span>
                        ) : (
                          "I Have Paid"
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Order Summary Glass Card */}
          <div className="w-full lg:w-[420px] shrink-0 order-1 lg:order-2">
            <div className="bg-white/80 backdrop-blur-md rounded-[2rem] border border-brand-divider p-8 sticky top-32 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="flex items-center gap-3 mb-8">
                <ShoppingBag className="text-brand-gold" size={24} strokeWidth={1.5} />
                <h3 className="font-serif text-2xl text-brand-dark">Order Summary</h3>
              </div>

              <div className="space-y-5 mb-8 max-h-[45vh] overflow-y-auto pr-2 scrollbar-hide">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-5 group">
                    <div className="relative w-20 h-20 shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-brand-divider">
                      <SanityImage
                        image={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-0 right-0 bg-brand-charcoal text-white text-[10px] px-2 py-1 rounded-bl-lg font-medium">
                        x{item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="text-sm font-semibold text-brand-dark line-clamp-2 leading-relaxed">
                        {item.name}
                      </h4>
                      <Price amount={item.price * item.quantity} className="text-sm text-brand-gold mt-1.5 font-medium" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative">
                <div className="absolute inset-x-0 -top-4 border-t-2 border-dashed border-gray-200" />
                <div className="space-y-4 pt-4">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <Price amount={cartTotal} />
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Taxes & Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="pt-4 flex justify-between items-end">
                    <span className="text-xs uppercase tracking-widest font-bold text-gray-400">Total</span>
                    <div className="text-right">
                      <span className="text-xs text-brand-gold font-bold mr-1">INR</span>
                      <Price amount={cartTotal} className="text-3xl font-serif text-brand-dark" />
                    </div>
                  </div>
                </div>
              </div>

              {attribution && (
                <div className="mt-8 bg-brand-cream/50 border border-brand-gold/30 rounded-xl p-4 flex items-start gap-3">
                  <ShieldCheck className="text-brand-gold shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-0.5">Dealer Linked</p>
                    <p className="text-sm font-medium text-brand-charcoal">{attribution.name}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
