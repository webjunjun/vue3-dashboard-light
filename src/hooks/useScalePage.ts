import { PAGE_WIDTH, PAGE_HEIGHT } from '@/utils/settings'

function useScalePage(vueElRef: globalThis.Ref) {
  const scope = effectScope()
  // 监听变化的DOM
  const appRef = vueElRef
  // 变化DOM的父元素
  // const parentEl = appRef.value.parentElement
  // 获取body下的第一个子元素 #app
  const parentEl = appRef.value.firstElementChild
  // 默认缩放值
  let scaleRate = '1'
  // 设计稿尺寸（px）
  const baseWidth = PAGE_WIDTH
  const baseHeight = PAGE_HEIGHT
  // 页面目前的宽高
  let currentWidth = 0
  let currentHeight = 0

  scope.run(() => {
    useResizeObserver(appRef, () => {
      const { width, height } = useWindowSize()
      currentHeight = height.value
      currentWidth = width.value
      if (currentWidth / currentHeight > baseWidth / baseHeight) {
        // 表示更宽
        scaleRate = (currentHeight / baseHeight).toFixed(5)
      } else {
        // 表示更高
        scaleRate = (currentWidth / baseWidth).toFixed(5)
      }
        parentEl.style.cssText = `
          width: ${baseWidth}px;height: ${baseHeight}px;transform: scale(${scaleRate}) translate(-50%,-50%);
          transform-origin: left top;
        `
        parentEl.dataset.scale = scaleRate
        parentEl.dataset.width = baseWidth
        parentEl.dataset.height = baseHeight
        parentEl.dataset.actualWidth = currentWidth
        parentEl.dataset.actualHeight = currentHeight
    })
  })

  return {
    appRef,
    scaleRate,
    currentWidth,
    currentHeight,
    scope
  }
}

export default useScalePage
