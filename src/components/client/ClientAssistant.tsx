import { useState } from "react";
import { MessageCircle, X, Send, Bot, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Msg { role: "bot" | "user"; text: string; }

const kb: { keywords: string[]; reply: string }[] = [
  { keywords: ["حجز", "احجز", "موعد"], reply: "بالتأكيد! يمكنك اختيار الخدمة من صفحة «احجز الآن» ثم الموظف والوقت المناسب. هل تريدين اقتراحاً بأقرب موعد شاغر؟" },
  { keywords: ["سعر", "أسعار", "تكلفة", "كم"], reply: "أسعارنا تختلف حسب الخدمة: قص شعر 120 ر.س، مكياج سهرة 250 ر.س، صبغة كاملة 380 ر.س، ومكياج عروس 850 ر.س." },
  { keywords: ["ساعات", "دوام", "متى"], reply: "ساعات عمل الصالون: السبت للخميس من 10 صباحاً حتى 10 مساءً، الجمعة من 2 ظهراً حتى 10 مساءً." },
  { keywords: ["إلغاء", "الغاء", "تعديل"], reply: "يمكنك إلغاء أو تعديل حجزك من صفحة «حجوزاتي» قبل 4 ساعات على الأقل من الموعد بدون رسوم." },
  { keywords: ["نقاط", "مكافآت", "ولاء"], reply: "لكل 10 ر.س تحصلين على نقطة، وكل 100 نقطة = 10 ر.س رصيد. لديك حالياً 480 نقطة 🎉" },
  { keywords: ["كوبون", "خصم"], reply: "استخدمي كود WELCOME20 للحصول على خصم 20%، أو SUMMER50 لخصم 50 ر.س على الحجوزات فوق 200 ر.س." },
  { keywords: ["موظف", "مصفف", "أخصائية"], reply: "لدينا فريق مميز: أمل السلمي (شعر)، دانة العبدالله (مكياج)، ونورة الزهراني (تصفيف)." },
  { keywords: ["موقع", "عنوان", "وين"], reply: "نحن في الرياض، حي الملقا. رابط الموقع متوفر في صفحة «تواصل معنا»." },
  { keywords: ["دفع", "مدفوعات", "بطاقة"], reply: "نقبل جميع البطاقات ومدى وApple Pay وتمارا، أو الدفع النقدي في الصالون." },
];

function findReply(text: string): string {
  const t = text.toLowerCase();
  for (const entry of kb) {
    if (entry.keywords.some(k => t.includes(k))) return entry.reply;
  }
  return "عذراً، لم أفهم استفسارك تماماً. هل تريدين التحدث مع أحد موظفينا؟ يمكنني تحويلك خلال دقائق.";
}

export function ClientAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: "أهلاً بك 💜 أنا مساعد صالون AI. كيف أقدر أساعدك اليوم؟" },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const userText = input;
    setMessages(m => [...m, { role: "user", text: userText }]);
    setInput("");
    setTimeout(() => {
      setMessages(m => [...m, { role: "bot", text: findReply(userText) }]);
    }, 600);
  };

  return (
    <>
      <button
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-gradient-brand text-primary-foreground shadow-elegant hover:scale-110 transition-transform"
        aria-label="المساعد الذكي"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
      {open && (
        <div className="fixed bottom-24 right-5 z-40 w-[min(360px,calc(100vw-2.5rem))] rounded-2xl bg-card shadow-elegant border overflow-hidden flex flex-col" style={{ height: 480 }}>
          <div className="bg-gradient-brand p-4 text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-white/20">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <div className="font-bold">مساعد صالون AI</div>
                <div className="text-xs opacity-90">متصل الآن</div>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex gap-2", m.role === "user" && "flex-row-reverse")}>
                <div className={cn("grid h-7 w-7 place-items-center rounded-full text-white text-xs shrink-0",
                  m.role === "bot" ? "bg-gradient-brand" : "bg-muted-foreground")}>
                  {m.role === "bot" ? <Bot className="h-3 w-3" /> : <UserIcon className="h-3 w-3" />}
                </div>
                <div className={cn("rounded-2xl px-3 py-2 text-sm max-w-[80%]",
                  m.role === "bot" ? "bg-muted" : "bg-primary text-primary-foreground")}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t p-3 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="اكتب رسالتك..."
            />
            <Button size="icon" onClick={send} className="bg-gradient-brand shrink-0"><Send className="h-4 w-4" /></Button>
          </div>
          <div className="px-3 pb-2">
            <button className="text-[11px] text-muted-foreground hover:text-foreground w-full text-center">
              تحدث مع موظف بشري →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
