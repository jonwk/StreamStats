'use client'
import Link from 'next/link'
import { StyledGrid } from '~/styles'
import { getLink } from '~/util'

const PlaylistsGrid = ({ playlists, isDemo = false }) => (
  <div>
    {playlists && playlists.length > 0 ? (
      <StyledGrid>
        {playlists.map((playlist, index) => (
          <li className="grid__item" key={index}>
            <Link
              className="grid__item__inner"

              href={getLink(`/playlist?id=${playlist.id}`, isDemo)}
            >
              {playlist.images && playlist.images.length > 0 && playlist.images[0] && (
                <div className="grid__item__img">
                  <img src={playlist.images[0].url} alt={playlist.name} />
                </div>
              )}
              <h3 className="grid__item__name overflow-ellipsis">
                {playlist.name}
              </h3>
              <p className="grid__item__label">Playlist</p>
            </Link>
          </li>
        ))}
      </StyledGrid>
    ) : (
      <p className="empty-notice">No playlists available</p>
    )}
  </div>
)

export default PlaylistsGrid
