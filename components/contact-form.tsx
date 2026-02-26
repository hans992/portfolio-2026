"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PROJECT_TYPE_KEYS = [
  "ai_chatbot",
  "rag_system",
  "fullstack_webapp",
  "other",
] as const;

export function ContactForm() {
  const t = useTranslations("contactForm");
  const locale = useLocale();

  const contactSchema = useMemo(
    () =>
      z.object({
        name: z
          .string()
          .min(2, t("error_nameMin"))
          .max(100, t("error_nameMax")),
        email: z.string().email(t("error_email")),
        projectType: z.enum(PROJECT_TYPE_KEYS, {
          message: t("error_projectType"),
        }),
        message: z
          .string()
          .min(20, t("error_messageMin"))
          .max(2000, t("error_messageMax")),
      }),
    [locale, t]
  );

  type ContactFormValues = z.infer<typeof contactSchema>;

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      projectType: undefined,
      message: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: ContactFormValues) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(data.error ?? t("toast_error"));
        return;
      }

      toast.success(t("toast_success"));
      form.reset();
    } catch {
      toast.error(t("toast_errorSend"));
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 rounded-2xl border border-border/60 bg-card/50 p-6 shadow-lg backdrop-blur-sm sm:p-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("nameLabel")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("namePlaceholder")}
                  autoComplete="name"
                  disabled={isSubmitting}
                  className="bg-background"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("emailLabel")}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  autoComplete="email"
                  disabled={isSubmitting}
                  className="bg-background"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("projectTypeLabel")}</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder={t("projectTypePlaceholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PROJECT_TYPE_KEYS.map((key) => (
                    <SelectItem key={key} value={key}>
                      {t(`projectType_${key}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("messageLabel")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("messagePlaceholder")}
                  className="min-h-[140px] resize-y bg-background"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? t("sending") : t("submit")}
        </Button>
      </form>
    </Form>
  );
}
