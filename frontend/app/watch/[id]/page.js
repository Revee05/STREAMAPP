'use client'

import { useParams } from 'next/navigation'
import Header from '@/app/components/Header/Header'
import styles from './WatchPage.module.css'

export default function WatchPage() {
  const params = useParams()

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <Header/>
      {/* Ads Section */}
      <div className={styles.adsSection}>
        <span className="text-gray-500">Ads Section</span>
      </div>

      {/* Main Content Grid */}
      <div className={styles.mainGrid}>
        {/* Left Column - Video and Details */}
        <div className={styles.videoColumn}>
          <div className={styles.videoPlayer}>
            Video Player
          </div>

          <div className={styles.episodeSelector}>
            <span>Season 2 - Episode 7</span>
          </div>

          <div className={styles.detailInfo}>
            <h2 className={styles.detailTitle}>Detail Information</h2>
            <p className={styles.detailText}>Video details and description will go here</p>
          </div>
        </div>

        {/* Right Column - Comments and Ads */}
        <div className={styles.commentColumn}>
          <div className={styles.comments}>
            <h3 className="font-semibold mb-2">Komen Section</h3>
            <div className="text-sm text-gray-600">Comments will appear here</div>
          </div>

          <div className={styles.sideAds}>
            <span className="text-gray-500">Ads Section</span>
          </div>
        </div>
      </div>
    </div>
  )
}
