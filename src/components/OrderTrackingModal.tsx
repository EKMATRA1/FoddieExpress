import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  Navigation,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { Order } from '../types';

interface OrderTrackingModalProps {
  order: Order;
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  order,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1); // 0: confirmed, 1: preparing, 2: on_the_way, 3: delivered
  const [countdownMinutes, setCountdownMinutes] = useState<number>(order.estimatedMinutes || 24);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [messages, setMessages] = useState<{ sender: 'user' | 'dasher'; text: string; time: string }[]>([
    {
      sender: 'dasher',
      text: `Hi! I'm ${order.dasherName}, your Foddie Express Dasher. I just arrived at ${order.restaurantName} to pick up your order!`,
      time: 'Just now',
    },
  ]);
  const [showChat, setShowChat] = useState<boolean>(false);

  // Simulate progress over time
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setCurrentStep(2); // On the way
    }, 4000);

    const timer2 = setTimeout(() => {
      setCurrentStep(3); // Delivered
      setCountdownMinutes(0);
    }, 15000);

    const interval = setInterval(() => {
      setCountdownMinutes((prev) => (prev > 1 ? prev - 1 : 0));
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(interval);
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userText = chatMessage.trim();
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText, time: 'Just now' },
    ]);
    setChatMessage('');

    // Automated driver response after 1.5s
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'dasher',
          text: `Got it! Thanks for letting me know, will follow instructions carefully.`,
          time: 'Just now',
        },
      ]);
    }, 1500);
  };

  const steps = [
    { title: 'Order Confirmed', desc: 'Sent to restaurant kitchen' },
    { title: 'Kitchen Preparing', desc: 'Fresh ingredients being cooked' },
    { title: 'Dasher on the Way', desc: `${order.dasherName} heading to you` },
    { title: 'Delivered', desc: 'Arrived at your door' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="font-display text-lg font-bold text-neutral-900">
              Live Order Status
            </h2>
            <span className="text-xs text-neutral-400 font-mono">#{order.id.slice(-6)}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-200/70 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {/* Estimated Delivery Status Box */}
          <div className="p-5 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white rounded-2xl relative overflow-hidden shadow-sm">
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                  {currentStep === 3 ? 'Order Completed' : 'Estimated Arrival'}
                </span>
                <div className="font-display text-2xl sm:text-3xl font-extrabold mt-0.5">
                  {currentStep === 3 ? 'Delivered!' : `${countdownMinutes}–${countdownMinutes + 5} Minutes`}
                </div>
                <p className="text-xs text-neutral-300 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#EB1700]" />
                  <span>{order.deliveryAddress}</span>
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs px-4 py-2.5 rounded-xl border border-white/15 text-center shrink-0">
                <span className="text-[11px] text-neutral-300 block">Restaurant</span>
                <span className="font-bold text-sm text-white">{order.restaurantName}</span>
              </div>
            </div>
          </div>

          {/* Stepper Progress */}
          <div className="py-2">
            <div className="grid grid-cols-4 gap-2 relative">
              {steps.map((st, idx) => {
                const isPassed = idx <= currentStep;
                const isCurrent = idx === currentStep;
                return (
                  <div key={st.title} className="flex flex-col items-center text-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isPassed
                          ? 'bg-[#EB1700] text-white shadow-xs'
                          : 'bg-neutral-100 text-neutral-400 border border-neutral-200'
                      }`}
                    >
                      {idx < currentStep ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>
                    <span
                      className={`mt-2 text-xs font-bold ${
                        isCurrent ? 'text-neutral-900' : isPassed ? 'text-neutral-700' : 'text-neutral-400'
                      }`}
                    >
                      {st.title}
                    </span>
                    <span className="text-[10px] text-neutral-400 hidden sm:block mt-0.5">
                      {st.desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Simulated Map / Route */}
          <div className="relative h-44 rounded-2xl bg-neutral-900 overflow-hidden border border-neutral-200">
            {/* Map styling grid graphic */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute inset-0 flex items-center justify-between px-10">
              {/* Restaurant marker */}
              <div className="flex flex-col items-center gap-1 z-10">
                <div className="w-10 h-10 rounded-full bg-white text-neutral-900 shadow-md flex items-center justify-center font-bold text-xs border border-neutral-200">
                  <ShoppingBag className="w-5 h-5 text-[#EB1700]" />
                </div>
                <span className="text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded">
                  Store
                </span>
              </div>

              {/* Connecting dashed route line */}
              <div className="flex-1 mx-4 h-0.5 border-t-2 border-dashed border-[#EB1700]/70 relative">
                {/* Moving Dasher icon */}
                <div
                  className={`absolute -top-3.5 transition-all duration-1000 ${
                    currentStep === 0
                      ? 'left-[5%]'
                      : currentStep === 1
                      ? 'left-[25%]'
                      : currentStep === 2
                      ? 'left-[65%]'
                      : 'left-[95%]'
                  }`}
                >
                  <div className="w-7 h-7 rounded-full bg-[#EB1700] text-white flex items-center justify-center shadow-lg ring-4 ring-[#EB1700]/30 animate-bounce">
                    <Navigation className="w-3.5 h-3.5 rotate-45" />
                  </div>
                </div>
              </div>

              {/* Customer house marker */}
              <div className="flex flex-col items-center gap-1 z-10">
                <div className="w-10 h-10 rounded-full bg-[#EB1700] text-white shadow-md flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded">
                  Your Home
                </span>
              </div>
            </div>
          </div>

          {/* Dasher Profile Card */}
          <div className="p-4 bg-neutral-50 border border-neutral-200/80 rounded-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EB1700] to-orange-500 text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                {order.dasherName.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-neutral-900">{order.dasherName}</h4>
                  <span className="text-[11px] font-semibold text-neutral-500 bg-neutral-200/70 px-1.5 py-0.2 rounded">
                    ★ {order.dasherRating}
                  </span>
                </div>
                <p className="text-xs text-neutral-500">{order.dasherVehicle}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowChat((v) => !v)}
                className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-neutral-100 border border-neutral-200 rounded-full text-xs font-bold text-neutral-800 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#EB1700]" />
                <span>Message</span>
              </button>
              <button
                onClick={() => alert(`Calling ${order.dasherName} (Simulated)...`)}
                className="w-8 h-8 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-800 transition-colors cursor-pointer"
                title="Call Dasher"
              >
                <Phone className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Chat Drawer with Dasher */}
          {showChat && (
            <div className="border border-neutral-200 rounded-2xl p-4 bg-white space-y-3 animate-in fade-in duration-150">
              <div className="text-xs font-bold text-neutral-800 flex items-center justify-between pb-2 border-b border-neutral-100">
                <span>Chat with {order.dasherName}</span>
                <span className="text-[10px] text-emerald-600 font-semibold">● Active Now</span>
              </div>

              <div className="max-h-36 overflow-y-auto space-y-2 text-xs">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${
                      m.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`px-3 py-2 rounded-2xl max-w-xs ${
                        m.sender === 'user'
                          ? 'bg-[#EB1700] text-white rounded-br-xs'
                          : 'bg-neutral-100 text-neutral-800 rounded-bl-xs'
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[10px] text-neutral-400 mt-0.5">{m.time}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder={`Send instructions or gate code...`}
                  className="flex-1 text-xs px-3 py-2 border border-neutral-200 rounded-full focus:outline-none focus:border-[#EB1700]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#EB1700] text-white text-xs font-bold rounded-full hover:bg-[#D01400] transition-colors cursor-pointer"
                >
                  Send
                </button>
              </form>
            </div>
          )}

          {/* Order Receipt Details */}
          <div className="pt-2 border-t border-neutral-200">
            <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider mb-3">
              Order Items ({order.items.reduce((s, i) => s + i.quantity, 0)})
            </h4>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.cartItemId} className="flex justify-between text-xs text-neutral-700">
                  <div className="flex gap-2">
                    <span className="font-bold text-neutral-900 tabular-nums">
                      {item.quantity}x
                    </span>
                    <span className="truncate max-w-[280px]">{item.name}</span>
                  </div>
                  <span className="font-semibold tabular-nums text-neutral-900">
                    ₹{item.unitPrice * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-100 flex justify-between items-center text-sm font-extrabold text-neutral-900">
              <span>Paid Total</span>
              <span className="tabular-nums text-[#EB1700]">₹{order.total}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex justify-between items-center">
          <span className="text-xs text-neutral-500">Need help with this order?</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-full transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
