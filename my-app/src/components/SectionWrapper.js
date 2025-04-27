'use client'
import Link from 'next/link'
import { StyledSection } from '~/styles'
import { getLink } from '~/util'

const SectionWrapper = ({ children, title, seeAllLink, breadcrumb, isDemo = false }) => (
  <StyledSection>
    <div className="section__inner">
      <div className="section__top">
        <h2 className="section__heading">
          {breadcrumb && (
            <span className="section__breadcrumb">
              <Link href={getLink('/profile', isDemo)}>Profile</Link>
            </span>
          )}

          {title && (
            <div>
              {seeAllLink ? (
                <Link href={seeAllLink}>{title}</Link>
              ) : (
                <span>{title}</span>
              )}
            </div>
          )}
        </h2>
        {seeAllLink && (
          <Link href={seeAllLink} className="section__see-all">
            See All
          </Link>
        )}
      </div>

      {children}
    </div>
  </StyledSection>
)

export default SectionWrapper
