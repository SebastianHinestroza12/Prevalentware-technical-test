import ContentLoader from 'react-content-loader';

interface TableSkeletonProps {
  rows?: number;
  className?: string;
}

export const TableSkeleton = ({
  rows = 4,
  className = '',
}: TableSkeletonProps) => (
  <div className={`w-full ${className}`}>
    {/* Header Title */}
    <div className='mb-6'>
      <ContentLoader
        speed={2}
        width={300}
        height={32}
        viewBox='0 0 300 32'
        backgroundColor='#f3f4f6'
        foregroundColor='#e5e7eb'
        className='rounded'
      >
        <rect x='0' y='0' rx='4' ry='4' width='250' height='32' />
      </ContentLoader>
    </div>

    {/* Table */}
    <div className='border border-gray-200 rounded-lg overflow-hidden bg-white'>
      {/* Table Header */}
      <div className='bg-gray-50 border-b border-gray-200 p-4'>
        <ContentLoader
          speed={2}
          width='100%'
          height={20}
          viewBox='0 0 1000 20'
          backgroundColor='#f9fafb'
          foregroundColor='#f3f4f6'
        >
          <rect x='0' y='0' rx='3' ry='3' width='80' height='16' />
          <rect x='200' y='0' rx='3' ry='3' width='60' height='16' />
          <rect x='400' y='0' rx='3' ry='3' width='70' height='16' />
          <rect x='600' y='0' rx='3' ry='3' width='40' height='16' />
          <rect x='800' y='0' rx='3' ry='3' width='80' height='16' />
        </ContentLoader>
      </div>

      {/* Table Rows */}
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className='border-b border-gray-100 last:border-b-0 p-4'
        >
          <ContentLoader
            speed={2}
            width='100%'
            height={24}
            viewBox='0 0 1000 24'
            backgroundColor='#f9fafb'
            foregroundColor='#f3f4f6'
          >
            <rect x='0' y='4' rx='3' ry='3' width='120' height='16' />

            <rect x='200' y='4' rx='3' ry='3' width='180' height='16' />

            <rect x='400' y='4' rx='3' ry='3' width='100' height='16' />

            <rect
              x='600'
              y='4'
              rx='12'
              ry='12'
              width={index % 2 === 0 ? '90' : '60'}
              height='16'
            />

            <rect x='820' y='4' rx='2' ry='2' width='20' height='16' />
          </ContentLoader>
        </div>
      ))}
    </div>
  </div>
);
