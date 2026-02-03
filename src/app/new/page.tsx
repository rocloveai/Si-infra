import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { NewPostForm } from "./NewPostForm";

export default async function NewPostPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/new");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
        发帖
      </h1>
      <p className="mt-1 text-sm text-[var(--text-muted)]">
        支持 Markdown，可上传图片。
      </p>
      <NewPostForm />
    </div>
  );
}
