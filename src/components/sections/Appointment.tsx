"use client";

import { useEffect, useId, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronDown, ClipboardList, MessageCircle, PhoneCall, Send } from "lucide-react";
import { departments, doctors, site, type DepartmentId } from "@/content/site";
import { cn } from "@/lib/cn";
import { PREFILL_EVENT, whatsappLink, type PrefillDetail } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, Eyebrow } from "@/components/ui/SectionHeading";

type Form = {
  name: string;
  mobile: string;
  department: DepartmentId | "";
  doctor: string;
  date: string;
  message: string;
};

const empty: Form = { name: "", mobile: "", department: "", doctor: "", date: "", message: "" };

const steps = [
  { icon: ClipboardList, title: "Share your details", body: "Tell us who the appointment is for and what you need." },
  { icon: Send, title: "Send on WhatsApp", body: "Your request opens in WhatsApp, ready to send to our front desk." },
  { icon: PhoneCall, title: "We confirm the time", body: "Our team replies to confirm an available slot with you." },
];

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function validate(f: Form) {
  const errors: Partial<Record<keyof Form, string>> = {};
  if (f.name.trim().length < 2) errors.name = "Please enter the patient's name.";
  const digits = f.mobile.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "");
  if (!/^[6-9]\d{9}$/.test(digits)) errors.mobile = "Please enter a valid 10-digit mobile number.";
  if (!f.department) errors.department = "Please choose a department.";
  if (f.date && f.date < todayISO()) errors.date = "Please choose today or a future date.";
  return errors;
}

function buildMessage(f: Form) {
  const dept = departments.find((d) => d.id === f.department)?.label ?? "";
  const doc = doctors.find((d) => d.id === f.doctor)?.name ?? "Any available doctor";
  const date = f.date
    ? new Date(`${f.date}T00:00:00`).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })
    : "Flexible";
  return [
    `Hello ${site.name}, I would like to request an appointment.`,
    "",
    `Patient name: ${f.name.trim()}`,
    `Mobile: ${f.mobile.trim()}`,
    `Department: ${dept}`,
    `Preferred doctor: ${doc}`,
    `Preferred date: ${date}`,
    f.message.trim() ? `Message: ${f.message.trim()}` : "",
    "",
    "Please let me know an available time. Thank you.",
  ]
    .filter((line, i, arr) => !(line === "" && arr[i - 1] === ""))
    .join("\n");
}

