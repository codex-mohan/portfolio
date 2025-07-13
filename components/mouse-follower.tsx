"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type CursorState = "default" | "hover" | "click" | "drag" | "resize" | "text" | "input";

export function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile/tablet based on touch capability and user agent
    const checkMobile = () => {
      // More reliable mobile detection: check for touch capability + user agent
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      
      setIsMobile(hasTouch && isMobileDevice);
    };

    // Initial check
    checkMobile();

    // Listen for resize events (though less relevant for device detection)
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    // Don't initialize mouse follower on mobile/tablet devices
    if (isMobile) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseDown = () => {
      setCursorState("click");
    };

    const handleMouseUp = () => {
      setCursorState("default");
    };

    const handleDragStart = () => {
      setCursorState("drag");
    };

    const handleDragEnd = () => {
      setCursorState("default");
    };

    // Detect cursor state based on element type
    const updateCursorState = (element: Element) => {
      const tagName = element.tagName.toLowerCase();
      const elementType = element.getAttribute("type");
      const role = element.getAttribute("role");

      // Text input elements
      if (
        tagName === "input" &&
        (elementType === "text" ||
          elementType === "email" ||
          elementType === "password")
      ) {
        setCursorState("text");
      }
      // Textarea
      else if (tagName === "textarea") {
        setCursorState("text");
      }
      // Draggable elements
      else if (
        element.hasAttribute("draggable") &&
        element.getAttribute("draggable") === "true"
      ) {
        setCursorState("drag");
      }
      // Resize handles (elements with resize classes or data attributes)
      else if (
        element.classList.contains("resize-handle") ||
        element.hasAttribute("data-resize")
      ) {
        setCursorState("resize");
      }
      // Interactive elements
      else if (
        tagName === "a" ||
        tagName === "button" ||
        role === "button" ||
        element.classList.contains("cursor-pointer") ||
        window.getComputedStyle(element).cursor === "pointer"
      ) {
        setCursorState("hover");
      }
      // Default state
      else {
        setCursorState("default");
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target) {
        updateCursorState(target);
      }
    };

    // Track mouse movement
    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("dragstart", handleDragStart);
    window.addEventListener("dragend", handleDragEnd);
    window.addEventListener("mouseover", handleMouseOver);

    // Apply cursor: none to the body and all elements
    document.body.style.cursor = "none";
    const style = document.createElement("style");
    style.textContent = "* { cursor: none !important; }";
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("dragstart", handleDragStart);
      window.removeEventListener("dragend", handleDragEnd);
      window.removeEventListener("mouseover", handleMouseOver);

      // Restore default cursor
      document.body.style.cursor = "";
      const existingStyle = document.head.querySelector('style');
      if (existingStyle && existingStyle.textContent?.includes('cursor: none')) {
        document.head.removeChild(existingStyle);
      }
    };
  }, [isMobile]);

  const getCursorIcon = () => {
    switch (cursorState) {
      case "click":
        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all duration-150"
          >
            <g filter="url(#filter-click)">
              <path
                d="M9.5 27V5L23.5 19H16.5L9.5 27Z"
                fill="#8B5CF6"
                stroke="#8B5CF6"
                strokeWidth="2"
              />
              <circle cx="20" cy="12" r="3" fill="#EC4899" opacity="0.8" />
            </g>
            <defs>
              <filter
                id="filter-click"
                x="0"
                y="0"
                width="32"
                height="32"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="2" />
                <feGaussianBlur stdDeviation="3" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.545 0 0 0 0 0.361 0 0 0 0 0.965 0 0 0 0.4 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        );

      case "drag":
        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all duration-150"
          >
            <g filter="url(#filter-drag)">
              <path
                d="M16 4L20 8H18V12H22L18 16L22 20H18V24H20L16 28L12 24H14V20H10L14 16L10 12H14V8H12L16 4Z"
                fill="#10B981"
                stroke="white"
                strokeWidth="1"
              />
            </g>
            <defs>
              <filter
                id="filter-drag"
                x="0"
                y="0"
                width="32"
                height="32"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.063 0 0 0 0 0.725 0 0 0 0 0.506 0 0 0 0.3 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        );

      case "resize":
        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all duration-150"
          >
            <g filter="url(#filter-resize)">
              <path
                d="M6 6L10 6L6 10L6 6Z"
                fill="#F59E0B"
                stroke="white"
                strokeWidth="1"
              />
              <path
                d="M26 26L22 26L26 22L26 26Z"
                fill="#F59E0B"
                stroke="white"
                strokeWidth="1"
              />
              <path
                d="M6 26L6 22L10 26L6 26Z"
                fill="#F59E0B"
                stroke="white"
                strokeWidth="1"
              />
              <path
                d="M26 6L26 10L22 6L26 6Z"
                fill="#F59E0B"
                stroke="white"
                strokeWidth="1"
              />
              <line
                x1="8"
                y1="8"
                x2="24"
                y2="24"
                stroke="#F59E0B"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="24"
                y1="8"
                x2="8"
                y2="24"
                stroke="#F59E0B"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
            <defs>
              <filter
                id="filter-resize"
                x="0"
                y="0"
                width="32"
                height="32"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.965 0 0 0 0 0.620 0 0 0 0 0.043 0 0 0 0.3 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        );

      case "text":
      case "input":
        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all duration-150"
          >
            <g filter="url(#filter-text)">
              <line
                x1="16"
                y1="4"
                x2="16"
                y2="28"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="12"
                y1="4"
                x2="20"
                y2="4"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="12"
                y1="28"
                x2="20"
                y2="28"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
            <defs>
              <filter
                id="filter-text"
                x="0"
                y="0"
                width="32"
                height="32"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.231 0 0 0 0 0.510 0 0 0 0 0.965 0 0 0 0.3 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        );

      case "hover":
        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all duration-150"
          >
            <g filter="url(#filter-hover)">
              <path
                d="M9.5 27V5L23.5 19H16.5L9.5 27Z"
                fill="#8B5CF6"
                stroke="white"
                strokeWidth="1.5"
              />
            </g>
            <defs>
              <filter
                id="filter-hover"
                x="0"
                y="0"
                width="32"
                height="32"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="2" />
                <feGaussianBlur stdDeviation="3" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.545 0 0 0 0 0.361 0 0 0 0 0.965 0 0 0 0.4 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        );

      default:
        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all duration-150"
          >
            <g filter="url(#filter-default)">
              <path
                d="M9.5 27V5L23.5 19H16.5L9.5 27Z"
                fill="white"
                stroke="white"
                strokeWidth="1.5"
              />
            </g>
            <defs>
              <filter
                id="filter-default"
                x="0"
                y="0"
                width="32"
                height="32"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        );
    }
  };

  const getScale = () => {
    switch (cursorState) {
      case "click":
        return 0.9;
      case "drag":
        return 1.1;
      case "resize":
        return 1.2;
      case "hover":
        return 1.1;
      default:
        return 1;
    }
  };

  // Don't render mouse follower on mobile/tablet devices
  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: getScale(),
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "tween",
          duration: 0,
          ease: "linear",
        }}
      >
        {getCursorIcon()}
      </motion.div>

      {/* Precision dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 rounded-full bg-white pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          opacity: isVisible && cursorState === "default" ? 0.6 : 0,
        }}
        transition={{
          type: "tween",
          duration: 0,
          ease: "linear",
        }}
      />
    </>
  );
}
