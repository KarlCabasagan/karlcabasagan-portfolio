import React from 'react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { Hero } from '../components/home/Hero'
import { QuickStats } from '../components/home/QuickStats'
import { FeaturedHighlights } from '../components/home/FeaturedHighlights'

export const Home: React.FC = () => {
  return (
    <PageWrapper>
      <Hero />
      <QuickStats />
      <FeaturedHighlights />
    </PageWrapper>
  )
}
