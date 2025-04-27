'use client'
import * as motion from "motion/react-client"

const MotionFade = ({ children, delay = 0, y = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

export default MotionFade