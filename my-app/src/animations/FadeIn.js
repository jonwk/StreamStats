'use client'

import { useEffect, useState } from 'react'

const FadeIn = ({ children, delay = 50, transitionDuration = 400, wrapperTag: WrapperTag = 'div', childTag: ChildTag = 'div', className, childClassName, visible = true, onComplete }) => {
  const [maxIsVisible, setMaxIsVisible] = useState(0)

  useEffect(() => {
    let count = React.Children.count(children)
    if (!visible) count = 0

    if (count === maxIsVisible) {
      const timeout = setTimeout(() => {
        if (onComplete) onComplete()
      }, transitionDuration)
      return () => clearTimeout(timeout)
    }

    const increment = count > maxIsVisible ? 1 : -1
    const timeout = setTimeout(() => {
      setMaxIsVisible(maxIsVisible + increment)
    }, delay)
    return () => clearTimeout(timeout)
  }, [children, delay, maxIsVisible, visible, transitionDuration, onComplete])

  return (
    <WrapperTag className={className}>
      {React.Children.map(children, (child, i) => (
        <ChildTag
          className={childClassName}
          style={{
            transition: `opacity ${transitionDuration}ms, transform ${transitionDuration}ms`,
            transform: maxIsVisible > i ? 'none' : 'translateY(20px)',
            opacity: maxIsVisible > i ? 1 : 0,
          }}
        >
          {child}
        </ChildTag>
      ))}
    </WrapperTag>
  )
}

export default FadeIn