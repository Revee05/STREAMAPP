'use client'

import { useParams } from 'next/navigation'
import Header from '@/app/components/Header/Header'
import styles from './WatchPage.module.css'
import { useState } from 'react'

export default function WatchPage() {
  const params = useParams()

  // Dummy content type: 'movie' or 'series'
  // For demonstration, let's assume series for now
  const contentType = 'series' // Change to 'movie' to test hiding dropdowns

  // Dummy data for seasons and episodes
  const seasons = [1, 2]
  const episodesPerSeason = 12

  // State to track which seasons are expanded
  const [expandedSeasons, setExpandedSeasons] = useState([]) // array of season numbers

  const toggleSeason = (season) => {
    if (expandedSeasons.includes(season)) {
      setExpandedSeasons(expandedSeasons.filter((s) => s !== season))
    } else {
      setExpandedSeasons([...expandedSeasons, season])
    }
  }

  // Generate episodes array
  const episodes = Array.from({ length: episodesPerSeason }, (_, i) => i + 1)

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

          {contentType === 'series' && (
            <div className={styles.seasonSelector}>
              {seasons.map((season) => (
                <div key={season} className={styles.seasonItem}>
                  <div
                    className={styles.seasonHeader}
                    onClick={() => toggleSeason(season)}
                    aria-expanded={expandedSeasons.includes(season)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        toggleSeason(season)
                      }
                    }}
                  >
                    Season {season}
                  </div>
                  {expandedSeasons.includes(season) && (
                    <ul className={styles.episodeList}>
                      {episodes.map((episode) => (
                        <li key={episode} className={styles.episodeItem}>
                          Episode {episode}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

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
