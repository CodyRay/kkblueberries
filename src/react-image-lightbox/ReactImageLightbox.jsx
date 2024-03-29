/*
 * react-image-lightbox
 * Copyright 2016 Chris Fritz All rights reserved.
 * @license Open source under the MIT License
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import {
  translate,
  getWindowWidth,
  getWindowHeight,
  isInSameOriginIframe,
  getIEVersion,
} from './util'
import {
  KEYS,
  MIN_ZOOM_LEVEL,
  MAX_ZOOM_LEVEL,
  ZOOM_RATIO,
  WHEEL_MOVE_X_THRESHOLD,
  WHEEL_MOVE_Y_THRESHOLD,
  ZOOM_BUTTON_INCREMENT_SIZE,
  ACTION_NONE,
  ACTION_MOVE,
  ACTION_SWIPE,
  ACTION_PINCH,
  SOURCE_ANY,
  SOURCE_MOUSE,
  SOURCE_TOUCH,
  SOURCE_POINTER,
  MIN_SWIPE_DISTANCE,
} from './constant'

// Add fallback classes for browsers without flexbox support
const _ieVersion = getIEVersion()

export class ReactImageLightbox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      //-----------------------------
      // Animation
      //-----------------------------

      // Lightbox is closing
      // When Lightbox is mounted, if animation is enabled it will open with the reverse of the closing animation
      isClosing: !props.animationDisabled,

      // Component parts should animate (e.g., when images are moving, or image is being zoomed)
      shouldAnimate: false,

      //-----------------------------
      // Zoom settings
      //-----------------------------
      // Zoom level of image
      zoomLevel: MIN_ZOOM_LEVEL,

      //-----------------------------
      // Image position settings
      //-----------------------------
      // Horizontal offset from center
      offsetX: 0,

      // Vertical offset from center
      offsetY: 0,
    }

    this.closeIfClickInner = this.closeIfClickInner.bind(this)
    this.handleImageDoubleClick = this.handleImageDoubleClick.bind(this)
    this.handleImageMouseWheel = this.handleImageMouseWheel.bind(this)
    this.handleKeyInput = this.handleKeyInput.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleOuterMousewheel = this.handleOuterMousewheel.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
    this.handlePointerEvent = this.handlePointerEvent.bind(this)
    this.handleCaptionMousewheel = this.handleCaptionMousewheel.bind(this)
    this.handleWindowResize = this.handleWindowResize.bind(this)
    this.handleZoomInButtonClick = this.handleZoomInButtonClick.bind(this)
    this.handleZoomOutButtonClick = this.handleZoomOutButtonClick.bind(this)
    this.requestClose = this.requestClose.bind(this)
    this.requestMoveNext = this.requestMoveNext.bind(this)
    this.requestMovePrev = this.requestMovePrev.bind(this)
  }

  componentWillMount() {
    // Timeouts - always clear it before umount
    this.timeouts = []

    // Current action
    this.currentAction = ACTION_NONE

    // Events source
    this.eventsSource = SOURCE_ANY

    // Empty pointers list
    this.pointerList = []

    // Prevent inner close
    this.preventInnerClose = false
    this.preventInnerCloseTimeout = null

    // Whether event listeners for keyboard and mouse input have been attached or not
    this.listenersAttached = false

    // Used to disable animation when changing props.mainSrc|nextSrc|prevSrc
    this.keyPressed = false

    // Used to store load state / dimensions of images
    this.imageCache = {}

    // Time the last keydown event was called (used in keyboard action rate limiting)
    this.lastKeyDownTime = 0

    // Used for debouncing window resize event
    this.resizeTimeout = null

    // Used to determine when actions are triggered by the scroll wheel
    this.wheelActionTimeout = null
    this.resetScrollTimeout = null
    this.scrollX = 0
    this.scrollY = 0

    // Used in panning zoomed images
    this.moveStartX = 0
    this.moveStartY = 0
    this.moveStartOffsetX = 0
    this.moveStartOffsetY = 0

    // Used to swipe
    this.swipeStartX = 0
    this.swipeStartY = 0
    this.swipeEndX = 0
    this.swipeEndY = 0

    // Used to pinch
    this.pinchTouchList = null
    this.pinchDistance = 0

    // Used to differentiate between images with identical src
    this.keyCounter = 0

    // Used to detect a move when all src's remain unchanged (four or more of the same image in a row)
    this.moveRequested = false

    if (!this.props.animationDisabled) {
      // Make opening animation play
      this.setState({ isClosing: false })
    }
  }

  componentDidMount() {
    this.mounted = true
    this.attachListeners()

    this.loadAllImages()
  }

  shouldComponentUpdate() {
    // Wait for move...
    return !this.moveRequested
  }

  componentWillReceiveProps(nextProps) {
    // Iterate through the source types for prevProps and nextProps to
    //  determine if any of the sources changed
    let sourcesChanged = false
    const prevSrcDict = {}
    const nextSrcDict = {}
    this.getSrcTypes().forEach((srcType) => {
      if (this.props[srcType.name] !== nextProps[srcType.name]) {
        sourcesChanged = true

        prevSrcDict[this.props[srcType.name]] = true
        nextSrcDict[nextProps[srcType.name]] = true
      }
    })

    if (sourcesChanged || this.moveRequested) {
      // Reset the loaded state for images not rendered next
      Object.keys(prevSrcDict).forEach((prevSrc) => {
        if (!(prevSrc in nextSrcDict) && prevSrc in this.imageCache) {
          this.imageCache[prevSrc].loaded = false
        }
      })

      this.moveRequested = false

      // Load any new images
      this.loadAllImages(nextProps)
    }
  }

  componentWillUnmount() {
    this.mounted = false
    this.detachListeners()
    this.timeouts.forEach((tid) => clearTimeout(tid))
  }

  setTimeout(func, time) {
    const id = setTimeout(() => {
      this.timeouts = this.timeouts.filter((tid) => tid !== id)
      func()
    }, time)
    this.timeouts.push(id)
    return id
  }

  clearTimeout(id) {
    this.timeouts = this.timeouts.filter((tid) => tid !== id)
    clearTimeout(id)
  }

  // Attach key and mouse input events
  attachListeners() {
    if (!this.listenersAttached && typeof window !== 'undefined') {
      window.addEventListener('resize', this.handleWindowResize)
      window.addEventListener('mouseup', this.handleMouseUp)
      window.addEventListener('touchend', this.handleTouchEnd)
      window.addEventListener('touchcancel', this.handleTouchEnd)
      window.addEventListener('pointerdown', this.handlePointerEvent)
      window.addEventListener('pointermove', this.handlePointerEvent)
      window.addEventListener('pointerup', this.handlePointerEvent)
      window.addEventListener('pointercancel', this.handlePointerEvent)
      // Have to add an extra mouseup handler to catch mouseup events outside of the window
      //  if the page containing the lightbox is displayed in an iframe
      if (isInSameOriginIframe()) {
        window.top.addEventListener('mouseup', this.handleMouseUp)
        window.top.addEventListener('touchend', this.handleTouchEnd)
        window.top.addEventListener('touchcancel', this.handleTouchEnd)
        window.top.addEventListener('pointerdown', this.handlePointerEvent)
        window.top.addEventListener('pointermove', this.handlePointerEvent)
        window.top.addEventListener('pointerup', this.handlePointerEvent)
        window.top.addEventListener('pointercancel', this.handlePointerEvent)
      }

      this.listenersAttached = true
    }
  }

  // Change zoom level
  changeZoom(zoomLevel, clientX, clientY) {
    // Ignore if zoom disabled
    if (!this.props.enableZoom) {
      return
    }

    // Constrain zoom level to the set bounds
    const nextZoomLevel = Math.max(
      MIN_ZOOM_LEVEL,
      Math.min(MAX_ZOOM_LEVEL, zoomLevel)
    )

    // Ignore requests that don't change the zoom level
    if (nextZoomLevel === this.state.zoomLevel) {
      return
    } else if (nextZoomLevel === MIN_ZOOM_LEVEL) {
      // Snap back to center if zoomed all the way out
      return this.setState({
        zoomLevel: nextZoomLevel,
        offsetX: 0,
        offsetY: 0,
      })
    }

    const imageBaseSize = this.getBestImageForType('mainSrc')
    if (imageBaseSize === null) {
      return
    }

    const currentZoomMultiplier = this.getZoomMultiplier()
    const nextZoomMultiplier = this.getZoomMultiplier(nextZoomLevel)

    // Default to the center of the image to zoom when no mouse position specified
    const boxRect = this.getLightboxRect()
    const pointerX =
      typeof clientX !== 'undefined'
        ? clientX - boxRect.left
        : boxRect.width / 2
    const pointerY =
      typeof clientY !== 'undefined'
        ? clientY - boxRect.top
        : boxRect.height / 2

    const currentImageOffsetX =
      (boxRect.width - imageBaseSize.width * currentZoomMultiplier) / 2
    const currentImageOffsetY =
      (boxRect.height - imageBaseSize.height * currentZoomMultiplier) / 2

    const currentImageRealOffsetX = currentImageOffsetX - this.state.offsetX
    const currentImageRealOffsetY = currentImageOffsetY - this.state.offsetY

    const currentPointerXRelativeToImage =
      (pointerX - currentImageRealOffsetX) / currentZoomMultiplier
    const currentPointerYRelativeToImage =
      (pointerY - currentImageRealOffsetY) / currentZoomMultiplier

    const nextImageRealOffsetX =
      pointerX - currentPointerXRelativeToImage * nextZoomMultiplier
    const nextImageRealOffsetY =
      pointerY - currentPointerYRelativeToImage * nextZoomMultiplier

    const nextImageOffsetX =
      (boxRect.width - imageBaseSize.width * nextZoomMultiplier) / 2
    const nextImageOffsetY =
      (boxRect.height - imageBaseSize.height * nextZoomMultiplier) / 2

    let nextOffsetX = nextImageOffsetX - nextImageRealOffsetX
    let nextOffsetY = nextImageOffsetY - nextImageRealOffsetY

    // When zooming out, limit the offset so things don't get left askew
    if (this.currentAction !== ACTION_PINCH) {
      const maxOffsets = this.getMaxOffsets()
      if (this.state.zoomLevel > nextZoomLevel) {
        nextOffsetX = Math.max(
          maxOffsets.minX,
          Math.min(maxOffsets.maxX, nextOffsetX)
        )
        nextOffsetY = Math.max(
          maxOffsets.minY,
          Math.min(maxOffsets.maxY, nextOffsetY)
        )
      }
    }

    this.setState({
      zoomLevel: nextZoomLevel,
      offsetX: nextOffsetX,
      offsetY: nextOffsetY,
    })
  }

  closeIfClickInner(event) {
    if (
      !this.preventInnerClose &&
      event.target.className.search(/\bril-inner\b/) > -1
    ) {
      this.requestClose(event)
    }
  }

  setPreventInnerClose() {
    if (this.preventInnerCloseTimeout) {
      this.clearTimeout(this.preventInnerCloseTimeout)
    }
    this.preventInnerClose = true
    this.preventInnerCloseTimeout = this.setTimeout(() => {
      this.preventInnerClose = false
      this.preventInnerCloseTimeout = null
    }, 100)
  }

  // Detach key and mouse input events
  detachListeners() {
    if (this.listenersAttached) {
      window.removeEventListener('resize', this.handleWindowResize)
      window.removeEventListener('mouseup', this.handleMouseUp)
      window.removeEventListener('touchend', this.handleTouchEnd)
      window.removeEventListener('touchcancel', this.handleTouchEnd)
      window.removeEventListener('pointerdown', this.handlePointerEvent)
      window.removeEventListener('pointermove', this.handlePointerEvent)
      window.removeEventListener('pointerup', this.handlePointerEvent)
      window.removeEventListener('pointercancel', this.handlePointerEvent)
      if (isInSameOriginIframe()) {
        window.top.removeEventListener('mouseup', this.handleMouseUp)
        window.top.removeEventListener('touchend', this.handleTouchEnd)
        window.top.removeEventListener('touchcancel', this.handleTouchEnd)
        window.top.removeEventListener('pointerdown', this.handlePointerEvent)
        window.top.removeEventListener('pointermove', this.handlePointerEvent)
        window.top.removeEventListener('pointerup', this.handlePointerEvent)
        window.top.removeEventListener('pointercancel', this.handlePointerEvent)
      }

      this.listenersAttached = false
    }
  }

  // Get info for the best suited image to display with the given srcType
  getBestImageForType(srcType) {
    let imageSrc = this.props[srcType]
    let fitSizes = {}

    if (this.isImageLoaded(imageSrc)) {
      // Use full-size image if available
      fitSizes = this.getFitSizes(
        this.imageCache[imageSrc].width,
        this.imageCache[imageSrc].height
      )
    } else if (this.isImageLoaded(this.props[`${srcType}Thumbnail`])) {
      // Fall back to using thumbnail if the image has not been loaded
      imageSrc = this.props[`${srcType}Thumbnail`]
      fitSizes = this.getFitSizes(
        this.imageCache[imageSrc].width,
        this.imageCache[imageSrc].height,
        true
      )
    } else {
      return null
    }

    return {
      src: imageSrc,
      height: fitSizes.height,
      width: fitSizes.width,
    }
  }

  // Get sizing for when an image is larger than the window
  getFitSizes(width, height, stretch) {
    const boxSize = this.getLightboxRect()
    let maxHeight = boxSize.height - this.props.imagePadding * 2
    let maxWidth = boxSize.width - this.props.imagePadding * 2

    if (!stretch) {
      maxHeight = Math.min(maxHeight, height)
      maxWidth = Math.min(maxWidth, width)
    }

    const maxRatio = maxWidth / maxHeight
    const srcRatio = width / height

    if (maxRatio > srcRatio) {
      // height is the constraining dimension of the photo
      return {
        width: (width * maxHeight) / height,
        height: maxHeight,
      }
    }

    return {
      width: maxWidth,
      height: (height * maxWidth) / width,
    }
  }

  getMaxOffsets(zoomLevel = this.state.zoomLevel) {
    const currentImageInfo = this.getBestImageForType('mainSrc')
    if (currentImageInfo === null) {
      return { maxX: 0, minX: 0, maxY: 0, minY: 0 }
    }

    const boxSize = this.getLightboxRect()
    const zoomMultiplier = this.getZoomMultiplier(zoomLevel)

    let maxX = 0
    if (zoomMultiplier * currentImageInfo.width - boxSize.width < 0) {
      // if there is still blank space in the X dimension, don't limit except to the opposite edge
      maxX = (boxSize.width - zoomMultiplier * currentImageInfo.width) / 2
    } else {
      maxX = (zoomMultiplier * currentImageInfo.width - boxSize.width) / 2
    }

    let maxY = 0
    if (zoomMultiplier * currentImageInfo.height - boxSize.height < 0) {
      // if there is still blank space in the Y dimension, don't limit except to the opposite edge
      maxY = (boxSize.height - zoomMultiplier * currentImageInfo.height) / 2
    } else {
      maxY = (zoomMultiplier * currentImageInfo.height - boxSize.height) / 2
    }

    return {
      maxX,
      maxY,
      minX: -1 * maxX,
      minY: -1 * maxY,
    }
  }

  // Get image src types
  getSrcTypes() {
    return [
      {
        name: 'mainSrc',
        keyEnding: `i${this.keyCounter}`,
      },
      {
        name: 'mainSrcThumbnail',
        keyEnding: `t${this.keyCounter}`,
      },
      {
        name: 'nextSrc',
        keyEnding: `i${this.keyCounter + 1}`,
      },
      {
        name: 'nextSrcThumbnail',
        keyEnding: `t${this.keyCounter + 1}`,
      },
      {
        name: 'prevSrc',
        keyEnding: `i${this.keyCounter - 1}`,
      },
      {
        name: 'prevSrcThumbnail',
        keyEnding: `t${this.keyCounter - 1}`,
      },
    ]
  }

  /**
   * Get sizing when the image is scaled
   */
  getZoomMultiplier(zoomLevel = this.state.zoomLevel) {
    return ZOOM_RATIO ** zoomLevel
  }

  /**
   * Get the size of the lightbox in pixels
   */
  getLightboxRect() {
    if (this.outerEl) {
      return this.outerEl.getBoundingClientRect()
    }

    return {
      width: getWindowWidth(),
      height: getWindowHeight(),
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    }
  }

  /**
   * Handle user keyboard actions
   */
  handleKeyInput(event) {
    event.stopPropagation()

    // Ignore key input during animations
    if (this.isAnimating()) {
      return
    }

    // Allow slightly faster navigation through the images when user presses keys repeatedly
    if (event.type === 'keyup') {
      this.lastKeyDownTime -= this.props.keyRepeatKeyupBonus
      return
    }

    const keyCode = event.which || event.keyCode

    // Ignore key presses that happen too close to each other (when rapid fire key pressing or holding down the key)
    // But allow it if it's a lightbox closing action
    const currentTime = new Date()
    if (
      currentTime.getTime() - this.lastKeyDownTime <
        this.props.keyRepeatLimit &&
      keyCode !== KEYS.ESC
    ) {
      return
    }
    this.lastKeyDownTime = currentTime.getTime()

    switch (keyCode) {
      // ESC key closes the lightbox
      case KEYS.ESC:
        event.preventDefault()
        this.requestClose(event)
        break

      // Left arrow key moves to previous image
      case KEYS.LEFT_ARROW:
        if (!this.props.prevSrc) {
          return
        }

        event.preventDefault()
        this.keyPressed = true
        this.requestMovePrev(event)
        break

      // Right arrow key moves to next image
      case KEYS.RIGHT_ARROW:
        if (!this.props.nextSrc) {
          return
        }

        event.preventDefault()
        this.keyPressed = true
        this.requestMoveNext(event)
        break

      default:
    }
  }

  /**
   * Handle a mouse wheel event over the lightbox container
   */
  handleOuterMousewheel(event) {
    // Prevent scrolling of the background
    event.preventDefault()
    event.stopPropagation()

    const xThreshold = WHEEL_MOVE_X_THRESHOLD
    let actionDelay = 0
    const imageMoveDelay = 500

    this.clearTimeout(this.resetScrollTimeout)
    this.resetScrollTimeout = this.setTimeout(() => {
      this.scrollX = 0
      this.scrollY = 0
    }, 300)

    // Prevent rapid-fire zoom behavior
    if (this.wheelActionTimeout !== null || this.isAnimating()) {
      return
    }

    if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) {
      // handle horizontal scrolls with image moves
      this.scrollY = 0
      this.scrollX += event.deltaX

      const bigLeapX = xThreshold / 2
      // If the scroll amount has accumulated sufficiently, or a large leap was taken
      if (this.scrollX >= xThreshold || event.deltaX >= bigLeapX) {
        // Scroll right moves to next
        this.requestMoveNext(event)
        actionDelay = imageMoveDelay
        this.scrollX = 0
      } else if (
        this.scrollX <= -1 * xThreshold ||
        event.deltaX <= -1 * bigLeapX
      ) {
        // Scroll left moves to previous
        this.requestMovePrev(event)
        actionDelay = imageMoveDelay
        this.scrollX = 0
      }
    }

    // Allow successive actions after the set delay
    if (actionDelay !== 0) {
      this.wheelActionTimeout = this.setTimeout(() => {
        this.wheelActionTimeout = null
      }, actionDelay)
    }
  }

  handleImageMouseWheel(event) {
    event.preventDefault()
    const yThreshold = WHEEL_MOVE_Y_THRESHOLD

    if (Math.abs(event.deltaY) >= Math.abs(event.deltaX)) {
      event.stopPropagation()
      // If the vertical scroll amount was large enough, perform a zoom
      if (Math.abs(event.deltaY) < yThreshold) {
        return
      }

      this.scrollX = 0
      this.scrollY += event.deltaY

      this.changeZoom(
        this.state.zoomLevel - event.deltaY,
        event.clientX,
        event.clientY
      )
    }
  }

  /**
   * Handle a double click on the current image
   */
  handleImageDoubleClick(event) {
    if (this.state.zoomLevel > MIN_ZOOM_LEVEL) {
      // A double click when zoomed in zooms all the way out
      this.changeZoom(MIN_ZOOM_LEVEL, event.clientX, event.clientY)
    } else {
      // A double click when zoomed all the way out zooms in
      this.changeZoom(
        this.state.zoomLevel + ZOOM_BUTTON_INCREMENT_SIZE,
        event.clientX,
        event.clientY
      )
    }
  }

  static isTargetMatchImage(target) {
    return target && /ril-image-current/.test(target.className)
  }

  shouldHandleEvent(source) {
    if (this.eventsSource === source) {
      return true
    }
    if (this.eventsSource === SOURCE_ANY) {
      this.eventsSource = source
      return true
    }
    switch (source) {
      case SOURCE_MOUSE:
        return false
      case SOURCE_TOUCH:
        this.eventsSource = SOURCE_TOUCH
        this.filterPointersBySource()
        return true
      case SOURCE_POINTER:
        if (this.eventsSource === SOURCE_MOUSE) {
          this.eventsSource = SOURCE_POINTER
          this.filterPointersBySource()
          return true
        }
        return false
      default:
        return false
    }
  }

  static parseMouseEvent(mouseEvent) {
    return {
      id: 'mouse',
      source: SOURCE_MOUSE,
      x: parseInt(mouseEvent.clientX, 10),
      y: parseInt(mouseEvent.clientY, 10),
    }
  }

  static parseTouchPointer(touchPointer) {
    return {
      id: touchPointer.identifier,
      source: SOURCE_TOUCH,
      x: parseInt(touchPointer.clientX, 10),
      y: parseInt(touchPointer.clientY, 10),
    }
  }

  static parsePointerEvent(pointerEvent) {
    return {
      id: pointerEvent.pointerId,
      source: SOURCE_POINTER,
      x: parseInt(pointerEvent.clientX, 10),
      y: parseInt(pointerEvent.clientY, 10),
    }
  }

  addPointer(pointer) {
    this.pointerList.push(pointer)
  }

  removePointer(pointer) {
    this.pointerList = this.pointerList.filter(({ id }) => id !== pointer.id)
  }

  filterPointersBySource() {
    this.pointerList = this.pointerList.filter(
      ({ source }) => source === this.eventsSource
    )
  }

  handleMouseDown(event) {
    if (
      this.shouldHandleEvent(SOURCE_MOUSE) &&
      ReactImageLightbox.isTargetMatchImage(event.target)
    ) {
      this.addPointer(ReactImageLightbox.parseMouseEvent(event))
      this.multiPointerStart(event)
    }
  }

  handleMouseMove(event) {
    if (this.shouldHandleEvent(SOURCE_MOUSE)) {
      this.multiPointerMove(event, [ReactImageLightbox.parseMouseEvent(event)])
    }
  }

  handleMouseUp(event) {
    if (this.shouldHandleEvent(SOURCE_MOUSE)) {
      this.removePointer(ReactImageLightbox.parseMouseEvent(event))
      this.multiPointerEnd(event)
    }
  }

  handlePointerEvent(event) {
    if (this.shouldHandleEvent(SOURCE_POINTER)) {
      switch (event.type) {
        case 'pointerdown':
          if (ReactImageLightbox.isTargetMatchImage(event.target)) {
            this.addPointer(ReactImageLightbox.parsePointerEvent(event))
            this.multiPointerStart(event)
          }
          break
        case 'pointermove':
          this.multiPointerMove(event, [
            ReactImageLightbox.parsePointerEvent(event),
          ])
          break
        case 'pointerup':
        case 'pointercancel':
          this.removePointer(ReactImageLightbox.parsePointerEvent(event))
          this.multiPointerEnd(event)
          break
        default:
          break
      }
    }
  }

  handleTouchStart(event) {
    if (
      this.shouldHandleEvent(SOURCE_TOUCH) &&
      ReactImageLightbox.isTargetMatchImage(event.target)
    ) {
      ;[].forEach.call(event.changedTouches, (eventTouch) =>
        this.addPointer(ReactImageLightbox.parseTouchPointer(eventTouch))
      )
      this.multiPointerStart(event)
    }
  }

  handleTouchMove(event) {
    if (this.shouldHandleEvent(SOURCE_TOUCH)) {
      this.multiPointerMove(
        event,
        [].map.call(event.changedTouches, (eventTouch) =>
          ReactImageLightbox.parseTouchPointer(eventTouch)
        )
      )
    }
  }

  handleTouchEnd(event) {
    if (this.shouldHandleEvent(SOURCE_TOUCH)) {
      ;[].map.call(event.changedTouches, (touch) =>
        this.removePointer(ReactImageLightbox.parseTouchPointer(touch))
      )
      this.multiPointerEnd(event)
    }
  }

  decideMoveOrSwipe(pointer) {
    if (this.state.zoomLevel <= MIN_ZOOM_LEVEL) {
      this.handleSwipeStart(pointer)
    } else {
      this.handleMoveStart(pointer)
    }
  }

  multiPointerStart(event) {
    this.handleEnd(null)
    switch (this.pointerList.length) {
      case 1: {
        event.preventDefault()
        this.decideMoveOrSwipe(this.pointerList[0])
        break
      }
      case 2: {
        event.preventDefault()
        this.handlePinchStart(this.pointerList)
        break
      }
      default:
        break
    }
  }

  multiPointerMove(event, pointerList) {
    switch (this.currentAction) {
      case ACTION_MOVE: {
        event.preventDefault()
        this.handleMove(pointerList[0])
        break
      }
      case ACTION_SWIPE: {
        event.preventDefault()
        this.handleSwipe(pointerList[0])
        break
      }
      case ACTION_PINCH: {
        event.preventDefault()
        this.handlePinch(pointerList)
        break
      }
      default:
        break
    }
  }

  multiPointerEnd(event) {
    if (this.currentAction !== ACTION_NONE) {
      this.setPreventInnerClose()
      this.handleEnd(event)
    }
    switch (this.pointerList.length) {
      case 0: {
        this.eventsSource = SOURCE_ANY
        break
      }
      case 1: {
        event.preventDefault()
        this.decideMoveOrSwipe(this.pointerList[0])
        break
      }
      case 2: {
        event.preventDefault()
        this.handlePinchStart(this.pointerList)
        break
      }
      default:
        break
    }
  }

  handleEnd(event) {
    switch (this.currentAction) {
      case ACTION_MOVE:
        this.handleMoveEnd(event)
        break
      case ACTION_SWIPE:
        this.handleSwipeEnd(event)
        break
      case ACTION_PINCH:
        this.handlePinchEnd(event)
        break
      default:
        break
    }
  }

  // Handle move start over the lightbox container
  // This happens:
  // - On a mouseDown event
  // - On a touchstart event
  handleMoveStart({ x: clientX, y: clientY }) {
    if (!this.props.enableZoom) {
      return
    }
    this.currentAction = ACTION_MOVE
    this.moveStartX = clientX
    this.moveStartY = clientY
    this.moveStartOffsetX = this.state.offsetX
    this.moveStartOffsetY = this.state.offsetY
  }

  // Handle dragging over the lightbox container
  // This happens:
  // - After a mouseDown and before a mouseUp event
  // - After a touchstart and before a touchend event
  handleMove({ x: clientX, y: clientY }) {
    const newOffsetX = this.moveStartX - clientX + this.moveStartOffsetX
    const newOffsetY = this.moveStartY - clientY + this.moveStartOffsetY
    if (
      this.state.offsetX !== newOffsetX ||
      this.state.offsetY !== newOffsetY
    ) {
      this.setState({
        offsetX: newOffsetX,
        offsetY: newOffsetY,
      })
    }
  }

  handleMoveEnd() {
    this.currentAction = ACTION_NONE
    this.moveStartX = 0
    this.moveStartY = 0
    this.moveStartOffsetX = 0
    this.moveStartOffsetY = 0
    // Snap image back into frame if outside max offset range
    const maxOffsets = this.getMaxOffsets()
    const nextOffsetX = Math.max(
      maxOffsets.minX,
      Math.min(maxOffsets.maxX, this.state.offsetX)
    )
    const nextOffsetY = Math.max(
      maxOffsets.minY,
      Math.min(maxOffsets.maxY, this.state.offsetY)
    )
    if (
      nextOffsetX !== this.state.offsetX ||
      nextOffsetY !== this.state.offsetY
    ) {
      this.setState({
        offsetX: nextOffsetX,
        offsetY: nextOffsetY,
        shouldAnimate: true,
      })
      this.setTimeout(() => {
        this.setState({ shouldAnimate: false })
      }, this.props.animationDuration)
    }
  }

  handleSwipeStart({ x: clientX, y: clientY }) {
    this.currentAction = ACTION_SWIPE
    this.swipeStartX = clientX
    this.swipeStartY = clientY
    this.swipeEndX = clientX
    this.swipeEndY = clientY
  }

  handleSwipe({ x: clientX, y: clientY }) {
    this.swipeEndX = clientX
    this.swipeEndY = clientY
  }

  handleSwipeEnd(event) {
    const xDiff = this.swipeEndX - this.swipeStartX
    const xDiffAbs = Math.abs(xDiff)
    const yDiffAbs = Math.abs(this.swipeEndY - this.swipeStartY)

    this.currentAction = ACTION_NONE
    this.swipeStartX = 0
    this.swipeStartY = 0
    this.swipeEndX = 0
    this.swipeEndY = 0

    if (!event || this.isAnimating() || xDiffAbs < yDiffAbs * 1.5) {
      return
    }

    if (xDiffAbs < MIN_SWIPE_DISTANCE) {
      const boxRect = this.getLightboxRect()
      if (xDiffAbs < boxRect.width / 4) {
        return
      }
    }

    if (xDiff > 0 && this.props.prevSrc) {
      event.preventDefault()
      this.requestMovePrev()
    } else if (xDiff < 0 && this.props.nextSrc) {
      event.preventDefault()
      this.requestMoveNext()
    }
  }

  calculatePinchDistance([a, b] = this.pinchTouchList) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
  }

  calculatePinchCenter([a, b] = this.pinchTouchList) {
    return {
      x: a.x - (a.x - b.x) / 2,
      y: a.y - (a.y - b.y) / 2,
    }
  }

  handlePinchStart(pointerList) {
    if (!this.props.enableZoom) {
      return
    }
    this.currentAction = ACTION_PINCH
    this.pinchTouchList = pointerList.map(({ id, x, y }) => ({ id, x, y }))
    this.pinchDistance = this.calculatePinchDistance()
  }

  handlePinch(pointerList) {
    this.pinchTouchList = this.pinchTouchList.map((oldPointer) => {
      for (let i = 0; i < pointerList.length; i++) {
        if (pointerList[i].id === oldPointer.id) {
          return pointerList[i]
        }
      }

      return oldPointer
    })

    const newDistance = this.calculatePinchDistance()

    // Propably this should be more complicated... but works fine?
    const zoomLevel = this.state.zoomLevel + newDistance - this.pinchDistance

    this.pinchDistance = newDistance
    const { x: clientX, y: clientY } = this.calculatePinchCenter(
      this.pinchTouchList
    )
    this.changeZoom(zoomLevel, clientX, clientY)
  }

  handlePinchEnd() {
    this.currentAction = ACTION_NONE
    this.pinchTouchList = null
    this.pinchDistance = 0
  }

  // Handle the window resize event
  handleWindowResize() {
    this.clearTimeout(this.resizeTimeout)
    this.resizeTimeout = this.setTimeout(this.forceUpdate.bind(this), 100)
  }

  handleZoomInButtonClick() {
    this.changeZoom(this.state.zoomLevel + ZOOM_BUTTON_INCREMENT_SIZE)
  }

  handleZoomOutButtonClick() {
    this.changeZoom(this.state.zoomLevel - ZOOM_BUTTON_INCREMENT_SIZE)
  }

  handleCaptionMousewheel(event) {
    event.stopPropagation()

    if (!this.caption) {
      return
    }

    const height = this.caption.getBoundingClientRect().height
    const scrollHeight = this.caption.scrollHeight
    const scrollTop = this.caption.scrollTop
    if (
      (event.deltaY > 0 && height + scrollTop >= scrollHeight) ||
      (event.deltaY < 0 && scrollTop <= 0)
    ) {
      event.preventDefault()
    }
  }

  // Detach key and mouse input events
  isAnimating() {
    return this.state.shouldAnimate || this.state.isClosing
  }

  // Check if image is loaded
  isImageLoaded(imageSrc) {
    return (
      imageSrc &&
      imageSrc in this.imageCache &&
      this.imageCache[imageSrc].loaded
    )
  }

  // Load image from src and call callback with image width and height on load
  loadImage(srcType, imageSrc, done) {
    // Return the image info if it is already cached
    if (this.isImageLoaded(imageSrc)) {
      this.setTimeout(() => {
        done()
      }, 1)
      return
    }

    const that = this
    const inMemoryImage = new Image()

    inMemoryImage.onerror = (errorEvent) => {
      this.props.onImageLoadError(imageSrc, srcType, errorEvent)
      done(errorEvent)
    }

    inMemoryImage.onload = function onLoad() {
      that.imageCache[imageSrc] = {
        loaded: true,
        width: this.width,
        height: this.height,
      }

      done()
    }

    inMemoryImage.src = imageSrc
  }

  // Load all images and their thumbnails
  loadAllImages(props = this.props) {
    const generateLoadDoneCallback = (srcType, imageSrc) => (err) => {
      // Give up showing image on error
      if (err) {
        return
      }

      // Don't rerender if the src is not the same as when the load started
      // or if the component has unmounted
      if (this.props[srcType] !== imageSrc || !this.mounted) {
        return
      }

      // Force rerender with the new image
      this.forceUpdate()
    }

    // Load the images
    this.getSrcTypes().forEach((srcType) => {
      const type = srcType.name

      // Load unloaded images
      if (props[type] && !this.isImageLoaded(props[type])) {
        this.loadImage(
          type,
          props[type],
          generateLoadDoneCallback(type, props[type])
        )
      }
    })
  }

  // Request that the lightbox be closed
  requestClose(event) {
    // Call the parent close request
    const closeLightbox = () => this.props.onCloseRequest(event)

    if (
      this.props.animationDisabled ||
      (event.type === 'keydown' && !this.props.animationOnKeyInput)
    ) {
      // No animation
      return closeLightbox()
    }

    // With animation
    // Start closing animation
    this.setState({ isClosing: true })

    // Perform the actual closing at the end of the animation
    this.setTimeout(closeLightbox, this.props.animationDuration)
  }

  requestMove(direction, event) {
    // Reset the zoom level on image move
    const nextState = {
      zoomLevel: MIN_ZOOM_LEVEL,
      offsetX: 0,
      offsetY: 0,
    }

    // Enable animated states
    if (
      !this.props.animationDisabled &&
      (!this.keyPressed || this.props.animationOnKeyInput)
    ) {
      nextState.shouldAnimate = true
      this.setTimeout(
        () => this.setState({ shouldAnimate: false }),
        this.props.animationDuration
      )
    }
    this.keyPressed = false

    this.moveRequested = true

    if (direction === 'prev') {
      this.keyCounter--
      this.setState(nextState)
      this.props.onMovePrevRequest(event)
    } else {
      this.keyCounter++
      this.setState(nextState)
      this.props.onMoveNextRequest(event)
    }
  }

  // Request to transition to the next image
  requestMoveNext(event) {
    this.requestMove('next', event)
  }

  // Request to transition to the previous image
  requestMovePrev(event) {
    this.requestMove('prev', event)
  }

  // Request to transition to the previous image
  static getTransform({ x = null, y = null, zoom = null }) {
    const isOldIE = _ieVersion < 10
    const transforms = []
    if (x !== null || y !== null) {
      transforms.push(
        isOldIE
          ? `translate(${x || 0}px,${y || 0}px)`
          : `translate3d(${x || 0}px,${y || 0}px,0)`
      )
    }

    if (zoom !== null) {
      transforms.push(isOldIE ? `scale(${zoom})` : `scale3d(${zoom},${zoom},1)`)
    }

    return {
      [isOldIE ? 'msTransform' : 'transform']:
        transforms.length === 0 ? 'none' : transforms.join(' '),
    }
  }

  render() {
    const {
      animationDisabled,
      animationDuration,
      clickOutsideToClose,
      discourageDownloads,
      enableZoom,
      imageTitle,
      nextSrc,
      prevSrc,
      toolbarButtons,
      reactModalStyle,
    } = this.props
    const { zoomLevel, offsetX, offsetY, isClosing } = this.state

    const boxSize = this.getLightboxRect()
    let transitionStyle = {}

    // Transition settings for sliding animations
    if (!animationDisabled && this.isAnimating()) {
      transitionStyle = {
        ...transitionStyle,
        transition: `transform ${animationDuration}ms`,
      }
    }

    // Key endings to differentiate between images with the same src
    const keyEndings = {}
    this.getSrcTypes().forEach(({ name, keyEnding }) => {
      keyEndings[name] = keyEnding
    })

    // Images to be displayed
    const images = []
    const addImage = (srcType, imageClass, baseStyle = {}) => {
      // Ignore types that have no source defined for their full size image
      if (!this.props[srcType]) {
        return
      }

      const imageStyle = { ...baseStyle, ...transitionStyle }
      if (zoomLevel > MIN_ZOOM_LEVEL) {
        imageStyle.cursor = 'move'
      }

      const bestImageInfo = this.getBestImageForType(srcType)
      if (bestImageInfo === null) {
        let loadingIcon
        if (_ieVersion < 10) {
          loadingIcon = (
            <div className="loadingContainer__icon">
              {translate('Loading...')}
            </div>
          )
        } else {
          loadingIcon = (
            <div className="ril-loading-circle loadingCircle loadingContainer__icon">
              <div className="ril-loading-circle-point loadingCirclePoint}" />
              <div className="ril-loading-circle-point loadingCirclePoint}" />
              <div className="ril-loading-circle-point loadingCirclePoint}" />
              <div className="ril-loading-circle-point loadingCirclePoint}" />
              <div className="ril-loading-circle-point loadingCirclePoint}" />
              <div className="ril-loading-circle-point loadingCirclePoint}" />
              <div className="ril-loading-circle-point loadingCirclePoint}" />
              <div className="ril-loading-circle-point loadingCirclePoint}" />
              <div className="ril-loading-circle-point loadingCirclePoint}" />
              <div className="ril-loading-circle-point loadingCirclePoint}" />
              <div className="ril-loading-circle-point loadingCirclePoint}" />
              <div className="ril-loading-circle-point loadingCirclePoint}" />
            </div>
          )
        }

        // Fall back to loading icon if the thumbnail has not been loaded
        images.push(
          <div
            className={`${imageClass} image ril-not-loaded`}
            style={imageStyle}
            key={this.props[srcType] + keyEndings[srcType]}
          >
            <div className="loadingContainer">{loadingIcon}</div>
          </div>
        )

        return
      }

      imageStyle.width = bestImageInfo.width
      imageStyle.height = bestImageInfo.height

      const imageSrc = bestImageInfo.src
      if (discourageDownloads) {
        imageStyle.backgroundImage = `url('${imageSrc}')`
        images.push(
          <div
            className={`${imageClass} image imageDiscourager`}
            onDoubleClick={this.handleImageDoubleClick}
            onWheel={this.handleImageMouseWheel}
            style={imageStyle}
            key={imageSrc + keyEndings[srcType]}
          >
            <div className={'ril-download-blocker downloadBlocker'} />
          </div>
        )
      } else {
        images.push(
          <img
            className={`${imageClass} image`}
            onDoubleClick={this.handleImageDoubleClick}
            onWheel={this.handleImageMouseWheel}
            onDragStart={(e) => e.preventDefault()}
            style={imageStyle}
            src={imageSrc}
            key={imageSrc + keyEndings[srcType]}
            alt={
              typeof imageTitle === 'string' ? imageTitle : translate('Image')
            }
            draggable={false}
          />
        )
      }
    }

    const zoomMultiplier = this.getZoomMultiplier()
    // Next Image (displayed on the right)
    addImage(
      'nextSrc',
      'ril-image-next imageNext',
      ReactImageLightbox.getTransform({ x: boxSize.width })
    )
    // Main Image
    addImage(
      'mainSrc',
      'ril-image-current',
      ReactImageLightbox.getTransform({
        x: -1 * offsetX,
        y: -1 * offsetY,
        zoom: zoomMultiplier,
      })
    )
    // Previous Image (displayed on the left)
    addImage(
      'prevSrc',
      'ril-image-prev imagePrev',
      ReactImageLightbox.getTransform({ x: -1 * boxSize.width })
    )

    const noop = () => {}

    // Prepare styles and handlers for the zoom in/out buttons
    const zoomInButtonClasses = [
      'toolbarItemChild',
      'builtinButton',
      'zoomInButton',
    ]
    const zoomOutButtonClasses = [
      'toolbarItemChild',
      'builtinButton',
      'zoomOutButton',
    ]
    let zoomInButtonHandler = this.handleZoomInButtonClick
    let zoomOutButtonHandler = this.handleZoomOutButtonClick

    // Disable zooming in when zoomed all the way in
    if (zoomLevel === MAX_ZOOM_LEVEL) {
      zoomInButtonClasses.push('builtinButtonDisabled')
      zoomInButtonHandler = noop
    }

    // Disable zooming out when zoomed all the way out
    if (zoomLevel === MIN_ZOOM_LEVEL) {
      zoomOutButtonClasses.push('builtinButtonDisabled')
      zoomOutButtonHandler = noop
    }

    // Ignore clicks during animation
    if (this.isAnimating()) {
      zoomInButtonHandler = noop
      zoomOutButtonHandler = noop
    }

    const modalStyle = {
      overlay: {
        zIndex: 1000,
        backgroundColor: 'transparent',
        ...reactModalStyle.overlay, // Allow style overrides via props
      },
      content: {
        backgroundColor: 'transparent',
        overflow: 'hidden', // Needed, otherwise keyboard shortcuts scroll the page
        border: 'none',
        borderRadius: 0,
        padding: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        ...reactModalStyle.content, // Allow style overrides via props
      },
    }

    return (
      <Modal
        isOpen
        onRequestClose={clickOutsideToClose ? this.requestClose : noop}
        onAfterOpen={() => this.outerEl && this.outerEl.focus()} // Focus on the div with key handlers
        style={modalStyle}
        contentLabel={translate('Lightbox')}
      >
        <div // eslint-disable-line jsx-a11y/no-static-element-interactions
          // Floating modal with closing animations
          className={
            'ril-outer outer outerAnimating' +
            (isClosing ? ' ril-closing outerClosing' : '')
          }
          style={{
            transition: `opacity ${animationDuration}ms`,
            animationDuration: `${animationDuration}ms`,
            animationDirection: isClosing ? 'normal' : 'reverse',
          }}
          ref={(el) => {
            this.outerEl = el
          }}
          onWheel={this.handleOuterMousewheel}
          onMouseMove={this.handleMouseMove}
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          tabIndex="-1" // Enables key handlers on div
          onKeyDown={this.handleKeyInput}
          onKeyUp={this.handleKeyInput}
        >
          <div // eslint-disable-line jsx-a11y/no-static-element-interactions
            // Image holder
            className={'ril-inner inner'}
            onClick={clickOutsideToClose ? this.closeIfClickInner : noop}
          >
            {images}
          </div>

          {prevSrc && (
            <button // Move to previous image button
              type="button"
              className={'ril-prev-button navButtons navButtonPrev'}
              key="prev"
              onClick={!this.isAnimating() ? this.requestMovePrev : noop} // Ignore clicks during animation
            />
          )}

          {nextSrc && (
            <button // Move to next image button
              type="button"
              className={'ril-next-button navButtons navButtonNext'}
              key="next"
              onClick={!this.isAnimating() ? this.requestMoveNext : noop} // Ignore clicks during animation
            />
          )}

          <div // Lightbox toolbar
            className={'ril-toolbar toolbar'}
          >
            <ul
              className={[
                'ril-toolbar-left ',
                _ieVersion < 10
                  ? 'toolbarSide toolbarSideNoFlex '
                  : 'toolbarSide ',
                _ieVersion < 10
                  ? 'toolbarLeftSide toolbarLeftSideNoFlex'
                  : 'toolbarLeftSide',
              ].join(' ')}
            >
              <li className={'ril-toolbar__item toolbarItem'}>
                <span className={'ril-toolbar__item__child toolbarItemChild'}>
                  {imageTitle}
                </span>
              </li>
            </ul>

            <ul
              className={[
                'ril-toolbar-right',
                _ieVersion < 10
                  ? 'toolbarSide toolbarSideNoFlex'
                  : 'toolbarSide',
                _ieVersion < 10
                  ? 'toolbarRightSide toolbarRightSideNoFlex'
                  : 'toolbarRightSide',
              ].join(' ')}
            >
              {!toolbarButtons
                ? ''
                : toolbarButtons.map((button, i) => (
                    <li key={i} className={'ril-toolbar__item toolbarItem'}>
                      {button}
                    </li>
                  ))}

              {enableZoom && (
                <li className={'ril-toolbar__item toolbarItem'}>
                  <button // Lightbox zoom in button
                    type="button"
                    key="zoom-in"
                    className={`ril-zoom-in ${zoomInButtonClasses.join(' ')}`}
                    onClick={zoomInButtonHandler}
                  />
                </li>
              )}

              {enableZoom && (
                <li className={'ril-toolbar__item toolbarItem'}>
                  <button // Lightbox zoom out button
                    type="button"
                    key="zoom-out"
                    className={`ril-zoom-out ${zoomOutButtonClasses.join(' ')}`}
                    onClick={zoomOutButtonHandler}
                  />
                </li>
              )}

              <li className={'ril-toolbar__item toolbarItem'}>
                <button // Lightbox close button
                  type="button"
                  key="close"
                  className={
                    'ril-close ril-toolbar__item__child' +
                    ' toolbarItemChild builtinButton closeButton'
                  }
                  onClick={!this.isAnimating() ? this.requestClose : noop} // Ignore clicks during animation
                />
              </li>
            </ul>
          </div>

          {this.props.imageCaption && (
            <div // Image caption
              onWheel={this.handleCaptionMousewheel}
              onMouseDown={(event) => event.stopPropagation()}
              className={'ril-caption caption'}
              ref={(el) => {
                this.caption = el
              }}
            >
              <div className={'ril-caption-content captionContent'}>
                {this.props.imageCaption}
              </div>
            </div>
          )}
        </div>
      </Modal>
    )
  }
}

