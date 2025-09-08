import ContentLoader from 'react-content-loader';

export const ReportsSkeleton = () => (
  <div className='space-y-8 p-6'>
    {/* Header Skeleton */}
    <ContentLoader
      speed={2}
      width={900}
      height={80}
      viewBox='0 0 900 80'
      backgroundColor='#f3f4f6'
      foregroundColor='#e5e7eb'
      className='w-full'
    >
      {/* Icon */}
      <rect x='0' y='10' rx='4' ry='4' width='32' height='32' />
      {/* Title */}
      <rect x='45' y='10' rx='4' ry='4' width='280' height='24' />
      {/* Subtitle */}
      <rect x='45' y='45' rx='4' ry='4' width='350' height='16' />
      {/* Export Button */}
      <rect x='750' y='15' rx='8' ry='8' width='120' height='40' />
    </ContentLoader>

    {/* KPI Cards Skeleton */}
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      {[...Array(4)].map((_, index) => (
        <ContentLoader
          key={index}
          speed={2}
          width={280}
          height={120}
          viewBox='0 0 280 120'
          backgroundColor='#f3f4f6'
          foregroundColor='#e5e7eb'
          className='w-full'
        >
          {/* Card Background */}
          <rect x='0' y='0' rx='12' ry='12' width='280' height='120' />
          {/* Icon */}
          <rect x='20' y='20' rx='6' ry='6' width='24' height='24' />
          {/* Title */}
          <rect x='20' y='55' rx='4' ry='4' width='120' height='16' />
          {/* Value */}
          <rect x='20' y='80' rx='4' ry='4' width='100' height='20' />
          {/* Subtitle */}
          <rect x='20' y='105' rx='4' ry='4' width='80' height='12' />
        </ContentLoader>
      ))}
    </div>

    {/* Charts Skeleton */}
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
      {/* Bar Chart Skeleton */}
      <ContentLoader
        speed={2}
        width={450}
        height={400}
        viewBox='0 0 450 400'
        backgroundColor='#f3f4f6'
        foregroundColor='#e5e7eb'
        className='w-full'
      >
        {/* Card Background */}
        <rect x='0' y='0' rx='12' ry='12' width='450' height='400' />
        {/* Icon */}
        <rect x='20' y='20' rx='4' ry='4' width='24' height='24' />
        {/* Chart Title */}
        <rect x='55' y='25' rx='4' ry='4' width='180' height='16' />

        {/* Y-axis labels */}
        <rect x='20' y='70' rx='2' ry='2' width='40' height='12' />
        <rect x='20' y='110' rx='2' ry='2' width='50' height='12' />
        <rect x='20' y='150' rx='2' ry='2' width='45' height='12' />
        <rect x='20' y='190' rx='2' ry='2' width='40' height='12' />
        <rect x='20' y='230' rx='2' ry='2' width='35' height='12' />
        <rect x='20' y='270' rx='2' ry='2' width='25' height='12' />

        {/* Bars */}
        <rect x='100' y='80' rx='4' ry='4' width='80' height='190' />
        <rect x='200' y='220' rx='4' ry='4' width='80' height='50' />

        {/* X-axis labels */}
        <rect x='120' y='290' rx='2' ry='2' width='60' height='12' />
        <rect x='220' y='290' rx='2' ry='2' width='50' height='12' />

        {/* Legend */}
        <rect x='120' y='320' rx='2' ry='2' width='12' height='12' />
        <rect x='140' y='322' rx='2' ry='2' width='40' height='8' />
      </ContentLoader>

      {/* Pie Chart Skeleton */}
      <ContentLoader
        speed={2}
        width={450}
        height={400}
        viewBox='0 0 450 400'
        backgroundColor='#f3f4f6'
        foregroundColor='#e5e7eb'
        className='w-full'
      >
        {/* Card Background */}
        <rect x='0' y='0' rx='12' ry='12' width='450' height='400' />
        {/* Icon */}
        <rect x='20' y='20' rx='4' ry='4' width='24' height='24' />
        {/* Chart Title */}
        <rect x='55' y='25' rx='4' ry='4' width='200' height='16' />

        {/* Pie Chart Circle */}
        <circle cx='225' cy='180' r='80' />

        {/* Legend items */}
        <rect x='320' y='140' rx='2' ry='2' width='12' height='12' />
        <rect x='340' y='142' rx='2' ry='2' width='60' height='8' />
        <rect x='320' y='165' rx='2' ry='2' width='12' height='12' />
        <rect x='340' y='167' rx='2' ry='2' width='50' height='8' />

        {/* Percentage labels */}
        <rect x='320' y='200' rx='2' ry='2' width='40' height='12' />
        <rect x='320' y='220' rx='2' ry='2' width='35' height='12' />
      </ContentLoader>
    </div>
  </div>
);
