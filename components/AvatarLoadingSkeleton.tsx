export function AvatarLoadingSkeleton() {
  return (
    <div className="flex h-full w-full items-end justify-center">
      <div className="h-4/5 w-3/5 animate-pulse rounded-t-full bg-gradient-to-t from-gold/10 via-gold/5 to-transparent" />
    </div>
  );
}
