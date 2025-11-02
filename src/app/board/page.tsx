'use client';

import { Suspense } from 'react';
import ActionBoard from '@/components/action-board';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorBoundary } from '@/components/error-boundary';
import Walkthrough from '@/components/board/walkthrough';

function BoardSkeleton() {
  return (
    <div className="w-full">
      <div className="text-center mb-6 sm:mb-8">
        <Skeleton className="h-8 sm:h-10 w-24 sm:w-32 mx-auto mb-4" />
        <Skeleton className="h-3 sm:h-4 w-64 sm:w-96 mx-auto" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <div className="lg:col-span-2">
          <Skeleton className="h-48 sm:h-64 w-full" />
        </div>
        <div className="lg:col-span-1">
          <Skeleton className="h-48 sm:h-64 w-full" />
        </div>
      </div>
    </div>
  );
}

export default function BoardPage() {
  return (
    <ErrorBoundary>
      <Walkthrough />
      <div className="container mx-auto py-4 sm:py-6 lg:py-8 px-2 sm:px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<BoardSkeleton />}>
            <ActionBoard />
          </Suspense>
        </div>
      </div>
    </ErrorBoundary>
  );
}