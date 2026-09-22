import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'


export default function MagneticButton({ children, className = '', strength = 16, as = 'a', ...props }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const shouldReduceMotion = useReducedMotion()

  function handleMouseMove(e) {
    if (shouldReduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    setPos({ x: (relX / rect.width) * strength, y: (relY / rect.height) * strength })
  }

  function handleMouseLeave() {
    setPos({ x: 0, y: 0 })
  }

  const MotionTag = motion[as] ?? motion.a

  return (
    <MotionTag
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 12, mass: 0.4 }}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  )
}