ReactImageLightbox.propTypes = {
  //-----------------------------
  // Image sources
  //-----------------------------

  // Main display image url
  mainSrc: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types

  // Previous display image url (displayed to the left)
  // If left undefined, movePrev actions will not be performed, and the button not displayed
  prevSrc: PropTypes.string,

  // Next display image url (displayed to the right)
  // If left undefined, moveNext actions will not be performed, and the button not displayed
  nextSrc: PropTypes.string,

  //-----------------------------
  // Image thumbnail sources
  //-----------------------------

  // Thumbnail image url corresponding to props.mainSrc
  mainSrcThumbnail: PropTypes.string, // eslint-disable-line react/no-unused-prop-types

  // Thumbnail image url corresponding to props.prevSrc
  prevSrcThumbnail: PropTypes.string, // eslint-disable-line react/no-unused-prop-types

  // Thumbnail image url corresponding to props.nextSrc
  nextSrcThumbnail: PropTypes.string, // eslint-disable-line react/no-unused-prop-types

  //-----------------------------
  // Event Handlers
  //-----------------------------

  // Close window event
  // Should change the parent state such that the lightbox is not rendered
  onCloseRequest: PropTypes.func.isRequired,

  // Move to previous image event
  // Should change the parent state such that props.prevSrc becomes props.mainSrc,
  //  props.mainSrc becomes props.nextSrc, etc.
  onMovePrevRequest: PropTypes.func,

  // Move to next image event
  // Should change the parent state such that props.nextSrc becomes props.mainSrc,
  //  props.mainSrc becomes props.prevSrc, etc.
  onMoveNextRequest: PropTypes.func,

  // Called when an image fails to load
  // (imageSrc: string, srcType: string, errorEvent: object): void
  onImageLoadError: PropTypes.func,

  //-----------------------------
  // Download discouragement settings
  //-----------------------------

  // Enable download discouragement (prevents [right-click -> Save Image As...])
  discourageDownloads: PropTypes.bool,

  //-----------------------------
  // Animation settings
  //-----------------------------

  // Disable all animation
  animationDisabled: PropTypes.bool,

  // Disable animation on actions performed with keyboard shortcuts
  animationOnKeyInput: PropTypes.bool,

  // Animation duration (ms)
  animationDuration: PropTypes.number,

  //-----------------------------
  // Keyboard shortcut settings
  //-----------------------------

  // Required interval of time (ms) between key actions
  // (prevents excessively fast navigation of images)
  keyRepeatLimit: PropTypes.number,

  // Amount of time (ms) restored after each keyup
  // (makes rapid key presses slightly faster than holding down the key to navigate images)
  keyRepeatKeyupBonus: PropTypes.number,

  //-----------------------------
  // Image info
  //-----------------------------

  // Image title
  imageTitle: PropTypes.node,

  // Image caption
  imageCaption: PropTypes.node,

  //-----------------------------
  // Lightbox style
  //-----------------------------

  // Set z-index style, etc., for the parent react-modal (format: https://github.com/reactjs/react-modal#styles )
  reactModalStyle: PropTypes.object,

  // Padding (px) between the edge of the window and the lightbox
  imagePadding: PropTypes.number,

  //-----------------------------
  // Other
  //-----------------------------

  // Array of custom toolbar buttons
  toolbarButtons: PropTypes.arrayOf(PropTypes.node),

  // When true, clicks outside of the image close the lightbox
  clickOutsideToClose: PropTypes.bool,

  // Set to false to disable zoom functionality and hide zoom buttons
  enableZoom: PropTypes.bool,
}

ReactImageLightbox.defaultProps = {
  onMovePrevRequest: () => {},
  onMoveNextRequest: () => {},
  onImageLoadError: () => {},

  discourageDownloads: false,

  animationDisabled: false,
  animationOnKeyInput: false,
  animationDuration: 300,

  keyRepeatLimit: 180,
  keyRepeatKeyupBonus: 40,

  reactModalStyle: {},
  imagePadding: 10,
  clickOutsideToClose: true,
  enableZoom: true,
}