function Field({ label, error, optional, children, id }: { label: string; error?: string; optional?: boolean; children: ReactNode; id: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-center justify-between text-[13px] font-semibold text-teal-950">
        {label}
        {optional && <span className="font-normal text-muted">Optional</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 text-[13px] text-red-700"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls = (invalid?: boolean) =>
  cn(
    "h-[52px] w-full rounded-xl border bg-ivory-50 px-4 text-[16px] text-teal-950 transition placeholder:text-muted/60 focus:border-teal-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-mint-200/60",
    invalid ? "border-red-400" : "border-line",
  );

export function Appointment() {
  const uid = useId();
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [sent, setSent] = useState(false);
  const [minDate, setMinDate] = useState<string>();

  // Pre-fill from "Book" buttons elsewhere on the page
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const { department, doctor } = (e as CustomEvent<PrefillDetail>).detail;
      setSent(false);
      setForm((f) => ({
        ...f,
        department: (department as DepartmentId) ?? f.department,
        doctor: doctor ?? (department && department !== f.department ? "" : f.doctor),
      }));
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  const availableDoctors = form.department ? doctors.filter((d) => d.departments.includes(form.department as DepartmentId)) : doctors;

  const update = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (key === "department" && f.doctor) {
        const doc = doctors.find((d) => d.id === f.doctor);
        if (doc && !doc.departments.includes(value as DepartmentId)) next.doctor = "";
      }
      return next;
    });
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(`${uid}-${firstInvalid}`)?.focus();
      return;
    }
    window.open(whatsappLink(buildMessage(form)), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const ids = (k: keyof Form) => ({
    id: `${uid}-${k}`,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${uid}-${k}-error` : undefined,
  });

  return (
    <section id="appointment" aria-labelledby="appointment-heading" className="relative overflow-hidden bg-ivory-100 py-24 sm:py-32">
      <div aria-hidden className="absolute -left-40 bottom-0 size-[520px] rounded-full bg-mint-200/50 blur-3xl" />
      <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow>Appointments</Eyebrow>
            <h2 id="appointment-heading" className="mt-5 text-[2.1rem] font-semibold leading-[1.08] text-teal-950 sm:text-5xl">
              Request a visit <Accent className="text-teal-700">in a minute.</Accent>
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-muted">
              Fill in a few details and we&apos;ll open WhatsApp with your request ready to send. No app downloads, no
              waiting on hold.
            </p>
          </Reveal>

          <ol className="mt-10 space-y-1">
            {steps.map((s, i) => (
              <li key={s.title} className="relative flex gap-5 pb-7 last:pb-0">
                {i < steps.length - 1 && <span aria-hidden className="absolute left-[21px] top-12 h-[calc(100%-3rem)] w-px bg-teal-900/15" />}
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-teal-700 shadow-soft ring-1 ring-teal-900/5">
                  <s.icon className="size-[18px]" aria-hidden />
                </span>
                <div className="pt-1">
                  <h3 className="text-[16px] font-bold text-teal-950">{s.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-10 rounded-2xl border border-gold-400/40 bg-gold-200/30 px-5 py-4 text-[14px] leading-relaxed text-teal-900">
            <strong className="font-semibold">Please note:</strong> sending a request does not confirm an appointment. Our
            team will reply to confirm availability. For emergencies, please visit the nearest emergency department.
          </p>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="relative rounded-[28px] border border-white bg-white/90 p-6 shadow-lift backdrop-blur sm:p-10">
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="flex min-h-[460px] flex-col items-center justify-center text-center"
                  role="status"
                >
                  <span className="grid size-16 place-items-center rounded-full bg-mint-100 text-teal-700">
                    <CheckCircle2 className="size-8" aria-hidden />
                  </span>
                  <h3 className="mt-6 text-2xl font-semibold text-teal-950">Your request is ready in WhatsApp</h3>
                  <p className="mt-3 max-w-md text-[15.5px] leading-relaxed text-muted">
                    Press <strong>send</strong> in WhatsApp to share it with us. Your appointment is confirmed only once our
                    team replies with a time.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Button
                      onClick={() => window.open(whatsappLink(buildMessage(form)), "_blank", "noopener,noreferrer")}
                      icon={<MessageCircle className="size-4" aria-hidden />}
                    >
                      Open WhatsApp again
                    </Button>
                    <Button
                      variant="secondary"
                      icon={false}
                      onClick={() => {
                        setForm(empty);
                        setSent(false);
                      }}
                    >
                      New request
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  onSubmit={onSubmit}
                  noValidate
                  className="grid gap-5 sm:grid-cols-2"
                >
                  <Field label="Patient name" id={`${uid}-name`} error={errors.name}>
                    <input
                      {...ids("name")}
                      type="text"
                      autoComplete="name"
                      placeholder="Full name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className={inputCls(!!errors.name)}
                    />
                  </Field>
                  <Field label="Mobile number" id={`${uid}-mobile`} error={errors.mobile}>
                    <input
                      {...ids("mobile")}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="10-digit mobile"
                      value={form.mobile}
                      onChange={(e) => update("mobile", e.target.value)}
                      className={inputCls(!!errors.mobile)}
                    />
                  </Field>
                  <Field label="Department" id={`${uid}-department`} error={errors.department}>
                    <div className="relative">
                      <select
                        {...ids("department")}
                        value={form.department}
                        onChange={(e) => update("department", e.target.value as DepartmentId)}
                        className={cn(inputCls(!!errors.department), "appearance-none pr-10", !form.department && "text-muted/70")}
                      >
                        <option value="" disabled>
                          Choose department
                        </option>
                        {departments.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
                    </div>
                  </Field>
                  <Field label="Preferred doctor" id={`${uid}-doctor`} optional>
                    <div className="relative">
                      <select
                        {...ids("doctor")}
                        value={form.doctor}
                        onChange={(e) => update("doctor", e.target.value)}
                        className={cn(inputCls(), "appearance-none pr-10")}
                      >
                        <option value="">Any available doctor</option>
                        {availableDoctors.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name} · {d.speciality}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
                    </div>
                  </Field>
                  <Field label="Preferred date" id={`${uid}-date`} error={errors.date} optional>
                    <input
                      {...ids("date")}
                      type="date"
                      min={minDate}
                      onFocus={() => setMinDate(todayISO())}
                      onPointerDown={() => setMinDate(todayISO())}
                      value={form.date}
                      onChange={(e) => update("date", e.target.value)}
                      className={inputCls(!!errors.date)}
                    />
                  </Field>
                  <div className="hidden sm:block" />
                  <div className="sm:col-span-2">
                    <Field label="Message" id={`${uid}-message`} optional>
                      <textarea
                        {...ids("message")}
                        rows={4}
                        placeholder="Briefly describe the concern, or the child's age for paediatric visits"
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        className={cn(inputCls(), "h-auto resize-none py-3.5")}
                      />
                    </Field>
                  </div>
                  <div className="flex flex-col gap-4 pt-2 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[13px] leading-relaxed text-muted sm:max-w-xs">
                      Your details are sent only to the hospital through WhatsApp, and are not stored on this website.
                    </p>
                    <Button type="submit" className="h-14 px-7" icon={<MessageCircle className="size-4" aria-hidden />}>
                      Continue on WhatsApp
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
