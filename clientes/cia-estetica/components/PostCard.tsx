import Image from 'next/image';
import Link from 'next/link';
import { cn, formatDateShort } from '@/lib/utils';
import type { BlogPost } from '@/data/blog';

/** Card de artigo do blog. */
export function PostCard({
  post,
  className,
  priority = false,
}: {
  post: BlogPost;
  className?: string;
  priority?: boolean;
}) {
  return (
    <article className={cn('group relative flex h-full flex-col', className)}>
      <div className="relative aspect-16/10 overflow-hidden bg-cream-deep">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 88vw, (max-width: 1024px) 45vw, 30vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        />
      </div>

      <div className="flex flex-1 flex-col pt-6">
        <div className="flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.18em]">
          <span className="text-champagne-deep">{post.category}</span>
          <span className="size-1 rounded-full bg-ink/20" aria-hidden="true" />
          <time dateTime={post.publishedAt} className="text-stone">
            {formatDateShort(post.publishedAt)}
          </time>
        </div>

        <h3 className="mt-4 text-[1.35rem] leading-snug transition-colors duration-500 group-hover:text-champagne-deep">
          <Link href={`/blog/${post.slug}`} className="before:absolute before:inset-0 before:content-['']">
            {post.title}
          </Link>
        </h3>

        <p className="mt-3 flex-1 text-[0.925rem] leading-relaxed text-ink-muted">{post.excerpt}</p>

        <span className="mt-5 text-[0.75rem] text-stone">{post.readingMinutes} min de leitura</span>
      </div>
    </article>
  );
}
