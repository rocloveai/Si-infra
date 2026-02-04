import { NewPostForm } from "./NewPostForm";

export default function NewPostPage() {
  return (
    <div className="bg-brand-cream min-h-screen py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="rounded-3xl bg-white p-8 shadow-xl shadow-brand-brown/5 sm:p-12">
          <h1 className="font-serif text-3xl font-semibold text-brand-coffee">
            发布新内容
          </h1>
          <p className="mt-2 text-sm text-brand-coffee/50 uppercase tracking-widest font-bold">
            Share your thoughts with the world
          </p>
          <div className="mt-10">
            <NewPostForm />
          </div>
        </div>
      </div>
    </div>
  );
}
