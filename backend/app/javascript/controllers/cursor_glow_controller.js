import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["glow", "cursor", "cursorImage"]
  static values = { defaultSrc: String, hoverSrc: String }

  connect() {
    this._initializeState()
    this._setupListeners()
    this._updateImageSource()
    this.tick()
  }

  disconnect() {
    window.removeEventListener("mousemove", this.onMove)
    document.removeEventListener("mouseover", this.onOver, true)
    cancelAnimationFrame(this.rafId)
  }

  // --- Logic ---

  _initializeState() {
    this.smoothX = 0
    this.smoothY = 0
    this.targetX = 0
    this.targetY = 0
    this.prevX = 0
    this.rotate = 0
    this.hovering = false
    
    // Ensure elements are at the top
    const zIndex = "9999"
    if (this.hasCursorTarget) this.cursorTarget.style.zIndex = zIndex
    if (this.hasGlowTarget) this.glowTarget.style.zIndex = (zIndex - 1).toString()
  }

  _setupListeners() {
    // Binding here or using arrow functions keeps the disconnect clean
    this.onMove = this.onMove.bind(this)
    this.onOver = this.onOver.bind(this)
    
    window.addEventListener("mousemove", this.onMove)
    document.addEventListener("mouseover", this.onOver, true)
  }

  onMove = (event) => {
    this.targetX = event.clientX
    this.targetY = event.clientY
  }

  onOver = (event) => {
    const isPointer = window.getComputedStyle(event.target).cursor === "pointer"
    const isInteractive = event.target.closest("a, button, [role='button'], input, select, textarea")
    
    this.hovering = Boolean(isPointer || isInteractive)
    this._updateImageSource()
  }

  _updateImageSource() {
    if (!this.hasCursorImageTarget) return
    const fallback = "/icon.png"
    this.cursorImageTarget.src = this.hovering 
      ? (this.hoverSrcValue || fallback) 
      : (this.defaultSrcValue || fallback)
  }

  tick() {
    // Physics
    this.smoothX += (this.targetX - this.smoothX) * 0.18
    this.smoothY += (this.targetY - this.smoothY) * 0.18
    
    const velocityX = this.targetX - this.prevX
    this.prevX = this.targetX
    this.rotate += (velocityX / 50 - this.rotate) * 0.15

    this._render()
    this.rafId = requestAnimationFrame(() => this.tick())
  }

  _render() {
    if (this.hasGlowTarget) {
      const alpha = this.hovering ? 0.2 : 0.1
      this.glowTarget.style.background = `radial-gradient(800px at ${this.smoothX}px ${this.smoothY}px, rgba(250, 92, 92, ${alpha}), transparent 80%)`
    }

    if (this.hasCursorTarget) {
      const size = this.hovering ? 64 : 48
      const transform = `translate3d(${this.smoothX}px, ${this.smoothY}px, 0) translate(-50%, -50%) rotate(${this.rotate}deg)`
      
      Object.assign(this.cursorTarget.style, {
        width: `${size}px`,
        height: `${size}px`,
        transform: transform
      })
    }
  }
}

