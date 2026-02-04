import { NewPostForm } from "./NewPostForm";

export default function NewPostPage() {
  return (
    <div className="bg-brand-cream min-h-screen py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="rounded-3xl bg-white p-8 shadow-xl sm:p-12">
          <h1 className="font-display text-3xl font-bold text-brand-dark sm:text-4xl">
            发布新文章
          </h1>
          <p className="mt-3 text-base text-brand-muted">
            分享你的想法和见解
          </p>
          <div className="mt-10">
            <NewPostForm />
          </div>
        </div>
      </div>
    </div>
  );
}
