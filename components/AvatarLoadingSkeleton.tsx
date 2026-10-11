export function AvatarLoadingSkeleton() {
  return (
    <div className="flex h-full w-full items-end justify-center">
      <div className="h-4/5 w-3/5 animate-pulse rounded-t-full bg-gradient-to-t from-accent/10 via-accent/5 to-transparent" />
    </div>
  );
}
