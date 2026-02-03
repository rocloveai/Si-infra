import { createClient } from "@/lib/supabase/server";
import { PostList } from "@/components/PostList";

export default async function Web3Page() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, body_md, category_slug, user_id, created_at, updated_at, image_urls")
    .eq("category_slug", "web3")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
        Web3
      </h1>
      <p className="mt-2 text-[var(--text-muted)]">
        区块链与去中心化应用相关讨论。
      </p>
      <div className="mt-8">
        <PostList posts={posts ?? []} />
      </div>
    </div>
  );
}
