import { useEffect, useRef, useState } from 'react'

type Options = { threshold?: number; rootMargin?: string }

export function useInView<T extends Element>({
  threshold = 0.15,
  rootMargin = '0px 0px -8% 0px',
}: Options = {}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // navegador sem suporte: mostra tudo direto
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, rootMargin])

  return { ref, inView }
}
